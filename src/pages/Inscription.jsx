import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import Select from 'react-select';
import { Link, useHistory } from 'react-router-dom';
import React/*, { useRef }*/ from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useDispatch /*, useSelector*/ } from 'react-redux';
import { useFormik } from 'formik';
import axios from 'axios';
import { useState } from 'react';
import { listePays, postAPIInscriptionURL } from '../Data';
import { MdEmail } from 'react-icons/md';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { headerActions } from '../rtk/features/BearerToken/HeaderSlice';
import { UserActions } from '../rtk/features/BearerToken/UserSlice';
import Logo from '../components/logo.svg';
import './phoneInputStyle.css';
const formsErrorsStyle = {
  fontSize: 15,
  color: 'red',
};

let canSubmit = false;
const inputColorStyle = {
  bgColor: 'white',
  mb: 5,
};

const Inscription = () => {
  const dispatch = useDispatch();
  const navigate = useHistory();
  // false : input displayed true selects are displayed
  // const villeSelect = useRef(null);
  const [localisationPaysName, setLocalisationPaysName] = useState('');
  const [localisationRegionName, setLocalisationRegionName] = useState('');
  const [localisationVille, setLocalisationVille] = useState('');
  const [localisation, setLocalisation] = useState('');
  const [localisationState, setLocalisationState] = useState(false);
  const handleSetLocalisation = nomVille => {
    setLocalisationVille(nomVille);
    setLocalisation(localisationRegionName + ' ' + localisationPaysName + ' - ' + nomVille);
    setLocalisationState(false);
  };

  const tabPays = listePays.map(pays =>
    // <option key={'pays' + listePays.indexOf(pays)} value={pays.nom}>
    //   {pays.nom}
    // </option>
    ({ value: pays.nom, label: pays.nom })
  );

  const tabRegions = nomPays => {
    return listePays.filter(pays => pays.nom === nomPays)[0].regions.map(region => ({ value: region.nom, label: region.nom }));
  };
  const tabVille = (nomPays, nomRegion) => {
    return (
      listePays.filter(pays => pays.nom === nomPays).length > 0 &&
      listePays.filter(pays => pays.nom === nomPays)[0].regions.filter(region => region.nom === nomRegion).length > 0 &&
      listePays
        .filter(pays => pays.nom === nomPays)[0]
        .regions.filter(region => region.nom === nomRegion)[0]
        .villes.map(ville => ({ value: ville, label: ville }))
    );
  };
  const formik = useFormik({
    initialValues: {
      password: '',
      nom: '',
      prenom: '',
      birthDate: '',
      phone: '',
      email: '',
      password2: '',
      localisation: '',
      sexe: '',
    },
    onSubmit: values => {
      setSubmitLoad(true);
      values.phone = phoneState;
      values.localisation = localisation
      values.sexe = sexe
      console.log(values);
      axios
        .post(postAPIInscriptionURL, values)
        .then(response => {
          console.log(response.data.msg, response.data.token);
          dispatch(headerActions.set('Bearer ' + response.data.token));
          dispatch(UserActions.set(response.data.user));
          navigate.push('/account');
          setSubmitLoad(false);
        })
        .catch(err => {
          console.log(err.response.data)
          setErrorPostState(err.response.data.msg);
          setSubmitLoad(false);
          document.getElementById('errorContainer').style.top = '0px';
        });
    },
    validate: values => {
      let errors = {};
      canSubmit = true;
      if (values.password.length < 8) {
        errors.password = 'Au moins 8 characteres';
        canSubmit = false;
      }
      if (!/^[a-zA-Z][0-9a-zA-Z._-]+@[a-zA-Z][a-zA-Z0-9_.-]+\.[a-zA-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'veuillez saisir un email valide';
        canSubmit &&= false;
      }
      if (values.password !== values.password2) {
        errors.password2 = 'pas de concordance';
        canSubmit &&= false;
      }
      return errors;
    },
    // validationSchema
  });
  const [sexe, setSexe] = useState('M')
  const [phoneState, setPhoneState] = useState('');
  const [errorPostState, setErrorPostState] = useState('');
  const [passState, setPassState] = useState(false);
  const [submitLoad, setSubmitLoad] = useState(false);
  const [passType, setPassType] = useState('password');
  const phoneHandleChange = () => {
    let a = document.querySelectorAll('.form-control')[0];
    setPhoneState(a.value);
  };
  const handleBlurError = () => {
    document.getElementById('errorContainer').style.top = '-150vh';
  };
  const handleDisableView = () => {
    setPassState(false);
    setPassType('password');
    // document.getElementById('password').
  };
  const handleView = () => {
    setPassState(true);
    setPassType('text');
  };
  // console.log(formik.errors);
  return (
    <VStack bg="white" align="center" justify="center" spacing={5} pb={10} pt={10}>
      <Flex
        w="100vw"
        h="100vh"
        onClick={() => handleBlurError()}
        bgColor="#6967679b"
        id="errorContainer"
        align="center"
        justify="center"
        zIndex={999}
        position="fixed"
        top="-150vh"
        transition="all ease 700ms"
      >
        <Flex h={50} w={300} id="errorBlock" color="red" fontSize={25} bgColor="white" rounded="lg" align="center" justify="center">
          <Text textAlign="center">{errorPostState}</Text>
        </Flex>
      </Flex>
      <Link to="/">
        <Image src={Logo} alt="logo" borderRadius="full" boxSize="100px" bgColor="transparent" />
      </Link>
      <Text>Nouveau chez autogo?</Text>
      <VStack bgColor="gray.100" p={5} spacing={5} rounded="xl">
        <form
          onSubmit={e => {
            e.preventDefault();
            return formik.handleSubmit();
          }}
        >
          <FormControl isRequired>
            <FormLabel htmlFor="nom">Nom</FormLabel>
            <Input
              width={600}
              type="text"
              id="nom"
              name="nom"
              {...inputColorStyle}
              onChange={formik.handleChange}
              value={formik.values.nom}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="prenom">Prenom</FormLabel>
            <Input type="text" id="prenom" name="prenom" {...inputColorStyle} onChange={formik.handleChange} value={formik.values.prenom} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="sexe">Sexe : </FormLabel>
            <HStack>
              <HStack>
                <Text>Masculin : </Text>
                <input type="radio" name="sexe" id="sexeMasculin" value="M" onClick={()=>setSexe('M')} />
              </HStack>
              <HStack>
                <Text>Feminin : </Text>
                <input type="radio" name="sexe" id="sexeFeminin" value="F" onClick={()=>setSexe('F')}/>
              </HStack>
            </HStack>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="localisation">Localisation : </FormLabel>
            {!localisationState ? (
              <Input
                bgColor="white"
                type="text"
                onChange={e => setLocalisation(e.target.value)}
                value={localisation}
                onClick={() => setLocalisationState(true)}
              />
            ) : (
              <HStack align="center" justify="center" textAlign="start" w="600px">
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  defaultValue={tabPays[0]}
                  isLoading={true}
                  isClearable={true}
                  isSearchable={true}
                  name="pays"
                  options={tabPays}
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                  onChange={choice => setLocalisationPaysName(choice.value)}
                />
                {localisationPaysName !== '' && (
                  <>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      defaultValue={tabRegions(localisationPaysName)[0]}
                      isLoading={true}
                      isClearable={true}
                      isSearchable={true}
                      name="regions"
                      options={tabRegions(localisationPaysName)}
                      menuPortalTarget={document.body}
                      styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                      onChange={choice => setLocalisationRegionName(choice.value)}
                    />
                    {localisationRegionName !== '' && (
                      <>
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          isLoading={true}
                          isClearable={true}
                          isSearchable={true}
                          name="regions"
                          options={tabVille(localisationPaysName, localisationRegionName)}
                          menuPortalTarget={document.body}
                          styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                          onChange={choice => handleSetLocalisation(choice.value)}
                        />
                      </>
                    )}
                  </>
                )}
              </HStack>
            )}
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">email</FormLabel>
            <InputGroup>
              <InputLeftElement children={<MdEmail />} />
              <Input
                type="email"
                id="email"
                name="email"
                {...inputColorStyle}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </InputGroup>
            {formik.errors.email && formik.touched.email ? <Box {...formsErrorsStyle}>{formik.errors.email}</Box> : null}
          </FormControl>
          <FormControl id="phone" isRequired zIndex={45} mb={5}>
            <FormLabel htmlFor="phone">phone</FormLabel>

            <PhoneInput country={'cm'} value={phoneState} onChange={() => phoneHandleChange()} type="text" name="phone" />
            {/* <Input type='phone' id='phone' name='phone' onChange={formik.handleChange} value={formik.values.phone}/> */}
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="birthDate">date de naissance</FormLabel>
            <Input
              type="date"
              id="birthDate"
              name="birthDate"
              {...inputColorStyle}
              onChange={formik.handleChange}
              value={formik.values.birthDate}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">mot de passe</FormLabel>
            <InputGroup>
              <Input
                type={passType}
                id="password"
                name="password"
                {...inputColorStyle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <InputRightElement
                children={
                  !passState ? (
                    <AiFillEye id="openEye" onClick={() => handleView()} transition="all ease 350ms" />
                  ) : (
                    <AiFillEyeInvisible id="closeEye" onClick={() => handleDisableView()} transition="all ease 350ms" />
                  )
                }
              />
            </InputGroup>
            {formik.errors.password && formik.touched.password ? <Box {...formsErrorsStyle}>{formik.errors.password}</Box> : null}
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password2">retapez votre mot de passe</FormLabel>
            <Input
              type="password"
              id="password2"
              name="password2"
              {...inputColorStyle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password2}
            />
            {formik.errors.password2 && formik.touched.password2 ? <Box {...formsErrorsStyle}>{formik.errors.password2}</Box> : null}
          </FormControl>

          <Button
            margin="10px"
            type="submit"
            p={3}
            width="70%"
            rounded="3xl"
            bgColor="blue.400"
            color="white"
            fontWeight="500"
            {...{ disabled: canSubmit ? false : 'disabled' }}
            _hover={{ bgColor: canSubmit ? 'blue.500' : 'red.300' }}
          >
            {submitLoad ? <Spinner thickness="4px" speed="0.65s" emptyColor="gray.100" color="blue.500" size="md" /> : 'Valider'}
          </Button>
        </form>
      </VStack>
      <Link to="/connexion">
        <Text cursor="pointer">Non j'ai deja un compte</Text>
      </Link>
    </VStack>
  );
};

export default Inscription;
