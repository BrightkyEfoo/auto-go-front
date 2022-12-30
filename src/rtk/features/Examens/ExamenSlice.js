import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  examens: [],
  examenActuel: {},
  listeReponse: [[0]],
  questionActuelle: -1,
  resultats: [],
  note: 0,
};

const ExamenSlice = createSlice({
  name: 'Examen',
  initialState,
  reducers: {
    init: state => {
      state.examens = [];
      state.examenActuel = {};
      state.listeReponse = [[0]];
      state.questionActuelle = -1;
      state.resultats = [];
      state.note = 0;
    },
    set: (state, data) => {
      state.examens = data.payload;
    },
    setExamenActuel: (state, data) => {
      state.examenActuel = data.payload;
    },
    setQuestionActuelle: (state, data) => {
      state.questionActuelle = data.payload;
    },
    addReponse: (state, data) => {
      if (Array.isArray(state.listeReponse[data.payload.idxQuestion])) {
        console.log('idxQuestion', data.payload.idxQuestion);
        if (state.listeReponse[data.payload.idxQuestion][0] === 0) {
          state.listeReponse[data.payload.idxQuestion] = [data.payload.reponse];
        } else {
          if(!state.listeReponse[data.payload.idxQuestion].includes(data.payload.reponse))
          state.listeReponse[data.payload.idxQuestion].push(
            data.payload.reponse
          );
        }
      } else {
        state.listeReponse.push([data.payload.reponse]);
      }
      console.log('state ' , state.listeReponse[data.payload.idxQuestion])
    },

    removeReponse: (state, data) => {
      // console.log('previous : ', state.listeReponse[data.payload.idxQuestion]);
      state.listeReponse[data.payload.idxQuestion] = state.listeReponse[
        data.payload.idxQuestion
      ].filter(reponse => reponse !== data.payload.reponse);
      console.log('removed : ', data.payload.reponse , ' list : ',state.listeReponse[data.payload.idxQuestion]);
    },
    setResultats: (state, data) => {
      state.questionsReponsesValides = data.payload;
      state.note = data.payload.note;
    },
    clearSheet: state => {
      state.examenActuel = {};
      state.listeReponse = [];
      state.questionActuelle = -1;
    },
    clearAll: state => {
      state.examens = [];
      state.examenActuel = {};
      state.listeReponse = [];
      state.questionActuelle = -1;
      state.note = 0;
      state.resultats = [];
    },
  },
});
const ExamenReducer = ExamenSlice.reducer;
export default ExamenReducer;
export const ExamenActions = ExamenSlice.actions;
