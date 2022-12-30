import { Button, HStack, Icon, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
// import { NavigateBefore } from '@mui/icons-material';
import axios from 'axios';
import React, { useState } from 'react';
import { BsPencil } from 'react-icons/bs';
import { FaCheck, FaTrashAlt } from 'react-icons/fa';
import { GiCrossMark } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { Link,/*, useHistory */
useHistory} from 'react-router-dom';
import { deleteActivity, putSetActivityName } from '../Data';
import { BoxToDisplayActions } from '../rtk/features/BearerToken/BoxToDisplaySlice';
import fetchAndReloadThemeAndThemeLoaded from '../rtk/myExtraFeatures/fetchAndReloadThemeAndThemeLoaded';

const LeconRaw = ({ lecon, titre, activites }) => {
  // const navigate = useHistory()
  const dispatch = useDispatch();
  const [canChangeActivityName, setCanChangeActivityName] = useState(false);
  const [previousActivityName, setPreviousActivityName] = useState(lecon.titre);
  const [activityName, setActivityName] = useState(lecon.titre);
  const statut = useSelector(state => state.user.status);
  const Token = useSelector(state => state.header.token);
  const themeLoadedId = useSelector(state => state.boxToDisplay.themeId);
  const handleChangeActivityName = id => {
    if (canChangeActivityName) {
      setCanChangeActivityName(false);
      setActivityName(previousActivityName);
    } else {
      setCanChangeActivityName(true);
      setPreviousActivityName(activityName);
    }

    // putSetActivityName
  };

  const HandleOnChangeActivityName = e => {
    setActivityName(e.target.value);
  };

  const handleSubmitActivityName = () => {
    axios
      .put(
        putSetActivityName,
        { id: lecon.id, titre: activityName },
        {
          headers: {
            authorization: Token,
          },
        }
      )
      .then(res => {
        let id = res.data.partie.id;
        let titre = res.data.partie.titre;
        console.log(res.data)
        dispatch(BoxToDisplayActions.setActivityNameById({ id, titre }));
      })
      .catch(err => console.log(err))
      .finally(()=>{
        setCanChangeActivityName(false);
      })
  };
  const handleDeleteActivity = id => {
    axios
      .delete(deleteActivity, {
        data: { id: id },
        headers: {
          authorization: Token,
        },
      })
      .then(res => {
        console.log(res.data)
        dispatch(BoxToDisplayActions.removeActivityById(id));
        fetchAndReloadThemeAndThemeLoaded(themeLoadedId);
        console.log(themeLoadedId);
        console.log(res);
      })
      .catch(err => console.log(err));
  };
  // const handleClick = (e)=>{
  //   if(e.target === e.currentTarget){
  //     navigate.push(getAllPageACtivites+lecon.id)
  //   }
  // }
  const navigate = useHistory()
  return (
    <HStack
      key={titre + 'lecon' + activites.indexOf(lecon)}
      p={2}
      transition="all ease 500ms"
      _hover={{ bgColor: 'gray.200' , borderColor:'blue.200' }}
      borderRadius="40px"
      borderWidth={1}
      borderColor='gray.200'
      w='45%'
      justify="space-between"
      m={2}
      onClick={e=>{
        if(e.target === e.currentTarget){
          navigate.push('/lecon/?id='+lecon.id)
        }
      }}
    >
      <HStack spacing={5} fontSize={16} >
        <Icon as={FaCheck} visibility={lecon.isCompleted ? 'visible' : 'hidden'} color="blue.500" />
        {canChangeActivityName ? (
          <InputGroup >
            <Input borderColor='black' type="text" w='24vw' h='45px' value={activityName} onChange={e => HandleOnChangeActivityName(e)} />
            <InputRightElement w='fit-content' h='full' p={3}
              children={
                <HStack spacing={3}>
                  <Button borderRadius="50%" p={2} colorScheme="blue" onClick={() => handleSubmitActivityName()}>
                    <Icon as={FaCheck} />
                  </Button>
                  <Button borderRadius="50%" p={2} colorScheme="blackAlpha" onClick={() => handleChangeActivityName()}>
                    <Icon as={GiCrossMark} />
                  </Button>
                </HStack>
              }
            />
          </InputGroup>
        ) : (
          <Link to={'/lecon/?id='+lecon.id} ><Text>{activityName}</Text></Link>
        )}
      </HStack>
      {statut === 1 && (
        <HStack spacing={5}>
          {!canChangeActivityName && (
            <Button colorScheme="blue" borderRadius="50%" p={2} onClick={() => handleChangeActivityName(lecon.id)}>
              <Icon as={BsPencil} />
            </Button>
          )}
          <Button colorScheme="blackAlpha" borderRadius="50%" p={2} onClick={() => handleDeleteActivity(lecon.id)}>
            <Icon as={FaTrashAlt} />
          </Button>
        </HStack>
      )}
    </HStack>
  );
};

export default LeconRaw;
