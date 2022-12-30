import { Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { BackArrow } from '../App';
import Nav from '../components/Nav';
import Entrainement from './Entrainement';

const EntrainementContainer = props => {
  let a = props.location.search.substr(4);
  //   console.log(a);

  return (
    <>
      <Nav />
      <Text>ExamenContainer {a}</Text>
      <Entrainement id={parseInt(a)} />
      <BackArrow />
    </>
  );
};

export default EntrainementContainer;
