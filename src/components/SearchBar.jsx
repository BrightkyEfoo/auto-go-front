import { Box, HStack, Icon, Input, useMediaQuery } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { GiCrossMark } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { getSearch } from '../Data';
import { NavBarActions } from '../rtk/features/BearerToken/NavBarSlice';
import { webSmText } from '../style';
import SearchResults from './SearchResults';
const SearchBar = () => {
  const Token = useSelector(state => state.header.token)
  const searchBarDisplay = useSelector(state => state.navBar.searchBarDisplay);
  const [max520] = useMediaQuery('(max-width: 520px)');
  const dispatch = useDispatch();
  const [searchBarValue, setsearchBarValue] = useState('');
  const [searchBarLengthState, setSearchBarLengthState] = useState(null);
  const handleClick = () => {
    dispatch(NavBarActions.searchBarDisplaySet(true));
  };
  const [dataResults, setDataResults] = useState({})
  const handleGetout = e => {
    dispatch(NavBarActions.searchBarDisplaySet(false));
  };
  const handleChange = e => {
    if (e.target.value === ' ') {
      setsearchBarValue(null);
    } else {
      setsearchBarValue(e.target.value);
      if(e.target.value.length > 4) {
        axios.get(getSearch + e.target.value,{
          headers : {
            authorization : Token,
          }
        }).then(res=>{
          setDataResults(res.data)
          console.log(res.data)
        })
      }
    }
    if (searchBarValue.length < 3) {
      setSearchBarLengthState('false');
    } else {
      setSearchBarLengthState('true');
    }
  };
  return (
    <HStack id="search" w="fit-content" borderColor="white" borderWidth={searchBarDisplay && 2} p={2} h={26.8} fontSize={13.4} >
      {!searchBarDisplay && <Icon as={FaSearch} color="white" onClick={() => handleClick()} cursor="pointer" />}
      {searchBarDisplay && (
        <>
          <Input
            id="searchBar"
            type="text"
            w={max520 ? 150 : 300}
            h={max520 ? 7 : 8}
            fontSize={max520 && 10.5}
            borderStyle="none"
            placeholder="eg : les paneaux"
            value={searchBarValue}
            color="white"
            onChange={e => handleChange(e)}
            _focusVisible={{ border: 'none' }}
          />
          {searchBarLengthState && 
            <Box position="fixed" top={61} left={0} bgColor="rgba(0,0,0,0.4)" backdropFilter='blur(5px)' color="white" rounded = 'lg' p={5} w={max520 ? 150 : 350} fontSize={max520 && 10.5}>
              {searchBarLengthState === 'true' ? 'resultats'  :  'veuillez saisir plus de 3 caracteres' }
            
            {searchBarLengthState ==='true' && <SearchResults dataResults={dataResults} /> }
            </Box>
          }
        </>
      )}
      {searchBarDisplay && <Icon as={GiCrossMark} fontSize={webSmText} color="white" onClick={e => handleGetout(e)} />}
    </HStack>
  );
};

export default SearchBar;
