import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  id: 0,
  email: '',
  nom: '',
  prenom: '',
  birthDate: '',
  phone: '',
  status: 0,
  photo: '',
  sexe: '',
  localisation: '',
  themes: [
    {
      id: 0,
      nom: '',
      img: '',
      ratio: '',
    },
  ],
  lastSeen: [0, 0, 0, 0, 0],
  completedActivities: [],
  completedChapters: [],
  completedThemes: [],
  ExamenScores: []
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set: (state, data) => {
      state.id = data.payload.id;
      state.email = data.payload.email;
      state.nom = data.payload.nom;
      state.prenom = data.payload.prenom;
      state.birthDate = data.payload.birthDate;
      state.phone = data.payload.phone;
      state.photo = data.payload.photo;
      state.status = data.payload.status;
      state.themes = data.payload.Themes;
      state.sexe = data.payload.sexe;
      state.localisation = data.payload.localisation;
      state.completedActivities = data.payload.completedActivities
        ? data.payload.completedActivities.map(a => parseInt(a))
        : [];
      state.lastSeen = data.payload.lastSeen
        ? data.payload.lastSeen.map(a => parseInt(a))
        : [];
      state.completedChapters = data.payload.completedChapters
        ? data.payload.completedChapters.map(a => parseInt(a))
        : [];
      state.completedThemes = data.payload.completedThemes
        ? data.payload.completedThemes.map(a => parseInt(a))
        : [];
      
    },
    setUserPhoto: (state, data) => {
      state.photo = data.payload;
    },
    setCompletedActivities: (state, data) => {
      //il prends le tableau de charcteres et le converti
      state.completedActivities = data.payload.map(a => parseInt(a));
    },
    setLastSeen: (state, data) => {
      state.lastSeen = data.payload.map(a => parseInt(a));
    },
    setCompletedChapters: (state, data) => {
      //il prends le tableau de charcteres et le converti
      state.completedChapters = data.payload.map(a => parseInt(a));
    },
    setCompletedThemes: (state, data) => {
      //il prends le tableau de charcteres et le converti
      state.completedThemes = data.payload.map(a => parseInt(a));
    },
    completeActivityById: (state, data) => {
      state.completedActivities.push(data.payload);
    },
    completeChapterById: (state, data) => {
      state.completedChapters.push(data.payload);
    },
    completeThemeById: (state, data) => {
      state.completedThemes.push(data.payload);
    },
    setScore : (state,data) => {
      // console.log(data.payload)
      state.ExamenScores = data.payload
    },
    clear: state => {
      state.id = 0;
      state.email = '';
      state.nom = '';
      state.prenom = '';
      state.birthDate = '';
      state.phone = '';
      state.photo = '';
      state.status = 0;
      state.sexe = '';
      state.localisation = '';
      state.themes = [
        {
          id: 0,
          nom: '',
          img: '',
          ratio: '',
        },
      ];
      state.lastSeen = [];
      state.completedActivities = [0];
      state.completedChapters = [0];
      state.completedThemes = [0];
      state.ExamenScores = []
    },
  },
});
const UserReducer = UserSlice.reducer;
export default UserReducer;
export const UserActions = UserSlice.actions;
