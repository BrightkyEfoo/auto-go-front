import axios from 'axios';
import React , { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BackArrow } from '../App';
import Nav from '../components/Nav';
import { postSetLastSeenUrl } from '../Data';
import Lecon from './Lecon';

const LeconContainer = props => {
  const Token = useSelector(state => state.header.token)
  const userId = useSelector(state => state.user.id)
  let a = props.location.search.substr(4)

  useEffect(() => {
    axios.post(postSetLastSeenUrl , {
      userId ,
      partieId : parseInt(a)
    },{headers : {
      authorization : Token
    }})
  }, [a , userId,Token])
  
  // console.log(a);
  return (
    <>
      <Nav />
      <Lecon ID = {a} />
      <BackArrow/>
    </>
  );
};

export default LeconContainer;