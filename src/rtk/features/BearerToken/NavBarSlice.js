import {createSlice} from "@reduxjs/toolkit"
const initialState = {
    id : '',
    searchBarDisplay : false
}

const NavBarSlice = createSlice({
    name : 'navBar',
    initialState,
    reducers :{
        set : (state,data)=>{
            state.id = data.payload
        },
        searchBarDisplayToggle : state => {
            state.searchBarDisplay = !state.searchBarDisplay
        } ,
        searchBarDisplaySet:(state , data)=>{
            state.searchBarDisplay = data.payload
        }
    }
})
const NavBarReducer = NavBarSlice.reducer
export default NavBarReducer
export const NavBarActions = NavBarSlice.actions