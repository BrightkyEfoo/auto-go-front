import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

const Tarifs = ({ phone }) => {
  if (phone) {
    return (
      <VStack direction="column" w="100vw" mt={5} mb={5} pb={5}>
        <Heading p={3} mt={5} color="black" fontSize={18}>
          Choisissez une offre a votre convenance
        </Heading>
        <VStack w="95vw" position="relative" bgColor="transparent">
          <VStack spacing={10} fontSize={16}>
            <VStack
              borderRadius={25}
              bgColor="white"
              color="black"
              boxShadow="0px -2px 10px 2px rgba(0,0,0,0.8)"
              w="75%"
              justify="center"
            >
              <Flex
                fontSize={20}
                fontWeight={700}
                align="center"
                justify="center"
                borderTopRadius={25}
                w="full"
                h="170px"
                color="blue.400"
                bgColor="blackAlpha.800"
              >
                WINGO speed
              </Flex>
              <VStack spacing={0}>
                <Text fontWeight={700}>XAF</Text>
                <Text
                  color="gray"
                  fontSize={40}
                  fontWeight={700}
                  letterSpacing={4}
                >
                  12.000
                </Text>
                <Text fontSize={14}>
                  <em>/ 02 mois</em>
                </Text>
              </VStack>
              <VStack
                borderRightRadius={25}
                color="blue.500"
                justify="center"
                p={5}
              >
                <Text>Debutez maintenant, satisfaction assurée </Text>
                <Button type="button" colorScheme="purple">
                  Commencez maintenant !
                </Button>
              </VStack>
            </VStack>

            <VStack
              borderRadius={25}
              bgColor="white"
              color="black"
              marginTop={20}
              boxShadow="0px 2px 10px 2px rgba(0,0,0,0.8)"
            >
              <Flex
                fontSize={30}
                fontWeight={700}
                align="center"
                justify="center"
                borderTopRadius={25}
                h="170px"
                w="full"
                p={4}
                color="white"
                bgColor="blue.500"
              >
                WINGO premium
              </Flex>
              <VStack spacing={2}>
                <Text fontWeight={900}>XAF</Text>
                <Text
                  color="blue.500"
                  fontSize={50}
                  fontWeight={900}
                  letterSpacing={5}
                >
                  18.500
                </Text>
                <Text fontSize={15}>
                  <em>/ 03 mois</em>
                </Text>
              </VStack>
              <VStack w="80%" spacing={2}>
                <Text
                  w="full"
                  textAlign="center"
                  borderBottomWidth={2}
                  borderBottomColor="black"
                >
                  Acces au labo <b>AUTO-GO</b>
                </Text>
                <Text
                  w="full"
                  textAlign="center"
                  borderBottomWidth={2}
                  borderBottomColor="black"
                >
                  Acces a tous les modules d'examens
                </Text>
                <Text
                  w="full"
                  textAlign="center"
                  borderBottomWidth={2}
                  borderBottomColor="black"
                >
                  Acces aux corrections et explications
                </Text>
                <Text w="full" textAlign="center">
                  Acces via la communauté
                </Text>
              </VStack>
              <VStack
                borderBottomRadius={25}
                h="fit-content"
                color="blue.500"
                justify="center"
                maxW={64}
                bgColor="white"
                p={5}
              >
                <Text>Debutez maintenant, satisfaction assurée </Text>
                <Button colorScheme="blue" bgColor="blue.400" type="button">
                  Commencez maintenant !
                </Button>
              </VStack>
            </VStack>
          </VStack>
        </VStack>
      </VStack>
    );
  } else
    return (
      <VStack direction="column" w="100vw" mt={7} mb={7} pb={7}>
        <Heading p={3} fontSize={25} mt={3} color="black">
          Choisissez une offre a votre convenance
        </Heading>
        <VStack
          justify="center"
          w="100vw"
          position="relative"
          bgColor="transparent"
        >
          <Flex
            align="center"
            justify="center"
            h="100%"
            w="100vw"
            position="absolute"
            top={0}
            left={0}
            zIndex={-1}
          >
            <Box h="30%" w="100vw" bgColor="blue.400"></Box>
            {/* c'est le box du bleu derriere les prix la */}
          </Flex>
          <VStack h="100%" spacing={7}>
            <HStack
              borderRadius={25}
              bgColor="white"
              color="black"
              p={0}
              boxShadow="0px -2px 10px 2px rgba(0,0,0,0.8)"
            >
              <Flex
                fontSize={18}
                fontWeight={700}
                align="center"
                justify="center"
                borderLeftRadius={25}
                h="170px"
                m={0}
                p={4}
                color="blue.400"
                bgColor="blackAlpha.800"
              >
                WINGO speed
              </Flex>
              <VStack spacing={0}>
                <Text fontWeight={700}>XAF</Text>
                <Text
                  color="gray"
                  fontSize={40}
                  fontWeight={700}
                  letterSpacing={4}
                >
                  12.000
                </Text>
                <Text fontSize={15}>
                  <em>/ 02 mois</em>
                </Text>
              </VStack>
              <VStack fontSize={18}>
                <Text
                  w="full"
                  textAlign="center"
                  borderBottomWidth={2}
                  borderBottomColor="black"
                >
                  Acces au labo <b>AUTO-GO</b>
                </Text>
                <Text
                  w="full"
                  textAlign="center"
                  borderBottomWidth={2}
                  borderBottomColor="black"
                >
                  Acces a tous les modules d'examens
                </Text>
                <Text
                  w="full"
                  textAlign="center"
                  borderBottomWidth={2}
                  borderBottomColor="black"
                >
                  Acces aux corrections et explications
                </Text>
                <Text w="full" textAlign="center">
                  Acces via la communauté
                </Text>
              </VStack>
              <VStack
                borderRightRadius={25}
                h="170px"
                color="purple.500"
                justify="center"
                maxW={64}
                bgColor="blackAlpha.800"
              >
                <Text>Debutez maintenant, satisfaction assurée </Text>
                <Button type="button" colorScheme="purple">
                  Commencez maintenant !
                </Button>
              </VStack>
            </HStack>

            <HStack
              borderRadius={25}
              bgColor="white"
              color="black"
              boxShadow="0px 2px 10px 2px rgba(0,0,0,0.8)"
            >
              <Flex
                fontSize={30}
                fontWeight={900}
                align="center"
                justify="center"
                borderLeftRadius={25}
                h="170px"
                p={4}
                color="white"
                bgColor="blue.500"
              >
                WINGO premium
              </Flex>
              <VStack spacing={0}>
                <Text fontWeight={900}>XAF</Text>
                <Text
                  color="blue.500"
                  fontSize={50}
                  fontWeight={900}
                  letterSpacing={5}
                >
                  18.500
                </Text>
                <Text fontSize={15}>
                  <em>/ 03 mois</em>
                </Text>
              </VStack>
              <VStack>
                <Text
                  w="full"
                  textAlign="center"
                  borderBottomWidth={2}
                  borderBottomColor="black"
                >
                  Acces au labo <b>AUTO-GO</b>
                </Text>
                <Text
                  w="full"
                  textAlign="center"
                  borderBottomWidth={2}
                  borderBottomColor="black"
                >
                  Acces a tous les modules d'examens
                </Text>
                <Text
                  w="full"
                  textAlign="center"
                  borderBottomWidth={2}
                  borderBottomColor="black"
                >
                  Acces aux corrections et explications
                </Text>
                <Text w="full" textAlign="center">
                  Acces via la communauté
                </Text>
              </VStack>
              <VStack
                borderRightRadius={25}
                h="170px"
                color="white"
                justify="center"
                maxW={64}
                bgColor="blue.500"
              >
                <Text>Debutez maintenant, satisfaction assurée </Text>
                <Button color="blue.400" type="button">
                  Commencez maintenant !
                </Button>
              </VStack>
            </HStack>
          </VStack>
        </VStack>
      </VStack>
    );
};

export default Tarifs;
