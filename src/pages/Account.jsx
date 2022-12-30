import { Box, Flex, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState ,useRef } from 'react';
import LogOutHelp from '../components/LogOutHelp';
import NavBar from '../components/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { GrContactInfo, GrScorecard, GrBook } from 'react-icons/gr';
import UserDetails from '../components/UserDetails';
import { containerStyle, getChapPart, getThemeChap, getUserInfosTheme, postAPIConnectionURL } from '../Data';
import { AccountSectionSelectorStyle, c } from '../style.js';
import { useHistory, useParams } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { SECRET_AES_KEY } from '../Data';
import UserCourses from '../components/UserCourses';
import axios from 'axios';
import { headerActions } from '../rtk/features/BearerToken/HeaderSlice';
import { UserActions } from '../rtk/features/BearerToken/UserSlice';
import { ThemeActions } from '../rtk/features/BearerToken/ThemesSlice';
import { BackArrow } from '../App';
import { loadingActions } from '../rtk/features/BearerToken/LoadingSlice';
import UserScoreBoard from '../components/UserScoreBoard';
import UserAchivement from '../components/UserAchivement';
import UserExamen from '../components/UserExamen';
import { ImNewspaper } from 'react-icons/im';
import { accountActions } from '../rtk/features/BearerToken/account';
// import fetchAndReloadThemeAndThemeLoaded from '../rtk/myExtraFeatures/fetchAndReloadThemeAndThemeLoaded';
// import { CoursesActions } from '../rtk/features/BearerToken/CoursesSlice';

const Account = () => {
  let { userDatas } = useParams();
  // console.log('userData :' , userDatas)
  const dispatch = useDispatch();
  const navigate = useHistory();
  const status = useSelector(state => state.user.status)
  const myCoursesButtonRef = useRef(null)
  if (userDatas ) {
    dispatch(loadingActions.set(true));
    let em = userDatas.split(',')[0];
    let pwd = userDatas.split(',')[1];
    pwd = pwd.toString().replace('xMl3Jk', '+').replace('Por21Ld', '/').replace('Ml32', '=');
    var bytes = CryptoJS.AES.decrypt(pwd, SECRET_AES_KEY);
    var pa = bytes.toString(CryptoJS.enc.Utf8);
    // console.log({ email: em, password: pa });
    let values = {
      email: em,
      password: pa,
    };
    axios
      .post(postAPIConnectionURL, values)
      .then(res => {
        dispatch(headerActions.set('Bearer ' + res.data.token));
        dispatch(UserActions.set(res.data.user));

        navigate.push('/account');
      })
      .catch(err => {
        console.log(err.response.data.msg);
        dispatch(headerActions.set(''));
      })
      .finally(() => {
        dispatch(loadingActions.set(true));
      });
  }
  // const [selected, setSelected] = useState(1);
  const selected = useSelector(state => state.account.selected)
  const setSelected = (a)=>{
    dispatch(accountActions.setSelected(a))
  } 
  const Token = useSelector(state => state.header.token);
  const handleClick = cas => {
    // dispatch(loadingActions.set(true))
    if (cas === 2) {
      setSelected(2);
    } else {
      setSelected(cas);
      
    }
    // console.log('selected', selected)
  };
  const userId = useSelector(state => state.user.id);
  useEffect(() => {
    dispatch(loadingActions.set(true));
    axios
      .get(getUserInfosTheme + userId, {
        headers: {
          authorization: Token,
        },
      })
      .then(response => {
        // console.log(response.data.user.Themes);
        dispatch(UserActions.set(response.data.user));
        let themes = response.data.user.Themes; // ceci est le tableau des themes de l'utilisateur
        themes
          .forEach(theme => {
            axios
              .get(getThemeChap + theme.id, {
                headers: {
                  authorization: Token,
                },
              })
              .then(response => {
                dispatch(ThemeActions.setChapitresById({ themeId: theme.id, chapitres: response.data.theme.Chapitres }));
                let chapitres = response.data.theme.Chapitres;
                // console.log(chapitres);
                chapitres.forEach(chapitre => {
                  // pour chaque chapitre on cherche ces parties
                  let chapitreId = chapitre.id;
                  axios
                    .get(getChapPart + chapitreId, {
                      headers: {
                        authorization: Token,
                      },
                    })
                    .then(ress => {
                      // console.log(ress.data.chap.Parties);
                      dispatch(
                        ThemeActions.setPartiesById({ chapitreId: chapitre.id, themeId: theme.id, parties: ress.data.chap.Parties })
                      );
                    }).finally(()=>{
                      // console.log(1)
                    })
                });

                // console.log(chapitres);
              }).finally(()=>{
                // console.log(2)
              })
          })
            dispatch(ThemeActions.set(response.data.user.Themes));
        // navigate.push('/account');
      })
      .finally(()=>{
        dispatch(loadingActions.set(false))
      })
  }, [Token, dispatch, navigate, userId]);
  const userData = useSelector(state => state.user);
  return (
    <>
      <Flex position="relative" h="calc(100vh - 56px)" mt="56px" w="100vw" p={0}>
        <VStack
          w="fit-content"
          align="start"
          justify="center"
          ml={2}
          pr={5}
          h="calc(100vh - 56px)"
          spacing={5}
          position="sticky"
          flexShrink={0}
        >
          <HStack {...AccountSectionSelectorStyle(selected, 1)} onClick={() => handleClick(1)}>
            <Icon as={GrContactInfo} />
            <Text>User details</Text>
          </HStack>

          <HStack {...AccountSectionSelectorStyle(selected, 2)} onClick={() => handleClick(2)} ref={myCoursesButtonRef}>
            <Icon as={GrBook} />
            <Text>My courses</Text>
          </HStack>

          <HStack {...AccountSectionSelectorStyle(selected, 4)} onClick={() => handleClick(4)}>
            <Icon as={ImNewspaper} />
            <Text>Examen</Text>
          </HStack>

          <HStack {...AccountSectionSelectorStyle(selected, 3)} onClick={() => handleClick(3)}>
            <Icon as={GrScorecard} />
            <Text>Scorebord</Text>
          </HStack>
        </VStack>
        <Flex {...containerStyle} overflowY="scroll" className='scrollNone'>
          <Box flexGrow={1}>
            {selected === 1 && <UserDetails {...userData} />}
            {selected === 2 && <UserCourses />}
            {selected === 3 && status === 1 && <UserScoreBoard/> }
            {selected === 3 && status !== 1 &&<UserAchivement/>}
            {selected === 4 && <UserExamen />}
          </Box>
        </Flex>
        <LogOutHelp />
      </Flex>
      <Flex position="fixed" w="100vw" {...c} bottom={6} left={0}>
        <NavBar />
      </Flex>
      <BackArrow />
    </>
  );
};

export default Account;
