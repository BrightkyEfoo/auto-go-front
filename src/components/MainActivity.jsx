import { Box, Button, Icon, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { putActivityCompletedForUserId, putChapterCompletedForUserId } from '../Data';
import { reponsesQuizzActions } from '../rtk/features/BearerToken/reponsesQuizzSlice';
import { UserActions } from '../rtk/features/BearerToken/UserSlice';
import QuizzComponent from './QuizzComponent';

const MainActivity = () => {
  const Themes = useSelector(state => state.theme.themes);
  const activite = useSelector(state => state.pageActivityLoaded);
  const chapitreId = activite.ChapitreId;
  const userId = useSelector(state => state.user.id);
  const themeId = activite && activite.chapitre && activite.chapitre.ThemeId;
  const completedActivities = useSelector(state => state.user.completedActivities);
  const completedChapters = useSelector(state => state.user.completedChapters);
  const quizz = activite.genre === 'quizz' && activite.contenu && JSON.parse(activite.contenu);

  const dispatch = useDispatch();
  console.log('quizz :', quizz);
  useEffect(() => {
    if (activite.genre === 'quizz') {
      dispatch(reponsesQuizzActions.createResponseSheet(quizz.length));
    }
    // return (
    //   ()=>dispatch(reponsesQuizzActions.clearResponse())
    // )
  }, [dispatch, quizz, activite]);

  // useEffect(() => {
  //   document.getElementById('boxx').innerHTML = activite.contenu;
  // }, [activite.contenu]);

  const theme = Themes.filter(th => th.id === themeId)[0];
  const chapitre = theme && Array.isArray(theme.chapitres) && theme.chapitres.filter(chap => chap.id === chapitreId)[0];
  const indexChapitre = chapitre ? theme.chapitres.indexOf(chapitre) : 0;
  let indexChapitreSuivant = 0;

  if (theme && Array.isArray(theme.chapitres)) {
    if (indexChapitre === theme.chapitres.length - 1) {
      indexChapitreSuivant = indexChapitre;
    } else {
      indexChapitreSuivant = indexChapitre + 1;
    }
  }

  const chapitreSuivant = theme && Array.isArray(theme.chapitres) ? theme.chapitres[indexChapitreSuivant] : 0;
  const Token = useSelector(state => state.header.token);
  const activiteIndex =
    theme &&
    chapitre &&
    Array.isArray(chapitre.parties) &&
    chapitre.parties.indexOf(chapitre.parties.filter(partie => partie.id === activite.id)[0]);

  const dernierIndex = chapitre && Array.isArray(chapitre.parties) ? chapitre.parties.length - 1 : 0;
  let indexPartiePrecedente = 0;
  let indexPartieSuivante = 0;

  if (chapitre && Array.isArray(chapitre.parties) && activiteIndex === 0 && chapitre.parties.length === 1) {
    indexPartiePrecedente = 0;
    indexPartieSuivante = 0;
  } else if (activiteIndex === 0) {
    indexPartiePrecedente = 0;
    indexPartieSuivante = activiteIndex + 1;
  } else if (activiteIndex === dernierIndex) {
    indexPartiePrecedente = activiteIndex - 1;
    indexPartieSuivante = dernierIndex;
  } else {
    indexPartiePrecedente = activiteIndex - 1;
    indexPartieSuivante = activiteIndex + 1;
  }
  // console.log('indexPartieSuivante : ', indexPartieSuivante);
  let idActuel = activite && activite.id;
  let idSuivant =
    chapitre && Array.isArray(chapitre.parties) && chapitre.parties[indexPartieSuivante] ? chapitre.parties[indexPartieSuivante].id : 0;
  let idPrecedent =
    chapitre && Array.isArray(chapitre.parties) && chapitre.parties[indexPartiePrecedente] ? chapitre.parties[indexPartiePrecedente].id : 0;

  let activiteSuivante = chapitre && Array.isArray(chapitre.parties) && chapitre.parties.filter(p => p.id === idSuivant)[0];
  let activitePrecedante = chapitre && Array.isArray(chapitre.parties) && chapitre.parties.filter(p => p.id === idPrecedent)[0];
  let isCompleted = completedActivities.includes(idActuel);
  let allPreviousCompleted = 1;

  if (chapitre && Array.isArray(chapitre.parties)) {
    let a = [...chapitre.parties];
    a.pop();
    a.forEach(p => {
      allPreviousCompleted *= completedActivities.includes(p.id);
    });
  }
  let allPreviousCompletedChapters = 1;
  if (theme && Array.isArray(theme.chapitres)) {
    let a = [...theme.chapitres];
    a.pop();
    a.forEach(c => {
      allPreviousCompletedChapters *= completedChapters.includes(c.id);
    });
  }

  const code = useSelector(state => state.reponsesQuizz.code);

  const handleCompleteChapter = () => {
    axios
      .put(
        putChapterCompletedForUserId,
        {
          ChapitreId: chapitre.id,
          userId,
        },
        {
          headers: {
            authorization: Token,
          },
        }
      )
      .then(res => {
        if (res.data.chapter) {
          console.log(res.data.chapter.titre + ' completed succesfully');

          dispatch(UserActions.completeChapterById(res.data.chapter.id));
        } else {
          console.log(res.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleClickCompleted = () => {
    axios
      .put(
        putActivityCompletedForUserId,
        {
          activityId: activite.id,
          userId,
        },
        {
          headers: {
            authorization: Token,
          },
        }
      )
      .then(res => {
        if (res.data.activity) {
          console.log(res.data.activity.titre + ' completed succesfully');
          dispatch(UserActions.completeActivityById(res.data.activity.id));
        } else {
          console.log(res.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <VStack overflow="scroll" w="full" justify="space-between" flexGrow={1} overflowY="scroll" position="relative">
      <VStack pb={35} w="full">
        <Text fontSize={20} pt={5} mb={2} fontWeight={700} position="sticky" bgColor="#ffffff1e" w="full" backdropFilter="blur(5px)">
          {activite.titre}
        </Text>
        <VStack w="full" spacing={5}>
          <Text
            w="90%"
            fontSize={14}
            textAlign="justify"
            borderWidth={1}
            p={5}
            borderBottomColor="gray.500"
            _hover={{ boxShadow: 'inset 0 0 3px 1px #CBD5E0 ' }}
          >
            {activite.preview}
          </Text>
          {activite.genre === 'lecon' && (
            <Box fontSize={14} id="boxx" dangerouslySetInnerHTML={{ __html: activite.contenu }} p={3} w="95%"></Box>
          )}
          {/* c'est dans cette box qu'on injecte le code html de la page */}
          {activite.genre === 'quizz' && <QuizzComponent listeQuestions={JSON.parse(activite.contenu)} />}
        </VStack>
      </VStack>

      <VStack
        h="fit-content"
        position="sticky"
        bottom={10}
        spacing={5}
        w="full"
        bgColor="rgba(255,255,255,0.3)"
        backdropFilter="blur(5px)"
        p={2}
      >
        {(activite.genre === 'lecon' || code === 1 || code === 2) && (
          <BouttonTerminer
            activiteActuelle={activite}
            activiteSuivante={activiteSuivante}
            isCompleted={isCompleted}
            chapSuivant={chapitreSuivant}
            allPreviousCompleted={allPreviousCompleted}
            handleComplete={handleClickCompleted}
            handleCompleteChapter={handleCompleteChapter}
            allPreviousCompletedChapters={allPreviousCompletedChapters}
          />
        )}
        <Box position="absolute" bottom={6} right={6}>
          <BouttonSuivant activiteActuelle={activite} activiteSuivante={activiteSuivante} />
        </Box>
        <Box position="absolute" bottom={6} left={6}>
          <BouttonPrecedant activiteActuelle={activite} activitePrecedante={activitePrecedante} />
        </Box>
      </VStack>
    </VStack>
  );
};

export default MainActivity;

export const BouttonTerminer = ({
  activiteActuelle,
  activiteSuivante,
  isCompleted,
  chapSuivant,
  allPreviousCompleted,
  handleComplete,
  handleCompleteChapter,
  allPreviousCompletedChapters,
}) => {
  const navigate = useHistory();
  // console.log('actuel : ', activiteActuelle);

  // console.log('suivant : ', activiteSuivante);
  // console.log(allPreviousCompleted)
  if (activiteActuelle && activiteSuivante && activiteActuelle.id !== activiteSuivante.id && !isCompleted) {
    const handleClick = activite => {
      handleComplete();
      if (activite.genre === 'lecon') {
        navigate.push('/lecon/?id=' + activite.id);
      } else {
        navigate.push('/quizz/?id=' + activite.id);
      }
    };
    return (
      <Button onClick={() => handleClick(activiteSuivante)}>
        j'ai terminé {activiteActuelle.genre === 'lecon' ? 'cette lecon' : 'ce quizz'} et je passe{' '}
        {activiteSuivante.genre === 'lecon' ? 'à la lecon suivante' : 'au quizz suivant'}
      </Button>
    );
  } else if (activiteActuelle && activiteSuivante && activiteActuelle.id === activiteSuivante.id) {
    if (allPreviousCompleted) {
      const handleClick = () => {
        handleComplete();
        handleCompleteChapter();
        navigate.push(allPreviousCompletedChapters ? '/account/mycourses' : '/chapitre/?id=' + chapSuivant.id);
      };
      if (isCompleted) {
        return null;
      } else {
        return (
          <Button colorScheme="purple" onClick={() => handleClick()}>
            j'ai terminé ce {allPreviousCompletedChapters ? 'theme' : 'chapitre et je passe au chapitre suivant'}
          </Button>
        );
      }
    } else {
      return (
        <Text>
          Vous devez terminer toutes les activites avant de terminer celle ci{' '}
          {allPreviousCompletedChapters ? 'pour finir ce theme' : 'et passer au chapitre suivant'}
        </Text>
      );
    }
  } else {
    return null;
  }
};

export const BouttonSuivant = ({ activiteActuelle, activiteSuivante }) => {
  const navigate = useHistory();
  const hoverBox = useRef(null);
  if (activiteActuelle && activiteSuivante && activiteActuelle.id === activiteSuivante.id) {
    return null;
  } else {
    const handleClick = () => {
      let url = activiteSuivante.genre === 'lecon' ? '/lecon/?id=' : '/quizz/?id=';
      url = url + activiteSuivante.id;
      navigate.push(url);
    };

    return (
      <>
        <Button
          id="next"
          onClick={() => handleClick()}
          colorScheme="blackAlpha"
          bgColor="black"
          color="white"
          p={2}
          borderRadius="full"
          h="fit-content"
          w="fit-content"
          opacity="0.4"
          onMouseOver={() => {
            hoverBox.current.style.visibility = 'visible';
          }}
          onMouseLeave={() => {
            hoverBox.current.style.visibility = 'hidden';
          }}
        >
          <Icon as={FaArrowRight} /*color="blue.200"*/ fontSize={30} />
        </Button>

        <VStack
          bgColor="black"
          fontSize={14}
          opacity="0.4"
          position="relative"
          top={5}
          color="white"
          borderRadius="20px"
          w="fit-content"
          p="8px 30px"
          ref={hoverBox}
          visibility="hidden"
        >
          <Text zIndex={2}>{activiteSuivante && activiteSuivante.titre}</Text>
          <Box position="Absolute" bgColor="black" h={25} w={25} transform="rotate(45deg)" top={-4} left zIndex={1}></Box>
        </VStack>
      </>
    );
  }
};

export const BouttonPrecedant = ({ activiteActuelle, activitePrecedante }) => {
  const navigate = useHistory();
  const hoverBox = useRef(null);
  if (activiteActuelle && activitePrecedante && activiteActuelle.id === activitePrecedante.id) {
    return null;
  } else {
    const handleClick = () => {
      let url = activitePrecedante.genre === 'lecon' ? '/lecon/?id=' : '/quizz/?id=';
      url = url + activitePrecedante.id;
      navigate.push(url);
    };

    return (
      <>
        <Button
          id="next"
          onClick={() => handleClick()}
          colorScheme="blackAlpha"
          bgColor="black"
          color="white"
          p={2}
          borderRadius="full"
          h="fit-content"
          w="fit-content"
          opacity="0.4"
          onMouseOver={() => {
            hoverBox.current.style.visibility = 'visible';
          }}
          onMouseLeave={() => {
            hoverBox.current.style.visibility = 'hidden';
          }}
        >
          <Icon as={FaArrowLeft} /*color="blue.200"*/ fontSize={30} />
        </Button>

        <VStack
          bgColor="black"
          fontSize={14}
          opacity="0.4"
          position="relative"
          top={5}
          color="white"
          borderRadius="20px"
          w="fit-content"
          p="8px 30px"
          ref={hoverBox}
          visibility="hidden"
        >
          <Text zIndex={2}>{activitePrecedante && activitePrecedante.titre}</Text>
          <Box position="Absolute" bgColor="black" h={25} w={25} transform="rotate(45deg)" top={-4} left zIndex={1}></Box>
        </VStack>
      </>
    );
  }
};
