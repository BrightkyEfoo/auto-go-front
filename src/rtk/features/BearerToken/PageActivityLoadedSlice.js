import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  id: 0,
  titre: '',
  preview: '',
  genre: '',
  contenu: '',
  isCompleted: false,
  created: '',
  ChapitreId: 0,
  chapitre: {
    id: 0,
    titre: '',
    ratio: '1/1',
    created: '',
    ThemeId: 0,
    theme: {
      id: 1,
      nom: '',
      img: '',
      ratio: '1/1',
      created: '',
    },
  },
};

const PageActivityLoadedSlice = createSlice({
  name: 'pageActivityLoaded',
  initialState,
  reducers: {
    setAll: (state, data) => {
      state.id = data.payload.id;
      state.titre = data.payload.titre;
      state.preview = data.payload.preview;
      state.genre = data.payload.genre;
      state.contenu = data.payload.contenu;
      state.isCompleted = data.payload.isCompleted;
      state.created = data.payload.created;
      state.ChapitreId = data.payload.ChapitreId;
      state.chapitre.id = data.payload.Chapitre.id;
      state.chapitre.titre = data.payload.Chapitre.titre;
      state.chapitre.ratio = data.payload.Chapitre.ratio;
      state.chapitre.created = data.payload.Chapitre.created;
      state.chapitre.ThemeId = data.payload.Chapitre.ThemeId;
      state.chapitre.theme.id = data.payload.Chapitre.Theme.id;
      state.chapitre.theme.nom = data.payload.Chapitre.Theme.nom;
      state.chapitre.theme.img = data.payload.Chapitre.Theme.img;
      state.chapitre.theme.ratio = data.payload.Chapitre.Theme.ratio;
      state.chapitre.theme.created = data.payload.Chapitre.Theme.created;
    },
    clear: state => {
      state.Activite = {
        id: 0,
        titre: '',
        preview: '',
        genre: '',
        contenu: '',
        isCompleted: false,
        created: '',
        ChapitreId: 0,
        chapitre: {
          id: 0,
          titre: '',
          ratio: '1/1',
          created: '',
          ThemeId: 0,
          theme: {
            id: 1,
            nom: '',
            img: '',
            ratio: '1/1',
            created: '',
          },
        },
      };
    },
  },
});
const PageActivityLoadedReducer = PageActivityLoadedSlice.reducer;
export default PageActivityLoadedReducer;
export const PageActivityLoadedActions = PageActivityLoadedSlice.actions;
