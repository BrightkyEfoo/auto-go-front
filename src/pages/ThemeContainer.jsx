import React/*, { useEffect }*/ from 'react';
import { BackArrow } from '../App';
import Nav from '../components/Nav';
// import fetchAndReloadThemeAndThemeLoaded from '../rtk/myExtraFeatures/fetchAndReloadThemeAndThemeLoaded';
import Theme from './Theme';

const ThemeContainer = props => {
  let a = props.location.search.substr(4);
  console.log(a);

  // useEffect(() => {
  //   fetchAndReloadThemeAndThemeLoaded(a)
  // }, [a])

  return (
    <>
      <Nav />
      <Theme ID = {a} />
      <BackArrow/>
    </>
  );
};

export default ThemeContainer;
