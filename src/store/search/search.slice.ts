import { createSlice } from "@reduxjs/toolkit";
import { SearchState } from "./search.interface";

const initialState: SearchState = {
    query: '',
    isLoading: false,
    list: null,
    pageInfo: null,
    error: ''
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        startSearch(state) {
            state.isLoading = true
            state.error = ''
        }, 
        searchFailure(state, action) {
            state.error = action.payload
            state.isLoading = false
        }, 
        searchSuccess(state, action) {
            state.list = action.payload.items
            state.pageInfo = action.payload.pageInfo
            state.isLoading = false
        }
    }
})

export const {startSearch, searchFailure, searchSuccess} = searchSlice.actions
export default searchSlice.reducer