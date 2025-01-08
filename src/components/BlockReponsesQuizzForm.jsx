import { Button, FormControl, HStack, Icon, Image, Input, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { GrAdd, GrSubtract } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { quizzFormActions } from '../rtk/features/BearerToken/QuizzFormSlice';
import ResponseForQuizzForm, { BouttonIcone } from './ResponseForQuizzForm';
import { BACKEND_URL } from '../Data';

const BlockReponsesQuizzForm = ({ idxQuestion, line }) => {
  const dispatch = useDispatch();
  const questions = useSelector(state => state.quizzForm.listeQuestions);
  const reponses = useSelector(state => state.quizzForm.listeQuestions[idxQuestion].reponses);
  const indexDerniereReponse = reponses.length - 1;
  const reponseValide = useSelector(state => state.quizzForm.listeQuestions[idxQuestion].reponseValide);
  const explication = useSelector(state => state.quizzForm.listeQuestions[idxQuestion].explication);
  const question = useSelector(state => state.quizzForm.listeQuestions[idxQuestion].question);
  const isSelected = useSelector(state => state.quizzForm.selected);
  let t = 0;
  let i = 0;
  if (Array.isArray(reponses)) {
    t = reponses.map(r => {
      i++;
      return (
        <ResponseForQuizzForm
          key={i + 'question' + idxQuestion + 'reponse' + reponses.indexOf(r)}
          idxQuestion={idxQuestion}
          idxReponse={reponses.indexOf(r)}
          idxDerniereReponse={indexDerniereReponse}
        />
      );
    });
  }

  const handleChangeNumber = e => {
    dispatch(quizzFormActions.modifyReponseValide({ indexQuestion: idxQuestion, reponseValide: e.target.value }));
  };

  const handleChangeExplication = e => {
    dispatch(quizzFormActions.modifyExplication({ indexQuestion: idxQuestion, explication: e.target.value }));
  };
  const box = useRef(null);
  const handleAdd = e => {
    e.preventDefault();
    dispatch(quizzFormActions.setSelected(idxQuestion + 1));
    dispatch(quizzFormActions.pushQuestion());
   
  };
  const handleRemove = e => {
    e.preventDefault();
    dispatch(quizzFormActions.setSelected(idxQuestion - 1));
    dispatch(quizzFormActions.removeQuestion(idxQuestion));
  };
  const handleChangeQuestion = e => {
    dispatch(quizzFormActions.modifyQuestionName({ indexQuestion: idxQuestion, question: e.target.value }));
  };

  // console.log('box offset : ', box.current && box.current.offsetTop);
  // console.log('lastChild offset : ', box.current && box.current.lastChild.offsetTop);

  // if (line) {
  //   return (
  //     <VStack h="full" maxH={350} align="center" overflowY="scroll" display={isSelected === idxQuestion ? 'flex' : 'none'}>
  //       <ImageQuestion idxQuestion={idxQuestion} />
  //       <HStack m={2}>
  //         <VStack>
  //           <Text>Question n° {idxQuestion + 1}</Text>
  //           <Input borderColor="black" type="text" placeholder="Question" value={question} onChange={e => handleChangeQuestion(e)} />
  //         </VStack>
  //         <VStack>
  //           <HStack>
  //             <Text>reponse valide : </Text>
  //             <Input
  //               borderWidth={2}
  //               borderColor="black"
  //               type="number"
  //               w="30px"
  //               h="30px"
  //               pl={2}
  //               pr={2}
  //               value={reponseValide}
  //               onChange={e => handleChangeNumber(e)}
  //             />
  //           </HStack>
  //           <VStack>
  //             <Input
  //               borderColor="black"
  //               type="text"
  //               placeholder="explication"
  //               value={explication}
  //               onChange={e => handleChangeExplication(e)}
  //             />
  //           </VStack>
  //         </VStack>
  //       </HStack>
  //       <VStack>
  //         <Text>Reponses</Text>
  //         <VStack maxH="200px" overflowY="scroll" ref={box}>
  //           {t}
  //           {t.length === 0 && <BouttonIcone idxQuestion={idxQuestion} />}
  //         </VStack>
  //       </VStack>

  //       <HStack w="full" position="absolute" bottom={3}>
  //         {questions.length > 1 && (
  //           <Button
  //             type="button"
  //             colorScheme="blackAlpha"
  //             bottom={1}
  //             position="absolute"
  //             left={160}
  //             p={2}
  //             m={2}
  //             borderRadius="50%"
  //             onClick={e => handleRemove(e)}
  //           >
  //             <Icon as={GrSubtract} />
  //           </Button>
  //         )}
  //         <Button
  //           type="button"
  //           position="absolute"
  //           bottom={2}
  //           right={160}
  //           colorScheme="blackAlpha"
  //           p={2}
  //           m={2}
  //           borderRadius="50%"
  //           onClick={e => handleAdd(e)}
  //         >
  //           <Icon as={GrAdd} />
  //         </Button>
  //       </HStack>
  //     </VStack>
  //   );
  // } else {
    return (
      <VStack h="full" maxH={350} align="center" overflowY="scroll" display={isSelected === idxQuestion ? 'flex' : 'none'}>
        <ImageQuestion idxQuestion={idxQuestion} />
        <HStack m={2}>
          <VStack>
            <Text>Question n° {idxQuestion + 1}</Text>]
            <Input borderColor="black" type="text" placeholder="Question" value={question} onChange={e => handleChangeQuestion(e)} />
          </VStack>
          <VStack>
            <HStack>
              <Text>n° reponse valide : </Text>
              <Input
                borderWidth={2}
                borderColor="black"
                type="number"
                w="50px"
                h="30px"
                pl={2}
                pr={2}
                value={reponseValide}
                min={1}
                max={reponses.length }
                onChange={e => handleChangeNumber(e)}
              />
            </HStack>
            <VStack>
              <FormControl isRequired w='fit-content'>
              <Input
                borderColor="black"
                type="text"
                placeholder="explication"
                value={explication}
                name = {`Explication-question-${idxQuestion}`}
                onChange={e => handleChangeExplication(e)}
              />
              </FormControl>
            </VStack>
          </VStack>
        </HStack>
        <VStack>
          <Text>Reponses</Text>
          <VStack maxH="150px" overflowY="scroll" ref={box}>
            {t}
            {t.length === 0 && <BouttonIcone idxQuestion={idxQuestion} />}
          </VStack>
        </VStack>

        <HStack w="full" position="absolute" bottom={3} >
          {questions.length > 1 && (
            <Button
              type="button"
              colorScheme="blackAlpha"
              bottom={1}
              position="absolute"
              left={160}
              p={2}
              m={2}
              borderRadius="50%"
              onClick={e => handleRemove(e)}
            >
              <Icon as={GrSubtract} />
            </Button>
          )}
          <Button
            type="button"
            position="absolute"
            bottom={2}
            right={160}
            colorScheme="blackAlpha"
            p={2}
            m={2}
            borderRadius="50%"
            onClick={e => handleAdd(e)}
          >
            <Icon as={GrAdd} />
          </Button>
        </HStack>
      </VStack>
    );
  }
// };

export default BlockReponsesQuizzForm;

export const ImageQuestion = ({ idxQuestion }) => {
  const imageResponse = useRef(null);
  const dispatch = useDispatch();
  const imgSrc = useSelector(state => state.quizzForm.listeQuestions[idxQuestion].img);
  // const [image, setImage] = useState({})
  const Token = useSelector(state => state.header.token);
  const [state, setState] = useState(false); //a false il n'y a pas d'image
  const handleChange = e => {
    // dispatch(loadingActions.set(true))
    console.log(e.target.files);
    // const img = {
    //   preview: URL.createObjectURL(e.target.files[0]),
    //   data: e.target.files[0],
    // };
    // setImage(img);
    let formData = new FormData();
    formData.append('addImage', e.target.files[0]);
    console.log({ ...formData });

    axios
      .post(`${BACKEND_URL}/api/picture`, formData, {
        headers: {
          authorization: Token,
        },
      })
      .then(response => {
        console.log(response);
        dispatch(quizzFormActions.modifyQuestionImage({ indexQuestion: idxQuestion, img: response.data.url }));
        setState(true);
      })
      .catch(err => {
        setState(false);
      });
  };
  const handleClick = () => {
    if (state) {
      axios
        .delete(`${BACKEND_URL}/api/picture`, {
          data: {
            url: imgSrc,
          },
          headers: {
            authorization: Token,
          },
        })
        .then(response => {
          setState(false);
          dispatch(quizzFormActions.questionImageClear(idxQuestion));
        })
        .catch(err => {
          if (err.response.data.err.code === 'ENOENT') {
            setState(false);
            dispatch(quizzFormActions.questionImageClear(idxQuestion));
          } else {
            console.log(err);
          }
        });
    } else {
      imageResponse.current.click();
    }
  };
  return (
    <HStack positon="relative" w={200} mt={4} fontSize={13} spacing={0} >
      {imgSrc ? 
      <Image flexGrow={1} objectFit='contain' h="50px" zIndex={2} src={imgSrc} alt="image de la question" />
      :
      <HStack h="50px" borderWidth={1} borderColor='blackAlpha.500' p={2} ><Text>image de la question</Text></HStack>
    }
      <VStack
        onClick={() => handleClick()}
        justify="center"
        flexGrow={0}
        flexShrink={0}
        h='full'
        w={10}
        zIndex={3}
        bgColor="blackAlpha.500"
        color="white"
      >
        <Icon as={state ? GrSubtract : GrAdd} cursor="pointer" />
      </VStack>
      <Input type="file" name={'photo question'+idxQuestion} display="none" ref={imageResponse} onChange={e => handleChange(e)} />
    </HStack>
  );
};
