//icons for home slider
import { BiWorld, BiBook, BiTimer, BiTime } from 'react-icons/bi';
import { GiDiploma } from 'react-icons/gi';
import { MdSchool } from 'react-icons/md';
import {
  FaFacebookSquare,
  FaWhatsappSquare,
  FaLinkedinIn,
  FaYoutubeSquare,
  FaMailchimp,
} from 'react-icons/fa';
// end of icons for home slider

export const postAPIConnectionURL = 'https://autogoback237.herokuapp.com/api/connexion';
export const postAPICreateThemeURL = 'https://autogoback237.herokuapp.com/api/createtheme';
export const postAPIInscriptionURL = 'https://autogoback237.herokuapp.com/api/inscription';
export const postAPIGetUsersURL = 'https://autogoback237.herokuapp.com/api/users';
export const postAPISetUsersURL = 'https://autogoback237.herokuapp.com/api/setuser';
export const getAPIGetCoursesURL = 'https://autogoback237.herokuapp.com/api/courses';
export const getAuthGoogleURL = 'https://autogoback237.herokuapp.com/auth/google';
export const getThemeChap = 'https://autogoback237.herokuapp.com/api/getthemechap/?id='
export const getChapPart = 'https://autogoback237.herokuapp.com/api/getchapactivities/?id='
export const postCreateAndAddPartToChap = 'https://autogoback237.herokuapp.com/api/createandaddparttochap' 
export const postCreateAndAddChapToTheme = 'https://autogoback237.herokuapp.com/api/createandaddchaptotheme'
export const getUserInfosTheme = 'https://autogoback237.herokuapp.com/api/users?userId='
export const putSetThemeName = 'https://autogoback237.herokuapp.com/api/theme/setName'
export const putSetChapitreName = 'https://autogoback237.herokuapp.com/api/chapitre/setName'
export const deleteChapitre = 'https://autogoback237.herokuapp.com/api/chapitre/delete'
export const deleteTheme = 'https://autogoback237.herokuapp.com/api/theme/delete'
export const deleteActivity = 'https://autogoback237.herokuapp.com/api/activity/delete'
export const putSetActivityName = 'https://autogoback237.herokuapp.com/api/activity/setName'
export const getAllPageACtivites = 'https://autogoback237.herokuapp.com/api/activite/full/?id='
export const putActivityCompletedForUserId = 'https://autogoback237.herokuapp.com/api/activity/completed'
export const getChapById = 'https://autogoback237.herokuapp.com/api/chapitre?id='
export const getSearch = 'https://autogoback237.herokuapp.com/api/search?nom='
export const putChapterCompletedForUserId = 'https://autogoback237.herokuapp.com/api/chapter/completed'
export const postreponsesQuizzURL = 'https://autogoback237.herokuapp.com/api/verifyQuizz';
export const postGetOfflineURL = 'https://autogoback237.herokuapp.com/api/offlined';
export const postSetLastSeenUrl = 'https://autogoback237.herokuapp.com/api/lastseen/setbyid/';
export const postPaiementUrl = 'https://autogoback237.herokuapp.com/api/payment/';
export const getVisitesDatas = 'https://autogoback237.herokuapp.com/api/visitesData/?userId='
export const postIMConnecting = 'https://autogoback237.herokuapp.com/api/visited'
export const SECRET_AES_KEY =
  'SUPER_SUPER_SECRET_KEY_@@@@@4785525_BRIGHTMAN_CRAQUEZ CA JE VOIS BANDE DE CHIENS LOOOOOOOOOLLLLLL!!!!!!!!!!';
export const containerStyle = {
  //for chakra components only
  flexGrow: 1,
  scrollBarWidth : 'none'
};


export const typeCarDesc = [
  {
    catergorie: 'A',
    texte:
      'Lore ipsum dolor sit, amet consectetur adipisicing elit. Recusandae officia quaerat harum nulla similique dignissimos sint ad exercitationem? Quod, deleniti. Libero nisi ab officia assumenda, animi voluptas delectus sed culpa.',
    img: 'https://i.ibb.co/vLgYL3K/clionew.jpg',
    imgTitre: "figure d'une image de PTAC inferieur a 3500 kg",
  },
  {
    //pour categorie B et ainsi de suite
    catergorie: 'B',
    texte:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae officia quaerat harum nulla similique dignissimos sint ad exercitationem? Quod, deleniti. Libero nisi ab officia assumenda, animi voluptas delectus sed culpa.',
    img: 'https://i.ibb.co/0f94tBg/voiture-g-n-rique-m-tallique-blanche-de-suv-sur-le-fond-blanc-avec-chemin-d-isolement-123337285.jpg',
    imgTitre: "figure d'une image de PTAC inferieur a 3500 kg",
  },
  {
    catergorie: 'C',
    texte:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae officia quaerat harum nulla similique dignissimos sint ad exercitationem? Quod, deleniti. Libero nisi ab officia assumenda, animi voluptas delectus sed culpa.',
    img: 'https://i.ibb.co/5T5MPds/RENAULT-MEGANE-p1ay0lwhymycra3vfadeo4bs2k2bf6py9gqstuos6c.jpg',
    imgTitre: "figure d'une image de PTAC inferieur a 3500 kg",
  },
  {
    catergorie: 'D',
    texte:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae officia quaerat harum nulla similique dignissimos sint ad exercitationem? Quod, deleniti. Libero nisi ab officia assumenda, animi voluptas delectus sed culpa.',
    img: 'https://i.ibb.co/8rTq7kk/333967-2019-Mercedes-Benz-G-Class.jpg',
    imgTitre: "figure d'une image de PTAC inferieur a 3500 kg",
  },
  {
    catergorie: 'E',
    texte:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae officia quaerat harum nulla similique dignissimos sint ad exercitationem? Quod, deleniti. Libero nisi ab officia assumenda, animi voluptas delectus sed culpa.',
    img: 'https://i.ibb.co/0KmC936/ARKANA.png',
    imgTitre: "figure d'une image de PTAC inferieur a 3500 kg",
  },
  {
    catergorie: 'F',
    texte:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae officia quaerat harum nulla similique dignissimos sint ad exercitationem? Quod, deleniti. Libero nisi ab officia assumenda, animi voluptas delectus sed culpa.',
    img: 'https://i.ibb.co/0f94tBg/voiture-g-n-rique-m-tallique-blanche-de-suv-sur-le-fond-blanc-avec-chemin-d-isolement-123337285.jpg',
    imgTitre: "figure d'une image de PTAC inferieur a 3500 kg",
  },
  {
    catergorie: 'G',
    texte:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae officia quaerat harum nulla similique dignissimos sint ad exercitationem? Quod, deleniti. Libero nisi ab officia assumenda, animi voluptas delectus sed culpa.',
    img: 'https://i.ibb.co/YNMNBtv/captuR.png',
    imgTitre: "figure d'une image de PTAC inferieur a 3500 kg",
  },
  //   add some categories as an object like up there and it will display automatically
];

export const listePays = [
  {
    nom : 'Cameroun',
    regions : [
      {
        nom : 'Ouest',
        villes : [
          'Dschang','Bouda','Bafoussam'
        ]
      },
      {
        nom : 'Centre',
        villes : [
          'Yaounde','Obala','Nkongsamba'
        ]
      }
    ]
  },
  {
    nom : 'Nigeria',
    regions : [
      {
        nom : 'Igbwe',
        villes : [
          'Logbessu','Soa'
        ]
      },
      {
        nom : 'Terranga',
        villes : [
          'Olibya','Ferotel','Mangali','Oudinesse'
        ]
      },
      
    ]
  },
  {
    nom : 'Naruto Shippuden',
    regions : [
      {
        nom : 'Naruto',
        villes : [
          'Rasengan','Multi-clonage','Rasen-Shuriken','Jiku Shipu Senko RennoDan Zeroshiki'
        ]
      },
      {
        nom : 'Sasuke UCHIWA',
        villes : [
          'Amaterasu','Susanoo','Kirin','Katon'
        ]
      },
      
    ]
  },
]

let fontSize = 35;
export const homeSwiperSlides = [
  {
    title: 'Anywhere',
    botom: {
      as: BiBook,
      fontSize,
      color: 'blue.700',
    },
    iconeColor: 'black',
    iconeBg: 'blue.400',
    icone: BiWorld,
    preview:
      "Accessible de n'importe ou dans le monde, peu importe ou vous soyez!",
  },
  {
    title: 'Anytime',
    botom: {
      as: BiTime,
      fontSize,
      color: 'black',
    },
    iconeColor: 'black',
    iconeBg: 'gray.300',
    icone: BiTimer,
    preview: 'Disponible H24 7j/7.',
  },
  {
    title: 'WINGO',
    botom: {
      as: MdSchool,
      fontSize,
      color: 'gray.400',
    },
    iconeColor: 'black',
    iconeBg: 'gray.300',
    icone: GiDiploma,
    preview: 'Décrochez votre permis comme un chef!',
  },
  {
    title: 'Follow Us !!',
    hstack: 'Hstack',
    botom: [
      {
        route: 'https://www.facebook.com',
        as: FaFacebookSquare,
        fontSize,
        color: 'blue.400',
      },
      {
        route: 'https://api.whatapp.com',
        as: FaWhatsappSquare,
        fontSize,
        color: 'green.400',
      },
      {
        route: 'https://www.linkedin.com',
        as: FaLinkedinIn,
        fontSize,
        color: 'blue.300',
      },
      {
        route: 'https://www.youtube.com',
        as: FaYoutubeSquare,
        fontSize,
        color: 'red.400',
      },
      {
        route: 'https://www.gmail.com',
        as: FaMailchimp,
        fontSize,
        color: 'gray.400',
      },
    ],
    iconeColor: 'white',
    iconeBg: 'blue.500',
    icone: GiDiploma,
    preview: 'Rejoignez la communautée AUTOGO',
  },
];

//data for top navBar

export const topNavView = id => [
  {
    route: '/',
    title: 'Home',
  },
  {
    route: id === 0 ? '/connexion' : '/account',
    title: id === 0 ? 'Login' : 'Account',
  },
  // {
  //   route: '/createTheme',
  //   title: 'create Theme',
  // },
  {
    route: '/services',
    title: 'Services',
  },
  {
    route: '/about',
    title: 'About',
  },
  //add any view by respecting your desired order
];

export const TopCardMobileHomeFirstText =
  '   Peu importe ou vous soyez dans le monde, il est impératif ' +
  'pour vous de posséder un permis de conduire valide.Le permis est' +
  "aujourd'hui un atout majeur pour l'emploi car il permet de" +
  'rassurer un employeur, il sait que vous ne serez pas dépendant des' +
  "transports en commun ou lorsque vous finirez tard le soir et qu'il" +
  "n'y aura plus de transport en commun." +
  'Il est également à noter que ce' +
  '<em>précieux sésame est valide pour la ou les catégories' +
  'sélectionnées.Pour tout savoir sur ces catégories : ';

