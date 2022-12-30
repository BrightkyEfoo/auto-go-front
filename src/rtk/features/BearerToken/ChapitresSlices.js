import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  themes: [
    {
      id: 0,
      nom: '',
      img: '',
      ratio: '',
      chapitres : [
        {
          id : 0,
          titre : '',
          ratio : '',
        }
      ]
    },
  ],
};

const ThemeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    set: (state, data) => {
      state.themes = data.payload
    },
    clear: state => {
      state.themes = [
        {
          id: 0,
          nom: '',
          img: '',
          ratio: '',
          chapitres : [
            {
              id : 0,
              titre : '',
              ratio : '',
            }
          ]
        },
      ]
    },
  },
});
const ThemeReducer = ThemeSlice.reducer;
export default ThemeReducer;
export const ThemeActions = ThemeSlice.actions;
