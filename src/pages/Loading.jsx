import { Flex, Heading, HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { HashLoader } from 'react-spinners';

const Loading = () => {
    const isLoading = useSelector(state => state.loading.isLoading)
        
    return (
    <Flex zIndex={10000} display ={ isLoading ? 'flex' : 'none'} justify='center' align='center' position='fixed' top = {0} left={0} h='100vh' w='100vw' bgColor='blue.500' transition = 'all ease 300ms'>
      <VStack justify='center'>
        <HStack m = {10}>
          <Heading color="white">AUTO</Heading>
          <Heading bgColor="white" color="blue.500" p={3} pl={0} pr={0}>
            GO
          </Heading>
        </HStack>
        <HashLoader color="#fff" loading size={126} speedMultiplier={2} />
      </VStack>
    </Flex>
  );

};

export default Loading;
