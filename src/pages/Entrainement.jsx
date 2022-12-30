import { Box, Button, Heading, HStack, Icon, Image, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loadingActions } from '../rtk/features/BearerToken/LoadingSlice';
import { ExamenActions } from '../rtk/features/Examens/ExamenSlice';
import { AiFillStar } from 'react-icons/ai';
import { ArrayCompare } from '../utils';
const Examen = ({ id }) => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.id)
  const [responseState, setResponseState] = useState([]);
  // const [questions, setquestions] = useState(second)
  const Token = useSelector(state => state.header.token);
  const examen = useSelector(state => state.Examen.examenActuel);
  const questionsReponsesValides = useSelector(state => state.Examen.questionsReponsesValides);
  const idxQuestionActuelle = useSelector(state => state.Examen.questionActuelle);
  const navigate = useHistory();
  const choices = useSelector(state => state.Examen.listeReponse);
  const reponsesValides = examen.questions?.map(q => {
    return q.valide?.id;
  });
  // const [isResultDisplayed, setIsResultDisplayed] = useState(false);
  const questionActuel = useSelector(state => state.Examen.examenActuel);
  const questionActuelle = Array.isArray(questionActuel.questions) ? questionActuel.questions[idxQuestionActuelle] : null;
  // const note = useSelector(state => state.Examen.note);
  const [note,setNote] = useState(0);
  
  // console.log(choices)
  useEffect(() => {
    axios
      .get('https://autogoback237.herokuapp.com/api/questionsExamenId/?ExamenId=' + id, {
        headers: {
          authorization: Token,
        },
      })
      .then(res => {
        console.log('res', res.data);
        dispatch(ExamenActions.init());
        dispatch(ExamenActions.setExamenActuel(res.data));
        dispatch(ExamenActions.setQuestionActuelle(0));
      })
      .catch(err => {
        console.log('err', err);
      });
  }, []);

  useEffect(() => {
    const a = async () => {
      if (questionActuelle?.head?.type === 'VIDEO') {
        await audioPlayer.current.load();
        await videoPlayer.current.load();
        videoPlayer.current.play();
        audioPlayer.current.play();
      } else {
        await audioPlayer.current.load();
        audioPlayer.current.play();
      }
    };
    a();
  }, [idxQuestionActuelle]);

  useEffect(()=>{
    if(questionActuelle?.reponses.filter(r=> r.title === 'NULL RESPONSE SYSTEM')[0]){
      setResponse([questionActuelle.reponses.filter(r=> r.title === 'NULL RESPONSE SYSTEM')[0].id])
    }else{
      setResponse([0])
    }
  },[idxQuestionActuelle])
  const audioPlayer = useRef(null);
  const videoPlayer = useRef(null);
  const [response, setResponse] = useState([]);
  const [isResultVisible, setIsResultVisible] = useState(false);
  const [canAnswer, setCanAnswer] = useState(true);
  const [isEndResultVisible, setIsEndResultVisible] = useState(false);
  const repsValides = questionActuelle?.reponses.filter(r => r.valideId);
  const repsIdValides = repsValides?.map(r => r?.id);
  console.log('reponses', response);
  console.log('reponses valides : ',repsIdValides)
  const handleClick = async () => {
    if (isResultVisible) {
      if (idxQuestionActuelle === examen.questions.length - 1) {
        //ici c'est la derniere question
        setIsEndResultVisible(true);
        audioPlayer.current.pause();
        axios.post('https://autogoback237.herokuapp.com/api/scoreTestExam',{
          nbQuestions : examen.questions?.length,
          note,
          examenId : id,
          userId
        },{
          headers :{
            authorization : Token
          }
        }).then(res => {
          console.log('res', res)
        }).catch(err => {
          console.log('err',err)
        })
      } else {
        // setResponse([0]);
        dispatch(ExamenActions.setQuestionActuelle(idxQuestionActuelle + 1));
      }
      setIsResultVisible(false);
      setCanAnswer(true);
      if (questionActuelle?.audio?.link) {
        await audioPlayer.current.load();
        audioPlayer.current.play();
      }
    } else if (isEndResultVisible) {
      //ici l'utilisateur retourne a son compte
      dispatch(ExamenActions.clearAll());
      navigate.push('/account');
    } else {
      setCanAnswer(false);
      if(ArrayCompare(response , repsIdValides)){
        setNote(prev => prev+1)
      }
      setIsResultVisible(true);
      dispatch(ExamenActions.addReponse({ reponse: response, idxQuestion: idxQuestionActuelle }));
    }
  };
  return (
    <VStack align="center" h='100vh' p={2} fontSize={14} pt={5} bgColor='rgba(0,0,0,0.6)' color='white'>
      <Box as="audio" display="none" controls ref={audioPlayer}>
        <source src={questionActuelle?.audio?.link} />
      </Box>

      <Heading as="h2" fontSize={20}>
        Entrainement d'examen
      </Heading>
      <HStack pb={2} overflowY="scroll" w="full" align="start" position="relative">
        {!isEndResultVisible ? (
          <>
            <VStack align="center" p={6} flex={2}>
              <Text fontSize={18}> {questionActuelle?.title} </Text>
              {questionActuelle?.head?.type === 'VIDEO' ? (
                <Box as="video" ref={videoPlayer} h={337} rounded='lg'>
                  <source src={questionActuelle?.head?.link} />
                </Box>
              ) : (
                questionActuelle?.head?.link && <Image h={337} src={questionActuelle?.head?.link} alt="image de la question" />
              )}
              <HStack w="100%" align="center" flexWrap="wrap" p={5} justify="space-between">
                {questionActuelle?.reponses.map(r => {
                  return r.title === 'NULL RESPONSE SYSTEM' ? null : (
                    <HStack
                      key={r?.id}
                      p="5px 15px"
                      borderRadius={0}
                      display="flex"
                      align="start"
                      justifyContent="start"
                      disabled={!canAnswer}
                      _hover={{
                        bgColor: response?.includes(r?.id) ? 'blue.600' : 'gray.300',
                        color: response?.includes(r?.id) ? 'white' : 'black',
                      }}
                      rounded='lg'
                      bgColor={
                        isResultVisible
                          ? response?.includes(r?.id)
                            ? repsIdValides.includes(r?.id)
                              ? 'green.300'
                              : 'red.500'
                            : repsIdValides.includes(r.id)
                            ? 'yellow.300'
                            : 'gray.100'
                          : response?.includes(r?.id)
                          ? 'blue.500'
                          : 'gray.100'
                      }
                      color={response?.includes(r?.id) ? 'white' : 'black'}
                      w="45%"
                      m={3}
                      cursor="pointer"
                      onClick={() => {
                        if (canAnswer) {
                          if (response.includes(r?.id)) {
                            if (response.length === 1) {
                              if (questionActuelle?.reponses.filter(r => r.title === 'NULL RESPONSE SYSTEM')[0]) {
                                setResponse(questionActuelle?.reponses?.at(-1)?.id);
                              } else {
                                setResponse([0]);
                              }
                            } else {
                              setResponse(prev => {
                                return prev.filter(id => id !== r?.id);
                              });
                            }
                          } else {
                            if (response[0] === 0) {
                              setResponse(prev => {
                                return [r?.id];
                              });
                            } else {
                              setResponse(prev => {
                                return [...prev, r?.id];
                              });
                            }
                          }
                        }
                      }}
                    >
                      <Text textAlign="start">{r.title}</Text>
                    </HStack>
                  );
                })}
              </HStack>
              <VStack w="full">
                {/* {response === 0 ? (
                  <Text>Choisissez l'une des reponses</Text>
                ) : ( */}
                <Button onClick={() => handleClick()} colorScheme='blackAlpha'>
                  {!isEndResultVisible && isResultVisible ? (
                    <Text>{idxQuestionActuelle === examen.questions.length - 1 ? 'Voir les resultats' : 'Suivant'}</Text>
                  ) : (
                    !isEndResultVisible && <Text>Valider</Text>
                  )}
                </Button>
              </VStack>
            </VStack>

            <VStack flex={1} position="sticky" top={0} pt={8}>
              {!isEndResultVisible && isResultVisible ? (
                <VStack>
                  {ArrayCompare(response , repsIdValides) ? (
                    <VStack position="relative" align="start" >
                      {/* <Icon as={AiFillStar} color='green.300' fontSize={35} position='absolute' top={0} left={0} /> */}
                      <Text fonSize={25} m={3} mt={0} color='white'>Bravo c'etait la bonne reponse</Text>

                      <Text textAlign="start" p={3} bgColor='blue.500' color='white'>Et savez vous pourquoi ? Et bien : {questionActuelle?.explication}</Text>
                    </VStack>
                  ) : (
                    <VStack align="start">
                      <Text color='red.500' fontSize={18} textAlign='start'>Malheuresement ce n'etait pas la bonne reponse...</Text>
                      {questionActuelle.valide?.title === 'NULL RESPONSE SYSTEM' ? (
                        <Text color='red.500'>Aucune reponse n'etait juste</Text>
                      ) : (
                        <>
                          <Text>La bonne reponse etait : </Text>
                          <Text fontSize={20} borderLeft='10px red solid' pl={15} pb={5} pt={5} borderBottom='2px red solid'>
                              {questionActuelle?.valide.title}
                          </Text>
                        </>
                      )}
                      <Text textAlign="start">Et ce parce que : {questionActuelle?.explication}</Text>
                    </VStack>
                  )}
                </VStack>
              ) : (
                !isEndResultVisible && <Text>Veuillez d'abord repondre a la question...</Text>
              )}
            </VStack>
          </>
        ) : (
          <VStack w="full" minH={600} justify="center">
            {note < 0.8 ? (
                <Text fontSize={20}>
                  Cet échec n'est pas une fin en soit, vous pouvez faire mieux. Des efforts supplémentaires s'imposent, ne lâchez rien ! 💪🏼
                </Text>
              ) : (
                <Text fontSize={20} >Félicitations ! Votre nouveau challenge vous attend. Inscrivez-vous pour l'examen du code de la route ! 🥳</Text>
              )}
            <Text fontSize={20}>
              Votre note est {' '}
              <Box as="span" fontSize={35}>
                {note}
              </Box>{' '}
              sur {examen.questions?.length} question{examen.questions?.length > 1 && 's'}
            </Text>
            <Button colorScheme='blue' onClick={() => navigate.push('/account')}>
              <Text>Retourner au labo</Text>
            </Button>
          </VStack>
        )}
      </HStack>
    </VStack>
  );
};

export default Examen;
