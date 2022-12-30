import axios from 'axios';
import { getChapPart, getThemeChap, getUserInfosTheme } from '../../Data';
import store from '../app/Store.js';
import { loadingActions } from '../features/BearerToken/LoadingSlice';
import { ThemeLoadedActions } from '../features/BearerToken/ThemeLoadedSlice';
import { ThemeActions } from '../features/BearerToken/ThemesSlice';
import { UserActions } from '../features/BearerToken/UserSlice';

const dispatch = store.dispatch;

const fetchAndReloadThemeAndThemeLoaded = async themeid => {
  // dispatch(loadingActions.set(true))

 await axios
    .get(getUserInfosTheme + store.getState().user.id, {
      headers: {
        authorization: store.getState().header.token,
      },
    })
    .then(response => {
      // console.log(response.data.user.Themes);
      dispatch(UserActions.set(response.data.user));
      let themes = response.data.user.Themes; // ceci est le tableau des themes de l'utilisateur
      themes.forEach(theme => {
        axios
          .get(getThemeChap + theme.id, {
            headers: {
              authorization: store.getState().header.token,
            },
          })
          .then(response => {
            dispatch(
              ThemeActions.setChapitresById({
                themeId: theme.id,
                chapitres: response.data.theme.Chapitres,
              })
            ); // elle met a jour la liste des chaoitres
            let chapitres = response.data.theme.Chapitres;
            // console.log(chapitres);
            chapitres.forEach(chapitre => {
              // pour chaque chapitre on cherche ces parties
              let chapitreId = chapitre.id;
              axios
                .get(getChapPart + chapitreId, {
                  headers: {
                    authorization: store.getState().header.token,
                  },
                })
                .then(ress => {
                  // console.log(ress.data.chap.Parties);
                  
                  dispatch(
                    ThemeActions.setPartiesById({
                      chapitreId: chapitre.id,
                      themeId: theme.id,
                      parties: ress.data.chap.Parties,
                    })
                  );                  
                });
            }); // on sort de la boucle des chapitres
            // console.log(chapitres);
          })
          .finally(() => {
            // ce finaly correspond a celui de la recherches de chapitres du theme
            let url = getThemeChap + themeid;
            axios
              .get(url, {
                headers: {
                  authorization: store.getState().header.token,
                },
              })
              .then(response => {
                let theme = response.data.theme;
                let chapitres = theme.Chapitres;
                dispatch(ThemeLoadedActions.set(response.data.theme));
                chapitres.forEach(chap => {
                  axios
                    .get(getChapPart + chap.id, {
                      headers: {
                        authorization: store.getState().header.token,
                      },
                    })
                    .then(ress => {
                      let parties = ress.data.chap.Parties;
                      dispatch(
                        ThemeLoadedActions.setPartsById({
                          chapitreId: chap.id,
                          parties: parties,
                        })
                      );
                    });
                });
              })
              .catch(err => console.log(err))
              .finally(()=>{
                dispatch(loadingActions.set(false))
                // console.log('fin1')
              })
          });
      });
      // console.log('fin2')
      dispatch(ThemeActions.set(response.data.user.Themes));
      // dispatch(ThemeLoadedActions.setAll({...store.getState().theme.themes.filter(t => t.id === themeid)[0]}));
    })
    // .catch(err=>{
    //   // dispatch(loadingActions.set(false))
    // })
    // .finally(()=>{
    //   console.log('fin5')
    // })
    // console.log('fin3')

};

export default fetchAndReloadThemeAndThemeLoaded;
