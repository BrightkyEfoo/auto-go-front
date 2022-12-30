import {createSlice} from "@reduxjs/toolkit"
const initialState = {
    enCours : {
        chapitreId : 0,
        activiteId : 0
    }
}

const chapAndCourseDisplayedSlice = createSlice({
    name : 'chapAndCourseDisplayed',
    initialState,
    reducers :{
        setEnCours : (state,data)=>{
            state.enCours.chapitreId = parseInt(data.payload.chapitreId)
            state.enCours.activiteId = parseInt(data.payload.activiteId)
        },
        clearEnCours : (state)=>{
            state.enCours = {
                chapitreId : 0,
                activiteId : 0
            }
        }
    }
})
const chapAndCourseDisplayedReducer = chapAndCourseDisplayedSlice.reducer
export default chapAndCourseDisplayedReducer
export const chapAndCourseDisplayedActions = chapAndCourseDisplayedSlice.actions