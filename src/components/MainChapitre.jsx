import { Button, Heading, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { HiBadgeCheck } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { loadingActions } from '../rtk/features/BearerToken/LoadingSlice';
import fetchAndReloadThemeAndThemeLoaded from '../rtk/myExtraFeatures/fetchAndReloadThemeAndThemeLoaded';
import LinearProgressBar from './LinearProgresBar';
const MainChapitre = ({ ID , themeID }) => {
  const dispatch = useDispatch();
  const navigate = useHistory();
  // const themeID = useSelector(state => state.themeLoaded.id);
  const themes = useSelector(state => state.theme.themes);
  const chapitre =
    Array.isArray(themes) &&
    themeID &&
    themeID > 0 &&
    Array.isArray(themes.filter(t => t.id === parseInt(themeID))[0].chapitres) &&
    themes.filter(t => t.id === parseInt(themeID))[0].chapitres.filter(c => c.id === parseInt(ID))[0];
  // console.log(chapitre);
  const completedActivities = useSelector(state => state.user.completedActivities);
  // const isCompleted = completedActivities && chapitre && completedActivities.includes(chapitre.id);
  const lecons =
    chapitre &&
    Array.isArray(chapitre.parties) &&
    chapitre.parties
      .filter(c => c.genre === 'lecon')
      .map(l => {
        const isCompleted = completedActivities && completedActivities.includes(l.id);
        return (
          <VStack
            w="30%"
            p={5}
            m={2}
            justify="center"
            h={250}
            rounded="md"
            cursor="pointer"
            bgColor={isCompleted ? 'green.100' : 'gray.100'}
            color={isCompleted ? '#252525' : 'black'}
            key={'lecon' + l.id}
            onClick={() => navigate.push('/lecon/?id=' + l.id)}
            fontSize={15}
            justifyContent='space-between'
            minW={238}
            textOverflow='ellipsis'
          >
            <Heading as='h6' fontSize={18} textAlign="center">{l.titre}</Heading>
            <VStack>
              <Text textAlign="justify">{l.preview.length > 150 ? l.preview.substr(0, 147) + '...' : l.preview}</Text>
              <HStack justify="center">
                <Button p={2} margin="0 auto" colorScheme={isCompleted ? 'blackAlpha' : 'blue'}>
                  <HStack justify="center" fontSize={14} w="fit-content">
                    <Text>Lire Plus</Text> <Icon as={FaPlusCircle} />
                  </HStack>
                </Button>
                {isCompleted && <Icon as={HiBadgeCheck} color="green.400" fontSize="40px" />}
              </HStack>
            </VStack>
          </VStack>
        );
      });

  const quizzs =
    chapitre &&
    Array.isArray(chapitre.parties) &&
    chapitre.parties
      .filter(c => c.genre === 'quizz')
      .map(q => {
        const isCompleted = completedActivities && completedActivities.includes(q.id);
        return (
          <VStack
            w="20%"
            p={2}
            m={2}
            justify="center"
            minW="100px"
            maxW="250px"
            key={'quizz' + q.id}
            rounded="lg"
            bgColor={isCompleted ? 'blue.500' : 'gray.200'}
            color={isCompleted ? 'white' : 'black'}
            borderRadius="20px"
          >
            <Link to={'/quizz/?id=' + q.id} >
              <Text textAlign="center">{q.titre}</Text>
            </Link>
          </VStack>
        );
      });
  let myRatio =
    Array.isArray(chapitre.parties) &&
    Array.isArray(completedActivities) &&
    chapitre.parties.filter(p => completedActivities.includes(p.id));
  myRatio = Array.isArray(myRatio) && chapitre.parties.length > 0 ? myRatio.length + '/' + chapitre.parties.length : '0';
  // let myRatioNumber =
  // myRatio && Array.isArray(chapitre.parties) && chapitre.parties.length > 0
  // ? parseFloat(myRatio.length) / parseFloat(chapitre.parties.length)
  // : 0;

  useEffect(() => {
    async function feth() {
      await fetchAndReloadThemeAndThemeLoaded(themeID);
    }
    feth();
    dispatch(loadingActions.set(false));

    // }
  }, [themeID, dispatch]);
  // console.log(myRatioNumber)
  return (
    <VStack position="relative" h="calc(100vh - 42px)" w="full">
      <Text p={3} fontSize={25} fontWeight={700} bgColor="#ffffff45" backdropFilter="blur(6px)" position="sticky" top={0} w="full">
        {chapitre && chapitre.titre}
      </Text>
      <VStack p={2} spacing={5} w="full" overflow="scroll" pb={10}>
        <Text
          color={lecons && lecons.length > 0 ? 'white' : 'black'}
          bgColor={lecons && lecons.length > 0 ? 'blue.500' : 'white'}
          w="full"
          fontSize={20}
          fontWeight={700}
        >
          {lecons && lecons.length > 0 ? 'Lecons' : 'Aucune lecon ici'}
        </Text>
        <HStack wrap="wrap" p={2}>
          {lecons && lecons.length > 0 ? lecons : null}
        </HStack>

        <Text
          color={quizzs && quizzs.length > 0 ? 'white' : 'black'}
          bgColor={quizzs && quizzs.length > 0 ? 'blue.500' : 'white'}
          w="full"
          fontSize={20}
          fontWeight={700}
        >
          {quizzs && quizzs.length > 0 ? 'Quizz' : 'Aucun quizz ici'}
        </Text>
        <HStack wrap="wrap" justify="space-evenly">
          {quizzs}
        </HStack>
      </VStack>
      <HStack justify="center" p={5} h="20px" position="sticky" bottom={5} bgColor="#ffffff45" backdropFilter="blur(3px)" w="full">
        <LinearProgressBar color="blue.500" big={true} bgColor="blue" ratio={myRatio} borderColor="blue.500" />
      </HStack>
    </VStack>
  );
};

export default MainChapitre;
