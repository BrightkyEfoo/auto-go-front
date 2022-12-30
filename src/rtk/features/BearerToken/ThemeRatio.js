import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  themes: [
    {
      id: 0,
      ratio: '',
      chapitres : [
        {
          id : 0,
          ratio : '',
          parties : [
            {
              id : 0,
              isCompleted : false,
            }
          ]
        }
      ]
    },
  ],
};

const ThemeRatioSlice = createSlice({
  name: 'themeRatio',
  initialState,
  reducers: {
    set : (state , data)=>{
        
    }
  },
});
const ThemeRatioReducer = ThemeRatioSlice.reducer;
export default ThemeRatioReducer;
export const ThemeRatioActions = ThemeRatioSlice.actions;
