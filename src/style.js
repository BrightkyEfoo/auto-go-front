//icones pour login logout et help
import { FiLogOut, FiLogIn } from 'react-icons/fi';
import { IoMdHelpBuoy } from 'react-icons/io';


export const webSmText = 12
export const webMdText = 14
export const webLgText = 18
//=================================================

export const AccountSectionSelectorStyle = (selected , cas) => {
  return {
    fontSize: selected === cas ? 18 : 15,
    borderBottomWidth: 2,
    borderBottomColor:
      selected === cas
        ? colorForAccountSectionSelectedStyle.selected
        : colorForAccountSectionSelectedStyle.notSelected,
    transition: 'all ease 300ms',
    cursor: 'pointer',
  };
};
export const fondNoir = 'https://i.ibb.co/wBw8tfk/noirfond.jpg'

const colorForAccountSectionSelectedStyle = {
  selected: 'blue',
  notSelected: 'transparent',
};

export const c = {
  align: 'center',
  justify: 'center',
};

export const logOutHelpIconStyle = type => {
  let style = {};
  switch (type.toLowerCase()) {
    case 'login':
      style = {
        color: 'blue.400',
        as: FiLogIn,
      };
      break;
    case 'logout':
      style = {
        color: 'red.400',
        as: FiLogOut,
      };
      break;
    case 'help':
      style = {
        color: 'blue.400',
        as: IoMdHelpBuoy,
      };
      break;
    default:
      break;
  }
  return {
    ...style,
    fontSize: 30,
  };
};

export const mainBoxesStyle = full => {
  return full
    ? full === 'full' && {
        p: 0,
        m: 0,
        pt: '42.6px',
        w: '100vw',
      }
    : { p: 0, m: 0, pt: '60px', w: full };
};

//top navBar Style
export const navStyle = (scrolled, a) => {
  if (a) {
    return {
      id: 'nav',
      position: 'fixed',
      top: '0',
      w: '100vw',
      zIndex: 2,
      spacing: 0,
      justify: 'space-between',
      p: 2,
      pr: '75px',
      // bgImage : 'url('+fondNoir+')',
      color: 'white',
    };
  } else {
    return {
      id: 'nav',
      position: 'fixed',
      top: '0',
      w: '100vw',
      zIndex: 2,
      spacing: 20,
      justify: 'end',
      p: 2,
      pr: 100,
      // bgImage : 'url('+fondNoir+')',
      bgColor : 'black',
      color: 'white',
    };
  }
};

export const SlideBoxContainerStyle = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  letterSpacing: 18.75,
  paddingLeft: 15,
  paddingBottom: 0,
  align: 'center',
  justify: 'center',
  w: 'full',
};
//for bottom navbar container should be a flex chakra component
export const bottomNavBarContainer = {
  bgColor : 'transparent',
  position: 'fixed',
  w: '100vw',
  align: 'center',
  justify: 'center',
  bottom: 6,
  left: 0,
  zIndex : 1000
};

export const iconeStyleFooter = {
  fontSize: 60,
  p: 3,
  bgColor: 'transparent',
  borderRadius: '50%',
  color: 'white',
  borderWidth: 2,
  borderColor: 'gray',
  _hover: {
    bgColor: 'gray',
  },
};
