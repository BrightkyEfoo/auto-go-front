import { Formik, Field } from 'formik';
import { Box, Button, Checkbox, Text, FormControl, FormLabel, FormErrorMessage, Input, VStack, Image, Flex, Icon } from '@chakra-ui/react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch/*, useSelector */} from 'react-redux';
import { getAuthGoogleURL, getChapPart, getThemeChap, getUserInfosTheme, postAPIConnectionURL } from '../Data';
import Logo from '../components/logo.svg';
import { FcGoogle } from 'react-icons/fc';
import { headerActions } from '../rtk/features/BearerToken/HeaderSlice';
// import store from "../rtk/app/Store";
// import { useState } from "react";
import { UserActions } from '../rtk/features/BearerToken/UserSlice';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { ThemeActions } from '../rtk/features/BearerToken/ThemesSlice';
import { loadingActions } from '../rtk/features/BearerToken/LoadingSlice';
import { useEffect } from 'react';

export default function App() {

  const navigate = useHistory();
  // const [ErrorMessage , SetErrorMessage] = useState('')
  const handleClickBack = () => {
    console.log('back');
    navigate.goBack();
  };
  const handlePasswordExit = e => {
    e.preventDefault();
    document.getElementById('wrongPasswordContainer').style.top = '-120vh';
    // document.getElementById('wrongPasswordContainer').style.display='none'
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadingActions.set(false))
  }, [dispatch])
  
  return (
    <VStack bg="gray.100" align="center" justify="center" position="relative" spacing={2} pb={10}>
      <Flex
        id="wrongPasswordContainer"
        bgColor="#716c6cae"
        h="100vh"
        w="100vw"
        position="fixed"
        align="center"
        justify="center"
        top="-150vh"
        transition="all ease 700ms"
        zIndex={5}
        onClick={e => handlePasswordExit(e)}
      >
        <Flex
          h={50}
          w={300}
          id="wrongPassword"
          align="center"
          justify="center"
          rounded="2xl"
          bgColor="#ffffffff"
          color="red"
          fontSize={25}
          fontWeight={700}
          transition="all ease 700ms"
        >
          <Text>Mot de passe incorrect</Text>
        </Flex>
      </Flex>

      <VStack bg="white" p={7} rounded="lg" w={350}>
        <Link to="/">
          <Image src={Logo} alt="logo" borderRadius="full" boxSize="100px" bgColor="transparent" />
        </Link>
        <Formik
          initialValues={{
            email: '',
            password: '',
            rememberMe: false,
          }}
          onSubmit={async values => {
            dispatch(loadingActions.set(true))
            await axios
              .post(postAPIConnectionURL, values)
              .then(res => {
                console.log(res.data)
                dispatch(headerActions.set('Bearer ' + res.data.token));
                dispatch(UserActions.setScore(res.data.user.ExamenScores))
                let tok = 'Bearer ' + res.data.token;
                axios
                  .get(getUserInfosTheme + res.data.user.id, {
                    headers: {
                      authorization: tok,
                    },
                  })
                  .then(response => {
                    // console.log(response.data.user.Themes);
                    dispatch(UserActions.set(response.data.user));
                    let themes = response.data.user.Themes; // ceci est le tableau des themes de l'utilisateur
                    themes.forEach(theme => {
                      axios
                        .get(getThemeChap + theme.id, {
                          headers: {
                            authorization: tok,
                          },
                        })
                        .then(response => {
                          dispatch(ThemeActions.setChapitresById({themeId : theme.id , chapitres : response.data.theme.Chapitres }));
                          let chapitres = response.data.theme.Chapitres;
                          // console.log(chapitres)
                          chapitres.forEach(chapitre => { // pour chaque chapitre on cherche ces parties
                            let chapitreId = chapitre.id
                            axios.get(getChapPart + chapitreId, {
                              headers: {
                                authorization: tok,
                              },
                            }).then(ress => {
                              // console.log(ress.data.chap.Parties)
                              dispatch(ThemeActions.setPartiesById({chapitreId : chapitre.id , themeId : theme.id ,parties : ress.data.chap.Parties }));
                            })
                          });
                          // console.log(chapitres);
                        });
                    });
                    dispatch(ThemeActions.set(response.data.user.Themes));
                    navigate.push('/account');
                    // dispatch(loadingActions.set(false))
                  });
              })
              .catch(err => {
                // console.log(err.response.data.msg);
                dispatch(headerActions.set(''));
                dispatch(loadingActions.set(false))
                document.getElementById('wrongPasswordContainer').style.top = '0px';
              })
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <Text>Connectez vous via votre email</Text>
                <FormControl>
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <Field as={Input} id="email" name="email" type="email" variant="filled" />
                </FormControl>
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    variant="filled"
                    validate={value => {
                      let error;

                      if (value.length < 5) {
                        error = 'Password must contain at least 6 characters';
                      }

                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <Field as={Checkbox} id="rememberMe" name="rememberMe" colorScheme="purple">
                  Remember me?
                </Field>
                <Button type="submit" colorScheme="purple" width="full">
                  Login
                </Button>
                <Text cursor="pointer" fontSize={14} textDecoration='underline'>J'ai oublié mon mot de passe</Text>
              </VStack>
              <Link to="/inscription">
                <Text m="3" fontSize={18} color='blue.500' >Je m'inscris</Text>
              </Link>
            </form>
          )}
        </Formik>
        <Icon fontSize={35} as={AiOutlineArrowLeft} onClick={() => handleClickBack()} />
      </VStack>
      <Box>
        <Text fontSize={25} m={5} cursor='pointer'>
          <a href='#google-log'>
          OR connect with</a>
        </Text>
        <a href={getAuthGoogleURL}>
          <Icon as={FcGoogle} fontSize={50} />
        </a>
        <Box id='google-log'></Box>
      </Box>
    </VStack>
  );
}
