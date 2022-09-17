import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdvancedSearchResult, SearchState } from "./search.interface";

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
        searchSuccess(state, action: PayloadAction<AdvancedSearchResult>) {
            state.list = action.payload.list.map(item => {
                const stats = action.payload.statistics.find(st => st.id === item.id.videoId)
                item.stats = stats?.statistics
                return item
            })
            state.pageInfo = action.payload.pageInfo
            state.isLoading = false
            state.query = action.payload.query
        },
        clearSearch(state) { 
            state.list = initialState.list
            state.pageInfo = initialState.pageInfo
            state.query = initialState.query 
        }
    }
})

export const { startSearch, searchFailure, searchSuccess, clearSearch } = searchSlice.actions
export default searchSlice.reducer