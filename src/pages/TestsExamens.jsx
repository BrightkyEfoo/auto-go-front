import { Box, Button, Heading, HStack, Icon, Input, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ExamenActions } from '../rtk/features/Examens/ExamenSlice';
import { BACKEND_URL } from '../Data';

const TestsExamens = () => {
  const dispatch = useDispatch();
  const Token = useSelector(state => state.header.token);
  const examens = useSelector(state => state.Examen.examens);
  const [r, setR] = useState(0);
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/examens`, {
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
    setR(0);
  }, [Token, dispatch, r]);

  return (
    <VStack w="full" height='100vh' p="40px" bgColor='blue.400'>
      <Heading as="h3" fontSize={26} m={5} color='white'>
        Tous nos examens
      </Heading>
      <HStack flexWrap="wrap" w="full" align='start' spacing={5}>
        {examens?.map(ex => {
          return <Examen key={ex.id} examen={ex} setR={setR} />;
        })}
      </HStack>
    </VStack>
  );
};

export default TestsExamens;

const Examen = ({ examen, setR }) => {
  const Token = useSelector(state => state.header.token);
  const navigate = useHistory();
  const [inputTitle, setInputTitle] = useState(examen.title);
  const status = useSelector(state => state.user.status);
  const [canEdit, setCanEdit] = useState(false);
  // let a = 'eeee'
  // a.slice()
  return (
    <VStack
      p={3}
      w={350}
      h={370}
      boxShadow="0 0 7px 1px rgba(0,0,0,0.3)"
      borderRadius={6}
      position="relative"
      pb={status ? 3 : 45}
      pl={6}
      pr={6}
      pt={20}
      bgColor = 'white'
    >
      {canEdit ? (
        <Input type="text" onChange={e => setInputTitle(e.target.value)} value={inputTitle} />
      ) : (
        <Text fontSize={24} w="full" position="absolute" top={0} left={0} p={4} borderTopRadius={6} bgColor="black" color="white">
          {examen.title}{' '}
        </Text>
      )}
      {!canEdit && (
        <VStack align='center'>
          <Box as={'p'} textAlign="start" maxW={325} maxH={81} fontSize={18} mb={5}>
            {examen.description.length > 80 ? examen.description.slice(0,79)+'...' : examen.description}
          </Box>
          <HStack maxW={300} w="full" fontSize={16} flexWrap='wrap'>
            {JSON.parse(examen.tags).map(tag => {
              return (
                tag && (
                  <Text cursor='pointer' p={2} m={3} rounded="lg" bgColor="gray.100">
                    {tag}
                  </Text>
                )
              );
            })}
          </HStack>
          <Text fontSize={14}>{examen.questions?.length} questions</Text>
        </VStack>
      )}
      <HStack>
        {!canEdit && (
          <Button
            colorScheme="blue"
            borderRadius={status ? 6 : 0}
            borderBottomRadius={status ? 6 : 6}
            width={status ? 'fit-content' : 'full'}
            position={status ? 'unset' : 'absolute'}
            bottom={0}
            left={0}
            bgColor="blue.500"
            onClick={() => navigate.push('/examen/?id=' + examen?.id)}
            p={2}
          >
            {status ? 'Previsualisez' : 'Commencez'}
          </Button>
        )}
        {status && (
          <Button
            colorScheme="blue"
            bgColor="blue.500"
            rounded="md"
            onClick={() => {
              if (canEdit) {
                axios
                  .post(
                    `${BACKEND_URL}/api/examen/${examen.id}`,
                    { title: inputTitle },
                    {
                      headers: {
                        authorization: Token,
                      },
                    }
                  )
                  .then(res => {
                    console.log('res', res.data.examen);
                    setCanEdit(false);
                    setR(prev => {
                      return prev + 1;
                    });
                  })
                  .catch(err => {
                    console.log('err', err);
                    setCanEdit(false);
                  });
              } else {
                setCanEdit(true);
              }
            }}
            p={2}
          >
            {canEdit ? 'Enregistrer' : 'Modifier'}
          </Button>
        )}
        {canEdit && (
          <Button
            colorScheme="blue"
            bgColor="blue.500"
            rounded="md"
            onClick={() => {
              axios
                .delete(`${BACKEND_URL}/api/examen/${examen.id}`, {
                  headers: {
                    authorization: Token,
                  },
                })
                .then(res => {
                  setR(prev => prev + 1);
                  console.log('res', res);
                })
                .catch(err => console.log('err', err))
                .finally(() => {
                  setCanEdit(false);
                });
            }}
            p={2}
          >
            Supprimer
          </Button>
        )}
        {canEdit && (
          <Button
            colorScheme="blue"
            bgColor="blue.500"
            rounded="md"
            onClick={() => {
              setCanEdit(false);
            }}
            p={2}
          >
            annuler
          </Button>
        )}
      </HStack>
    </VStack>
  );
};
