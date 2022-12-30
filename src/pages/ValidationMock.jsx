import { Box, Button, Heading, HStack, Input } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';

const ValidationMock = () => {
  const [numValue, setNumValue] = useState('');
  const [codeValue, setCodeValue] = useState('');
  return (
    <Box>
      <Heading>Faux de paiement Om ou Momo</Heading>
      <HStack justify='center'>
        <Button
          m={5}
          colorScheme="blue"
          onClick={() => {
            axios
              .post('https://autogoback237.herokuapp.com/api/payment/succes', {
                userId: numValue,
                code: codeValue,
              })
              .then(res => {
                console.log('res : ', res.data);
              })
              .catch(err => {
                console.log('err', err);
              });
          }}
        >
          Reussir le Paiement
        </Button>
        <Button
          m={5}
          colorScheme="red"
          onClick={() => {
            axios
              .post('https://autogoback237.herokuapp.com/api/payment/error', {
                userId: numValue,
                code: codeValue,
              })
              .then(res => {
                console.log('res : ', res.data);
              })
              .catch(err => {
                console.log('err', err);
              });
          }}
        >
          Ratter le Paiement
        </Button>
      </HStack>
      <Input w={40} type="text" placeholder="id" value={numValue} onChange={e => setNumValue(e.target.value)} m={10} />
      <Input w={40} type="text" placeholder="code du pack" value={codeValue} onChange={e => setCodeValue(e.target.value)} />
    </Box>
  );
};

export default ValidationMock;
