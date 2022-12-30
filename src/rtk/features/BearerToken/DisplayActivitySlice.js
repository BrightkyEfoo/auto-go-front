import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  display: false,
  page: 0,
};

const DisplayActivitySlice = createSlice({
  name: 'displayActivity',
  initialState,
  reducers: {
    set: (state, data) => {
      state.display = data.payload;
    },
    goBack: state => {
      state.page--;
    },
    goForward: state => {
      state.page++;
    },
    goTo: (state, data) => {
      state.page = data.payload;
    }
  },
});
const DisplayActivityReducer = DisplayActivitySlice.reducer;
export default DisplayActivityReducer;
export const DisplayActivityActions = DisplayActivitySlice.actions;
