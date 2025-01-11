import React, { useRef, useState } from 'react';
import {
  Button,
  Flex,
  FormControl,
  HStack,
  Icon,
  // Image,
  Input,
  Text,
} from '@chakra-ui/react';
import { GrAdd, GrClose, GrSubtract } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { quizzFormActions } from '../rtk/features/BearerToken/QuizzFormSlice';
// import { loadingActions } from '../rtk/features/BearerToken/LoadingSlice';
import axios from 'axios';
import { MdAddAPhoto } from 'react-icons/md';
import { BACKEND_URL } from '../Data';

const ResponseForQuizzForm = ({ idxReponse, idxQuestion, idxDerniereReponse }) => {
  // i represente l'index de la  reponse actuelle
  const dispatch = useDispatch();
  const listeQuestion = useSelector(state => state.quizzForm.listeQuestions /*[idxQuestion].reponses[idxReponse].titre*/);
  const valueState = listeQuestion[idxQuestion].reponses[idxReponse].titre;
  const [state, setState] = useState(valueState);
  const handleChange = e => {
    setState(e.target.value);
    dispatch(quizzFormActions.modifyResponse({ indexQuestion: idxQuestion, indexReponse: idxReponse, reponse: e.target.value }));
  };

  return (
    <HStack>
      <FormControl w='fit-content'>
      <Img idxQuestion={idxQuestion} idxReponse={idxReponse} idxDerniereReponse={idxDerniereReponse} />
      </FormControl>
      <Text>{idxReponse + 1}</Text>
      <FormControl isRequired w='fit-content'>
      <Input
        borderBottomWidth={1}
        name={`reponse-${idxReponse}-question-${idxQuestion}`}
        h={9}
        borderBottomColor="gray.500"
        borderRadius={0}
        key={idxQuestion + 'InputReponseQuestion' + idxReponse}
        type="text"
        value={state}
        onChange={e => handleChange(e)}
      />
      </FormControl>
      <BouttonIcone
        key={idxQuestion + 'bouttonIcone' + idxReponse}
        idxQuestion={idxQuestion}
        h="55px"
        idxReponse={idxReponse}
        idxDerniereReponse={idxDerniereReponse}
      />
    </HStack>
  );
};

export default ResponseForQuizzForm;

export const BouttonIcone = ({ idxQuestion, idxReponse, idxDerniereReponse }) => {
  // let reponses = useSelector(state => state.quizzForm.listeQuestions[idxQuestion].reponses)
  console.log(idxDerniereReponse);
  const dispatch = useDispatch();
  const [state, setState] = useState(1);
  const handleClick = () => {
    if (state || idxReponse === idxDerniereReponse) {
      // ici on vient d'ajouter
      dispatch(quizzFormActions.addEmptyResponse(idxQuestion));
      setState(0);
    } else {
      dispatch(quizzFormActions.removeResponse({ indexQuestion: idxQuestion, indexReponse: idxReponse }));
      // setState(1);
    }
  };
  return (
    <Button type="button" colorScheme="blackAlpha" p={1} borderRadius="50" onClick={() => handleClick()}>
      <Icon as={idxReponse === idxDerniereReponse || state ? GrAdd : GrSubtract} fontSize={14} />
    </Button>
  );
};

export const Img = ({ idxReponse, idxQuestion, idxDerniereReponse }) => {
  const Token = useSelector(state => state.header.token);
  const [state, setState] = useState(false); // a false on a pas d'image a true on en a
  const listeQuestions = useSelector(state => state.quizzForm.listeQuestions);
  let imgSrc = listeQuestions[idxQuestion].reponses[idxReponse].img;
  const file = useRef(null);
  const dispatch = useDispatch();
  console.log('idxReponse : ', idxReponse);
  console.log('idxQuestion : ', idxQuestion);
  const handleChange = e => {
    // dispatch(loadingActions.set(true));
    console.log(e.target.files);
    let formData = new FormData();
    formData.append('addImage', e.target.files[0]);
    console.log({ ...formData });

    axios
      .post(`${BACKEND_URL}/api/picture`, formData, {
        headers: {
          authorization: Token,
        },
      })
      .then(response => {
        console.log(response);
        dispatch(quizzFormActions.modifyResponseImage({ indexQuestion: idxQuestion, indexReponse: idxReponse, img: response.data.url }));
        setState(true);
      });
  };
  const handleClick = () => {
    if (state || imgSrc !== '') {
      console.log('img : ', imgSrc);
      // on est entrain de cliquer sur la croix
      axios
        .delete(`${BACKEND_URL}/api/picture`, {
          data: {
            url: imgSrc,
          },
          headers: {
            authorization: Token,
          },
        })
        .then(response => {
          setState(false);
          dispatch(quizzFormActions.responseImageClear({ indexQuestion: idxQuestion, indexReponse: idxReponse }));
        })
        .catch(err => {
          if (err.response.data.err.code === 'ENOENT') {
            setState(false);
            dispatch(quizzFormActions.responseImageClear({ indexQuestion: idxQuestion, indexReponse: idxReponse }));
          } else {
            console.log(err);
          }
        });
    } else {
      file.current.click();
    }
  };
  return (
    <Flex position="relative" h="40px" w="70px" boxSizing="border-box" borderRadius="5px" borderWidth={1} borderColor="black">
      <Flex
        h="40px"
        w="70px"
        bgSize="contain"
        bgRepeat="no-repeat"
        bgPosition="center"
        bgImage={state || imgSrc !== '' ? "url('" + imgSrc + "')" : ''}
        onClick={() => handleClick()}
        align="center"
        justify="center"
      >
        {state || imgSrc !== '' ? <Icon as={GrClose} cursor="pointer" /> : <Icon as={MdAddAPhoto} />}
      </Flex>
      {/* {state && imgSrc && <Image src={imgSrc} h='40px' w='40px' objectFit="cover" />} */}
      <Input
        type="file"
        name={`image-question-${idxQuestion}-reponse-${idxReponse}`}
        display="none"
        ref={file}
        onChange={e => handleChange(e)}
      />
    </Flex>
  );
};
