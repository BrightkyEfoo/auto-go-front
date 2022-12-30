import { createSlice } from '@reduxjs/toolkit';

const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const initialState = {
  reponses: [-2],
  reponsesValides: [],
  note: 0,
  code: 0,
};

const reponsesQuizzSlice = createSlice({
  name: 'reponsesQuizz',
  initialState,
  reducers: {
    setResults: (state, data) => {
      state.reponsesValides = data.payload.reponsesValides;
      state.note = data.payload.note;
      state.code = data.payload.code;
    },
    createResponseSheet: (state, data) => {
      //ici le payload est juste la taille du tableau de reponses
      if (equals(state.reponses ,[]) || !state.reponses) {
        state.reponses = new Array(data.payload);
        state.reponses.fill(-1)
      }
    },
    setResponseByIndex: (state, data) => {
      let i = data.payload.i; //index de la question
      let r = data.payload.r; //index de la reponse

      state.reponses.splice(i, 1, r);
    },
    clearResponse: state => {
      state.reponses = [];
      state.reponsesValides = [];
      state.note = 0;
      state.code = 0;
    },
  },
});
const reponsesQuizzReducer = reponsesQuizzSlice.reducer;
export default reponsesQuizzReducer;
export const reponsesQuizzActions = reponsesQuizzSlice.actions;
