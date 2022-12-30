import { Box, Button, Flex, HStack, Icon, Image, Input, InputGroup, InputRightElement, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import LogOutHelp from '../components/LogOutHelp';
import NavBar from '../components/NavBar';
import { bottomNavBarContainer, fondNoir, mainBoxesStyle } from '../style';
import CourseMd from '../components/CourseMd';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { deleteTheme /*, getChapPart, getThemeChap*/, putSetThemeName } from '../Data';
import { useDispatch, useSelector } from 'react-redux';
// import { ThemeLoadedActions } from '../rtk/features/BearerToken/ThemeLoadedSlice';
import { BsPencil } from 'react-icons/bs';
import {FaCheck, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import AddActivityPopUp from '../components/AddActivityPopUp';
import { DisplayActivityActions } from '../rtk/features/BearerToken/DisplayActivitySlice';
import CoursAppearingBoxe from '../components/CoursAppearingBoxe';
import { GiCrossMark } from 'react-icons/gi';
import fetchAndReloadThemeAndThemeLoaded from '../rtk/myExtraFeatures/fetchAndReloadThemeAndThemeLoaded';
import ThemeImage from '../components/ThemeImage';
// import { loadingActions } from '../rtk/features/BearerToken/LoadingSlice';

const Theme = ({ ID }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(loadingActions.set(false))
    fetchAndReloadThemeAndThemeLoaded(parseInt(ID))
    // dispatch(loadingActions.set(false))
    console.log('fin4')
  }, [ID,dispatch])
  // console.log(ID)
  const Token = useSelector(state => state.header.token);
  
  
  const isDisplayActivityAdd = useSelector(state => state.displayActivity.display);
  const boxToDisplay = useSelector(state => state.boxToDisplay);
  const Id = useSelector(state => state.themeLoaded.id);
  let nom = useSelector(state => state.themeLoaded.nom);
  let img = useSelector(state => state.themeLoaded.img);
  
  let Xhapitres = useSelector(state => state.themeLoaded.chapitres);
  const [canUpdateName, setCanUpdateName] = useState(false);
  const [themeNameValue, setThemeNameValue] = useState(nom);
  const [previousThemeNameValue, setPreviousThemeNameValue] = useState('nom');
  const handleClickThemeNameChange = e => {
    // sur appui de boutton
    setCanUpdateName(!canUpdateName);
    setPreviousThemeNameValue(themeNameValue);
  };
  const handleThemeNameChange = e => {
    // controlleur de la valeur de l'input puor modification de nom de theme
    setThemeNameValue(e.target.value);
  };

  const handleIgnoreModificationsThemeName = () => {
    setCanUpdateName(false);
    setThemeNameValue(previousThemeNameValue);
  };

  const handleDeleteTheme = () => {
    axios.delete(deleteTheme , {
      data : {
        id : ID
      },
      headers : {
        authorization : Token
      }
    } ).then(res=>{
      // console.log(res.data)
      navigate.push('/account')
    }).catch(err => console.log(err))
  }
  const handleSubmitNameTheme = () => {
    if (themeNameValue.lenght < 3) {
      console.log('Bad theme Name entry');
    } else {
      axios
        .put(
          putSetThemeName,
          {
            id: ID,
            nom: themeNameValue,
          },
          {
            headers: {
              authorization: Token,
            },
          }
        )
        .then(res => {
          // console.log(res.data.theme);
        })
        .catch(err => console.log(err.response.data))
        .finally(() => {
          setCanUpdateName(false);
        });
    }
  };
  const navigate = useHistory();
  const handleClickAddActivitie = () => {
    dispatch(DisplayActivityActions.set(true));
  };
  const handleClickPreview = () => {};

  // const handleClickBack = () => {
  //   navigate.goBack();
  // };

  // let url = getThemeChap + ID;
  // useEffect(() => {
  //   axios
  //     .get(url, {
  //       headers: {
  //         authorization: Token,
  //       },
  //     })
  //     .then(response => {
  //       let theme = response.data.theme;
  //       let chapitres = theme.Chapitres;
  //       dispatch(ThemeLoadedActions.set(response.data.theme));
  //       chapitres.forEach(chap => {
  //         axios
  //           .get(getChapPart + chap.id, {
  //             headers: {
  //               authorization: Token,
  //             },
  //           })
  //           .then(ress => {
  //             let parties = ress.data.chap.Parties;
  //             dispatch(ThemeLoadedActions.setPartsById({ chapitreId: chap.id, parties: parties }));
  //           });
  //       });
  //     })
  //     .catch(err => console.log(err));
  // }, [url, Token, dispatch]);

  let tab =
    Xhapitres !== [''] &&
    Xhapitres.map(chap => {
      return (
        <CourseMd
          titre={chap.titre}
          activites={chap.parties}
          img={img}
          id={chap.id}
          ratio={chap.ratio}
          key={'theme' + Id + nom + 'chap' + Xhapitres.indexOf(chap) + chap.titre}
        />
      );
    });


// useEffect(() => {
//   dispatch(loadingActions.set(false))
// }, [dispatch])


  return (
    <>
      {boxToDisplay.click && <CoursAppearingBoxe {...boxToDisplay} />}
          
      {isDisplayActivityAdd && <AddActivityPopUp themeId={ID} />}   {/* ceci est la box qui apparait pour l'ajout de theme */}
      <Box {...mainBoxesStyle('full')}>
        <VStack pt={8} pb={15} justify="space-between" h="calc(100vh - 42px)" bgColor="blue.500">
          
         
          <VStack align="center" justify="space-between" h="100%">
          <Flex
            position="fixed"
            bgImage={'url(' + fondNoir + ')'}
            bgRepeat="no-repeat"
            p={150}
            bgSize="cover"
            top={-250}
            right={-250}
            borderBottomLeftRadius={800}
            zIndex={2}
          >
            <ThemeImage src={img}
            alt={'theme' + Id + nom + 'Image'}
            h={400}
            w={400} themeId={Id}/>
          </Flex>
            <HStack justify="center" color="white" zIndex={3}>
              {canUpdateName ? (
                <InputGroup h='fit-content' >
                  <Input type="text" value={themeNameValue || nom} onChange={e => handleThemeNameChange(e)} w={700} fontSize={25} h='60px'/>
                  <InputRightElement w='fit-content' mt={2} mb={2}
                    children={
                      <HStack mr={3} spacing = {5} m={2}>
                        <Button colorScheme='whiteAlpha' borderRadius='50%' p={2}>
                        <Icon as={FaCheck} onClick={() => handleSubmitNameTheme()} /></Button>
                        <Button colorScheme='blackAlpha' borderRadius='50%' p={2}>
                        <Icon as={GiCrossMark} onClick={() => handleIgnoreModificationsThemeName()} /></Button>
                      </HStack>
                    }
                  />
                </InputGroup>
              ) : (
                <>
                  <Text w="80%">
                    Theme n° {Id}: <span style={{ fontSize: '25px', fontWeight: 900 }}>{themeNameValue || nom}</span>
                  </Text>
                  <Icon as={BsPencil} fontSize={25} onClick={e => handleClickThemeNameChange(e)} />
                </>
              )}
              <Button p={2} borderRadius='50%' colorScheme='red' type='button' onClick={()=>handleDeleteTheme()}><Icon as={FaTrash} /></Button>
            </HStack>
            <Flex wrap="wrap" align="center" justify="center" w="70vw" direction={Xhapitres[0] !== '' ? 'row' : 'column'}>
              {tab && tab.length > 0 && Xhapitres[0] !== '' ? (
                tab
              ) : (
                <Text fontSize={35} fontWeight={700} m={5}>
                  Pas encore de Chapitres ici
                </Text>
              )}
              <Icon
                as={FaPlus}
                cursor="pointer"
                fontSize={70}
                p={2}
                borderRadius="50%"
                bgColor="gray.100"
                color="blue.500"
                onClick={() => handleClickAddActivitie()}
              />
            </Flex>
            <HStack spacing={330}>
              <Button type="button" colorScheme="blackAlpha" fontSize={25} onClick={() => handleClickAddActivitie()}>
                Ajouter un chapitre <Icon as={BsPencil} ml={2} />
              </Button>
              <Link to="/theme?id=1">
                <Button
                  ml={20}
                  type="button"
                  colorScheme="whiteAlpha"
                  color="black"
                  fontSize={25}
                  rounded="lg"
                  onClick={() => handleClickPreview()}
                >
                  Previsualiser ce theme <Icon as={FaSearch} ml={2} />
                </Button>
              </Link>
            </HStack>
          </VStack>
        </VStack>
      </Box>
      <Flex {...bottomNavBarContainer}>
        <NavBar />
      </Flex>
      <LogOutHelp />
    </>
  );
};

export default Theme;
