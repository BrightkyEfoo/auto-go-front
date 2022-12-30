import { Box } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { appContext } from '../pages/Examen';

const TimeBarExamen = ({ w, h, time }) => {
  const [timeLeft, setTimeLeft] = useState(time);
  
  const idxQuestionActuelle = useSelector(state => state.Examen.questionActuelle);
  useEffect(() => {
    
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 40 ? prev - 40 : 0));
    }, 40);
    
    return ()=>{
      clearInterval(timer)
      setTimeLeft(time)
    }
  }, [idxQuestionActuelle , time]);

  return (
    <Box boxSizing="borderBox" position="sticky" w={w} h={h} borderWidth={1} borderColor={timeLeft / time > 0.5 ? 'blue.500' : 'red.500'}>
      <Box bgColor={timeLeft / time > 0.3 ? 'blue.500' : 'red.500'} w={(timeLeft * 100) / time + '%'} h="full"></Box>
    </Box>
  );
};

export default TimeBarExamen;
