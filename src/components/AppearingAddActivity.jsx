import { Box, Button, Flex, FormControl, FormLabel, HStack, Input, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { BACKEND_URL, getChapPart, postCreateAndAddPartToChap } from '../Data';
import { BoxToDisplayActions } from '../rtk/features/BearerToken/BoxToDisplaySlice';
import { quizzFormActions } from '../rtk/features/BearerToken/QuizzFormSlice';
import fetchAndReloadThemeAndThemeLoaded from '../rtk/myExtraFeatures/fetchAndReloadThemeAndThemeLoaded';
import QuizzForm from './QuizzForm';
import './styleEditor.css';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { loadingActions } from '../rtk/features/BearerToken/LoadingSlice';
import { reponsesQuizzActions } from '../rtk/features/BearerToken/reponsesQuizzSlice';

const AppearingAddActivity = ({ chapitreId, themeId }) => {
  const [textAreaValue, setTextAreaValue] = useState('');
  const Token = useSelector(state => state.header.token);
  const themeImg = useSelector(state => state.boxToDisplay.img);
  const dispatch = useDispatch();
  const handleChange = e => {
    setTextAreaValue(e);
  };
  const listeQuestions = useSelector(state => state.quizzForm.listeQuestions);
  const [genre, setGenre] = useState('quizz');

  const formik = useFormik({
    initialValues: {
      titre: '',
      preview: '',
    },
    onSubmit: values => {
      // dispatch(loadingActions.set(false));
      let postData = {
        preview : values.preview,
        chapitreId,
        genre: genre,
        activiteTitre: values.titre,
        contenu: genre === 'lecon' ? textAreaValue : JSON.stringify(listeQuestions),
      };
      console.log(postData);
      axios
        .post(postCreateAndAddPartToChap, postData, {
          headers: {
            authorization: Token,
          },
        })
        .then(res => {
          fetchAndReloadThemeAndThemeLoaded(themeId);
          console.log(res.data);
          // dispatch(BoxToDisplayActions.set({ titre, activites, img , id }));
        })
        .catch(err => console.log(err))
        .finally(() => {
          axios
            .get(getChapPart + chapitreId, {
              headers: {
                authorization: Token,
              },
            })
            .then(res => {
              let dataToDispatch = {
                id: res.data.chap.id,
                titre: res.data.chap.titre,
                activites: res.data.chap.Parties,
                img: themeImg,
              };
              dispatch(BoxToDisplayActions.set(dataToDispatch));
            });
            dispatch(quizzFormActions.clear())
          dispatch(BoxToDisplayActions.setClickAddActivity(false));
          dispatch(loadingActions.set(false));
        });
    },
  });


  const navigate = useHistory();
  useEffect(() => {
    // clear alert on location change
    const unlisten = navigate.listen(() => {
      BoxToDisplayActions.setClickAddActivity(false);
      dispatch(reponsesQuizzActions.clearResponse());
    });
    // stop the listener when component unmounts
    return unlisten;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

// const onVideoUploadBefore =  (file, info, uploadHandler , core) => {
//   console.log("file: ", file[0]);
//   const fd = new FormData();
//   fd.append('file', file[0]);
//   // const token = sessionStorage.getItem("token");
//   // let formData = new FormData();
//   // formData.append('submitProfile', e.target.files[0]);
  
//   const config = {
//       headers: {
//       authorization: Token,
//   }
// }

//   const url = 'https://autogoback237.herokuapp.com/api/video/lecon';

//   axios.post(url, fd, config)
//       .then((res) => {
//           console.log(res);
//           const response = {
//               "result" : [
//                   {
//                       "url" : res.data.url,
//                       "name" : res.data.name,
//                   }
//               ]
//           }
//           return uploadHandler(response);
//       })
//       // .catch(function () {
//       //     alert("Something went wrong!")
//       // });
// }

  const handleGetOut = e => {
    if (e.target === e.currentTarget) {
      dispatch(reponsesQuizzActions.clearResponse());
      dispatch(quizzFormActions.clear());
      dispatch(BoxToDisplayActions.setClickAddActivity(false));
    }
  };
  
  return (
    <Flex
    boxSizing='border-box'
      w="100vw"
      h="100vh"
      bgColor="rgba(0,0,0,0.3)"
      position="fixed"
      top={0}
      left={0}
      backdropFilter="blur(5px)"
      align="center"
      justify="center"
      onClick={e => handleGetOut(e)}
      zIndex={15}
    >
      <Flex h="70vh" p={6} borderRadius="25px" bgColor="white">
        <form
          onSubmit={e => {
            e.preventDefault();
            return formik.handleSubmit();
          }}
          style={{ height: '100%' }}
        >
          <HStack m={2} p={0} h="100%" position="relative">
            <VStack h="full">
              <FormControl isRequired>
                <FormLabel htmlFor="titre">titre</FormLabel>
                <Input type="text" id="titre" name="titre" onChange={formik.handleChange} value={formik.values.titre} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="preview">preview</FormLabel>
                <Input type="text" id="preview" name="preview" onChange={formik.handleChange} value={formik.values.preview} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="genre">genre</FormLabel>
                <HStack>
                  <VStack onClick={() => setGenre('quizz')}>
                    <Text>Quizz</Text>
                    <HStack h={8} w={8} borderWidth={1} bgColor="white" justify="center" borderRadius="50%">
                      <Box bgColor={genre === 'quizz' ? 'blue.500' : 'white'} h={6} w={6} borderRadius="50%"></Box>
                    </HStack>
                  </VStack>
                  <VStack onClick={() => setGenre('lecon')}>
                    <Text>Lecon</Text>
                    <HStack h={8} w={8} borderWidth={1} bgColor="white" justify="center" borderRadius="50%">
                      <Box bgColor={genre === 'lecon' ? 'blue.500' : 'white'} h={6} w={6} borderRadius="50%"></Box>
                    </HStack>
                  </VStack>
                </HStack>
              </FormControl>
              <Button
                position="absolute"
                bottom={5}
                type="submit"
                w="200px"
                rounded="3xl"
                bgColor="blue.400"
                color="white"
                fontWeight="500"
                // onClick=}
                // {...{ disabled: canSubmit ? false : 'disabled' }}
                // _hover={{ bgColor: canSubmit ? 'blue.500' : 'red.300' }}
              >
                {/* {submitLoad ? <Spinner thickness="4px" speed="0.65s" emptyColor="gray.100" color="blue.500" size="md" /> : 'Valider'} */}
                Enregistrer
              </Button>
            </VStack>
            <VStack h='fit-content'>
              {genre === 'lecon' && <FormLabel htmlFor="contenu">Contenu</FormLabel>}

              {genre === 'quizz' ? (
                <QuizzForm />
              ) : (
                <SunEditor
                  onChange={handleChange}
                  width="600px"
                  height="270px"
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
        </form>
      </Flex>
    </Flex>
  );
};

export default AppearingAddActivity;
