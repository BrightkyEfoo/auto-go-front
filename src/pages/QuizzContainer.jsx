import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BackArrow } from '../App';
import Nav from '../components/Nav';
import { postSetLastSeenUrl } from '../Data';
import { reponsesQuizzActions } from '../rtk/features/BearerToken/reponsesQuizzSlice';
import Quizz from './Quizz';

const QuizzContainer = props => {
  let a = props.location.search.substr(4);
  const Token = useSelector(state => state.header.token)
  const userId = useSelector(state => state.user.id)
  const dispatch = useDispatch()
  useEffect(() => {
    axios.post(postSetLastSeenUrl , {
      userId ,
      partieId : parseInt(a)
    },{headers : {
      authorization : Token
    }})

    return ()=>{
      dispatch(reponsesQuizzActions.clearResponse())
    }
  }, [a , userId,Token,dispatch])
  // console.log(a);
  return (
    <>
      <Nav />
      <Quizz ID = {a} />
      <BackArrow/>
    </>
  );
};

export default QuizzContainer;