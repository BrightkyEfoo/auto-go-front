import { Box, Flex, Text, useMediaQuery } from '@chakra-ui/react';
import React from 'react';

const LinearProgresBar = ({ color, ratio, borderColor, big }) => {
  const [max870] = useMediaQuery('(max-width : 870px)')
  //value va de 0 a 100
  
  console.log('max870', max870)
  const value = (ratio && 100 * (ratio.split('/')[0] / ratio.split('/')[1]));
  if (big) {
    return (
      <Flex align="center" gap={5} boxSizing='border-box' >
        <Box h="20px" w={max870 ? "150px" : '400px'} position="relative" borderColor={borderColor} borderWidth={1} borderRadius={5} bgColor="white" m={0} p={0}>
          <Box
            h="20px"
            m={0}
            position="absolute"
            top='-1px'
            left="0"
            p={0}
            backgroundColor={color}
            w={value.toString() + '%'}
            borderWidth="1"
            visibility={parseFloat(value) === 0 ? 'hidden' : 'visible'}
            borderColor={color}
            borderRadius={5}
          ></Box>
        </Box>
        <Text fontSize={18}>{ratio}</Text>
      </Flex>
    );
  } else {
    return (
      <Flex align="center" gap={5}>
        <Box h="10px" w="full" position="relative" borderColor={borderColor} borderWidth={1} borderRadius={5} bgColor="white" m={0} p={0}>
          <Box
            h="10px"
            m={0}
            position="absolute"
            top='-1px'
            left="0"
            p={0}
            backgroundColor={color}
            w={value.toString() + '%'}
            borderWidth="1"
            borderColor={color}
            borderRadius={5}
          ></Box>
        </Box>
        <Text>{ratio}</Text>
      </Flex>
    );
  }
};

export default LinearProgresBar;
