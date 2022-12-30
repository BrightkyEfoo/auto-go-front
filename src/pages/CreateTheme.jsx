import { Box, Button, Flex, Heading, HStack, Input, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LogOutHelp from '../components/LogOutHelp';
import NavBar from '../components/NavBar';
import { /*getThemeChap, */postAPICreateThemeURL } from '../Data';
import { loadingActions } from '../rtk/features/BearerToken/LoadingSlice';
// import { ThemeLoadedActions } from '../rtk/features/BearerToken/ThemeLoadedSlice';
import { bottomNavBarContainer, mainBoxesStyle } from '../style';

const CreateTheme = () => {
  const status = useSelector(state => state.user.status);
  const Token = useSelector(state => state.header.token);
  const userId = parseInt(useSelector(state => state.user.id))
  const dispatch = useDispatch()
  const navigate = useHistory()
  const [value, setValue] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const handleClick = () => {
    console.log({ nom: value , userId });
    dispatch(loadingActions.set(true))
    axios
      .post(
        postAPICreateThemeURL,
        { nom: value , userId },
        {
          headers: {
            authorization: Token,
          },
        }
      )
      .then(res => {
        console.log(res.data)
        console.log('creation reuissie')
        
        navigate.push('/theme/?id='+res.data.createdTheme.id)
        // 
      })
      .catch(err => console.log(err))
      .finally(()=>{
        dispatch(loadingActions.set(false))
      })
  };
  const handleChange = e => {
    if (value.length === 0) {
      setErrMessage('Le titre du theme ne peut etre vide');
    } else if (value.length < 3) {
      setErrMessage('Entrez un nom valide');
    } else {
      setErrMessage('');
    }
    setValue(e.target.value);
    
    
  };

  useEffect(() => {
    dispatch(loadingActions.set(false))
  }, [dispatch])
  return (
    <>
      <Box
        {...mainBoxesStyle('full')}
        bgImage={"url('https://i.ibb.co/HKZDSN9/hand-drawn-flat-teachers-day-background-23-2149066936.webp')"}        
      >
        {!status || status === 0 ? (
          <VStack justify="center" h="calc(100vh - 57px)" bgColor="rgba(0,0,0,0.3)" backdropFilter={'blur(5px)'}>
            <VStack m={5} spacing={10} bgColor="gray.100" p={6} rounded="xl">
              <Text fontSize="45px" fontWeight={700} color="red.500">
                {' '}
                Access Denied
              </Text>
            </VStack>
          </VStack>
        ) : (
          <VStack justify="center" h="calc(100vh - 57px)" bgColor="rgba(0,0,0,0.3)" backdropFilter={'blur(5px)'} bgSize="cover">
            <VStack m={5} spacing={10} bgColor="gray.100" p={6} rounded="xl">
              <Heading fontSize={70}> Nouveau Thème </Heading>
              <VStack>
                <HStack spacing={10}>
                  <Input
                    borderColor="blue.500"
                    fontSize={25}
                    placeholder="eg : Les Signalisations"
                    required
                    type="text"
                    onChange={e => handleChange(e)}
                    value={value}
                    w="25vw"
                    h="50px"
                  />
                  <Button colorScheme="blue" fontSize={25} h="50px" bgColor="blue.500" type="button" onClick={() => handleClick()}>
                    Soumettre
                  </Button>
                </HStack>
                {errMessage && (
                  <Text color="red.500" fontSize={18}>
                    {errMessage}
                  </Text>
                )}
              </VStack>
            </VStack>
          </VStack>
        )}
      </Box>
      <Flex {...bottomNavBarContainer}>
        <NavBar />
      </Flex>
      <LogOutHelp />
    </>
  );
};

export default CreateTheme;
