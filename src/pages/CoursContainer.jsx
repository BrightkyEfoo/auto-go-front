import React from 'react';
import { BackArrow } from '../App';
import Nav from '../components/Nav';
import Cours from './Cours';

const CoursContainer = (props) => {
    let a = props.location.search.substr(4)
    console.log(a)
  return (
    <>
      <Nav />
      <Cours id = {a}/>
      <BackArrow/>
    </>
  );
};

export default CoursContainer;
