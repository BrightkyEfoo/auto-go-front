import { HStack, Text, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserActions } from '../rtk/features/BearerToken/UserSlice'
import ExamenScore from './ExamenScore'

const UserAchivement = () => { // c'est le scoreboard d'un simple utilisateur
  const user = useSelector(state => state.user)
  const Token = useSelector(state => state.header.token)
  const dispatch = useDispatch()
  useEffect(() => {
    axios.post('https://autogoback237.herokuapp.com/api/getScores' , {
      userId : user.id
    } , {
      headers:{
        authorization : Token
      }
    }).then(response => {
      console.log('response', response)
      dispatch(UserActions.setScore(response.data.user.ExamenScores))
    }).catch(err => {
      console.log(err)
    })
  
    
  }, [user.id])
  
  return (
    <VStack>
      <Text>{user?.nom} voici les derniers resultats que vous avez fait...</Text>
      <HStack wrap='wrap'>
        {user.ExamenScores.map(Score => {
          return <ExamenScore 
          note = {Score.note}
          ExamTitle = {Score?.Examen?.title}
          nbQuestions = {Score.nbQuestions}
          date = {Score.created}
          tags = {JSON.parse(Score.Examen?.tags)}
          type = {Score.Examen?.type.toLowerCase() === 'examen' ? 'examen' : 'entrainement'}
          examId = {Score?.Examen?.id}
          />
        })}
      </HStack>
    </VStack>
  )
}

export default UserAchivement