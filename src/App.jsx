import React, { /*useEffect, */ useEffect, useState } from 'react';
import { Box, Button, Icon } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route, /* useLocation,*/ useHistory } from 'react-router-dom';
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';
import Account from './pages/Account';
import Home from './pages/Home';
import Nav from './components/Nav';
import './style.css';
import Services from './pages/Services';
import About from './pages/About';
import Profile from './pages/Profile';
import Help from './pages/Help';
import Error404 from './pages/Error404';
import CoursContainer from './pages/CoursContainer';
import CreateTheme from './pages/CreateTheme';
import ThemeContainer from './pages/ThemeContainer';
import { FaArrowLeft } from 'react-icons/fa';
// import { DisplayActivityActions } from './rtk/features/BearerToken/DisplayActivitySlice';
import { useSelector } from 'react-redux';
// import { BoxToDisplayActions } from './rtk/features/BearerToken/BoxToDisplaySlice';
import LeconContainer from './pages/LeconContainer';
import QuizzContainer from './pages/QuizzContainer';
import ChapitreContainer from './pages/ChapitreContainer';
import Loading from './pages/Loading';
import axios from 'axios';
import { postGetOfflineURL, postIMConnecting } from './Data';
import ValidationMock from './pages/ValidationMock';
import GranProf from './components/GranProf';
import TestsExamens from './pages/TestsExamens';
import ExamenContainer from './pages/ExamenContainer';
import EntrainementContainer from './pages/EntrainementContainer';
import TestsEntrainements from './pages/TestsEntrainements';
import ModifyExams from './pages/ModifyExams';
import CreateExamen from './pages/CreateExamen';
import ModifyExamen from './pages/ModifyExamen';
// import { io, Socket } from 'socket.io-client';
// import TextEditor from './pages/TextEditor.tsx';

const idVisite = Math.floor(Math.random() * 1e100);
function App() {
  // const socket = io('https://autogoback237.herokuapp.com');
  // // socket.connect()
  // socket.emit('Connecte')
  // socket.emit()
  // const dispatch = useDispatch();
  useEffect(() => {
    // socket.emit('Connecte')
    console.log('idVisite', idVisite);
    axios
      .post(postIMConnecting, {
        id: idVisite,
      })
      .then(res => {
        console.log('res :', res.data);
      })
      .catch(err => console.log('err', err.response.data));
  }, []);

  const Token = useSelector(state => state.header.token);
  const userId = useSelector(state => state.user.id);

  useEffect(() => {
    const handleTabClose = event => {
      event.preventDefault();
      axios
        .post(
          postGetOfflineURL,
          {
            userId,
          },
          {
            headers: {
              authorization: Token,
            },
          }
        )
        .then(res => console.log('res', res));
      console.log('beforeunload event triggered');

      return (event.returnValue = '');
    };

    window.addEventListener('beforeunload', handleTabClose);

    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, [Token, userId]);

  const [scrolled, setScrolled] = useState(false);
  // const dispatch = useDispatch();
  const handleScroll = () => {
    if (document.body.getBoundingClientRect().y < 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  // window.addEventListener('popstate', () => {
  //   dispatch(DisplayActivityActions.set(false));
  //   dispatch(BoxToDisplayActions.clear());
  // });
  // const isLoading = useSelector(state => state.loading.isloading)

  document.addEventListener('scroll', () => handleScroll());
  return (
    <Router>
      <Loading />
      <Box textAlign="center" fontSize="xl" scrollBehavior="smooth" position="relative">
        <GranProf idVisite={idVisite} />
        <Switch>
          <Route path="/cours/:id?" component={CoursContainer} />
          <Route exact path="/connexion">
            <Connexion />
          </Route>

          <Route path="/theme/:id?" component={ThemeContainer} />

          <Route exact path="/createtheme">
            <BackArrow />
            <Nav scrolled={scrolled} />
            <CreateTheme />
          </Route>

          <Route path="/lecon/:id?" component={LeconContainer} />

          <Route path="/quizz/:id?" component={QuizzContainer} />
          <Route path="/chapitre/:id?" component={ChapitreContainer} />

          <Route exact path="/account">
            <BackArrow />
            <Nav scrolled={scrolled} />
            <Account />
          </Route>
          <Route path="/account/:userDatas">
            <BackArrow />
            <Account />
          </Route>
          <Route exact path="/inscription">
            <BackArrow />
            <Inscription />
          </Route>
          <Route exact path="/courses">
            <Nav scrolled={scrolled} />
          </Route>
          <Route exact path="/services">
            <BackArrow />
            <Nav scrolled={scrolled} />
            <Services />
          </Route>
          <Route exact path="/about">
            <BackArrow />
            <Nav scrolled={scrolled} />
            <About />
          </Route>
          <Route exact path="/profile">
            <BackArrow />
            <Nav scrolled={scrolled} />
            <Profile />
          </Route>
          <Route exact path="/examens">
            <BackArrow />
            <Nav scrolled={scrolled} />
            <TestsExamens />
          </Route>
          <Route exact path="/entrainements">
            <BackArrow />
            <Nav scrolled={scrolled} />
            <TestsEntrainements />
          </Route>
          <Route path="/examen/:id?" component={ExamenContainer} />
          <Route path="/entrainement/:id?" component={EntrainementContainer} />
          <Route exact path="/help">
            <BackArrow />
            <Help />

            <Nav scrolled={scrolled} />
          </Route>
          <Route exact path="/examens/create">
            <BackArrow />
            <CreateExamen />

            <Nav scrolled={scrolled} />
          </Route>
          <Route exact path="/examens/modify">
            <BackArrow />
            <ModifyExams />

            <Nav scrolled={scrolled} />
          </Route>
          <Route exact path="/examens/modify/:id">
            <BackArrow />
            <ModifyExamen />
            <Nav scrolled={scrolled} />
          </Route>
          <Route exact path="/">
            <BackArrow />
            <Home scrolled={scrolled} />
          </Route>
          <Route path="/validationMock">
            <ValidationMock />
          </Route>
          <Route path={'*'}>
            <Nav scrolled={scrolled} />
            <Error404 />
          </Route>
        </Switch>
      </Box>
    </Router>
  );
}

export default App;

export const BackArrow = () => {
  const navigate = useHistory();
  // const [displayState, setDisplayState] = useState(false);
  // const location = useLocation();
  // const [firstLoad, setFirstLoad] = useState(navigate.length);

  const handleClickBack = () => {
    navigate.goBack();
  };
  return (
    <Button
      position="fixed"
      bottom={10}
      left={10}
      fontSize={25}
      h="fit-content"
      p={3}
      borderColor="blue.500"
      borderWidth={2}
      bgColor="white"
      color="blue.500"
      borderRadius="50%"
      onClick={() => handleClickBack()}
      cursor="pointer"
      transition="all ease 350ms"
      _hover={{ bgColor: 'gray.300' }}
      zIndex={10}
    >
      <Icon as={FaArrowLeft} />
    </Button>
  );
};
