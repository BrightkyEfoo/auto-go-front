import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { navStyle } from '../style';
import { topNavView } from '../Data';
import SearchBar from './SearchBar';
import { FiMenu } from 'react-icons/fi';
import { GiCrossMark } from 'react-icons/gi';
const Nav = ({ scrolled }) => {
  
  const [max520] = useMediaQuery('(max-width: 520px)');
  const [menuState , setMenuState] = useState(false)
  const handleClick1 = () => {
    document.getElementById('slideMenu1').style.right=menuState ?'-100vw' :'0'
    setMenuState(!menuState)
  };
  const handleClick2 = () => {
    document.getElementById('slideMenu1').style.right='-100vw'
    setMenuState(false)
  };
  const navigate = useHistory();
  const id = useSelector(state => state.user.id);
  
  const tab = topNavView(id);
  const handleClick = (a, route) => {
      navigate.push(route);
  };
  const t = tab.map(element => {
    return (
      <Link to='#' key={'navSection' + tab.indexOf(element)}>
        <Box
          id={'navSection' + tab.indexOf(element)}
          fontSize = {13.4}
          onClick={() => handleClick(tab.indexOf(element), element.route)}
        >
          {element.title}
        </Box>
      </Link>
    );
  });
  return (
    <HStack id="nav" {...navStyle(scrolled, max520)} zIndex={4}>
      <Flex
        id="searchBarContainer"
        flexGrow={!max520 && 1}
        align="center"
        justify="start"
      >
        <SearchBar />
      </Flex>
      {!max520 ? (
        <HStack spacing={25.46}>{t}</HStack>
      ) : (
        <>
          <Button
            mr={2}
            bgColor="transparent"
            color="white"
            borderColor="white"
            borderWidth={1}
            _hover={{ color: 'black', bgColor: 'gray' }}
            onClick={()=>handleClick1()}
          >
            <Icon as={menuState ? GiCrossMark : FiMenu} color="white" />
          </Button>
          <Flex onClick={()=>handleClick2()} justify='end' id='slideMenu1' position="fixed" w='100vw' bgColor='rgba(0,0,0,0.3)' backdropFilter='blur(5px)'  top="57px" right='-200vw' transition ='all ease 500ms' h='calc(100vh - 57px)' >
            <VStack spacing={4} align='start' bgColor='rgba(0,0,0)' p={6} pr={12}>{t}</VStack>
          </Flex>
        </>
      )}
    </HStack>
  );
};

export default Nav;
