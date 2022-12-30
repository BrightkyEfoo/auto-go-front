import { Box, Flex} from '@chakra-ui/react';
// import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch/*, useSelector */} from 'react-redux';
import Footer from '../components/Footer';
// import MainActivity from '../components/MainActivity';
import MainChapitre from '../components/MainChapitre';
import NavBarForActivities from '../components/NavBarForActivities';
// import { getAllPageACtivites, getChapById } from '../Data';
import { chapAndCourseDisplayedActions } from '../rtk/features/BearerToken/chapAndCourseDisplayed';
// import { PageActivityLoadedActions } from '../rtk/features/BearerToken/PageActivityLoadedSlice';
// import { ThemeLoadedActions } from '../rtk/features/BearerToken/ThemeLoadedSlice';
// import fetchAndReloadThemeAndThemeLoaded from '../rtk/myExtraFeatures/fetchAndReloadThemeAndThemeLoaded';
import { fondNoir } from '../style';



const Chapitre = ({ ID , themeID}) => {
  // const dataPage = useSelector(state => state.pageActivityLoaded);
  // const Token = useSelector(state => state.header.token);
  // const themeID = useSelector(state => state.themeLoaded.id)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(chapAndCourseDisplayedActions.setEnCours({activiteId : 0 , chapitreId : ID}))
  
    return () => {
      dispatch(chapAndCourseDisplayedActions.setEnCours({activiteId : 0 , chapitreId : ID}))
    }
  }, [dispatch , ID])
  
 

  // useEffect(() => {
  //   axios
  //     .get(getChapById + ID, {
  //       headers: {
  //         authorization: Token,
  //       },
  //     })
  //     .then(res => {
  //       let themeID = res.data.chapitre.ThemeId
  //       fetchAndReloadThemeAndThemeLoaded(themeID)
  //     })
  //     .catch(err => console.log(err));
  // }, [ID, Token]);
  // console.log(dataPage);
  return (
    <Box mt="42px" w="100vw" >
      <Flex p={0} m ={0} w='100vw' h='100vh' position='relative'>
      <NavBarForActivities chapitre = {true} />

      
      <MainChapitre ID = {ID} themeID = {themeID} />
      
      </Flex>
      <Box Box bgImage={'url('+fondNoir+')'} pt={1} bgRepeat='no-repeat' bgSize='cover'>
      <Footer/>
      </Box>
    </Box>
  );
};

export default Chapitre;
