import { Heading, HStack, Icon, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const Advantages = ({icone , titre , preview , iconeColor , iconeBg , botom}) => {
  return (
    <HStack justify='start' spacing={10} p={3} bgColor='rgba(255,255,255,0.5)' rounded='2xl'>
        <Icon as={icone} fontSize={52.5} p={2} borderRadius='50%' bgColor={iconeBg} color={iconeColor} />
        <VStack align='start' fontSize={15}>
            <Heading fontSize={27} >{titre}</Heading>
            <Text textAlign='start'>{preview}
            </Text>
            {botom}
        </VStack>
    </HStack>
  )
}

export default Advantages