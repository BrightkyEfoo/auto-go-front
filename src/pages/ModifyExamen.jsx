import { VStack } from '@chakra-ui/react'
import React from 'react'
import { useParams } from 'react-router-dom'
import ExamenForm from '../components/ExamenForm'

const ModifyExamen = () => {
  const obj = useParams()
  console.log('obj', obj)
  return (
    <VStack pt={50}>
        <ExamenForm ExamenId = {obj.id} />
    </VStack>
  )
}

export default ModifyExamen