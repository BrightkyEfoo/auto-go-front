import { Box, Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import LogOutHelp from '../components/LogOutHelp'
import NavBar from '../components/NavBar'
import { loadingActions } from '../rtk/features/BearerToken/LoadingSlice'
import { bottomNavBarContainer, mainBoxesStyle } from '../style'



const Help = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadingActions.set(false))
  }, [dispatch])
  
  return (
    <>
    <Box {...mainBoxesStyle('full')}>
      Help
      </Box>
    <Flex {...bottomNavBarContainer}>
        <NavBar />
      </Flex>
      <LogOutHelp />
    </>
  )
}

export default Help