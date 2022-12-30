import { Box, Heading, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loadingActions } from '../rtk/features/BearerToken/LoadingSlice';
import FormulesPaiement from './FormulesPaiement';
import CoursAppearingBoxe from './CoursAppearingBoxe';
import Course from './Course';

const UserCourses = () => {
  const status = useSelector(state => state.user.status);
  const navigate = useHistory();
  const dispatch = useDispatch();
  const handleMouseOverAdd = () => {
    document.getElementById('createThemeText').style.display = 'Block';
  };
  const handleMouseLeaveAdd = () => {
    document.getElementById('createThemeText').style.display = 'none';
  };
  const boxToDisplay = useSelector(state => state.boxToDisplay);
  // console.log(boxToDisplay);

  const themes = useSelector(state => state.theme.themes);
  useEffect(() => {
    dispatch(loadingActions.set(false));

    return () => {};
  }, [dispatch]);

  const miniTab = themes.map(theme => {
    // console.log(theme.chapitres);
    return (
      <Course
        key={theme.nom + themes.indexOf(theme).toString()}
        numero={themes.indexOf(theme)}
        titre={theme.nom}
        image={theme.img}
        ratio={theme.ratio}
        listeCours={theme.chapitres}
        themeId={theme.id}
      />
    );
  });

  return (
    <Box mt="10px" w="75vw">
      <Box
        className='scrollNone'
        w="full"
        h="100vh"
        pl={7}
        overflowY="scroll"
        scrollBehavior="smooth"
        __css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {boxToDisplay.click && <CoursAppearingBoxe {...boxToDisplay} />}

        {miniTab.length > 0 ? (
          <>
            <Heading m={5} fontSize={25}>
              Toutes vos leçons
            </Heading>
            <VStack align="start" w="full" className='scrollNone'>
              {miniTab}
            </VStack>
          </>
        ) : status === 1 ? (
          <VStack>
            <Text>Vous n'avez encore publié aucun cours</Text>
          </VStack>
        ) : (
          <VStack>
            <Text>Vous n'etes encore inscrit a aucun cours</Text>
            <Text>Vous pouvez des a present vous inscrire a un de nos programmes</Text>
            <HStack>
              <FormulesPaiement
                titre="Wingo PREMIUM"
                bgColor="blue.500"
                color="white"
                code={1}
                prix="18.500"
                duree="03/mois"
                composant={
                  <VStack>
                    <Text>Acces au labo AUTO-GO</Text>
                    <Text>Acces a tous les modules d'examens</Text>
                    <Text>Acces aux corrections et explications</Text>
                    <Text>Acces via la communauté</Text>
                  </VStack>
                }
              />

              <FormulesPaiement
                code={2}
                titre="Wingo SPEED"
                bgColor="blackAlpha.500"
                color="white"
                prix="12.500"
                duree="02/mois"
                composant={
                  <VStack>
                    <Text>Acces au labo AUTO-GO</Text>
                    <Text>Acces a tous les modules d'examens</Text>
                    <Text>Acces aux corrections et explications</Text>
                    <Text>Acces via la communauté</Text>
                  </VStack>
                }
              />
            </HStack>
          </VStack>
        )}
      </Box>
      {status === 1 && (
        <HStack
          spacing={0}
          color="white"
          position="fixed"
          bottom="10px"
          right="180px"
          bgColor="blue.500"
          borderRadius={50}
          p={4}
          zIndex={10}
          transition="all ease 350ms"
          onMouseOver={() => handleMouseOverAdd()}
          onMouseLeave={() => handleMouseLeaveAdd()}
          onClick={() => {
            dispatch(loadingActions.set(true));
            navigate.push('/createtheme');
          }}
        >
          <Text cursor="pointer" id="createThemeText" display="none" transition="all ease 350ms">
            Creer un theme
          </Text>
          <Icon as={FaPlus} p={2} m={0} fontSize={40} bgColor="blue.500" borderRadius="50%" />
        </HStack>
      )}
    </Box>
  );
};

export default UserCourses;
