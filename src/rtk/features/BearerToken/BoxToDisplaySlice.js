import {createSlice} from "@reduxjs/toolkit"
const initialState = {
    click : false,
    clickForAddActivity : false,
    titre : '',
    activites : [],
    img:'',
    themeId : 0,
    chapitreId : 0,
}

const BoxToDisplaySlice = createSlice({
    name : 'boxToDisplay',
    initialState,
    reducers :{
        set : (state,data)=>{
            state.click = data.payload.titre ? true : false
            state.titre = data.payload.titre
            state.activites = data.payload.activites
            state.img=data.payload.img
            state.chapitreId = data.payload.id
        },
        setThemeId : (state , data) => {
            state.themeId = data.payload
        },
        setClickAddActivity : (state , data)=>{
            state.clickForAddActivity = data.payload
        },
        setActivityNameById : (state , data) => {
            state.activites.filter(activite => activite.id === data.payload.id )[0].titre = data.payload.titre
        },
        removeActivityById : (state , data) => {
            state.activites = state.activites.filter(activite => activite.id!==data.payload)
        },
        
        clear : (state)=>{
            state.click = false
            state.titre = ''
            state.activites = []
            state.img=''
            state.themeId = 0
            state.clickForAddActivity = false
        }
    }
})
const BoxToDisplayReducer = BoxToDisplaySlice.reducer
export default BoxToDisplayReducer
export const BoxToDisplayActions = BoxToDisplaySlice.actions