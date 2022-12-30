import { Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { BackArrow } from '../App';
import Nav from '../components/Nav';
import Examen from './Examen';

const ExamenContainer = props => {
  let a = props.location.search.substr(4);
  //   console.log(a);

  return (
    <>
      <Nav />
      <Text>ExamenContainer {a}</Text>
      <Examen id={parseInt(a)} />
      <BackArrow />
    </>
  );
};

export default ExamenContainer;
