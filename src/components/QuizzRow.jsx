import { Button, Flex, HStack, Icon, Input, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { BsPencil } from 'react-icons/bs';
import { FaArrowRight, FaCheck, FaTrashAlt } from 'react-icons/fa';
import { GiCrossMark } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { deleteActivity, putSetActivityName } from '../Data';
import { BoxToDisplayActions } from '../rtk/features/BearerToken/BoxToDisplaySlice';
import fetchAndReloadThemeAndThemeLoaded from '../rtk/myExtraFeatures/fetchAndReloadThemeAndThemeLoaded';

const QuizzRow = ({ titre, numberOfQuestions, isCompleted, ID }) => {
  const navigate = useHistory();
  const dispatch = useDispatch();
  const [canChangeActivityName, setCanChangeActivityName] = useState(false);
  const [previousActivityName, setPreviousActivityName] = useState(titre);
  const [activityName, setActivityName] = useState(titre);
  const statut = useSelector(state => state.user.status);
  const Token = useSelector(state => state.header.token);
  const themeLoadedId = useSelector(state => state.boxToDisplay.themeId);
  const handleChangeActivityName = id => {
    if (canChangeActivityName) {
      setCanChangeActivityName(false);
      setActivityName(previousActivityName);
    } else {
      setCanChangeActivityName(true);
      setPreviousActivityName(activityName);
    }

    // putSetActivityName
  };

  const HandleOnChangeActivityName = e => {
    setActivityName(e.target.value);
  };

  const handleParentClick = e => {
    console.log(e.target.classList); //.contains('QuizRowButton'))
    if (!e.target.classList.contains('QuizRowButton')) {
      navigate.push('/quizz/?id=' + ID);
    }
  };

  const handleSubmitActivityName = () => {
    axios
      .put(
        putSetActivityName,
        { id: ID, titre: activityName },
        {
          headers: {
            authorization: Token,
          },
        }
      )
      .then(res => {
        let id = res.data.partie.id;
        let titre = res.data.partie.titre;
        console.log(res.data);
        dispatch(BoxToDisplayActions.setActivityNameById({ id, titre }));
      })
      .catch(err => console.log(err))
      .finally(() => {
        setCanChangeActivityName(false);
      });
  };
  const handleDeleteActivity = id => {
    axios
      .delete(deleteActivity, {
        data: { id: id },
        headers: {
          authorization: Token,
        },
      })
      .then(res => {
        console.log(res.data);
        dispatch(BoxToDisplayActions.removeActivityById(id));
        fetchAndReloadThemeAndThemeLoaded(themeLoadedId);
        console.log(themeLoadedId);
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  // const handleClick = () => {
  //   navigate.push('/quizz/?id=' + ID);
  // };
  return (
    <HStack
      cursor="pointer"
      justify="space-between"
      bgColor={isCompleted === 1 ? 'blue.500' : 'gray.200'}
      color={isCompleted === 1 ? 'white' : 'black'}
      rounded="lg"
      w="225px"
      m={2}
      h="112.5px"
      p={2}
      onClick={e => handleParentClick(e)}
      spacing={2}
    >
      <VStack textAlign="start" h="full" justify="space-between" align="start" w="100%">
        <HStack justify="space-between" w="100%" h="50%" align="center">
          <Link to={'/quizz/?id=' + ID}>
            <Text fontSize={18} fontWeight={700}>
              {titre}
            </Text>
          </Link>
          {statut === 1 && (
            <HStack spacing={2}>
              {canChangeActivityName ? (
                <Button
                  className="QuizRowButton"
                  colorScheme="whiteAlpha"
                  color="blackAlpha.600"
                  borderRadius="50%"
                  p={1}
                  onClick={() => handleChangeActivityName()}
                >
                  <Icon className="QuizRowButton" as={GiCrossMark} />
                </Button>
              ) : (
                <Button className="QuizRowButton" colorScheme="blue" borderRadius="50%" p={1} onClick={() => handleChangeActivityName()}>
                  <Icon className="QuizRowButton" as={BsPencil} />
                </Button>
              )}
              <Button className="QuizRowButton" colorScheme="blackAlpha" borderRadius="50%" p={1} onClick={() => handleDeleteActivity(ID)}>
                <Icon className="QuizRowButton" as={FaTrashAlt} />
              </Button>
            </HStack>
          )}
        </HStack>

        {canChangeActivityName && (
          <Flex>
            <Input type="text" value={activityName} onChange={e => HandleOnChangeActivityName(e)} />
            <Flex>
              <Button className="QuizRowButton" borderRadius="50%" p={1} colorScheme="gray" onClick={() => handleSubmitActivityName()}>
                <Icon className="QuizRowButton" as={FaCheck} size="sm" />
              </Button>
            </Flex>
          </Flex>
        )}

        <VStack fontSize={18}>
          {numberOfQuestions ? (
            <Text>
              <em>
                {numberOfQuestions} question{numberOfQuestions > 1 && 's'}
              </em>
            </Text>
          ) : (
            <Text>
              <em>Aucune question !!</em>
            </Text>
          )}
        </VStack>
      </VStack>
      <Button
        /*className = 'QuizRowButton'  onClick={() => handleClick()} */ position="relative"
        left={4}
        borderWidth={4}
        borderColor="gray.200"
      >
        <Icon
          /*className = 'QuizRowButton'*/ as={isCompleted === 1 ? FaCheck : FaArrowRight}
          transition="all ease 350ms"
          _hover={{ transform: 'scale(1.5)' }}
        />
      </Button>
    </HStack>
  );
};

export default QuizzRow;
