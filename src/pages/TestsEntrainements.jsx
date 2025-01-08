import { Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ExamenActions } from '../rtk/features/Examens/ExamenSlice';
import { BACKEND_URL } from '../Data';

const TestsEntrainements = () => {
  const dispatch = useDispatch();
  const Token = useSelector(state => state.header.token);
  const status = useSelector(state => state.user.status);
  const examens = useSelector(state => state.Examen.examens);
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/entrainementExamen`, {
        headers: {
          authorization: Token,
        },
      })
      .then(res => {
        // console.log('res', res.data)
        dispatch(ExamenActions.set(res.data.examenList));
      })
      .catch(err => {
        console.log('err', err);
      });
  }, [Token, dispatch]);

  return (
    <VStack w="full" height="100vh" p="40px" bgColor='blue.400'>
      <Heading as="h2" fontSize={26} m={5} color='white'>
        Tous nos entrainements d'examens
      </Heading>
      <HStack w="full" flexWrap="wrap" spacing={5}>
        {examens?.map(ex => {
          return <Entrainement key={ex.id} examen={ex} />;
        })}
      </HStack>
    </VStack>
  );
};

export default TestsEntrainements;

const Entrainement = ({ examen }) => {
  const status = useSelector(state => state.user.status);
  const navigate = useHistory();
  return (
    <VStack
      position="relative"
      bgColor="white"
      w={350}
      h={370}
      borderRadius={6}
      boxShadow="0 0 7px 1px rgba(0,0,0,0.3)"
      pt={20}
      pb={45}
      pl={6}
      pr={6}
    >
      <Text fontSize={24} w="full" position="absolute" top={0} left={0} p={4} borderTopRadius={6} bgColor="black" color="white">
        {examen.title}{' '}
      </Text>
      <Text w={325} h={90} textAlign="start" fontSize={18}>
      {examen.description.length > 80 ? examen.description.slice(0,79)+'...' : examen.description}
      </Text>
      <HStack w={350} fontSize={16} flexWrap="wrap" spacing={2} p={1}>
        {JSON.parse(examen.tags).map(tag => {
          return (
            tag && (
              <Text cursor="pointer" p={2} m={3} rounded="lg" bgColor="gray.100">
                {tag}
              </Text>
            )
          );
        })}
      </HStack>
      <Text fontSize={14}>{examen.questions?.length} questions</Text>
      <Button
        colorScheme="blue"
        bgColor="blue.500"
        borderRadius={0}
        borderBottomRadius={6}
        width={'full'}
        position={'absolute'}
        bottom={0}
        left={0}
        onClick={() => navigate.push('/entrainement/?id=' + examen?.id)}
        p={2}
      >
        {status ? 'Previsualisez' : 'Commencez'}
      </Button>
    </VStack>
  );
};
