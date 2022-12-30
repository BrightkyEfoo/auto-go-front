import { Button, HStack, Image, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { postPaiementUrl } from '../Data';
import { HashLoader } from 'react-spinners';
import fetchAndReloadThemeAndThemeLoaded from '../rtk/myExtraFeatures/fetchAndReloadThemeAndThemeLoaded';

const FormulesPaiement = ({ code, titre, bgColor, color, prix, duree, composant }) => {
  const [display, setDisplay] = useState(false);
  const [loading, setLoading] = useState(false);
  const Token = useSelector(state => state.header.token);
  const userId = useSelector(state => state.user.id);
  const socket = io('https://autogoback237.herokuapp.com');

  const handleClick = () => {
    setDisplay(true);
    
  };
  const handleOm = () => {
    setLoading(true);
    axios.post(postPaiementUrl, { userId, code }, { headers: { authorization: Token } }).then(res => {
      console.log('res ', res.data);
      socket.on('resultats paiements', data => {
        console.log('data', data);
        if(parseInt(userId) === parseInt(data.userId)){
          if(data.state === 'fulfilled'){
            fetchAndReloadThemeAndThemeLoaded(1)
          }
          setLoading(false);
          setDisplay(false);
        }
      });
    });
  };
  const handleMomo = () => {
    setLoading(true);
  };
  const handleGetOut = e => {
    if (e.target === e.currentTarget) {
      setDisplay(false);
    }
  };
  return (
    <VStack spacing={5} borderWidth={1} borderColor={bgColor}>
      <VStack bgColor={bgColor} color={color} w="full" mb={10} pt={10}>
        <Text>{titre}</Text>
        <Text>XAF</Text>
        <VStack
          p={2}
          w="80%"
          m={2}
          borderWidth={1}
          borderColor={bgColor}
          color="black"
          bgColor="white"
          fontSize={35}
          fontWeight={700}
          position="relative"
          top={35}
        >
          <Text>{prix}</Text>
        </VStack>
      </VStack>
      <Text>{duree}</Text>
      <VStack w="full" pl={4} pr={4} pt={4}>
        {composant}
        <Button position="relative" top={25} p={2} type="button" colorScheme="blue" bgColor="blue.500" onClick={() => handleClick()}>
          Debuter maintenant
        </Button>
      </VStack>
      <VStack
        justify="center"
        zIndex={999}
        position="fixed"
        top={0}
        left={0}
        h="100vh"
        w="100vw"
        display={display ? 'flex' : 'none'}
        onClick={e => handleGetOut(e)}
        bgColor="rgba(100,100,255,0.2)"
        backdropFilter="blur(5px)"
      >
        {loading ? (
          <VStack p={5} bgColor="white">
            <Text>En attente de confirmation</Text>
            <Text>Veuillez valider la transaction sur votre mobile</Text>
            <VStack m={10} p={10}>
              <HashLoader color="#3182ce" loading size={76} speedMultiplier={2} />
            </VStack>
          </VStack>
        ) : (
          <VStack p={5} bgColor="white">
            <Text>{titre}</Text>
            <Text>Choisissez un mode de paiement</Text>
            <HStack>
              <Button onClick={() => handleOm()} bgColor="white" borderWidth={2} borderColor="orange" h={50}>
                <HStack>
                  <Image src="https://autogoback237.herokuapp.com/public/images/omLogo.png" w={45} h={45} objectFit="cover" alt="logo-Orange-Money" />
                  <Text>Orange Money</Text>
                </HStack>
              </Button>
              <Button onClick={() => handleMomo()} bgColor="yellow" borderWidth={2} borderColor="yellow" h={50}>
                <HStack>
                  <Image src="https://autogoback237.herokuapp.com/public/images/mtnLogo.png" h={45} objectFit="cover" alt="logo-Orange-Money" />
                  <Text>Mobile Money</Text>
                </HStack>
              </Button>
            </HStack>
          </VStack>
        )}
      </VStack>
    </VStack>
  );
};

export default FormulesPaiement;
