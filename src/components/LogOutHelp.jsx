import { Flex, Icon, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserActions } from '../rtk/features/BearerToken/UserSlice';
import { headerActions } from '../rtk/features/BearerToken/HeaderSlice';
import { logOutHelpIconStyle } from '../style';
import { loadingActions } from '../rtk/features/BearerToken/LoadingSlice';
import { postGetOfflineURL } from '../Data';
import axios from 'axios';
const LogOutHelp = () => {
  const dispatch = useDispatch();
  const [max520] = useMediaQuery('(max-width : 520px)');
  const dispacth = useDispatch();
  const userId = useSelector(state => state.user.id);
  const Token = useSelector(state => state.header.token);
  const navigate = useHistory()
  const handleLogOut = (e) => {
    e.preventDefault()
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
      .then(res => console.log('res', res))
      .finally(() => {
        dispatch(loadingActions.set(true));
        dispacth(UserActions.clear());
        dispacth(headerActions.clear());
        navigate.push('/connexion')
      });
  };
  const id = useSelector(state => state.user.id);
  return (
    <Flex justify="space-between" align="center" direction="column" h="full" p={2} w={20} position="fixed" top={0} right={0} zIndex={5}>
      <Link to="/help">
        <Icon {...logOutHelpIconStyle('HelP')} />
      </Link>
      <Link to="/connexion" onClick={(e) => handleLogOut(e)}>
        {!max520 && (id === 0 ? <Icon {...logOutHelpIconStyle('login')} /> : <Icon {...logOutHelpIconStyle('logOut')} />)}
      </Link>
    </Flex>
  );
};

export default LogOutHelp;
