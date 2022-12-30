import { Box, Button, Flex, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TimeBarExamen from '../components/TimeBarExamen';
import { loadingActions } from '../rtk/features/BearerToken/LoadingSlice';
import { ExamenActions } from '../rtk/features/Examens/ExamenSlice';

const timerValue = 30000;
export const appContext = createContext();
const Examen = ({ id }) => {
  const [canStart, setCanStart] = useState(false);
  const Token = useSelector(state => state.header.token);
  const userId = useSelector(state => state.user.id);
  const status = useSelector(state => state.user.status);
  const dispatch = useDispatch();
  // const examens = useSelector(state => state.Examen.examen);
  const examen = useSelector(state => state.Examen.examenActuel);
  const questionsReponsesValides = useSelector(state => state.Examen.questionsReponsesValides);
  const idxQuestionActuelle = useSelector(state => state.Examen.questionActuelle);
  const navigate = useHistory();
  const [isResultDisplayed, setIsResultDisplayed] = useState(false);
  const questionActuel = useSelector(state => state.Examen.examenActuel);
  const questionActuelle = Array.isArray(questionActuel.questions) ? questionActuel.questions[idxQuestionActuelle] : null;
  const note = useSelector(state => state.Examen.note);
  useEffect(() => {
    axios
      .get('https://autogoback237.herokuapp.com/api/questionsExamenId/?ExamenId=' + id, {
        headers: {
          authorization: Token,
        },
      })
      .then(res => {
        console.log('res', res.data);
        dispatch(ExamenActions.setExamenActuel(res.data));
        dispatch(ExamenActions.setQuestionActuelle(0));
      })
      .catch(err => {
        console.log('err', err);
      });
    // return ()=>{
    //   console.log('cleared')
    //   clearInterval(myInterval)
    // }
  }, []);

  console.log(questionActuelle);
  const [myInterval, setMyInterval] = useState(-1);
  return (
    <appContext.Provider value={{ myInterval, setMyInterval, canStart, setCanStart }}>
      <VStack h="100vh" p={6} position="relative" bgColor="rgba(0,0,0,0.6)" color="white">
        {isResultDisplayed ? null : <TimeBarExamen h="10px" w="full" time={timerValue} />}
        {isResultDisplayed ? (
          <VStack fontSize={14} textAlign="start" spacing={5}>
            <Heading as="h3" alignSelf="center" fontSize={18} fontWeight={700}>
              Résultats
            </Heading>
            <VStack>
              <HStack align="end" m={2} p={3}>
                <Text lineHeight={0}>Vous avez eu </Text>
                <Text lineHeight={0}>
                  <Box as="span" fontSize="2.5rem" color={note < 0.8 ? 'red' : 'green.300'}>
                    {note * examen.questions.length}
                  </Box>{' '}
                  <Box as="span" fontSize="1.5rem">
                    /
                  </Box>
                  <Box as="span" fontSize="1.25rem">
                    {examen.questions.length}
                  </Box>
                </Text>
              </HStack>
              {note < 0.8 ? (
                <Text fontSize={20}>
                  Cet échec n'est pas une fin en soit, vous pouvez faire mieux. Des efforts supplémentaires s'imposent, ne lâchez rien ! 💪🏼
                </Text>
              ) : (
                <Text fontSize={20} >Félicitations ! Votre nouveau challenge vous attend. Inscrivez-vous pour l'examen du code de la route ! 🥳</Text>
              )}
            </VStack>
            <Text alignSelf="start">Les bonnes reponses étaient : </Text>
            <HStack borderBottom="1px gray solid" pb={2} mb={6}>
              <HStack justify="space-between" align="start" spacing={5} maxW="100vw" flexWrap="wrap" color="black">
                {questionsReponsesValides.questions.map(q => {
                  return <ResultResponseCard q={q} questionsReponsesValides={questionsReponsesValides} />;
                })}
              </HStack>
            </HStack>
            <Button
              mt={5}
              onClick={() => {
                clearInterval(myInterval);
                dispatch(ExamenActions.clearAll());
                navigate.push('/account');
              }}
              fontSize={14}
              bgColor="blue.500"
              alignSelf="center"
              colorScheme="blue"
            >
              Retourner a votre labo
            </Button>
          </VStack>
        ) : (
          <VStack position="relative">
            <Text>Examen {id}</Text>
            {/* <Text position='absolute' top={0} left={0} fontSize={100} color='#2020d13a'>Examen {id}</Text> */}
            <Text fontWeight={800}>{questionActuelle?.title}</Text>

            {questionActuelle?.head?.type === 'VIDEO' ? (
              <Box as="video" autoPlay={true} h={350}>
                <source src={questionActuelle?.head?.link} />
              </Box>
            ) : (
              questionActuelle?.head?.link && <Image src={questionActuelle?.head?.link} h={350} alt={questionActuelle?.title + ' media'} />
            )}
            {questionActuelle && (
              <ReponseBlock
                examenId={id}
                end={idxQuestionActuelle === examen.questions.length - 1}
                audio={questionActuelle?.audio?.link}
                reponses={questionActuelle.reponses}
                idxQuestion={idxQuestionActuelle}
                questionActuelle={questionActuelle}
                setIsResultDisplayed={setIsResultDisplayed}
                isResultDisplayed={isResultDisplayed}
              />
            )}
          </VStack>
        )}
      </VStack>
    </appContext.Provider>
  );
};

export default Examen;

export const ResultResponseCard = ({ q, questionsReponsesValides }) => {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const handleQuestionClick = e => {
    setIsDisplayed(true);
  };
  const handleGetOut = e => {
    if (e.target === e.currentTarget) {
      setIsDisplayed(false);
    }
  };
  useEffect(() => {
    setIsDisplayed(false);

    return () => {
      setIsDisplayed(false);
    };
  }, []);

  return (
    <>
      {isDisplayed && (
        <VStack
          onClick={e => handleGetOut(e)}
          zIndex={15}
          justify="center"
          w="100vw"
          h="100vh"
          position="fixed"
          top={0}
          right={0}
          bgColor="rgba(255,255,255,0.4)"
          backdropFilter={'blur(15px)'}
        >
          <VStack w="40vw" bgColor="white" color="black" borderRadius={15} justify="space-between">
            <Text p={3} fontSize={13} fontWeight={700} color="white" w="full" textAlign="center" bgColor="black" borderTopRadius={15}>
              <Box as="span">Question {questionsReponsesValides.questions.indexOf(q) + 1} </Box>{' '}
            </Text>
            <VStack w="full" flexGrow={2}>
              <Text p={2} textAlign="center" fontSize={16}>
                {q.title}
              </Text>
              <VStack fontSize={13} w="full">
                {q.valide?.title === 'NULL RESPONSE SYSTEM' ? (
                  "Aucune reponse n'etait juste"
                ) : (
                  <>
                    {/* &nbsp;&nbsp; {q.reponses.length > 1 ? 'Les bonnes reponses etaient : ' : 'La bonne reponse etait :'}{' '} */}
                    {q.reponses.map(r => {
                      const last = q.reponses.indexOf(r) === q.reponses.length - 1;
                      return (
                        <Text key={r.id} bgColor="green.200" w="95%" m={2} p={2}>
                          {last && q.reponses.length > 1 && 'et '}
                          {r.title} {last ? '.' : ','}
                        </Text>
                      );
                    })}
                    {/* <Box as="span">{q.valide?.title}</Box> */}
                  </>
                )}
              </VStack>
            </VStack>

            <VStack p={2} bgColor="blue.500" color="white" borderBottomRadius={15} w="full">
              <Text>{q?.explication}</Text>
            </VStack>
          </VStack>
        </VStack>
      )}
      <VStack
        key={q.id}
        textAlign="start"
        align="start"
        w="45%"
        bgColor="white"
        borderRadius={5}
        boxShadow="0 0 4px 2px rgba(0,0,0,0.3)"
        spacing={1}
        cursor="pointer"
        onClick={e => handleQuestionClick(e)}
      >
        <Text p={3} fontSize={13} fontWeight={700} color="white" w="full" textAlign="center" bgColor="black" borderTopRadius={5}>
          <Box as="span">Question {questionsReponsesValides.questions.indexOf(q) + 1} </Box>{' '}
        </Text>
        <Text p={2} textAlign="center" fontSize={16}>
          {q.title}
        </Text>
        <VStack fontSize={13} w="full">
          {q.valide?.title === 'NULL RESPONSE SYSTEM' ? (
            "Aucune reponse n'etait juste"
          ) : (
            <>
              {/* &nbsp;&nbsp; {q.reponses.length > 1 ? 'Les bonnes reponses etaient : ' : 'La bonne reponse etait :'}{' '} */}
              {q.reponses.map(r => {
                const last = q.reponses.indexOf(r) === q.reponses.length - 1;
                return (
                  <Text key={r.id} bgColor="green.200" w="95%" m={2} p={2}>
                    {last && q.reponses.length > 1 && 'et '}
                    {r.title} {last ? '.' : ','}
                  </Text>
                );
              })}
              {/* <Box as="span">{q.valide?.title}</Box> */}
            </>
          )}
        </VStack>
        <VStack p={2} bgColor="blue.500" color="white" borderBottomRadius={5} w="full">
          <Text>{q?.explication}</Text>
        </VStack>
      </VStack>
    </>
  );
};

export const ReponseBlock = ({
  questionActuelle,
  reponses,
  examenId,
  idxQuestion,
  audio,
  end,
  isResultDisplayed,
  setIsResultDisplayed,
}) => {
  // const examen = useSelector(state => state.Examen.examenActuel)
  const reponsesChoisies = useSelector(state => state.Examen.listeReponse);
  // const [selected, setSelected] = useState(0);
  const Token = useSelector(state => state.header.token);
  const userId = useSelector(state => state.user.id)
  const dispatch = useDispatch();
  // const { myInterval } = useContext(appContext);
  const repsChoisies = useSelector(state => state.Examen.listeReponse[idxQuestion]);
  useEffect(() => {
    console.log(repsChoisies);
    if (!repsChoisies || repsChoisies?.length === 0) {
      if (reponses.filter(r => r.title === 'NULL RESPONSE SYSTEM')[0]) {
        console.log('added');
        dispatch(ExamenActions.addReponse({ idxQuestion, reponse: reponses.filter(r => r.title === 'NULL RESPONSE SYSTEM')[0].id }));
      } else {
        dispatch(ExamenActions.addReponse({ idxQuestion, reponse: 0 }));
      }
    }
  }, [idxQuestion]);

  const handleClick = () => {
    if (end) {
      dispatch(loadingActions.set(true));
      console.log('reponsesChoisies', reponsesChoisies);
      // dispatch(ExamenActions.setQuestionActuelle(idxQuestion + 1));
      axios
        .post(
          'https://autogoback237.herokuapp.com/api/verifyExamenById',
          {
            userId,
            examenId: examenId,
            reponses: reponsesChoisies,
          },
          {
            headers: {
              authorization: Token,
            },
          }
        )
        .then(res => {
          dispatch(ExamenActions.setResultats(res.data));
          setIsResultDisplayed(true);
        })
        .catch(err => {
          console.log('err', err);
        })
        .finally(() => {
          dispatch(loadingActions.set(false));
        });
    } else {
      if (!repsChoisies || repsChoisies?.length === 0) {
        if (reponses.filter(r => r.title === 'NULL RESPONSE SYSTEM')[0]) {
          dispatch(ExamenActions.addReponse({ idxQuestion, reponse: reponses.filter(r => r.title === 'NULL RESPONSE SYSTEM')[0].id }));
        } else {
          dispatch(ExamenActions.addReponse({ idxQuestion, reponse: 0 }));
        }
      }
      dispatch(ExamenActions.setQuestionActuelle(idxQuestion + 1));
    }
  };
  // console.log('end', end);
  useEffect(() => {
    const v = async () => {
      if (questionActuelle?.audio?.link) {
        await audioPlayer.current.load();
        audioPlayer.current.play();
      } else {
        audioPlayer.current.pause();
      }
    };
    v();
    // if()
  }, [audio, questionActuelle]);
  useEffect(() => {
    const myInterval = setInterval(() => {
      if (end) {
        dispatch(loadingActions.set(true));
        console.log('reponsesChoisies', reponsesChoisies);
        // dispatch(ExamenActions.setQuestionActuelle(idxQuestion + 1));
        axios
          .post(
            'https://autogoback237.herokuapp.com/api/verifyExamenById',
            {
              examenId: examenId,
              reponses: reponsesChoisies,
            },
            {
              headers: {
                authorization: Token,
              },
            }
          )
          .then(res => {
            dispatch(ExamenActions.setResultats(res.data));
            setIsResultDisplayed(true);
          })
          .catch(err => {
            console.log('err', err);
          })
          .finally(() => {
            dispatch(loadingActions.set(false));
            clearInterval(myInterval);
          });
      } else {
        // dispatch(ExamenActions.addReponse({reponse : 0 , idxQuestion : idxQuestion+1}))
        dispatch(ExamenActions.setQuestionActuelle(idxQuestion + 1));
      }
    }, timerValue);

    return () => {
      clearInterval(myInterval);
    };
  }, [idxQuestion]);

  const audioPlayer = useRef(null);
  return (
    <VStack w="full">
      {isResultDisplayed ? null : (
        <VStack wrap="wrap" justifyContent="center" spacing={5} w="full">
          <Box as="audio" ref={audioPlayer} display="none" controls>
            <source src={audio} />
          </Box>
          <Flex wrap="wrap" w="full">
            {reponses.map(r => {
              return r.title === 'NULL RESPONSE SYSTEM' ? null : (
                <Flex
                  cursor="pointer"
                  fontSize={14}
                  key={reponses.indexOf(r)}
                  onClick={() => {
                    const nullRep = reponses.filter(r => r.title === 'NULL RESPONSE SYSTEM')[0];
                    if (repsChoisies?.includes(r.id)) {
                      if (repsChoisies.length === 1) {
                        dispatch(ExamenActions.removeReponse({ reponse: r.id, idxQuestion }));
                        dispatch(ExamenActions.addReponse({ reponse: nullRep ? nullRep.id : 0, idxQuestion }));
                      } else {
                        dispatch(ExamenActions.removeReponse({ reponse: r.id, idxQuestion }));
                      }
                    } else {
                      if (nullRep && repsChoisies?.includes(nullRep?.id)) {
                        dispatch(ExamenActions.removeReponse({ reponse: nullRep.id, idxQuestion }));
                      }
                      dispatch(ExamenActions.addReponse({ reponse: r.id, idxQuestion }));
                    }
                    console.log('repsChoisies', repsChoisies);
                  }}
                  w="45%"
                  transition="all ease 300ms"
                  bgColor={repsChoisies?.includes(r.id) ? 'blue.500' : 'gray.50'}
                  color={repsChoisies?.includes(r.id) ? 'white' : 'black'}
                  p={2}
                  m={2}
                  _hover={{ bgColor: repsChoisies?.includes(r.id) ? 'blue.600' : 'gray.400', color: 'white' }}
                >
                  <Text w="full" textAlign="start">
                    <Box as="span" fontSize={22}>
                      {String.fromCharCode(reponses?.indexOf(r) + 65)}
                    </Box>{' '}
                    : {r.title}
                  </Text>
                </Flex>
              );
            })}
          </Flex>
          <Button type="button" onClick={() => handleClick()} colorScheme="blackAlpha">
            {end ? 'Terminer' : 'Suivant'}
          </Button>
        </VStack>
      )}
    </VStack>
  );
};
