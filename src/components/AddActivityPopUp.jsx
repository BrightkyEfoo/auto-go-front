import { Box, Button, Flex, HStack, Icon, Input, Text, Textarea, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { BACKEND_URL, getChapPart, getThemeChap, postCreateAndAddChapToTheme, postCreateAndAddPartToChap } from '../Data';
import { DisplayActivityActions } from '../rtk/features/BearerToken/DisplayActivitySlice';
import { ThemeLoadedActions } from '../rtk/features/BearerToken/ThemeLoadedSlice';
import fetchAndReloadThemeAndThemeLoaded from '../rtk/myExtraFeatures/fetchAndReloadThemeAndThemeLoaded';
import './styleEditor.css';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { useHistory } from 'react-router-dom';
import QuizzForm from './QuizzForm';
import { loadingActions } from '../rtk/features/BearerToken/LoadingSlice';
import { reponsesQuizzActions } from '../rtk/features/BearerToken/reponsesQuizzSlice';

const AddActivityPopUp = ({ themeId }) => {

  const dispatch = useDispatch();
  const listeQuestions = useSelector(state => state.quizzForm.listeQuestions);
  const [genre, setGenre] = useState('quizz');
  const Token = useSelector(state => state.header.token);
  const page = useSelector(state => state.displayActivity.page);
  const [state, setState] = useState({
    genre: '',
    preview: '',
    contenu: '',
    chapitreTitre: '',
    activiteTitre: '',
    themeId: themeId,
  });

  const [contentState, setContentState] = useState('');
  const handleChange = {
    genre: e => {
      setState({ ...state, genre: e.target.value });
    },
    preview: e => {
      setState({ ...state, preview: e.target.value });
    },
    // contenu: e => {
    //   setState({ ...state, contenu: e.target.value });
    // },
    chapitreTitre: e => {
      setState({ ...state, chapitreTitre: e.target.value });
    },
    activiteTitre: e => {
      setState({ ...state, activiteTitre: e.target.value });
    },
  };

  const uploadHandler = (e,a,c)=>{
    console.log({e,a,c})
  }
  const history = useHistory();
  useEffect(() => {
    // clear alert on location change
    const unlisten = history.listen(() => DisplayActivityActions.set(false));
    dispatch(loadingActions.set(false));
    // stop the listener when component unmounts
    return unlisten;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  const onImageUploadBefore =  (file, info, uploadHandler , core) => {
    console.log("file: ", file[0]);
    const fd = new FormData();
    fd.append('file', file[0]);
    // const token = sessionStorage.getItem("token");
    // let formData = new FormData();
    // formData.append('submitProfile', e.target.files[0]);
    
    const config = {
        headers: {
        authorization: Token,
    }
  }

    const url = `${BACKEND_URL}/api/picture/lecon`;

    axios.post(url, fd, config)
        .then((res) => {
            console.log(res);
            const response = {
                "result" : [
                    {
                        "url" : res.data.url,
                        "name" : res.data.name,
                    }
                ]
            }
            return uploadHandler(response);
        })
        // .catch(function () {
        //     alert("Something went wrong!")
        // });
}
  const handleClick = {
    ok: () => {
      dispatch(DisplayActivityActions.goForward());
    },
    back: () => {
      dispatch(DisplayActivityActions.goBack());
    },
    submit: () => {
      console.log(state);
      let dataPost = {
        chapitreTitre: state.chapitreTitre,
        themeId: themeId,
      };
      console.log({dataPost});
      axios
        .post(postCreateAndAddChapToTheme, dataPost, {
          headers: {
            authorization: Token,
          },
        })
        .then(res => {
          dispatch(loadingActions.set(true));
          console.log(res.data);
          let chapitreId = res.data.chap.id;
          let listeQuestionJson = JSON.stringify(listeQuestions)
          console.log('listeQuestion avant : ',listeQuestions)
          console.log('listeQuestion apres en JSON : ',listeQuestionJson)
          let postData1 = {
            chapitreId,
            activiteTitre: state.activiteTitre,
            contenu: genre === 'quizz' ? listeQuestionJson : contentState,
            genre: genre,
            preview: state.preview,
          };
          // console.log('========================================');
          // console.log({ postData1 });
          // console.log('========================================');
          axios
            .post(postCreateAndAddPartToChap, postData1, {
              headers: {
                authorization: Token,
              },
            })
            .then(res => {
              console.log(res.data);
            });
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          let url = getThemeChap + themeId;
          axios
            .get(url, {
              headers: {
                authorization: Token,
              },
            })
            .then(response => {
              let theme = response.data.theme;
              let chapitres = theme.Chapitres;
              dispatch(ThemeLoadedActions.set(response.data.theme));
              chapitres.forEach(chap => {
                axios
                  .get(getChapPart + chap.id, {
                    headers: {
                      authorization: Token,
                    },
                  })
                  .then(ress => {
                    let parties = ress.data.chap.Parties;
                    dispatch(ThemeLoadedActions.setPartsById({ chapitreId: chap.id, parties: parties }));
                  });
              });
            })
            .catch(err => console.log(err))
            .finally(() => {
              fetchAndReloadThemeAndThemeLoaded(themeId);
              dispatch(DisplayActivityActions.goTo(0));
              dispatch(DisplayActivityActions.set(false));
              dispatch(reponsesQuizzActions.clearResponse())
              dispatch(loadingActions.set(false));
            });
        });
    },
  };

  const handleGetOut = e => {
    if (e.currentTarget === e.target) {
      dispatch(reponsesQuizzActions.clearResponse())
      dispatch(DisplayActivityActions.set(false));
    }
  };

  const handleChang = e => {
    setContentState(e);
    console.log(contentState);
  };
  let tabFormulaire = [
    // premiere page
    <VStack
      h="fit-content"
      maxH="80vh"
      w="fit-content"
      id="ActivityAddPop2"
      p={3}
      justify="center"
      bgColor="white"
      rounded="2xl"
      spacing={3}
      overflowY="scroll"
    >
      <Text fontSize={28}>Il faut donc un nouveau chapitre ?</Text>
      <Text fontSize={25}>Quel sera le titre de ce nouveau chapitre</Text>
      <Input type="text" value={state.chapitreTitre} onChange={e => handleChange.chapitreTitre(e)} />
      <VStack w="full">
        <Text fontSize={20}>Veuillez saisir un commentaire</Text>
        <Textarea h={50} w="full" value={state.preview} onChange={e => handleChange.preview(e)}></Textarea>
      </VStack>
      <Button
        type="button"
        colorScheme="blue"
        bgColor="blue.500"
        rounded="xl"
        fontSize={25}
        fontWeight={700}
        onClick={() => handleClick.ok()}
      >
        OK
      </Button>
    </VStack>,

    // deuxieme partie
    <VStack h='600px' w='fit-content' position = 'relative' bgColor="white" spacing = {0} rounded="2xl" pt={5} pb={10}>
      <HStack id="ActivityAddPop2" p={5} justify="space-between" >
        <Icon as={FaArrowLeft} position=" absolute " bottom={7} left={10} onClick={() => handleClick.back()} />

        <HStack>
          <VStack>
            <Text fontSize={20}>Quel est le titre de cette partie</Text>
            <Input type="text" value={state.activiteTitre} onChange={e => handleChange.activiteTitre(e)}></Input>

            <Text fontSize={16}>De quel type est cette activite ?</Text>

            <HStack justify="center" spacing={70}>
              <VStack onClick={() => setGenre('quizz')}>
                <Text>Quizz</Text>
                <HStack h={9} w={9} borderWidth={2} bgColor="white" justify="center" borderRadius="50%">
                  <Box bgColor={genre === 'quizz' ? 'blue.500' : 'white'} h={6} w={6} borderRadius="50%"></Box>
                </HStack>
              </VStack>
              <VStack onClick={() => setGenre('lecon')}>
                <Text>Lecon</Text>
                <HStack h={9} w={9} borderWidth={2} bgColor="white" justify="center" borderRadius="50%">
                  <Box bgColor={genre === 'lecon' ? 'blue.500' : 'white'} h={6} w={6} borderRadius="50%"></Box>
                </HStack>
              </VStack>
            </HStack>
          </VStack>

          <VStack >
            {genre === 'quizz' ? (
              <QuizzForm />
            ) : (
              <SunEditor
                onChange={handleChang}
                imageUploadHandler = {uploadHandler}
                width="600px"
                height="370px"
                onImageUploadBefore={onImageUploadBefore}
                setOptions={{
                  buttonList: [
                    [
                      'blockquote',
                      /** Submenu */
                      'align',

                      'font',
                      'fontColor',
                      'fontSize',

                      'formatBlock',
                      'hiliteColor',
                      'horizontalRule',
                      'lineHeight',
                      'list',
                    ],
                    [
                      'paragraphStyle',
                      'table',
                      'template',
                      'textStyle',
                      /** Dialog */
                      'image',
                      'link',
                      'video',
                      'audio',
                    ],
                  ], // Or Array of button list, eg. [['font', 'align'], ['image']]
                  // plugins: [font] set plugins, all plugins are set by default
                  // Other option
                }}
              />
            )}
          </VStack>
        </HStack>
      </HStack>
      <Button
        type="button"
        colorScheme="blue"
        bgColor="blue.500"
        rounded="xl"
        fontSize={25}
        fontWeight={700}
        onClick={() => handleClick.submit()}
      >
        Valider
      </Button>
    </VStack>,
  ];

  return (
    <Flex
      align="center"
      justify="center"
      h="100vh"
      w="100vw"
      position="fixed"
      top={0}
      right="0"
      bgColor="rgba(0,0,0,0.3)"
      backdropFilter={'blur(5px)'}
      onClick={e => handleGetOut(e)}
      zIndex={5}
      overflowY="scroll"
    >
      {tabFormulaire[page]}
    </Flex>
  );
};

export default AddActivityPopUp;

export const ErrorMessage = ({ message }) => {
  return (
    <Box fontSize={15} color="red.500">
      {message}
    </Box>
  );
};
