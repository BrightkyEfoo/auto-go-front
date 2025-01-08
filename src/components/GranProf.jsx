import { Box, Button, FormControl, Heading, HStack, Icon, Image, Input, Text, Textarea, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { Field, Formik } from 'formik';
import React, { createContext, useEffect, useState } from 'react';
import { useRef } from 'react';
import { GiCrossMark } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import { ChatBotActions } from '../rtk/features/BearerToken/ChatBotSlice';
import './chatBotStyles.css';
import GrandProfIcon from './granProf.svg';
import { BACKEND_URL } from '../Data';
const appContext = createContext()
const GranProf = ({ idVisite }) => {
  const [isDisplayed, setIsDisplayed] = useState(false);

  const userId = useSelector(state => state.user.id);
  useEffect(()=>{
    const interval = setInterval(() => {
      if(userId && !isDisplayed){
        setIsDisplayed(true)
      }
    }, 780000); // cest sense etre 30min
    return ()=>{
      clearInterval(interval)
    }
  },[userId , setIsDisplayed , isDisplayed])
  return (
    <Box position="fixed" bottom={5} right={20} zIndex={100}>
      <ChatBox display={isDisplayed ? 'flex' : 'none'} close={setIsDisplayed} />
      <Image
        display={isDisplayed ? 'none' : 'block'}
        src={`${BACKEND_URL}/public/images/grandProf.png`}
        cursor="pointer"
        onClick={() => setIsDisplayed(true)}
        alt="grandProf"
        w={75}
        objectFit="cover"
      />
    </Box>
  );
};

export default GranProf;

export const ChatBox = ({ close, display }) => {

  const handleClose = e => {
    e.preventDefault();
    close(false);
  };
  const grandProfButton = useRef(null)
  return (
    <VStack display={display} align="end" boxSizing="border-box">
      <VStack w={300} h={350} bgColor="blue.100" borderWidth={1} borderColor="white">
        <HStack w="full" bgColor="blue.500" p={2} spacing={3}>
          <Box borderRadius="50%" borderColor="white" borderWidth={1} p={1}>
            <Image h={19} objectFit="cover" src={GrandProfIcon} />
          </Box>
          <Heading color="white" as="h5" fontSize={14}>
            Grand Prof
          </Heading>
        </HStack>
        <VStack flexGrow={1} align="start" w="full">
          <MainChatBox closeRef={grandProfButton}/>
        </VStack>
      </VStack>
      <Button
        onClick={e => handleClose(e)}
        type="button"
        borderRadius="50%"
        h="fit-content"
        p={2}
        colorScheme="blackAlpha"
        bgColor="blue.500"
        ref = {grandProfButton}
      >
        <Icon as={GiCrossMark} color="white" m={2} />
      </Button>
    </VStack>
  );
};

export const MainChatBox = ({closeRef}) => {
  const prenoms = useSelector(state => state.user.prenom)
  const pre = prenoms.split(' ').map(p => {
    const d = [...p]
    d[0]=d[0]?.toUpperCase()
    const c = d.join('')
    
    return c
  }).join(' ')
  const userId = useSelector(state => state.user.id);
  // const [firstData, setFirstData] = useState([]);
  const firstData = useSelector(state => state.ChatBot.firstData);
  const dispatch = useDispatch();

  const setFirstData = data => dispatch(ChatBotActions.addData({...data , label :data.label.replace('[prenoms]' , pre)} ));
  useEffect(() => {
    if (userId) {
      dispatch(ChatBotActions.clear())
      axios
        .post(`${BACKEND_URL}/api/chatBot/message/`, {
          message: 'code',  // code pour repertoire du code 
        })
        .then(res => {
          console.log('res', res.data.BotResponse);
          setFirstData(res.data.BotResponse);
         
        });
    } else {
      axios
        .post(`${BACKEND_URL}/api/chatBot/message/`, {
          message: 'Je suis nouveau',
        })
        .then(res => {
          console.log('res', res.data.BotResponse);
          setFirstData(res.data.BotResponse);
         
        });
    }

    // return () => {
    //   second
    // }
  }, [userId]);

  return (
    <VStack id='mainGrandProfChatBox' p={2} h={275} overflowY="scroll" w="full" fontSize={12} className='scrollNone'>
      {Array.isArray(firstData)
        ? firstData.map(data => (
            <Box key={firstData.indexOf(data)} w="full">
              <BotMessage closeRef={closeRef} contenu={data.label} codeAction={data.codeAction} />
              {Array.isArray(data.BotMessages) ? <BotPropositions propositions={data.BotMessages} /> : null}
            </Box>
          ))
        : null}
    </VStack>
  );
};

const BotMessage = ({ contenu, codeAction , closeRef }) => {
  const prenoms = useSelector(state => state.user.prenom)
  const pre = prenoms.split(' ').map(p => {
    const d = [...p]
    d[0]=d[0]?.toUpperCase()
    const c = d.join('')
    
    return c
  }).join(' ')
  const dispatch = useDispatch();
  const setFirstData = data => dispatch(ChatBotActions.addData({...data , label :data.label.replace('[prenoms]' , pre)} ));

  const [tableActions] = useState([
    <Text>
      Notre équipe AUTO-GO est ravie de vous présenter les{' '}
      <Link to={'/services'}>
        <Box as="em" fontWeight={900} textDecoration="underline">
          tarifs et durées de formations
        </Box>
      </Link>
      .
    </Text>,

    <Text>
      Notre équipe AUTO-GO est ravie de vous présenter les documents et éléments nécessaires{' '}
      <a href={'/services'}>
        <Box as="em" fontWeight={900} textDecoration="underline">
          documents et éléments nécessaires
        </Box>
      </a>
      .
    </Text>,

    <VStack align="start" m={0} p={0} bgColor="gray.100" color="blue.500" w="full">
      <Text p={2} color="black">
        {contenu}
      </Text>
      <FirstForm conseiller={true} />
    </VStack>,

    <Text>
      Notre équipe AUTO-GO est ravie de vous apporter des réponses à vos questions. Vu que vous êtes client, nous vous invitons à vous
      connecter à votre compte{' '}
      <Link to={'/connexion'}>
        <Box as="em" fontWeight={900} textDecoration="underline">
          ici
        </Box>
      </Link>
      . Nous aurons ainsi accès à toutes vos informations ce qui nous permettra de vous apporter des réponses sur mesure.
    </Text>,

    <VStack align="start" m={0} p={0} bgColor="gray.100" color="blue.500" w="full">
      <Text p={2} color="black">
        {contenu}
      </Text>
      <FirstForm />
    </VStack>,

    <VStack align="start" m={0} p={0} bgColor="gray.100" color="blue.500" w="full">
      <Text p={2} color="black">
        {contenu}
      </Text>
      <NoteForm />
    </VStack>,

    <VStack align="start" m={0} p={0} bgColor="gray.100" color="blue.500" w="full">
      <Text p={2} color="black">
        {contenu}
      </Text>
      <NoteForm />
    </VStack>,

    //codeAction 8
    <VStack align="start" m={0} p={0} bgColor="gray.100" color="blue.500" w="full">
      <Text p={2} color="black">
        {contenu}
      </Text>
      <Box as='video' controls >
        <source src={`${BACKEND_URL}/public/videos/support1.mp4`} />
      </Box>
    </VStack>,


  ]);
  // console.log(tableActions)

  useEffect(() => {
    if ([1, 2 , 4 , 8].includes(codeAction)) {
      axios
        .post(`${BACKEND_URL}/api/chatBot/message/`, {
          message: 'mon ressenti',
        })
        .then(res => {
          console.log('res', res.data.BotResponse);
          setFirstData(res.data.BotResponse);
         
        });
    }
    if([11,14,18].includes(codeAction)){
      setTimeout(() => {
        closeRef.current.click()
        axios
        .post(`${BACKEND_URL}/api/chatBot/message/`, {
          message: 'code', //nouveau message a pres la fermetture auto
        })
        .then(res => {
          console.log('res', res.data.BotResponse);
          setFirstData(res.data.BotResponse);
         
        });
      }, 5000);
    }
  }, []);

  return (
    <HStack textAlign="left" maxW="85%" p={1} m={1} justify="start" alignSelf="start" bgColor="blue.500" color="gray.100">
      {codeAction ? [11,14,18].includes(codeAction) ? <Text>{contenu}</Text> : tableActions[codeAction - 1] : <Text>{contenu}</Text>}
    </HStack>
  );
};

const UserMessage = ({ contenu, prop, setProps }) => {
  const dispatch = useDispatch();
  const prenoms = useSelector(state => state.user.prenom)
  const pre = prenoms.split(' ').map(p => {
    const d = [...p]
    d[0]=d[0]?.toUpperCase()
    const c = d.join('')
    
    return c
  }).join(' ')
  const setFirstData = data => dispatch(ChatBotActions.addData({...data , label :data.label.replace('[prenoms]' , pre)} ));
  const [disabled, setDisabled] = useState(false);
  const handleClick = e => {
    if (disabled) {
    } else {
      setDisabled(true);
      setProps([prop]);
      axios
        .post(`${BACKEND_URL}/api/chatBot/message/`, {
          message: e.target.innerText,
        })
        .then(res => {
          console.log('res', res.data.BotResponse);
          setFirstData(res.data.BotResponse);
          
        });
    }
  };
  return (
    <HStack
      cursor={disabled ? 'default' : 'pointer'}
      textAlign="left"
      maxW="85%"
      onClick={e => handleClick(e)}
      p={1}
      bgColor="gray.100"
      color="blue.500"
    >
      {contenu}
      <Text>{contenu}</Text>
    </HStack>
  );
};

const BotPropositions = ({ propositions }) => {
  const [props, setProps] = useState(propositions);
  return (
    <VStack w="full" align="end" textAlign="left" p="0px" m="0px">
      {Array.isArray(props)
        ? props.map(p => <UserMessage key={'usermessage' + props.indexOf(p)} setProps={setProps} prop={p} contenu={p.propositionLabel} />)
        : 'null'}
    </VStack>
  );
};

const FirstForm = ({ conseiller }) => {
  const dispatch = useDispatch();
  const prenoms = useSelector(state => state.user.prenom)
  const pre = prenoms.split(' ').map(p => {
    const d = [...p]
    d[0]=d[0]?.toUpperCase()
    const c = d.join('')
    
    return c
  }).join(' ')
  const [isLoading, setIsLoading] = useState(false);
  const setFirstData = data => dispatch(ChatBotActions.addData({...data , label :data.label.replace('[prenoms]' , pre)} ));
  return (
    <Formik
      initialValues={{
        nom1: '',
        prenom1: '',
        phone: '',
        email1: '',
        comment: '',
      }}
      onSubmit={values => {
        setIsLoading(true)
        axios
          .post(`${BACKEND_URL}/api/chatBot/message/`, {
            message: 'mon ressenti',
          })
          .then(res => {
            console.log('res', res.data.BotResponse);
            setFirstData(res.data.BotResponse);
          });
        // console.log(values);
        setIsLoading(false)

      }}
    >
      {({ handleSubmit, errors, touched }) => (
        <form onSubmit={handleSubmit}>
          <FormControl isRequired borderColor="gray.700">
            <Field as={Input} type="text" name="nom1" id="nom1" placeholder="nom" />
          </FormControl>
          <FormControl isRequired borderColor="gray.700">
            <Field as={Input} type="text" name="prenom1" id="prenom1" placeholder="prenom" />
          </FormControl>
          <FormControl isRequired borderColor="gray.700">
            <Field as={Input} type="phone" name="phone" id="phone" placeholder="numero de téléphone" />
          </FormControl>
          <FormControl isRequired borderColor="gray.700">
            <Field as={Input} type="email" name="email1" id="email1" placeholder="email" />
          </FormControl>
          <FormControl isRequired borderColor="gray.700">
            <Field
              as={Textarea}
              name="comment"
              id="comment"
              placeholder={conseiller ? 'préciser l’objet pour lequel vous souhaitez être mis en relation avec un conseiller' : 'comment'}
            />
          </FormControl>
          <Button colorScheme="blue" id="buttonChatbot1" type="submit" bgColor="blue.500" p={2}>
            {isLoading ? <SyncLoader color="#36d7b7" margin={4} size={0} speedMultiplier={1} /> : 'Envoyer'}
          </Button>
        </form>
      )}
    </Formik>
  );
};

const NoteForm = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.id)
  const prenoms = useSelector(state => state.user.prenom)
  const [canSubmit, setCanSubmit] = useState(true)
  const pre = prenoms.split(' ').map(p => {
    const d = [...p]
    d[0]=d[0]?.toUpperCase()
    const c = d.join('')
    
    return c
  }).join(' ')
  const setFirstData = data => dispatch(ChatBotActions.addData({...data , label :data.label.replace('[prenoms]' , pre)} ));
  return (
    <Formik
      initialValues={{
        emailOrNumber: '',
      }}
      onSubmit={values => {
        setCanSubmit(false)
        axios
          .post(`${BACKEND_URL}/api/chatBot/message/`, {
            message: userId ? 'code' :'je suis nouveau',
          })
          .then(res => {
            console.log('res', res.data.BotResponse);
            setFirstData(userId ?res.data.BotResponse :{ ...res.data.BotResponse, label: `Que pouvons nous faire d'autre ?` });
          });
        // console.log(values);
      }}
    >
      {({ handleSubmit, errors, touched }) => (
        <form onSubmit={handleSubmit}>
          <FormControl isRequired borderColor="gray.700" isDisabled={!canSubmit}>
            <Field as={Input} type="text" name="emailOrNumber" id="emailOrNumber" placeholder="email ou numero" />
          </FormControl>
          {canSubmit && <Button colorScheme="blue" id="buttonChatbot2" type="submit" bgColor="blue.500" p={2}>
            Envoyer
          </Button> }
        </form>
      )}
    </Formik>
  );
};
