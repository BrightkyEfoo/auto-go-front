import { Button, Flex, HStack, Icon, Image, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { GiCrossMark } from 'react-icons/gi';
import { HiBadgeCheck, HiOutlineBadgeCheck } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { postreponsesQuizzURL } from '../Data';
import { reponsesQuizzActions } from '../rtk/features/BearerToken/reponsesQuizzSlice';
import fetchAndReloadThemeAndThemeLoaded from '../rtk/myExtraFeatures/fetchAndReloadThemeAndThemeLoaded';

const QuizzComponent = ({ listeQuestions }) => {
  const t = listeQuestions.map(q => {
    return <Question idxQuestion={listeQuestions.indexOf(q)} key={`question${listeQuestions.indexOf(q)}`} question={q} />;
  });
  const dispatch = useDispatch();
  // const [resultState,setResultState] = useState(0)
  // const [results , setResults] = useState([])
  // const [note , setNote] = useState(0)
  const Token = useSelector(state => state.header.token);
  const reponses = useSelector(state => state.reponsesQuizz.reponses);
  const idQuizz = useSelector(state => state.pageActivityLoaded.id);
  const userId = useSelector(state => state.user.id);
  const themeId = useSelector(state => state.pageActivityLoaded.chapitre.ThemeId);
  let reps = reponses.map(r => r + 1);
  const [buttonState, setButtonState] = useState(true);

  const code = useSelector(state => state.reponsesQuizz.code);

  const note = useSelector(state => state.reponsesQuizz.note);
  const handleSubmit = () => {
    axios
      .post(
        postreponsesQuizzURL,
        { userId, idQuizz: idQuizz, reponses: reps },
        {
          headers: {
            authorization: Token,
          },
        }
      )
      .then(res => {
        // setResultState(res.data.code)
        // setResults(res.data.reponsesValides)
        // setNote(res.data.note)
        console.log('res.data', res.data);
        console.log('code', code);
        dispatch(reponsesQuizzActions.setResults({ reponsesValides: res.data.reponsesValides, code: res.data.code, note: res.data.note }));
        // setButtonState(false)
        console.log('code', code);
      })
      .catch(err => console.log('err : ', err))
      .finally(() => fetchAndReloadThemeAndThemeLoaded(themeId));
  };

  return (
    <VStack w="90%" align="start" pb="50px" spacing={5}>
      <VStack w="full" align="start" spacing={10}>
        {t}
      </VStack>
      {buttonState && (
        <Button alignSelf="center" onClick={() => handleSubmit()}>
          Valider
        </Button>
      )}
      {code !== 0 && code !== 4 && <Text alignSelf="center">Vous avez eu {Math.round(note * 10000) / 100} % de reponses justes</Text>}
    </VStack>
  );
};

export const Question = ({ idxQuestion, question }) => {
  const reponses = useSelector(state => state.reponsesQuizz.reponses); // c'est un tableau qui contient les index des reponses choisies
  // console.log('reponses', reponses);
  const code = useSelector(state => state.reponsesQuizz.code);
  const reponsesValides = useSelector(state => state.reponsesQuizz.reponsesValides);
  // console.log('reponsesValides', reponsesValides);
  const isGood = reponses[idxQuestion] === parseInt(reponsesValides[idxQuestion]) - 1;
  const t = question.reponses.map(r => {
    return (
      <Response
        isGood={isGood}
        canTChange={code !== 0 && isGood}
        key={`question${idxQuestion}Reponse${question.reponses.indexOf(r)}`}
        reponse={r}
        idxQuestion={idxQuestion}
        idxReponse={question.reponses.indexOf(r)}
      />
    );
  });
  return (
    <VStack p={4} w="full" align="start" transition="all ease 300ms" border='1px solid #CBD5E0' _hover={{ borderLeft: '2px #CBD5E0 solid', pl: 5 }}>
      <HStack>
        <Text>Question {idxQuestion + 1} </Text>
        <Text>{question.question}</Text>
      </HStack>
      {question.img && <Image alignSelf="center" h={200} src={question.img} alt={question.question} />}
      <VStack spacing={5} w="full">
        {t}
      </VStack>
      {/** ici on affiche toute les reponses de cette question */}
      {code !== 0 && isGood && (
        <VStack bgColor="blue.200" border='2px solid blue' w="full" fontSize={14} p={5} align="start" spacing={1}>
          <HStack>
            <Icon fontSize={20} color="blue.500" as={FaInfoCircle} />
            <Text>Explication : {question.explication}</Text>
          </HStack>
        </VStack>
      )}
    </VStack>
  );
};

export const Response = ({ isGood, reponse, idxQuestion, idxReponse, canTChange }) => {
  //ici reponse est l'objet reponse qui possede un titre et une image'
  const code = useSelector(state => state.reponsesQuizz.code);
  const reponsesChoisies = useSelector(state => state.reponsesQuizz);
  const reponseChoisie = reponsesChoisies.reponses[idxQuestion];
  const activite = useSelector(state => state.pageActivityLoaded);
  const quizz = activite.genre === 'quizz' && activite.contenu && JSON.parse(activite.contenu);
  const dispatch = useDispatch();
  const handleClick = () => {
    if (code === 0) {
      if (reponseChoisie !== idxReponse) {
        dispatch(reponsesQuizzActions.setResponseByIndex({ i: idxQuestion, r: idxReponse }));
      } else {
        dispatch(reponsesQuizzActions.setResponseByIndex({ i: idxQuestion, r: -1 }));
      }
    } else {
      dispatch(reponsesQuizzActions.clearResponse());
      dispatch(reponsesQuizzActions.createResponseSheet(quizz.length));
      if (reponseChoisie !== idxReponse) {
        dispatch(reponsesQuizzActions.setResponseByIndex({ i: idxQuestion, r: idxReponse }));
      } else {
        dispatch(reponsesQuizzActions.setResponseByIndex({ i: idxQuestion, r: -1 }));
      }
    }
  };
  return (
    <VStack
      w="full"
      align="center"
      fontSize={14}
      bgColor={reponseChoisie === idxReponse && code !== 0 ? (isGood ? 'green.200' : 'red.200') : 'white'}
    >
      <HStack justify="space-between" w="100%" p={1}>
        <HStack spacing={1}>
          <Icon
            fontSize={25}
            m={1}
            color={isGood ? "white" : 'red'}
            visibility={reponseChoisie === idxReponse && code !== 0 ? 'visible' : 'hidden'}
            as={isGood ? HiOutlineBadgeCheck : GiCrossMark}
          />
          <Text>
            Reponse {String.fromCharCode(65 + idxReponse)} : {reponse && reponse.titre}
          </Text>
        </HStack>
        <Flex
          onClick={() => handleClick()}
          display={canTChange ? 'none' : 'flex'}
          borderColor="black"
          float="right"
          borderWidth={1}
          w={7}
          h={7}
          justify="center"
          align="center"
        >
          {reponseChoisie === idxReponse && <Flex bgColor={code === 0 ? "blue.500" : 'red.600' } h={5} w={5} />}
        </Flex>
      </HStack>
      {reponse.img && <Image src={reponse.img} h={200} objectFit="contain" />}
    </VStack>
  );
};

export default QuizzComponent;
