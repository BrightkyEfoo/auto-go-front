import { Button, Flex, Heading, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { GrAddCircle } from 'react-icons/gr';

const TopCardMobileHome = ({ titre, texte }) => {
  const [displayed, setDisplayed] = useState(false);
  const handleClick = () => {
    setDisplayed(!displayed);
  };
  return (
    <VStack mb={25} onBlur={() => setDisplayed(false)} fontSize={16}>
      <VStack
        position="relative"
        w="350px"
        h={displayed ? 'fit-content ' : '350px'}
        boxShadow="0 2px 10px 2px rgba(0,0,0,0.7)"
        p={6}
        pb={displayed ? '75px' : 6}
        overflow={displayed ? 'visible' : 'hidden'}
      >
        <Flex
          direction="column"
          align="center"
          justify="end"
          position="absolute"
          top={0}
          rigth={0}
          w="350px"
          h={displayed ? 'full ' : '350px'}
          bg={
            displayed
              ? 'transparent'
              : 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.75) 75%, rgba(255,255,255) 100%)'
          }
        >
          <Button mb={5} bgColor="blue.500" type="button" onClick={() => handleClick()}>
            <HStack>
              <Icon as={GrAddCircle} /> <Text>{displayed ? 'Lire moins' : 'Lire plus'}</Text>
            </HStack>
          </Button>
        </Flex>
        <Heading textAlign="center" color="blue.500" fontSize={20}>
          {titre}...
        </Heading>
        <Text textAlign="justify">{texte}</Text>
        <Button type="button" colorScheme="purple" alignSelf="center">
          cliquez ici
        </Button>
      </VStack>
    </VStack>
  );
};

export default TopCardMobileHome;
