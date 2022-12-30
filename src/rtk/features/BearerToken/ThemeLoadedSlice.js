import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  id: 0,
  nom: '',
  img: '',
  ratio: '',
  chapitres: [
    {
      id: '',
      titre: '',
      ratio: '',
      parties: [
        {
          titre: '',
          preview: '',
          genre: '',
          contenu: '',
          isCompleted: false,
        },
      ],
    },
  ],
};

const ThemeLoadedSlice = createSlice({
  name: 'themeLoaded',
  initialState,
  reducers: {
    removeById : (state, data)=>{ 
      let id = data.payload
      state.chapitres = state.chapitres.filter(chap => chap.id !== id)
    },
    set: (state, data) => {
      state.id = data.payload.id;
      state.nom = data.payload.nom;
      state.img = data.payload.img;
      state.ratio = data.payload.ratio;
      if (data.payload.Chapitres.length > 0) {
        state.chapitres = data.payload.Chapitres;
      } else {
        state.chapitres = [''];
      }
    },
    setAll : (state , data)=>{
      state.id = data.payload.id;
      state.nom = data.payload.nom;
      state.img = data.payload.img;
      state.ratio = data.payload.ratio;
      if (Array.isArray(data.payload.chapitres ) && data.payload.chapitres.length > 0) {
        state.chapitres = data.payload.chapitres;
      } else {
        state.chapitres = [''];
      }
    },
    setPartsById: (state, data) => {//chapitreId
      let chapitreId = data.payload.chapitreId
      state.chapitres.filter(chap => chap.id === chapitreId)[0].parties=data.payload.parties
    },
    clear: state => {
      state.hereWeGo = false;
      state.id = 0;
      state.nom = '';
      state.img = '';
      state.ratio = '';
      state.chapitres = [
        {
          id: '',
          titre: '',
          ratio: '',
          parties: [
            {
              titre: '',
              preview: '',
              genre: '',
              contenu: '',
              isCompleted: false,
            },
          ],
        },
      ];
    },
  },
});
const ThemeLoadedReducer = ThemeLoadedSlice.reducer;
export default ThemeLoadedReducer;
export const ThemeLoadedActions = ThemeLoadedSlice.actions;
