import {AppDispatch} from "../index";
import {AuthIncome, AuthResponse} from "./authenication.interface";
import axios from 'axios'
import {signIn, signInFailure, signInSuccess, setProfile, logout} from "./authentication.slice";

export const signInFetch = (data: AuthIncome) => async (dispatch: AppDispatch) => {
    try {
        dispatch(signIn())
        const response = await axios.post<AuthResponse>('/api/login', data)
        if (response.data.code !== 0) throw response.data
        dispatch(signInSuccess(response.data))
        return response.data.token
    } catch (e) {
        dispatch(signInFailure())
    }
}

export const logoutFetch = () => async (dispatch: AppDispatch) => {
    const response = await axios.get<AuthResponse>('/api/logout')
    dispatch(logout())
}

export const getUserProfile = (token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(signIn())
        const response = await axios.post<AuthResponse>('/api/profile', {token})
        if (response.data.code !== 0) throw response.data
        dispatch(setProfile(response.data))
    } catch (e) {
        dispatch(signInFailure())
    }
}
