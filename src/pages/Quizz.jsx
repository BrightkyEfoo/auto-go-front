import { Box, Flex} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import MainActivity from '../components/MainActivity';
import NavBarForActivities from '../components/NavBarForActivities';
import { getAllPageACtivites } from '../Data';
import { chapAndCourseDisplayedActions } from '../rtk/features/BearerToken/chapAndCourseDisplayed';
import { loadingActions } from '../rtk/features/BearerToken/LoadingSlice';
import { PageActivityLoadedActions } from '../rtk/features/BearerToken/PageActivityLoadedSlice';
import { fondNoir } from '../style';
const Quizz = ({ ID }) => {
  // const dataPage = useSelector(state => state.pageActivityLoaded);
  const Token = useSelector(state => state.header.token);
  const dispatch = useDispatch();
  const chapitreId = useSelector(state => state.pageActivityLoaded.ChapitreId)

  
  
  useEffect(() => {
    dispatch(loadingActions.set(true))
    axios
      .get(getAllPageACtivites + ID, {
        headers: {
          authorization: Token,
        },
      })
      .then(res => {
        let obj = res.data.partie;
        obj.Chapitre = res.data.chapitre;
        console.log(obj)
        dispatch(PageActivityLoadedActions.setAll(obj));
      })
      .catch(err => console.log(err))
      .finally(()=>{
        dispatch(loadingActions.set(false))
      })
  }, [ID, Token, dispatch]);
  // console.log(dataPage);
  

  useEffect(() => {
    dispatch(chapAndCourseDisplayedActions.setEnCours({activiteId : ID , chapitreId}))
  
    return () => {
      dispatch(chapAndCourseDisplayedActions.setEnCours({activiteId : ID , chapitreId}))
    }
  }, [ID , dispatch , chapitreId])
  
  return (
    <Box mt="42px" w="100vw">
      <Flex p={0} m ={0} w='100vw' h='100vh' position='relative'>
      <NavBarForActivities />
      <MainActivity/>
      
      </Flex>
      <Box Box bgImage={'url('+fondNoir+')'} pt={1} bgRepeat='no-repeat' bgSize='cover'>
      <Footer/>
      </Box>
    </Box>
  );
};

export default Quizz;
