import { Box, Heading, HStack, Icon, Text, VStack, InputGroup, Input, InputRightElement, Button } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { FaCheck, FaPencilAlt, FaPlus, FaTrash } from 'react-icons/fa';
import { GiCrossMark } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteTheme, putSetThemeName } from '../Data';
import { BoxToDisplayActions } from '../rtk/features/BearerToken/BoxToDisplaySlice';
import { DisplayActivityActions } from '../rtk/features/BearerToken/DisplayActivitySlice';
import { loadingActions } from '../rtk/features/BearerToken/LoadingSlice';
import { ThemeActions } from '../rtk/features/BearerToken/ThemesSlice';
import AddActivityPopUp from './AddActivityPopUp';
import CourseMd from './CourseMd';
import ThemeImage from './ThemeImage';
const Course = ({ themeId, numero, titre, image, listeCours, ratio }) => {
  //listeCours doit etre un tableau d'objets contenant chacuns un titre
  // une liste de parties et une liste d'activites
  // chaque activite est un objet qui contient doit contenir un titre un genre et un status
  const dispatch = useDispatch();
  // const navigate = useHistory()

  const popUpCanDisplay = useSelector(state => state.displayActivity.display);
  const clicked = useSelector(state => state.boxToDisplay.click);
  const [canSetThemeName, setCanSetThemeName] = useState(false);
  const [themeName, setThemeName] = useState(titre);
  const [previousName, setPreviousName] = useState(titre);
  const Token = useSelector(state => state.header.token);
  const statut = useSelector(state => state.user.status)
  const handleClickModifyThemeName = () => {
    if (canSetThemeName) {
      setThemeName(previousName);
      setCanSetThemeName(false);
    } else {
      setPreviousName(themeName);
      setCanSetThemeName(true);
    }
  };
  const handleChangeThemeName = e => {
    setThemeName(e.target.value);
  };
  const handleGetOut = () => {
    if (clicked) {
      console.log('clickSortie');
      dispatch(BoxToDisplayActions.clear());
    }
  };

  const handleSubmitName = () => {
    dispatch(loadingActions.set(true))
    axios
      .put(
        putSetThemeName,
        {
          id: themeId,
          nom: themeName,
        },
        {
          headers: {
            authorization: Token,
          },
        }
      )
      .then(res => {
        dispatch(
          ThemeActions.setThemeNameById({
            themeId: themeId,
            nom: themeName,
          })
        );
      })
      .catch(err => {
        console.log(err.response.data.message);
        setThemeName(previousName);
      })
      .finally(() => {
        setCanSetThemeName(false);
        dispatch(loadingActions.set(false))
      });
  };

  const handleDelete = () => {
    axios
      .delete(deleteTheme, {
        data: { id: themeId },
        headers: {
          authorization: Token,
        },
      })
      .then(res => {
        dispatch(ThemeActions.deleteThemeById(themeId));
      });
  };

  const tab =
    Array.isArray(listeCours) &&
    listeCours.map(cours => {
      return (
        <CourseMd
          titre={cours.titre}
          themeId={themeId}
          id={cours.id}
          activites={cours.parties}
          img={image}
          ratio={ratio}
          key={cours.titre + listeCours.indexOf(cours)}
        />
      );
    });


    const handleClickAddActivitie = () => {
      dispatch(DisplayActivityActions.set(true));
    };

  const status = useSelector(state => state.user.status);
  return (
    <VStack align="start" w="full" onClick={() => handleGetOut()}>
      <HStack spacing={10} w="full">
        <ThemeImage src={image} alt={titre} h={75} w={75} themeId = {themeId} />
        <Box textAlign="start">
          <HStack justify="space-between">
            <Link to={'/theme/?id=' + themeId} onClick={()=>dispatch(loadingActions.set(true))}>
              <Text fontSize={14} >Theme n° {themeId}</Text>
            </Link>
            {status === 1 && (
              <HStack spacing={4} fontSize={18}>
                {canSetThemeName ? (
                  <Icon as={GiCrossMark} color="blue.500" cursor="pointer" onClick={() => handleClickModifyThemeName()} />
                ) : (
                  <Icon as={FaPencilAlt} color="blue.500" cursor="pointer" onClick={() => handleClickModifyThemeName()} />
                )}
                <Icon as={FaTrash} cursor="pointer" color="red.500" onClick={() => handleDelete()} />
              </HStack>
            )}
          </HStack>
          {canSetThemeName ? (
            <InputGroup>
              <Input type="text" value={themeName} w={600} onChange={e => handleChangeThemeName(e)} />
              <InputRightElement children={<Icon as={FaCheck} color="blue.500" onClick={() => handleSubmitName()} />} />
            </InputGroup>
          ) : (
            <Link to={'/theme/?id=' + themeId} onClick={()=>dispatch(loadingActions.set(true))} >
              <Heading as='h3' fontSize={26} >{themeName}</Heading>
            </Link>
          )}
        </Box>
      </HStack>
      <HStack
        position='relative'
        mr={3}
        h={300}
        w="100%"
        overflowX="scroll"
        scrollBehavior="smooth"
        className='scrollNone'
        __css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
        
      >
        {tab ? (
          <>
            {tab}
            {statut ? 
            <Button position='sticky' right = {0} flexShrink={0} h="fit-content" w="fit-content" borderRadius="50%" p={3} colorScheme="blackAlpha" onClick={() => handleClickAddActivitie()}>
              <Icon as={FaPlus} w={5} h={5} />
            </Button> : null}
          </>
        ) : (
          <VStack fontSize={15}>
            <Text>{statut ? 'Ajoutez un chapitre' : 'Ce theme est actuellement en travaux'}</Text>
          </VStack>
        )}
      </HStack>
      {themeId && popUpCanDisplay && <AddActivityPopUp themeId={themeId} />}
    </VStack>
  );
};

export default Course;
