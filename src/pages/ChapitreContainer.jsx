import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BackArrow } from '../App';
import Nav from '../components/Nav';
import { getChapById } from '../Data';
// import fetchAndReloadThemeAndThemeLoaded from '../rtk/myExtraFeatures/fetchAndReloadThemeAndThemeLoaded';
import Chapitre from './Chapitre';

const ChapitreContainer = props => {
  let a = props.location.search.substr(4);
  const Token = useSelector(state => state.header.token);
  // console.log(a);

  const [themeID, setThemeID] = useState(0)
  useEffect(() => {
    axios
      .get(getChapById + a, {
        headers: {
          authorization: Token,
        },
      })
      .then(res => {
        setThemeID(res.data.chapitre.ThemeId)
        // fetchAndReloadThemeAndThemeLoaded(themeID)
      })
      .catch(err => console.log(err));
  }, [a, Token]);
  return (
    <>
      <Nav />
      <Chapitre ID = {a} themeID={themeID} />
      <BackArrow/>
    </>
  );
};

export default ChapitreContainer;