import { Button, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const ExamenScore = ({ ExamTitle, note, nbQuestions, date, tags , type , examId }) => {
    const navigate = useHistory()
  return (
    <VStack m={3} position="relative" p={1} borderRadius={6} boxShadow="0 0 4px 2px rgba(0,0,0,0.4)" >
      <VStack
        h={250}
        w={250}
        p={3}
        mt={35}
        borderRadius={6}
        bgColor={note/nbQuestions >= 0.8 ? 'blue.500' : 'red.500'}
        color="white"
        transition="all ease 300ms"
        _hover={{ bgColor: note/nbQuestions >= 0.8 ? 'blue.600' : 'red.600' }}
      >
        <Text p={3} position='absolute' borderTopRadius={6} bgColor='black' w='full' top={0} left={0}>{ExamTitle}</Text>
        <Text fontSize = {26} >
          {note} / {nbQuestions}
        </Text>
        <HStack wrap="wrap">
          {tags.map(tag => {
            return tag ? (
              <Text
                fontSize={14}
                bgColor="gray.100"
                color="blue.500"
                transition="all ease 300ms"
                _hover={{ bgColor: 'gray.500', color: 'white' }}
                m={2}
                p={2}
                rounded="xl"
              >
                {tag}
              </Text>
            ) : null;
          })}
        </HStack>
        {note / nbQuestions < 0.8 && 
        <Button colorScheme='whiteAlpha' color='black' onClick={()=>{
            navigate.push(`/${type}/?id=${examId}`) //examen/?id=1
        }}>Reessayer</Button>}
        <Text position="absolute" bottom={2} right={6} fontSize={15}>
          {date.substr(0, 10)}
        </Text>
      </VStack>
    </VStack>
  );
};

export default ExamenScore;
