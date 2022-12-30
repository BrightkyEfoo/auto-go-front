import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineMan, AiOutlineWoman } from 'react-icons/ai';
import { BsCheck, BsPencil, BsTrash } from 'react-icons/bs';
import { GrFormAdd } from 'react-icons/gr';
import { SiGooglemaps } from 'react-icons/si';
import { ImAngry } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { postAPISetUsersURL } from '../Data';
import { UserActions } from '../rtk/features/BearerToken/UserSlice';
import './style1.css';
import { loadingActions } from '../rtk/features/BearerToken/LoadingSlice';
import { HashLoader } from 'react-spinners';
// import Loading from '../pages/Loading';

const UserDetails = ({ nom, prenom, birthDate, status, phone, email, courses, photo, sexe, localisation }) => {
  const dispatch = useDispatch();
  const UserDets = useSelector(state => state.user);
  const Token = useSelector(state => state.header.token);
  const [modifyName, setModifyName] = useState(false);
  const [modifyPrename, setModifyPrename] = useState(false);
  const [modifyBirth, setModifyBirth] = useState(false);
  const [modifyEmail, setModifyEmail] = useState(false);
  const [modifyNumero, setModifyNumero] = useState(false);
  const [modifySexe, setModifySexe] = useState(false);
  const [modifyLocalisation, setModifyLocalisation] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  // const isLoading = useSelector(state => state.loading.isLoading)

  useEffect(() => {
    dispatch(loadingActions.set(false));
  }, [dispatch]);

  const [userInfos, setUserInfos] = useState({
    nom,
    prenom,
    birthDate,
    status,
    email,
    courses,
    numero: phone,
    sexe,
    localisation,
  });

  let putData = {};
  const [loading, setLoading] = useState('0');
  const t = {
    nom: setModifyName,
    prenom: setModifyPrename,
    birthDate: setModifyBirth,
    email: setModifyEmail,
    numero: setModifyNumero,
    sexe: setModifySexe,
    localisation: setModifyLocalisation,
  };
  const states = {
    nom: modifyName,
    prenom: modifyPrename,
    birthDate: modifyBirth,
    email: modifyEmail,
    numero: modifyNumero,
    sexe: modifySexe,
    localisation: modifyLocalisation,
  };
  const handleClick = a => {
    t[a](true);
  };
  const handleChange = (e, a) => {
    switch (a) {
      case 'nom':
        setUserInfos({
          ...userInfos,
          nom: e.target.value,
        });
        break;
      case 'numero':
        setUserInfos({
          ...userInfos,
          numero: e.target.value,
        });
        break;
      case 'prenom':
        setUserInfos({
          ...userInfos,
          prenom: e.target.value,
        });
        break;
      case 'birthDate':
        setUserInfos({
          ...userInfos,
          birthDate: e.target.value,
        });
        break;
      case 'email':
        setUserInfos({
          ...userInfos,
          email: e.target.value,
        });
        console.log(e.target.value);
        if (!/^[a-zA-Z][0-9a-zA-Z._-]+@[a-zA-Z][a-zA-Z0-9_.-]+\.[a-zA-Z]{2,4}$/i.test(e.target.value)) {
          setEmailErr(true);
          console.log('email invalide');
        } else {
          setEmailErr(false);
        }
        break;
      case 'localisation':
        setUserInfos({
          ...userInfos,
          localisation: e.target.value,
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = a => {
    setLoading(a);
    putData = { ...UserDets, ...userInfos };
    console.log(putData);

    console.log(Token.split(' ')[1]);
    axios
      .put(postAPISetUsersURL, putData, {
        headers: {
          authorization: Token,
        },
      })
      .then(res => {
        dispatch(UserActions.set(putData));
        setLoading(0);
        t[a](false);
      })
      .catch(err => {
        setLoading(0);
        t[a](false);
        document.getElementById('account' + a).style.backgroundColor = '#ec6d6dff';
        setTimeout(() => (document.getElementById('account' + a).style.backgroundColor = 'transparent'), 2000);
      });
  };
  const handleCancel = a => {
    t[a](false);
    setUserInfos({
      nom,
      prenom,
      birthDate,
      status,
      email,
      courses,
      numero: phone,
      sexe,
      localisation,
    });
  };

  const formCon = (a, type) => {
    return (
      <FormControl>
        <InputGroup w={500}>
          <InputLeftAddon w={150} children={a} bgColor="blue.500" color="white" fontWeight={700} />
          <Input
            id={'account' + a}
            type={type}
            value={a === 'sexe' ? (userInfos[a] === 'M' ? 'MASCULIN' : userInfos[a] === 'F' ? 'FEMININ' : '') : userInfos[a].toLowerCase()}
            pr={20}
            readOnly={states[a] ? false : true}
            onChange={e => handleChange(e, a)}
            transition="all ease 300ms"
            borderColor={emailErr && type === 'email' ? 'red' : 'blue.400'}
            borderWidth={emailErr && type === 'email' ? 2 : 1}
            _focusVisible={{
              borderColor: emailErr && type === 'email' ? 'red' : 'blue.400',
              borderWidth: emailErr && type === 'email' ? 2 : 1,
            }}
          />
          {states[a] ? (
            <InputRightElement
              w="fit-content"
              children={
                <HStack pr={2}>
                  {loading === a ? (
                    <Spinner thickness="4px" speed="0.65s" emptyColor="gray.100" color="blue.500" size="sm" />
                  ) : (
                    <Icon
                      as={BsCheck}
                      color="white"
                      bgColor={emailErr && type === 'email' ? 'gray' : 'blue.400'}
                      rounded="md"
                      p={1}
                      fontSize={30}
                      onClick={type === 'email' ? () => (emailErr ? null : handleSubmit(a)) : () => handleSubmit(a)}
                    />
                  )}
                  <Icon as={BsTrash} color="white" bgColor="red" rounded="md" p={1} fontSize={30} onClick={() => handleCancel(a)} />
                </HStack>
              }
            />
          ) : (
            <InputRightElement
              w="fit-content"
              children={
                <HStack pr={2} w="fit-content">
                  {a === 'localisation' && (
                    <a
                      href={
                        'https://www.google.com/maps/search/?api=1&query=' +
                        userInfos[a].split(' ')[0] +
                        '+' +
                        userInfos[a].split(' ')[1] +
                        '%2C' +
                        userInfos[a].split(' ')[3]
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <VStack>
                        <Icon as={SiGooglemaps} color="white" bgColor="blue.500" rounded="md" p={1} fontSize={30} />
                      </VStack>
                    </a>
                  )}
                  {a !== 'sexe' ? (
                    <Icon as={BsPencil} color="white" bgColor="gray" rounded="md" p={1} fontSize={30} onClick={() => handleClick(a)} />
                  ) : (
                    <Icon
                      as={userInfos[a] === 'M' ? AiOutlineMan : userInfos[a] === 'F' ? AiOutlineWoman : ImAngry}
                      color="black"
                      p={1}
                      fontSize={30}
                    />
                  )}
                </HStack>
              }
            />
          )}
        </InputGroup>
      </FormControl>
    );
  };

  // for image

  const hiddenFileInput = useRef(null);
  const [profilePhotoLoading, setProfilePhotoLoading] = useState(false);
  const handleInputFIle = () => {
    hiddenFileInput.current.click();
  };

  // useEffect(() => {
  //   axios.

  //   return () => {
  //     second
  //   }
  // }, [third])
  const userId = useSelector(state => state.user.id);
  const userPhoto = useSelector(state => state.user.photo);
  const [image, setImage] = useState({ preview: '', data: '' });
  const [imageStatus, setImageStatus] = useState(false);
  // const handleSumbmitProfile = () => {
  //   // e.preventDefault()

  //   console.log('submited')
  //   let formData = new FormData();
  //   formData.append('submitProfile', image.data);
  //   console.log(formData);

  //   axios
  //     .post('https://autogoback237.herokuapp.com/api/setuserprofilepicture/?userId=' + userId, formData)
  //     .then(response => {
  //       setImageStatus(false);
  //       console.log(response);
  //       dispatch(UserActions.setUserPhoto(response.data.url));
  //     })
  //     .finally(() => {
  //       setImageStatus(true);
  //     });
  // };
  const handleFileChange = e => {
    setProfilePhotoLoading(true);
    console.log(e.target.files);
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
    let formData = new FormData();
    formData.append('submitProfile', e.target.files[0]);
    console.log({ ...formData });

    axios
      .post('https://autogoback237.herokuapp.com/api/setuserprofilepicture/?userId=' + userId, formData, {
        headers: {
          authorization: Token,
        },
      })
      .then(response => {
        setImageStatus(false);
        console.log(response);
        dispatch(UserActions.setUserPhoto(response.data.url));
      })
      .finally(() => {
        setImageStatus(true);
        setProfilePhotoLoading(false);
      });
    // handleSumbmitProfile();
  };

  return (
    <VStack w="100%" mt={10}>
      {/* {<Loading />} */}
      <Heading>Informations</Heading>
      <VStack align="start">
        <Heading>Photo de profil</Heading>
        <Text>Avec une photo à jour, votre enseignant(e) vous identifiera plus facilement sur son planning.</Text>
      </VStack>
      <form encType="multipart/form-data">
        <HStack w="100%" justify="center" spacing={15} wrap="wrap">
          <VStack justify="start" p={6}>
            {formCon('nom', 'text')}
            {formCon('prenom', 'text')}
            {formCon('birthDate', 'date')}
            {formCon('email', 'email')}
            {formCon('numero', 'text')}
            {formCon('sexe', 'text')}
            {formCon('localisation', 'text')}
          </VStack>
          <VStack bgColor="transparent" justify="start" align="start">
              
            { profilePhotoLoading ? <HStack w={250} h={250} justify='center' ><HashLoader color="#3182ce" loading size={60} speedMultiplier={2} /></HStack> : userPhoto !== '' ? (
              <Image objectFit="contain" borderRadius="50%" src={userPhoto} width={250} height={250} alt={nom + ' ' + prenom} />
            ) : (
              <Flex
                w={250}
                h={250}
                rounded="xl"
                bgColor="gray.300"
                justify="center"
                align="center"
                fontSize={100}
                fontWeight={700}
                color="white"
              >
                <Text>
                  {nom.toUpperCase()[0]} {prenom.toUpperCase()[0]}
                </Text>
              </Flex>
            )}
            <Button colorScheme="purple" w={250} onClick={e => handleInputFIle(e)}>
              <Input
                type="file"
                id="submitProfile"
                name="submitProfile"
                onChange={e => handleFileChange(e)}
                display="none"
                ref={hiddenFileInput}
              />
              <HStack>
                <Icon as={GrFormAdd} color="white" fontSize={25} />
                {userPhoto === '' ? <Text>Ajoutez votre photo</Text> : <Text>Modifiez une photo</Text>}
              </HStack>
            </Button>
          </VStack>
        </HStack>
      </form>

      <HStack align="start" borderWidth={2} borderColor="blue.500" position="relative" rounded="lg" w="90%" maxW="1000px" p={6}>
        <Text fontSize={25}>Recemment lus ...</Text>
        <Box h="30px" w="75px" position="absolute" bgColor="white" top={-3} left={-3}></Box>
        <Box h="30px" w="75px" position="absolute" bgColor="white" bottom={-3} right={-2}></Box>
      </HStack>
    </VStack>
  );
};

export default UserDetails;
