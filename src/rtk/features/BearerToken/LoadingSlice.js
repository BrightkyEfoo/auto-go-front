import {createSlice} from "@reduxjs/toolkit"
const initialState = {
    isLoading : false
}

const loadingSlice = createSlice({
    name : 'loading',
    initialState,
    reducers :{
        set : (state,data)=>{
            state.isLoading = data.payload
        }
    }
})
const loadingReducer = loadingSlice.reducer
export default loadingReducer
export const loadingActions = loadingSlice.actions