import { Box, Flex, HStack, Icon, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { FaRocket } from 'react-icons/fa';

const SuperFastSuperEasy = () => {
  const [max520] = useMediaQuery('(max-width: 520px)');
  if (max520) {
    return (
      <HStack justify="center" mt={110} mb={20}>
        <Flex
          position="relative"
          w="90%"
          align="center"
          justify="center"
          bgColor="white"
          boxShadow="2px 2px 15px 3px rgba(0,0,0,0.8)"
          rounded="xl"
        >
          <Flex
            position="absolute"
            top="-100px"
            align="center"
            justify="center"
            fontSize={30}
            fontWeight={900}
            color="black"
            boxShadow="0px -2px 10px 1px rgba(0,0,0,0.8)"
            h={250}
            w='95%'
            bgColor="blue.400"
            rounded="lg"
            direction="column"
          >
            <Icon as={AiFillStar} fontSize={90} color="white" />
            <Text m={5}>SUPER EASY</Text>
          </Flex>
          <VStack h={500} m='auto' w='90%' justify='center' fontSize={18} p={15}>
            <em>
              "Suivez les cours selon votre emploi de temps journalier, ou que
              vous soyez et passez des tests de connaissance reguliers pour
              rester au top"
            </em>
          </VStack>

          <Flex
            position="absolute"
            bottom="-100px"
            align="center"
            justify="center"
            fontSize={30}
            fontWeight={900}
            color="black"
            boxShadow="0px 2px 10px 2px rgba(0,0,0,0.8)"
            h={250}
            w='95%'
            bgColor="blue.400"
            rounded="lg"
            direction="column"
          >
            <Icon as={FaRocket} fontSize={80} color="white" />
            <Text m={5}>SUPER FAST</Text>
          </Flex>
        </Flex>
      </HStack>
    );
  } else {
    return (
      <Flex align="center" justify="center" mt={15} mb={15}>
        <Flex
          position="relative"
          w="70%"
          p={12}
          align="center"
          justify="center"
          bgColor="white"
          boxShadow="2px 2px 15px 3px rgba(0,0,0,0.8)"
          rounded="xl"
        >
          <Flex
            position="absolute"
            left="-56.25px"
            align="center"
            justify="center"
            fontSize={36}
            fontWeight={700}
            color="black"
            boxShadow="2px 0 10px 2px rgba(0,0,0,0.8)"
            h="97%"
            w={262.5}
            bgColor="blue.400"
            rounded="lg"
            direction="column"
          >
            <Icon as={AiFillStar} fontSize={90} color="white" />
            <Text m={3}>SUPER EASY</Text>
          </Flex>
          <Box w={375} fontSize={18} p={3}>
            <em>
              "Suivez les cours selon votre emploi de temps journalier, ou que
              vous soyez et passez des tests de connaissance reguliers pour
              rester au top"
            </em>
          </Box>

          <Flex
            position="absolute"
            right="-56.25px"
            align="center"
            justify="center"
            fontSize={36}
            fontWeight={700}
            color="black"
            boxShadow="2px 0 10px 2px rgba(0,0,0,0.8)"
            h="97%"
            w={262.5}
            bgColor="blue.400"
            rounded="lg"
            direction="column"
          >
            <Icon as={FaRocket} fontSize={90} color="white" />
            <Text m={3}>SUPER FAST</Text>
          </Flex>
        </Flex>
      </Flex>
    );
  }
};

export default SuperFastSuperEasy;
