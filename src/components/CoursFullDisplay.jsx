import { Box, Heading } from '@chakra-ui/react'
import React from 'react'

const CoursFullDisplay = ({cours}) => {
    console.log(cours)
  return (
    <Box>
        <Heading >Chapitre {cours.id} : {cours.nom.toUpperCase()}</Heading> 
    </Box>
  )
}

export default CoursFullDisplay