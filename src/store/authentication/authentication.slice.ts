import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { AuthResponse, AuthState, IUser} from "./authenication.interface";

const initialState: AuthState = {
    isAuth: false,
    isLoading: false,
    token: null,
    user: null,
    msg: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn(state) {
            state.isLoading = true
            state.msg = ''
        },
        signInSuccess(state, action: PayloadAction<AuthResponse>) {
            state.user = action.payload.object as IUser
            state.isLoading = false
            state.isAuth = true
            state.msg = ''

            if (action.payload.token) {
                localStorage.setItem('token', action.payload.token)
            }
        },
        signInFailure(state) {
            state.isLoading = false
            state.msg = 'Ошибка при авторизации'
        },
        setProfile(state, action) {
            state.user = action.payload.object
            state.isAuth = true
            state.isLoading = false
        },
        logout(state) {
            state.isAuth = false
            state.user = null
        }
    }
})

export const {signIn, signInSuccess, signInFailure, logout, setProfile} = authSlice.actions

export default authSlice.reducer