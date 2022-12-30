import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
// import { useLocation } from 'react-router-dom';
import LogOutHelp from '../components/LogOutHelp';
import NavBar from '../components/NavBar';
import { bottomNavBarContainer, mainBoxesStyle } from '../style';



const Cours = ({id}) => {
  
  return (
    <>
      <Box {...mainBoxesStyle('full')}>Cours {id} </Box>
      <Flex {...bottomNavBarContainer}>
        <NavBar />
      </Flex>
      <LogOutHelp />
    </>
  );
};

export default Cours;
