import {AppDispatch} from "../index";
import {AuthIncome, AuthResponse} from "./authenication.interface";
import axios from 'axios'
import {signIn, signInFailure, signInSuccess, setProfile} from "./authentication.slice";

export const signInFetch = (data: AuthIncome) => async (dispatch: AppDispatch) => {
    try {
        dispatch(signIn())
        const response = await axios.post<AuthResponse>('/api/login', data)
        if (response.data.code !== 0) throw response.data
        dispatch(signInSuccess(response.data))
    } catch (e) {
        dispatch(signInFailure())
    }
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
