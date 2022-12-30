import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  themes: [
    {
      id: 0,
      nom: '',
      img: '',
      ratio: '',
      chapitres: [
        {
          id: 0,
          titre: '',
          ratio: '',
          parties: [
            {
              id: 0,
              titre: '',
              contenu: '',
              preview: '',
              genre: '',
              isCompleted: false,
            },
          ],
        },
      ],
    },
  ],
};

const ThemeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    set: (state, data) => {
      state.themes = data.payload;
    },
    setChapitresById: (state, data) => {
      // on fourni l'id du theme  sous themeId et le tableau a mettre sous chapitres
      let themeId = data.payload.themeId;
      // console.log(data.payload.chapitres)
      if (themeId > 0 && Array.isArray(state.themes)) {
        state.themes.filter(theme => theme.id === themeId)[0].chapitres =
          data.payload.chapitres;
      }
    },
    setPartiesById: (state, data) => {
      // on fourni l'id du chapitre  sous chapitreId et du theme sous themeId et le tableau a mettre sous parties
      let chapitreId = data.payload.chapitreId;
      let themeId = data.payload.themeId;
      if (
        Array.isArray(state.themes) &&
        chapitreId &&
        themeId &&
        chapitreId > 0 &&
        themeId > 0 &&
        Array.isArray(
          state.themes.filter(theme => theme.id === themeId)[0].chapitres
        )
      ) {
        state.themes
          .filter(theme => theme.id === themeId)[0]
          .chapitres.filter(chap => chap.id === chapitreId)[0].parties =
          data.payload.parties;
      }
    },
    setThemeNameById: (state, data) => {
      if (
        Array.isArray(state.themes) &&
        data.payload.themeId &&
        data.payload.nom &&
        data.payload.themeId > 0
      ) {
        state.themes.filter(theme => theme.id === data.payload.themeId)[0].nom =
          data.payload.nom;
      }
    },
    setChapNameById: (state, data) => {
      let chapitreId = data.payload.chapitreId;
      let themeId = data.payload.themeId;
      if (
        Array.isArray(state.themes) &&
        chapitreId &&
        themeId &&
        chapitreId > 0 &&
        themeId > 0 &&
        Array.isArray(state.themes.filter(t => t.id === themeId)[0].chapitres)
      ) {
        state.themes
          .filter(t => t.id === themeId)[0]
          .chapitres.filter(c => c.id === chapitreId)[0].titre =
          data.payload.titre;
      }
    },
    deleteChapitreById: (state, data) => {
      let chapitreId = data.payload.chapitreId;
      let themeId = data.payload.themeId;
      // if(chapitreId && themeId && chapitreId > 0 && themeId > 0 && Array.isArray( state.themes.filter(t => t.id === themeId)[0].chapitres = state.themes) && Array.isArray( state.themes.filter(t => t.id === themeId)[0].chapitres = state.themes.filter(t => t.id === themeId)[0].chapitres)){
      state.themes.filter(t => t.id === themeId)[0].chapitres = state.themes
        .filter(t => t.id === themeId)[0]
        .chapitres.filter(chap => chap.id !== chapitreId);
      // }
    },
    deleteThemeById: (state, data) => {
      if (Array.isArray(state.themes)) {
        state.themes = state.themes.filter(theme => theme.id !== data.payload);
      }
    },
    setThemeImgById: (state, data) => {
      state.themes.filter(t => t.id === data.payload.id)[0].img =
        data.payload.img;
    },

    clear: state => {
      state.themes = [
        {
          id: 0,
          nom: '',
          img: '',
          ratio: '',
          chapitres: [
            {
              id: 0,
              titre: '',
              ratio: '',
              parties: [
                {
                  id: 0,
                  titre: '',
                  contenu: '',
                  preview: '',
                  genre: '',
                  isCompleted: false,
                },
              ],
            },
          ],
        },
      ];
    },
  },
});
const ThemeReducer = ThemeSlice.reducer;
export default ThemeReducer;
export const ThemeActions = ThemeSlice.actions;
