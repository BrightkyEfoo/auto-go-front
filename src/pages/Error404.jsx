import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import LogOutHelp from '../components/LogOutHelp';
import NavBar from '../components/NavBar';
import { bottomNavBarContainer, mainBoxesStyle } from '../style';

const Error404 = () => {
  return (
    <>
      <Box {...mainBoxesStyle('full')}>Error404</Box>
      <Flex {...bottomNavBarContainer}>
        <NavBar />
      </Flex>
      <LogOutHelp />
    </>
  );
};

export default Error404;
