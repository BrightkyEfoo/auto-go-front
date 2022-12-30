import { Box, Button, Flex, HStack, Icon, Input, InputGroup, InputRightElement, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { BsPencil } from 'react-icons/bs';
import { FaCheck, FaTrash } from 'react-icons/fa';
import { GiCrossMark } from 'react-icons/gi';
import { HiBadgeCheck } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { deleteChapitre, putSetChapitreName } from '../Data';
import { BoxToDisplayActions } from '../rtk/features/BearerToken/BoxToDisplaySlice';
import { ThemeLoadedActions } from '../rtk/features/BearerToken/ThemeLoadedSlice';
import { ThemeActions } from '../rtk/features/BearerToken/ThemesSlice';
import { loadingActions } from '../rtk/features/BearerToken/LoadingSlice';
import LinearProgresBar from './LinearProgresBar';
const CourseMd = ({ id, titre, activites, img, ratio, themeId }) => {
  const completedActivities = useSelector(state => state.user.completedActivities);
  const myRatio = Array.isArray(activites)&&activites.length > 0 ? activites.filter(a => completedActivities.includes(a.id)).length + '/' + activites.length : '0/1';
  const myRatioNumber = Array.isArray(activites) && activites.length > 0 ? parseFloat(activites.filter(a => completedActivities.includes(a.id)).length) / parseFloat(activites.length) : 0;
  // console.log(myRatio);
  const Token = useSelector(state => state.header.token);
  const dispatch = useDispatch();
  const statut = useSelector(state => state.user.status);
  const [nameCanChange, setNameCanChange] = useState(false);
  const [previousName, setPreviousName] = useState(titre);
  const [nameValue, setNameValue] = useState(titre);
  // console.log(activites)
  const handleClick = e => {
    if (e.target === e.currentTarget) {
      // dispatch(loadingActions.set(true))
      dispatch(BoxToDisplayActions.set({ titre, activites, img, id }));
      dispatch(BoxToDisplayActions.setThemeId(themeId));
    }
  };
  const handleChapterNameChange = e => {
    setNameValue(e.target.value);
  };
  const handleClickDeleteChapter = () => {
    axios
      .delete(deleteChapitre, {
        data: { id: id },
        headers: {
          authorization: Token,
        },
      })
      .then(res => {
        // dispatch(ThemeLoadedActions.removeById(id));
        dispatch(ThemeActions.deleteChapitreById({ chapitreId: id, themeId }));
        console.log(res.data.chapitre);
      })
      // .catch(err => {
      //   console.log(err);
      // });
  };
  const handleSubmitNameChapter = () => {
    axios
      .put(
        putSetChapitreName,
        {
          id: id,
          titre: nameValue,
        },
        {
          headers: {
            authorization: Token,
          },
        }
      )
      .then(res => {
        dispatch(ThemeActions.setChapNameById({ chapitreId: id, themeId: themeId, titre: nameValue }));
        // setPreviousName(res.data.chapitre.titre);
      })
      .catch(err => {
        console.log(err.response.data);
        setNameValue(previousName);
      })
      .finally(() => {
        setNameCanChange(false);
      });
  };
  const handleClickSetChapterName = e => {
    if (nameCanChange) {
      setNameValue(previousName);
    } else {
      setPreviousName(nameValue);
    }
    setNameCanChange(!nameCanChange);
  };
  return (
    <Flex
      direction="column"
      h={200}
      w={200}
      m={3}
      align="start"
      bgColor={myRatioNumber === 1 ? 'blue.500' : 'gray.200'}
      rounded="3xl"
      justify="space-between"
      p={3}
      flexShrink={0}
      transition="all ease 500ms"
      _hover={{
        h: 1.1 * 200,
        m: 7,
      }}
      cursor="pointer"
      onClick={e => handleClick(e)}
      position= 'relative'
    >
      <VStack align="start" textAlign="start" spacing={2} w="full" p={1}>
        <HStack justify="space-between" w="full">
          <Text
            fontSize={9}
            rounded="xl"
            bgColor={myRatioNumber === 1 ? 'white' : 'blue.500'}
            color={myRatioNumber === 1 ? 'blue.500' : 'white'}
            borderColor={myRatioNumber === 1 ? 'blue.500' : 'white'}
            borderWidth={1}
            boxSizing='border-box'
            w="fit-content"
            p={2}
            fontWeight={700}
          >
            {activites && activites.length} activité{activites && activites.length > 1 && 's'}
          </Text>
          {statut === 1 && (
            <HStack spacing={2}>
              <Button
                w="fit-content"
                transistion="all ease 300ms"
                _hover={{ bgColor: 'blue.500', color: 'white', transform: 'scale(1.2)' }}
                borderRadius="50%"
                color="blue.500"
                p={1}
                onClick={e => handleClickSetChapterName(e)}
              >
                {nameCanChange ? <Icon as={GiCrossMark} /> : <Icon as={BsPencil} />}
              </Button>
              <Button
                w="fit-content"
                transistion="all ease 300ms"
                _hover={{ bgColor: 'blue.500', color: 'white', transform: 'scale(1.2)' }}
                borderRadius="50%"
                color="red.600"
                p={1}
                onClick={() => handleClickDeleteChapter()}
              >
                <Icon as={FaTrash} />
              </Button>
            </HStack>
          )}
        </HStack>
        {nameCanChange ? (
          <InputGroup>
            <Input type="text" borderWidth={1} borderColor='black' textOverflow='ellipsis' value={nameValue || titre} onChange={e => handleChapterNameChange(e)} />
            <InputRightElement
              children={
                <HStack mr={3}>
                  <Icon as={FaCheck} onClick={() => handleSubmitNameChapter()} />
                </HStack>
              }
            />
          </InputGroup>
        ) : (
          <Text fontWeight={700} onClick={e => handleClick(e)} fontSize={16}>{nameValue && nameValue.length > 1 && nameValue.charAt(0).toUpperCase() + nameValue.slice(1)}</Text>
        )}
      </VStack>
      {myRatioNumber === 1 && (
        <Flex fontSize = {35} position='absolute' bottom = '40px' left='15px' align="center" justify="center" bgColor="blue.500" color="green.300" borderRadius="50%" borderWidth={2} borderColor="green.300">
          <Icon as={HiBadgeCheck} />
        </Flex>
      )}
      <Box w="full">
        <LinearProgresBar
          color={myRatioNumber === 1 ? 'green.300' : 'blue.500'}
          borderColor={myRatioNumber === 1 ? 'white' : 'blue.500'}
          ratio={myRatio}
        />
      </Box>
    </Flex>
  );
};

export default CourseMd;
