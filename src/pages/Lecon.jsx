import { Box, Flex} from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MainActivity from '../components/MainActivity'
import NavBarForActivities from '../components/NavBarForActivities'
import { getAllPageACtivites } from '../Data'
import { PageActivityLoadedActions } from '../rtk/features/BearerToken/PageActivityLoadedSlice'
import Footer from '../components/Footer'
import { fondNoir } from '../style'
import { chapAndCourseDisplayedActions } from '../rtk/features/BearerToken/chapAndCourseDisplayed'
import { loadingActions } from '../rtk/features/BearerToken/LoadingSlice'

const Lecon = ({ID}) => {
  const chapitreId = useSelector(state => state.pageActivityLoaded.ChapitreId)
  const Token = useSelector(state => state.header.token)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadingActions.set(true))
    axios.get(getAllPageACtivites+ID , {
      headers :{
        authorization : Token
      }
    } ).then(res=> {
      let obj = res.data.partie
      obj.Chapitre = res.data.chapitre
      dispatch(PageActivityLoadedActions.setAll(obj))
    }).catch(err => console.log(err))
    .finally(()=>{
      dispatch(loadingActions.set(false))
    })

  }, [ID , Token , dispatch])
  // const dataPage = useSelector(state => state.pageActivityLoaded)
  // console.log(dataPage)
  useEffect(() => {
    
  dispatch(chapAndCourseDisplayedActions.setEnCours({activiteId : ID , chapitreId}))
  
    return () => {
      
  dispatch(chapAndCourseDisplayedActions.setEnCours({activiteId : ID , chapitreId}))
    }
  }, [ID , chapitreId, dispatch])
  
  return (
    <Box mt="42px" w="100vw">
      <Flex p={0} m ={0} w='100vw' h='100vh' position='relative'>
      <NavBarForActivities />
      <MainActivity/>
      
      </Flex>
      <Box bgImage={'url('+fondNoir+')'} pt={1} bgRepeat='no-repeat' bgSize='cover'>
      <Footer/>
      </Box>
    </Box>
  )
}

export default Lecon