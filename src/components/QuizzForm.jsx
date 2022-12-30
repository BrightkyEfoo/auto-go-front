import { Box, Button, HStack, Icon, Image, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BlockReponsesQuizzForm from './BlockReponsesQuizzForm';
import NavBarQuizzForm from './NavBarQuizzForm';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';

const QuizzForm = ({ line }) => {
  const listeQuestions = useSelector(state => state.quizzForm.listeQuestions);
  const t = listeQuestions.map(question => {
    return <BlockReponsesQuizzForm line={line} idxQuestion={listeQuestions.indexOf(question)} />;
  });
  const [isPreviewDisplayed, setIsPreviewDisplayed] = useState(false);
  const handleSubmit = () => {
    // console.log('listeQuestions', listeQuestions)
    // console.log('enCours', enCours)
    setIsPreviewDisplayed(!isPreviewDisplayed);
  };
  return (
    <VStack
      position="relative"
      justify="space-between"
      boxSizing="border-box"
      top={-2}
      w="600px"
      h="500px"
      left={5}
      rounded="lg"
      borderWidth={1}
      bgColor="gray.100"
      p={2}
      spacing={2}
      maxH={500}
    >
      {!isPreviewDisplayed && <NavBarQuizzForm line={line} />}
      {isPreviewDisplayed ? <Preview /> : t}
      <HStack
        h="fit-content"
        w="fit-content"
        p={2}
        borderWidth={2}
        borderColor="blue.500"
        position="relative"
        rounded="lg"
        bgColor={line ? 'white' : '#ffffff1e'}
        backdropFilter="blur(5px)"
      >
        <Button
          zIndex={5}
          borderRadius={0}
          bgColor="blue.500"
          borderWidth={1}
          _hover={{ borderColor: 'blue.500', bgColor: 'white', color: 'blue.500' }}
          borderColor="white"
          color="white"
          onClick={() => handleSubmit()}
        >
          {isPreviewDisplayed ? 'Modifier' : 'Apercu'}
        </Button>
        <Box
          position="absolute"
          bgColor="gray.100"
          left="-20%"
          zIndex={4}
          w="120%"
          h="80%"
          transition="all ease 300ms"
          _hover={{ transform: 'scaleY(1.2)' }}
        ></Box>
        <Box
          position="absolute"
          bgColor="gray.100"
          left="3%"
          zIndex={4}
          w="80%"
          h="120%"
          transition="all ease 300ms"
          _hover={{ transform: 'scaleX(1.3)' }}
        ></Box>
      </HStack>
    </VStack>
  );
};

export default QuizzForm;

export const Preview = () => {
  const listeQuestions = useSelector(state => state.quizzForm.listeQuestions);
  const t = listeQuestions.map(q => {
    let i = 0;
    i = i + 1;
    return (
      <VStack justify="center" align="center" key={i + listeQuestions.indexOf(q)} w="full" p={5}>
        <HStack>
          <Text>
            Question n° {listeQuestions.indexOf(q) + 1}:{q.question}
          </Text>
          {q.img !== '' && <Image src={q.img} objectFit="contain" h="35px" />}
        </HStack>
        <VStack w="full">
          {q.reponses.map(r => {
            let j = 0;
            return (
              <HStack
                rounded="xl"
                bgColor={parseInt(q.reponseValide) === q.reponses.indexOf(r) + 1 ? 'green.300' : 'transparent'}
                p={2}
                m={2}
                fontSize={parseInt(q.reponseValide) === q.reponses.indexOf(r) + 1 ? 17 : 13}
                w="full"
              >
                <Text key={i + '' + j + q.reponses.indexOf(r)}>
                  Reponse {String.fromCharCode(65 + q.reponses.indexOf(r))} - {r.titre}
                </Text>
                {r.img !== '' && <Image src={r.img} h="50px" objectFit="contain" />}
                {parseInt(q.reponseValide) === q.reponses.indexOf(r) + 1 && <Text color="white">Bonne Reponse</Text>}
              </HStack>
            );
          })}
        </VStack>
        <HStack justify="center" p={2} borderWidth={2} m={0} borderColor="red.700" w="full" h="full">
          <Text w="full" pr={5} pl={5} textAlign="center">
            {' '}
            <Icon fontSize={25} position="sticky" as={BsFillExclamationTriangleFill} color="red.500" float="left" />
            Explication : {q.explication}
          </Text>
        </HStack>
      </VStack>
    );
  });
  return (
    <VStack w="full" overflowY="scroll" maxH={600} borderWidth={1} borderColor="black">
      {t}
    </VStack>
  );
};
