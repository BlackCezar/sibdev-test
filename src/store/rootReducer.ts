import {combineReducers} from "@reduxjs/toolkit";
import AuthSlice from './authentication/authentication.slice'
import searchSlice from "./search/search.slice";

export const rootReducer = combineReducers({
    auth: AuthSlice,
    search: searchSlice
})

export type RootReducer = ReturnType<typeof rootReducer>