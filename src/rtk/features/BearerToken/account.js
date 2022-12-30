import {createSlice} from "@reduxjs/toolkit"
const initialState = {
    selected : 1
}

const accountSlice = createSlice({
    name : 'account',
    initialState,
    reducers :{
        setSelected : (state,data)=>{
            state.selected = data.payload
        }
    }
})
const accountReducer = accountSlice.reducer
export default accountReducer
export const accountActions = accountSlice.actions