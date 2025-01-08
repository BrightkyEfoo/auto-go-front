import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  Spinner,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { createContext, useContext, useEffect, useLayoutEffect, useReducer, useState } from 'react';
import { useRef } from 'react';
import { FaArrowDown, FaArrowUp, FaImage, FaMinus, FaPlus, FaVideo } from 'react-icons/fa';
import { GiCrossMark } from 'react-icons/gi';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { BACKEND_URL } from '../Data';
const reducer = (state, { type, data }) => {
  let questions = state.questions;
  switch (type) {
    case 'SET_TITLE':
      return {
        ...state,
        title: data,
      };
    case 'SET_TYPE':
      return {
        ...state,
        type: data,
      };
    case 'ADD_QUESTION': //ici data vaut l'id de la derniere question
      if (!state.questions.filter(({ id }) => id === data + 1)[0]) {
        questions.push({
          id: data + 1,
          title: '',
          explication: '',
          reponses: [
            {
              id: 1,
              title: '',
              valide: false,
            },
          ],
        });
      }
      return {
        ...state,
        questions,
      };
    case 'REMOVE_QUESTION': // ici data vaut juste l'id de la question a retirer.
      state.questions = state.questions.filter(({ id }) => id !== data);
      return {
        ...state,
      };
    case 'SET_QUESTION_TITLE': // data : {questionId , value}
      state.questions.filter(({ id }) => id === data.questionId)[0].title = data.value;
      return {
        ...state,
      };
    case 'SET_QUESTION_EXPLICATION': // data : {questionId , value}
      state.questions.filter(({ id }) => id === data.questionId)[0].explication = data.value;
      return {
        ...state,
      };
    case 'SET_AUDIO': //data : { questionId , media : {id , link , type}}
      state.questions.filter(({ id }) => id === data.questionId)[0].audio = { ...data.media };
      return {
        ...state,
      };
    case 'REMOVE_AUDIO': //data : questionId
      state.questions.filter(({ id }) => id === data)[0].audio = {
        link: '',
        type: 'AUDIO',
      };
      return {
        ...state,
      };
    case 'SET_HEAD': //data : { questionId , media : {id , link , type}}
      state.questions.filter(({ id }) => id === data.questionId)[0].head = { ...data.media };
      return {
        ...state,
      };
    case 'REMOVE_HEAD': //data : questionId
      state.questions.filter(({ id }) => id === data)[0].head = {
        link: '',
        type: 'IMAGE',
      };
      return {
        ...state,
      };
    case 'ADD_REPONSE': //ici data est un objet avec pour prorpietes : questionId et derniereReponseId
      if (
        !state.questions.filter(({ id }) => id === data.questionId)[0].reponses.filter(({ id }) => id === data.derniereReponseId + 1)[0]
      ) {
        state.questions
          .filter(({ id }) => id === data.questionId)[0]
          .reponses.push({
            id: data.derniereReponseId + 1,
            title: '',
            valide: false,
          });
      }
      return {
        ...state,
      };

    case 'REMOVE_REPONSE': //ici data vaut un objet qui a pour cles questionId et reponseId
      state.questions.filter(({ id }) => id === data.questionId)[0].reponses = state.questions
        .filter(({ id }) => id === data.questionId)[0]
        .reponses.filter(({ id }) => id !== data.reponseId);
      return {
        ...state,
      };
    case 'SET_REPONSE_TITLE': //ici data vaut un objet qui a pour cles questionId et reponseId et value
      state.questions.filter(({ id }) => id === data.questionId)[0].reponses.filter(({ id }) => id === data.reponseId)[0].title =
        data.value;
      return {
        ...state,
      };
    case 'SET_VALIDE': //data : {questionId , reponseId}
      state.questions
        .filter(({ id }) => id === data.questionId)[0]
        .reponses.forEach(r => {
          if (r.id === data.reponseId) {
            r.valide = true;
          }
        });
      return {
        ...state,
      };
    case 'REMOVE_VALIDE':
      state.questions
        .filter(({ id }) => id === data.questionId)[0]
        .reponses.forEach(r => {
          if (r.id === data.reponseId) {
            r.valide = false;
          }
        });
      return {
        ...state,
      };
    // state.questions
    //   .filter(({ id }) => id === data.questionId)[0]
    //   .reponses.forEach(r => {
    //     r.valide = false;
    //   });
    // return {
    //   ...state,
    // };
    case 'SET_TAGS':
      return {
        ...state,
        tags: data.tags,
      };
    case 'SET_INITIAL_STATE':
      state = data;
      return {
        ...state,
      };
    case 'SET_DESCRIPTION':
      return {
        ...state , 
        description : data.description
      }
    default:
      return {
        ...state,
      };
  }
};
const appContext = createContext();
const ExamenForm = ({ ExamenId }) => {
  const Token = useSelector(state => state.header.token);
  // const [examen, setexamen] = useState(second)
  const [initialState] = useState({
    id: 1,
    title: '',
    type: 'EXAMEN',
    tags: [''],
    description : '',
    questions: [
      {
        id: 1,
        title: '',
        explication: '',
        head: {
          id: 0,
          link: '',
          type: 'IMAGE',
        },
        audio: {
          id: 0,
          link: '',
          type: 'AUDIO',
        },
        reponses: [
          {
            id: 1,
            title: '',
            valide: false,
          },
        ],
      },
    ],
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (ExamenId) {
      axios
        .get(`${BACKEND_URL}/api/ExamenAndQuestions?ExamenId=${ExamenId}`, {
          headers: {
            authorization: Token,
          },
        })
        .then(res => {
          
          let questions = res.data.questions;
          questions.forEach(q => {
            q.reponses.forEach(r => {
              if (r.valideId) {
                r.valide = true;
              } else {
                r.valide = false;
              }
            });
            q.reponses = q.reponses.filter(r => r.title !== 'NULL RESPONSE SYSTEM');
          });

          dispatch({ type: 'SET_INITIAL_STATE', data: { ...res.data.examen , tags : JSON.parse(res.data.examen.tags), questions } });
          console.log('state', state);
        });
    }
  }, []);

  const handleChangeType = e => {
    dispatch({ type: 'SET_TYPE', data: e.target.value });
  };
  const handleChangeTitle = e => {
    dispatch({ type: 'SET_TITLE', data: e.target.value });
  };
  const navigate = useHistory();
  const handleSubmit = e => {
    e.preventDefault();
    state.tags = JSON.stringify(state.tags)
    console.log(state);
    if (ExamenId) {
      axios
        .delete(`${BACKEND_URL}/api/examen/${ExamenId}`, {
          headers: {
            authorization: Token,
          },
        })
        .then(res => {
          axios
            .post(`${BACKEND_URL}/api/examencreate`, state, {
              headers: {
                authorization: Token,
              },
            })
            .then(res => {
              navigate.goBack();
              console.log('res', res);
            })
            .catch(err => console.log('err', err));
        });
    } else {
      axios
        .post(`${BACKEND_URL}/api/examencreate`, state, {
          headers: {
            authorization: Token,
          },
        })
        .then(res => {
          console.log('res', res);
          navigate.goBack();
        })
        .catch(err => console.log('err', err));
    }
  };
  return (
    <appContext.Provider value={{ state, dispatch }}>
      <VStack fontSize={16} w="full" h="full">
        <Heading as="h2" fontSize={20}>
          {ExamenId ? 'Modifier Examen' : 'Nouvel Examen'}
        </Heading>
        <form onSubmit={e => handleSubmit(e)}>
          <HStack w="90vw" h={650} align="start" m={15} justify="center" spacing={20} position="relative">
            <VStack spacing={5} position="sticky">
              <FormControl isRequired>
                <Input name="title" placeholder={state.title || 'titre...'} onChange={e => handleChangeTitle(e)} value={state.title} />
              </FormControl>

              <FormControl>
                <VStack>
                  <Box as="label" fontSize={18} htmlFor="type">
                    De quel type est ce nouvel examen
                  </Box>
                  <HStack justify="center">
                    <Text>
                      Test
                      <input
                        type="radio"
                        name="type"
                        value="EXAMEN"
                        checked={state.type === 'EXAMEN'}
                        onChange={e => handleChangeType(e)}
                      />
                    </Text>
                    <Text>
                      Entrainement
                      <input type="radio" name="type" value="TEST" checked={state.type === 'TEST'} onChange={e => handleChangeType(e)} />
                    </Text>
                  </HStack>
                </VStack>
              </FormControl>
              <TagInput />
              <FormControl isRequired>
                <Textarea placeholder="description de l'examen" value={state.description} onChange={e => dispatch({type:'SET_DESCRIPTION' , data : {description : e.target.value}})}></Textarea>
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                bgColor="blue.500"
                // onClick={handleSubmit}
                m={4}
                disabled={!state.title || !state.questions.length}
                w="full"
              >
                Enregistrer
              </Button>
            </VStack>
            <VStack position="relative">
              <Text fontSize={18} mb={3} position="sticky">
                Questions
              </Text>
              <VStack overflowY="scroll">
                <QuestionBlock />
              </VStack>
            </VStack>
          </HStack>
        </form>
      </VStack>
    </appContext.Provider>
  );
};

export default ExamenForm;

export const QuestionBlock = () => {
  const { state, dispatch } = useContext(appContext);
  const handleAdd = () => {
    dispatch({ type: 'ADD_QUESTION', data: state.questions.at(-1).id });
  };
  return (
    <VStack>
      {state.questions.map(question => {
        // console.log('question a', question )
        return <Question key={question.id} question={question} />;
      })}
      <Button borderRadius="50%" p={1} onClick={handleAdd}>
        <Icon as={FaPlus} />
      </Button>
    </VStack>
  );
};

export const Question = ({ question }) => {
  const Token = useSelector(state => state.header.token);
  const { state, dispatch } = useContext(appContext);
  const [loading, setLoading] = useState({
    audio: false,
    head: false,
  });
  const handleLoading = e => {
    setLoading(prev => {
      return {
        ...prev,
        [e.target.name]: !prev[e.target.name],
      };
    });
  };
  const handleRemove = () => {
    dispatch({ type: 'REMOVE_QUESTION', data: question.id });
  };
  const handleChange = e => {
    dispatch({ type: 'SET_QUESTION_TITLE', data: { questionId: question.id, value: e.target.value } });
  };
  const handleExplicationChange = e => {
    dispatch({ type: 'SET_QUESTION_EXPLICATION', data: { questionId: question.id, value: e.target.value } });
  };
  const handleAudio = () => {
    if (question.audio?.link) {
      //remove
      dispatch({ type: 'REMOVE_AUDIO', data: question.id });
    } else {
      //add
      audioRef.current.click();
    }
  };
  const handleHead = () => {
    if (question.head?.link) {
      //remove
      dispatch({ type: 'REMOVE_HEAD', data: question.id });
    } else {
      //add
      headRef.current.click();
    }
  };

  const handleAudioChange = e => {
    handleLoading(e);
    let formData = new FormData();
    formData.append('audio', e.target.files[0]);
    console.log({ ...formData });
    axios
      .post(`${BACKEND_URL}/api/examenMedia/audio`, formData, {
        headers: {
          authorization: Token,
        },
      })
      .then(response => {
        // setImageStatus(false);
        console.log(response.data);
        dispatch({ type: 'SET_AUDIO', data: { questionId: question.id, media: response.data.media } });
        // dispatch(UserActions.setUserPhoto(response.data.url));
      })
      .catch(err => console.log('err', err))
      .finally(() => {
        handleLoading(e);
      });
  };
  const handleHeadChange = e => {
    handleLoading(e);
    let formData = new FormData();
    formData.append(`head`, e.target.files[0]);
    console.log({ ...formData });
    axios
      .post(`${BACKEND_URL}/api/examenMedia/${headType.toLocaleLowerCase()}`, formData, {
        headers: {
          authorization: Token,
        },
      })
      .then(response => {
        // setImageStatus(false);
        console.log(response.data);
        dispatch({ type: 'SET_HEAD', data: { questionId: question.id, media: response.data.media } });
        // dispatch(UserActions.setUserPhoto(response.data.url));
      })
      .catch(err => console.log('err', err))
      .finally(() => {
        handleLoading(e);
      });
  };

  const audioRef = useRef(null);
  const headRef = useRef(null);
  const [headType, setHeadType] = useState('IMAGE');
  const [isDisplayed, setIsDisplayed] = useState(false);
  const handleDisplayClick = () => {
    setIsDisplayed(prev => !prev);
  };
  return (
    <VStack
      m={5}
      borderWidth= {2}
      rounded="lg"
      boxShadow={isDisplayed ? '0 0 3px 1px rgba(0 ,0,0,0.4)' : '0 0 0 0 transparent'}
      p={2}
      w = 'full'
      overFlowY="scroll"
    >
      <HStack>
        <Box as="span" w={40} fontSize={14}>
          Question {state.questions.indexOf(question) + 1}{' '}
        </Box>
        <FormControl isRequired>
          <Input type="text" placeholder="question..." value={question.title} onChange={e => handleChange(e)} />
        </FormControl>

        <Button onClick={handleDisplayClick}>
          <Icon as={isDisplayed ? FaArrowUp : FaArrowDown} />
        </Button>
        {state.questions.length > 1 && (
          <Button onClick={handleRemove}>
            <Icon as={FaMinus} />
          </Button>
        )}
      </HStack>
      {isDisplayed && (
        <>
          <FormControl isRequired>
            <Input type="text" placeholder="explication..." value={question.explication} onChange={e => handleExplicationChange(e)} />
          </FormControl>
          <VStack>
            <Text fontSize={20} m={3}>
              Ajoutez des medias
            </Text>
            <HStack align='end'>
              <VStack>
                <Text>Audio</Text>
                {question.audio?.link && (
                  <Box as="audio" controls w={80}>
                    <source src={question.audio?.link} />
                  </Box>
                )}
                <HStack>
                  <Button onClick={handleAudio}>
                    {loading.audio ? (
                      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.100" color="blue.500" size="sm" />
                    ) : (
                      <Icon as={question.audio?.link ? FaMinus : FaPlus} />
                    )}
                  </Button>
                  <Input
                    type="file"
                    name="audio"
                    onChange={e => handleAudioChange(e)}
                    ref={audioRef}
                    display="none"
                    h={0}
                    w={0}
                    p={0}
                    m={0}
                  />
                </HStack>
              </VStack>
              <VStack>
                <Text>Image or Video</Text>
                {question.head?.link &&
                  (question.head?.type === 'IMAGE' ? (
                    <Image src={question.head?.link} alt={question.title} h={200} objectFit="contain" />
                  ) : (
                    <Box as="video" controls h={200}>
                      <source src={question.head?.link} />
                    </Box>
                  ))}
                <HStack>
                  {question.head?.link ? (
                    <Button onClick={handleHead}>
                      <Icon as={FaMinus} />
                    </Button>
                  ) : loading.head ? (
                    <Spinner thickness="4px" speed="0.65s" emptyColor="gray.100" color="blue.500" size="sm" />
                  ) : (
                    <>
                      <Button
                        onClick={() => {
                          setHeadType('VIDEO');
                          handleHead();
                        }}
                      >
                        <Icon as={FaVideo} />
                      </Button>
                      <Button
                        onClick={() => {
                          setHeadType('IMAGE');
                          handleHead();
                        }}
                      >
                        <Icon as={FaImage} />
                      </Button>
                    </>
                  )}
                  <Input type="file" name="head" ref={headRef} onChange={e => handleHeadChange(e)} display="none" h={0} w={0} p={0} m={0} />
                </HStack>
              </VStack>
            </HStack>
          </VStack>
          {question.reponses.map(reponse => {
            // console.log('question aa', question);
            // console.log('reponse a', reponse)
            return <Reponse key={reponse.id} question={question} reponse={reponse} />;
          })}
          {/* <Box w="70%" h="2px" bgColor="black" /> */}
        </>
      )}
    </VStack>
  );
};

export const Reponse = ({ reponse, question }) => {
  const { state, dispatch } = useContext(appContext);
  const handleClick = () => {
    if (state.questions.filter(({ id }) => id === question.id)[0].reponses.at(-1).id === reponse.id) {
      //ajouter une reponse
      dispatch({
        type: 'ADD_REPONSE',
        data: { questionId: question.id, derniereReponseId: state.questions.filter(({ id }) => id === question.id)[0].reponses.at(-1).id },
      });
    } else {
      //retirer la reponse
      dispatch({
        type: 'REMOVE_REPONSE',
        data: { questionId: question.id, reponseId: reponse.id },
      });
    }
  };
  const setValide = () => {
    if (reponse.valide) {
      dispatch({ type: 'REMOVE_VALIDE', data: { questionId: question.id, reponseId: reponse.id } });
    } else {
      dispatch({ type: 'SET_VALIDE', data: { questionId: question.id, reponseId: reponse.id } });
    }
  };
  const handleChange = e => {
    dispatch({ type: 'SET_REPONSE_TITLE', data: { questionId: question.id, reponseId: reponse.id, value: e.target.value } });
  };
  return (
    <HStack bgColor={reponse.valide ? 'blue.500' : 'white'} p={3} w="full" rounded="md">
      <FormControl isRequired>
        <Input
          color="gray.700"
          bgColor="white"
          title="aucune reponse ne peut etre vide... "
          type="text"
          placeholder="reponse..."
          value={reponse.title}
          onChange={e => handleChange(e)}
        />
      </FormControl>
      <Button onClick={handleClick}>
        <Icon as={state.questions.filter(({ id }) => id === question.id)[0].reponses.at(-1).id === reponse.id ? FaPlus : FaMinus} />
      </Button>
      <Box
        w="30px"
        h="30px"
        cursor="pointer"
        onClick={setValide}
        title={
          reponse.valide ? "cliquez pour indiquer que cette reponse n'est pas valide" : 'cliquez pour selectionner comme reponse valide'
        }
        border={`2px ${reponse.valide ? 'white' : 'blue'} solid`}
        bgColor={reponse.valide ? 'blue.500' : 'white'}
      />
    </HStack>
  );
};

const TagInput = () => {
  const [value, setValue] = useState('');
  // const [tags, setTags] = useState(['']);
  const { state, dispatch } = useContext(appContext);
  const tags = state.tags;
  const setTags = (callback) => {

    dispatch({ type: 'SET_TAGS', data: { tags: callback() } });
  };
  const handleChange = e => {
    setValue(e.target.value);
    // setTags(tags.)
    console.log('change', e);
  };
  const handleKeyDown = e => {
    if (e.key === ' ' || e.key === 'Enter') {
      setTags(prev => {
        return [...tags, value.split(' ')].filter(t => t !== ' ');
      });
      setValue('');
    }
  };
  return (
    <VStack w="full" fontSize={14}>
      {tags?.length < 6 && (
        <Input placeholder="ajoutez un tag..." value={value} onChange={e => handleChange(e)} onKeyDown={e => handleKeyDown(e)} />
      )}
      {tags?.length && (
        <>
          <HStack maxWidth={354} spacing={2} flexWrap="wrap">
            {tags?.map(tag => {
              const handleClick = () => {
                setTags(prev => {
                  return [...prev.filter(t => t !== tag)];
                });
              };
              return (
                tag && (
                  <HStack
                    m={3}
                    p={1}
                    pl={3}
                    pr={3}
                    rounded="2xl"
                    boxShadow="0 0 4px 1px rgba(0,0,0,0.4)"
                    key={tags.indexOf(tag) + tag + Math.random()}
                    justify="space-evenly"
                  >
                    <Text>{tag}</Text>
                    <Button colorScheme="blackAlpha" onClick={handleClick} m={1} p={1} borderRadius="50%">
                      <Icon as={GiCrossMark} />
                    </Button>
                  </HStack>
                )
              );
            })}
          </HStack>
          <Text>5 tags maximum</Text>
        </>
      )}
    </VStack>
  );
};
