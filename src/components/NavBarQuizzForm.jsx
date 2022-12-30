import { Button, Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { quizzFormActions } from '../rtk/features/BearerToken/QuizzFormSlice';

const NavBarQuizzForm = ({line}) => {
  const listeQuestions = useSelector(state => state.quizzForm.listeQuestions);
  const questions = listeQuestions.map(q => listeQuestions.indexOf(q)); //c'est juste le tableau des index
  const t = questions.map(q => (
    <BouttonNav key={'boutton' + q} question = {q} />
  ));
  return (
  <Flex w='100%' align='center' maxW='100%' overflow='scroll' >
    {t}
    </Flex>
    )
};

export default NavBarQuizzForm;


export const BouttonNav = ({question}) => { // question ci est l'id de la question correspondante
    const dispatch = useDispatch()
    const handleClick = e => {
        e.preventDefault()
        dispatch(quizzFormActions.setSelected(question))
    }
    const selected = useSelector(state => state.quizzForm.selected)
  return (
    <Button colorScheme="blackAlpha" bgColor={selected === question ? 'blackAlpha.700' : 'blackAlpha.500' } flexGrow={1} borderRadius={0} m={0} type='button' p={1} /*w="fit-content"*/ h="fit-content" maxW={35} onClick={(e) => handleClick(e)} >
      {question+1}
    </Button>
  )
}
