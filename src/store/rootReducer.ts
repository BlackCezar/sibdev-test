import {combineReducers} from "@reduxjs/toolkit";
import AuthSlice from './authentication/authentication.slice'
import favoritsSlice from "./favorits/favorits.slice";
import searchSlice from "./search/search.slice";

export const rootReducer = combineReducers({
    auth: AuthSlice,
    search: searchSlice,
    favorits: favoritsSlice
})

export type RootReducer = ReturnType<typeof rootReducer>