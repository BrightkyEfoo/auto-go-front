import { Button, HStack, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const UserExamen = () => {
  const status = useSelector(state => state.user.status);
  const navigate = useHistory();
  return (
    <VStack justify="center" h="full">
      <HStack justify="center">
        <TypeExamBox
          bgColor="gray.100"
          bgColorH="gray.500"
          color="black"
          colorH="white"
          Title={"Tests d'examen"}
          route="/examens"
          More={`Dans cette section vous aurez l'occasion de vous confronter a un examen avec des conditions similaire a celles de votre examen final, ceci dans l'optique de vous mettre en condition d'examen`}
        />

        <TypeExamBox
          bgColor="blue.100"
          bgColorH="blue.500"
          color="black"
          colorH="white"
          route="/entrainements"
          Title={"Entrainements d'examen"}
          More={`Ici vous pourrez suivre nos examens d'entrainement tous similaires a l'examen final, ceci dans l'optique de vous mettre en condition d'examen`}
        />
      </HStack>
      {status && (
        <HStack>
          <Button
            bgColor="gray.100"
            transition="all ease 300ms"
            _hover={{ bgColor: 'gray.500' }}
            onClick={() => navigate.push('/examens/modify')}
          >
            Modifier
          </Button>
        </HStack>
      )}
    </VStack>
  );
};

export default UserExamen;

const TypeExamBox = ({ bgColorH, bgColor, color, colorH, Title, More, route }) => {
  const navigate = useHistory();
  const handleMouseEnter = () => {
    setIsDisplayed(true);
  };
  const handleMouseLeave = () => {
    setIsDisplayed(false);
  };
  const [isDisplayed, setIsDisplayed] = useState(false);
  return (
    <VStack
      position="relative"
      justify="center"
      cursor="pointer"
      w="300px"
      minH="200px"
      rounded="md"
      color={color}
      transition="all ease 350ms"
      bgColor={bgColor}
      _hover={{ color: colorH, bgColor: bgColorH }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      p={5}
      onClick={() => navigate.push(route)}
    >
      <Text>{Title}</Text>
      <VStack transition="all ease 350ms" display={isDisplayed ? 'flex' : 'none'}>
        <Text fontSize={14} textAlign="justify">
          {More}
        </Text>
      </VStack>
    </VStack>
  );
};
