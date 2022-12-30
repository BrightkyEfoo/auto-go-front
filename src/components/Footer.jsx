import { Box, Heading, HStack, Icon, Image, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import React from 'react';
import { AiFillMail } from 'react-icons/ai';
import { FaFacebookSquare, FaLinkedinIn, FaWhatsappSquare, FaYoutubeSquare } from 'react-icons/fa';
import { fondNoir, iconeStyleFooter } from '../style';
import Logo from './logo.svg';
const Footer = () => {
  const [max520] = useMediaQuery('(max-width:520px)');
  if (max520) {
    return (
      <VStack bgImage={'url(' + fondNoir + ')'} mt={10} paddingBottom="70px" spacing={5} pb={32} color="white">
        <VStack justify="center" fontSize={15} spacing={5}>
          <HStack w="fit-content" spacing={10}>
            <Icon as={FaFacebookSquare} {...iconeStyleFooter} />
            <Icon as={FaWhatsappSquare} {...iconeStyleFooter} />
            <Icon as={FaLinkedinIn} {...iconeStyleFooter} />
            <Icon as={FaYoutubeSquare} {...iconeStyleFooter} />
          </HStack>
          <Box h={0} borderWidth={2} w="50%" borderColor="gray" bgColor="gray" />
          <HStack>
            <Image src={Logo} alt="logo" h={150} w={150} objectFit="contain" />
            <VStack align="start" fontSize={14}>
              <Heading color="gray">Services</Heading>
              <Text> Code de la route</Text>
              <Text> Tests d'examens</Text>
              <Text> Securite routiere</Text>
              <Text> Infrastructures routieres</Text>
            </VStack>
          </HStack>
          <VStack align="start" fontSize={14}>
            <Heading color="gray">Contactez-nous</Heading>
            <HStack>
              <Icon as={AiFillMail} color="gray" />
              <Text>info@auto-go.com</Text>
            </HStack>
            <Text>Douala, Yaounde, Bertoua, CAMEROUN</Text>
            <Text>Ndjamena, TCHAD</Text> <Text>Libreville, GABON</Text>
            <Text>Bangui, CENTRAFIQUE</Text>
          </VStack>
        </VStack>
      </VStack>
    );
  }
  return (
    <VStack bgImage={'url(' + fondNoir + ')'} bgRepeat='no-repeat' bgSize='cover' mt={10} paddingBottom="70px" spacing={5} color="white">
      <HStack justify="center" align="start" fontSize={20} spacing={10}>
        <Image src={Logo} alt="logo" h={250} w={250} objectFit="contain" />
        <VStack align="start">
          <Heading color="gray">Services</Heading>
          <Text> Code de la route</Text>
          <Text> Tests d'examens</Text>
          <Text> Securite routiere</Text>
          <Text> Infrastructures routieres</Text>
        </VStack>
        <VStack align="start">
          <Heading color="gray">Contactez-nous</Heading>
          <HStack>
            <Icon as={AiFillMail} color="gray" /> <Text>info@auto-go.com</Text>
          </HStack>
          <Text>Douala, Yaounde, Bertoua, CAMEROUN</Text>
          <Text>Ndjamena, TCHAD</Text> <Text>Libreville, GABON</Text>
          <Text>Bangui, CENTRAFIQUE</Text>
        </VStack>
      </HStack>
      <Box h={0} borderWidth={2} w={500} borderColor="gray" bgColor="gray" />
      <HStack w="fit-content" spacing={10}>
        <Icon as={FaFacebookSquare} {...iconeStyleFooter} />
        <Icon as={FaWhatsappSquare} {...iconeStyleFooter} />
        <Icon as={FaLinkedinIn} {...iconeStyleFooter} />
        <Icon as={FaYoutubeSquare} {...iconeStyleFooter} />
      </HStack>
    </VStack>
  );
};

export default Footer;
