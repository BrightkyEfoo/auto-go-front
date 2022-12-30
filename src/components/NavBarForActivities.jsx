import { Flex, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { HiBadgeCheck } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { Link /*, useHistory */, useHistory } from 'react-router-dom';
import { loadingActions } from '../rtk/features/BearerToken/LoadingSlice';
// import store from '../rtk/app/Store';
import fetchAndReloadThemeAndThemeLoaded from '../rtk/myExtraFeatures/fetchAndReloadThemeAndThemeLoaded';

const NavBarForActivities = ({ chapitre }) => {
  // const navigate = useHistory()
  // console.log(completedActivities)
  const enCours = useSelector(state => state.chapAndCourseDisplayed.enCours);
  let themeid = useSelector(state => state.pageActivityLoaded.chapitre.ThemeId);
  let completedChapters = useSelector(state => state.user.completedChapters);
  // let completedThemes = useSelector(state => state.user.completedThemes);
  let t = useSelector(state => state.themeLoaded.id);

  const theme = useSelector(state => state.themeLoaded);
  if (chapitre) {
    themeid = t;
  }
  const navigate = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    async function feth() {
      await fetchAndReloadThemeAndThemeLoaded(themeid);
    }
    feth();
    dispatch(loadingActions.set(false));

    // }
  }, [themeid, dispatch]);

  // console.log(theme.id);
  const completedActivities = useSelector(state => state.user.completedActivities);
  // console.log(completedActivities)
  let a =
    theme.id === 0
      ? null
      : theme.chapitres.map(chap => {
          return (
            <VStack w="full" align="start" key={theme.chapitres.indexOf(chap) + '' + chap.id}>
              <HStack
                onClick={() => navigate.push('/chapitre/?id=' + chap.id)}
                position="relative"
                boxSizing="border-box"
                w="full"
                borderWidth={2}
                fontSize={enCours.chapitreId === chap.id ? 16 : 14}
                borderColor={completedChapters.includes(chap.id) ? 'white' :'blue.500'}
                borderBottomColor='white'
                textAlign="center"
                color={completedChapters.includes(chap.id) ? 'white' : enCours.chapitreId === chap.id ? 'blue.500' : 'white'}
                bgColor={completedChapters.includes(chap.id) ? 'green.300' : enCours.chapitreId === chap.id ? 'white' : 'blackAlpha.400'}
                transition="all ease 350ms"
                _hover={{ borderWidth: 2, borderColor: 'white', left: -4, bgColor: 'blue.500', color: 'white' }}
              >
                <HStack>
                  <Text p={2} pl={3} >{chap.titre}</Text>
                  {completedChapters.includes(chap.id) && <Icon as={HiBadgeCheck} />}
                </HStack>
              </HStack>
              <VStack align="start" fontSize={12} w="full">
                {Array.isArray(chap.parties) && chap.parties.filter(p => p.genre === 'lecon').length > 0 && <Text>Lecons</Text>}

                <Flex direction='column' wrap="wrap" w="100%" pl={2} justify="start" align="start">
                  {Array.isArray(chap.parties)
                    ? chap.parties
                        .filter(part => part.genre === 'lecon')
                        .map(lecon => {
                          if (completedActivities.includes(lecon.id)) {
                            return (
                              <Link to={'/lecon/?id=' + lecon.id} key={'lecon' + lecon.id}>
                                <HStack
                                  textAlign="center"
                                  bg={enCours.activiteId === lecon.id ? 'white' : 'blue.500'}
                                  fontSize={enCours.activiteId === lecon.id ? 14 : 12}
                                  color={enCours.activiteId === lecon.id ? 'blue.500' : 'white'}
                                  borderColor="white"
                                  borderWidth={1}
                                  fontWeight={700}
                                  p={1}
                                  rounded="md"
                                  _hover={{
                                    color: enCours.activiteId === lecon.id ? 'blue.500' : 'white',
                                    bgColor: enCours.activiteId === lecon.id ? 'white.500' : 'blue.500',
                                    borderColor: 'white',
                                    borderWidth: 1,
                                  }}
                                  transition="all ease 300ms"
                                  position="relative"
                                >
                                  <HStack>
                                    <Text> {lecon.titre} </Text>
                                    <Icon m={1} position="sticky" top={0} right={0} fontSize={14} as={HiBadgeCheck} color="orange.400" />
                                  </HStack>
                                </HStack>
                              </Link>
                            );
                          } else {
                            return (
                              <Link to={'/lecon/?id=' + lecon.id} key={'lecon' + lecon.id}>
                                <Text
                                  fontSize={enCours.activiteId === lecon.id ? 13 : 12}
                                  m={1}
                                  textAlign="center"
                                  bg={enCours.activiteId === lecon.id ? 'white' : 'blue.500'}
                                  color={enCours.activiteId === lecon.id ? 'blue.500' : 'white'}
                                  fontWeight={700}
                                  borderColor="white"
                                  borderWidth={1}
                                  p={1}
                                  rounded="md"
                                  _hover={{
                                    color: enCours.activiteId === lecon.id ? 'blue.500' : 'white',
                                    bgColor: enCours.activiteId === lecon.id ? 'white' : 'blue.500',
                                    borderColor: 'white',
                                    borderWidth: 1,
                                  }}
                                  transition="all ease 300ms"
                                >
                                  {lecon.titre}
                                </Text>
                              </Link>
                            );
                          }
                        })
                    : null}
                </Flex>

                {Array.isArray(chap.parties) && chap.parties.filter(p => p.genre === 'quizz').length > 0 && (
                  <Text textAlign="center">Quiz</Text>
                )}

                <Flex wrap="wrap" direction='column' w="100%" pl={2} justify="start" align="start">
                  {Array.isArray(chap.parties)
                    ? chap.parties
                        .filter(part => part.genre === 'quizz') //.filter(g => completedActivities.includes(g))
                        .map(quizz => {
                          return (
                            <VStack
                              onClick={() => navigate.push('/quizz/?id=' + quizz.id)}
                              key={'quizz' + quizz.id}
                              fontSize={enCours.activiteId === quizz.id ? 13 : 12}
                              m={1}
                              textAlign="center"
                              bgColor={enCours.activiteId === quizz.id ? 'white' : 'blue.500'}
                              color={enCours.activiteId === quizz.id ? 'blue.500' : 'white'}
                              borderColor="white"
                              borderWidth={1}
                              fontWeight={700}
                              p={1}
                              rounded="md"
                              cursor='pointer'
                              transition="all ease 300ms"
                              position="relative"
                            >
                              <HStack w="full">
                                <Text>{quizz.titre}</Text>
                                {completedActivities.includes(parseInt(quizz.id)) && (
                                  <Icon m={1} fontSize={18} as={HiBadgeCheck} color="orange" position="sticky" top={0} right={0} />
                                )}
                              </HStack>
                            </VStack>
                          );
                        })
                    : null}
                </Flex>
              </VStack>
            </VStack>
          );
        });

  return (
    <VStack maxW={350} h="full" position="sticky" color="white" bgColor="blue.500" align="start" pl={2} pt={2}>
      <Link to={'/theme/?id=' + theme.id}>
        <Text fontSize={18} fontWeight={700} textAlign="center" borderBottomWidth={2} borderBottomStyle="solid" p={1}>
          {theme.nom}
        </Text>
      </Link>
      <VStack
        pl={4}
        pb={70}
        overflowY="scroll"
        align="start"
        fontSize={16}
        w="full"
        // onScroll={(e)=>{
        //   console.log(e.target.getBoundingClientRect())
        //   console.log(e)
        // }}
      >
        {a}
      </VStack>
    </VStack>
  );
};

export default NavBarForActivities;
