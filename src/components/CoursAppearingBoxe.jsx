import { Button, Flex, Heading, HStack, Icon, Image, Text, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { BsConeStriped, BsFillBookmarksFill } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import { BoxToDisplayActions } from '../rtk/features/BearerToken/BoxToDisplaySlice';
import { loadingActions } from '../rtk/features/BearerToken/LoadingSlice';
import AppearingAddActivity from './AppearingAddActivity';
import LeconRaw from './LeconRaw';
import QuizzRow from './QuizzRow';

const CoursAppearingBoxe = ({ themeId, chapitreId, titre, activites, img }) => {
  const addActivityClick = useSelector(state => state.boxToDisplay.clickForAddActivity);
  const statut = useSelector(state => state.user.status);
  // const chapitreId = useSelector(state => state.boxToDisplay.chapitreId)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadingActions.set(false));
  }, [dispatch]);

  const handleGetOut = e => {
    if (e.target === e.currentTarget) {
      dispatch(BoxToDisplayActions.clear());
      console.log('click');
    }
  };

  let quizzTable = activites && activites.filter(activite => activite.genre === 'quizz');

  if (Array.isArray(quizzTable)) {
    quizzTable = quizzTable.map(quizz => {
      return (
        <QuizzRow
          key={titre + 'quiz' + activites.indexOf(quizz)}
          titre={quizz.titre}
          numberOfQuestions={JSON.parse(quizz.contenu).length}
          isCompleted={quizz.isCompleted}
          ID={quizz.id}
        />
      );
    });
  } else {
    quizzTable = [];
  }

  let leconTable = activites && activites.filter(activite => activite.genre === 'lecon');
  if (Array.isArray(leconTable)) {
    leconTable = leconTable.map(lecon => {
      return <LeconRaw key={'lecon' + leconTable.indexOf(lecon)} lecon={lecon} titre={titre} activites={activites} />;
    });
  } else {
    leconTable = [];
  }

  // let dataPost = {
  //   chapitreId,
  //   activiteTitre : '',
  //   contenu : '',
  //   genre : '',
  //   preview : ''
  // }

  const handleClickAddActivitie = () => {
    dispatch(BoxToDisplayActions.setClickAddActivity(true));
  };
  const history = useHistory();
  useEffect(() => {
    // clear alert on location change
    const unlisten = history.listen(() => dispatch(BoxToDisplayActions.clear()));

    // stop the listener when component unmounts
    return unlisten;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex
      cursor="default"
      backdropFilter="blur(7px)"
      zIndex={100}
      bgColor="rgba(0,0,0,0.3)"
      align="center"
      position="fixed"
      top="0"
      right="0"
      justify="center"
      h="100vh"
      w="100vw"
      onClick={e => handleGetOut(e)}
    >
      <Flex
        id="BoxAppearing"
        direction="column"
        overflowY="scroll"
        align="center"
        bgColor="gray.100"
        h="80vh"
        w="70vw"
        p={0}
        pl={5}
        pr={5}
        pb={5}
        rounded="3xl"
        css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
        position="relative"
      >
        {addActivityClick ? <AppearingAddActivity chapitreId={chapitreId} themeId={themeId} /> : null}
        {statut && !(leconTable.length === 0 && quizzTable.length === 0) ? (
          <Flex
            position="absolute"
            top={0}
            right={0}
            h={180}
            w={180}
            borderBottomLeftRadius="100%"
            bgColor="blue.500"
            justify="flex-end"
            align="start"
            p="4%"
            transistion="all ease 500ms"
            _hover={{ bgColor: 'rgba(0,0,0.3)', backdropFilter: 'blur(5px)', color: 'white' }}
            onClick={() => handleClickAddActivitie()}
          >
            <Button
              h="fit-content"
              w="fit-content"
              borderRadius="50%"
              p={4}
              colorScheme="gray" /*onClick={() => handleClickAddActivitie()}*/
            >
              <Icon as={FaPlus} w={7} h={7} />
            </Button>
          </Flex>
        ):null}
        <Image mt={1} w="65%" h={112} src={img} objectFit="contain" />
        <Link to={'/chapitre/?id=' + chapitreId} onClick={() => dispatch(loadingActions.set(true))}>
          <Heading onClick={() => dispatch(loadingActions.set(true))} m={3} fontSize={35}>
            {titre}
          </Heading>
        </Link>
        {Array.isArray(quizzTable) && quizzTable.length > 0 ? (
          <VStack align="start" w="70vw" pl={3} pr={3} mb={4}>
            <HStack fontSize={25} justify="start">
              <Icon as={BsConeStriped} />
              <Heading fontSize={25}>Quizz</Heading>
            </HStack>
            <Flex wrap="wrap" w="100%" justify="start">
              {quizzTable}
            </Flex>
          </VStack>
        ) : null}
        {Array.isArray(leconTable) && leconTable.length > 0 ? (
          <VStack mt={Array.isArray(quizzTable) && quizzTable.length > 0 ? 5 : 0} align="start" w="70vw" pl={5} pr={5}>
            <HStack fontSize={25} justify="start">
              <Icon as={BsFillBookmarksFill} />
              <Heading fontSize={25}>Lecons Et Excercices</Heading>
            </HStack>
            <Flex justifyContent="space-between" w="100%" wrap="wrap" justify="start">
              {leconTable}
            </Flex>
          </VStack>
        ) : null}
        {leconTable.length === 0 && quizzTable.length === 0 ? (
          <VStack fontSize={25}>
            <Text> Aucune activite ici </Text>
            {statut === 1 ? (
              <Button colorScheme="blue" bgColor="blue.500" type="button" p={3} onClick={() => handleClickAddActivitie()}>
                <HStack spacing={3}>
                  <Icon as={FaPlus} /> <Text>Ajouter une activité</Text>
                </HStack>
              </Button>
            ) : null}
          </VStack>
        ) : null}
      </Flex>
    </Flex>
  );
};

export default CoursAppearingBoxe;
