import { Button, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { GiCrossMark } from 'react-icons/gi';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
export const appContext = createContext();
const ModifyExams = () => {
  const Token = useSelector(state => state.header.token);
  const [list, setList] = useState({
    examList: [],
    testList: [],
  });
  const navigate = useHistory()
  useEffect(() => {
    axios
      .get('https://autogoback237.herokuapp.com/api/examens', {
        headers: {
          authorization: Token,
        },
      })
      .then(res => {
        console.log('examList', res.data.examenList);
        setList(prev => {
          return {
            ...prev,
            examList: res.data.examenList,
          };
        });
      });
    axios
      .get('https://autogoback237.herokuapp.com/api/entrainementExamen', {
        headers: {
          authorization: Token,
        },
      })
      .then(res => {
        console.log('testList', res.data.examenList);
        setList(prev => {
          return {
            ...prev,
            testList: res.data.examenList,
          };
        });
      });
  }, [Token]);
  const handleAdd = () => {
    navigate.push('/examens/create')
  };
  return (
    <appContext.Provider value={{ list, setList, Token }}>
      <VStack pt={50}>
        {list.examList.length === 0 && list.testList.length === 0 ? (
          <Text>Empty</Text>
        ) : (
          <>
            <List title={`Modifier les tests d'examens`} List={list.examList} />
            <List title={`Modifier les entrainements d'examens`} List={list.testList} />
          </>
        )}

        <Button onClick={handleAdd}>
          <Text>Ajouter</Text>
        </Button>
      </VStack>
    </appContext.Provider>
  );
};

export default ModifyExams;

export const List = ({ List, title }) => {
  // const {list , setList , Token} = useContext(appContext)

  if (List.length) {
    return (
      <VStack w='full'>
        <HStack>
          <Text>{title}</Text>
        </HStack>
        <HStack w='80%' spacing={5} flexWrap='wrap'>
          {List.map(item => {
            return <ListItem item={item} key={item.id} />;
          })}
        </HStack>
      </VStack>
    );
  } else {
    return null;
  }
};

export const ListItem = ({ item }) => {
  const { list, setList, Token } = useContext(appContext);
  const navigate = useHistory();
  const handleEdit = () => {
    navigate.push(`/examens/modify/${item.id}`);
  };
  const handleDelete = () => {
    axios
      .delete(`https://autogoback237.herokuapp.com/api/examen/${item.id}`, {
        headers: {
          authorization: Token,
        },
      })
      .then(res => {
        setList(prev => {
          if (item.type === 'EXAMEN') {
            return {
              ...prev,
              examList: prev.examList.filter(({ id }) => id !== item.id),
            };
          } else {
            return {
              ...prev,
              testList: prev.testList.filter(({ id }) => id !== item.id),
            };
          }
        });
      })
      .catch(err => console.log('err', err));
  };
  return (
    <VStack p={3} pb={45} position='relative' borderRadius={6} boxShadow = "0 0 7px 1px rgba(0,0,0,0.3)" w={200}>
      <Text>{item.title}</Text>
      <HStack w='full' position='absolute' spacing={0} bottom={0} left={0}>
        <Button onClick={handleEdit} m={0} flex={1} borderRadius={0} borderBottomLeftRadius={6}>
          <Icon fontSize={12} as={FaPencilAlt} />
        </Button>
        <Button onClick={handleDelete} colorScheme='red' m={0} flex={1} borderRadius={0} borderBottomRightRadius={6}>
          <Icon fontSize={12} as={GiCrossMark} />
        </Button>
      </HStack>
    </VStack>
  );
};
