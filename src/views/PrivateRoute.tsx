// @flow
import * as React from 'react';
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../store/hook";
import {useLayoutEffect} from "react";
import {getUserProfile} from "../store/authentication/authentication.actions";
import Layout from './layout/Layout';

const PrivateRoute = ({children}: {children: JSX.Element}) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {isLoading, isAuth} = useAppSelector(state => state.auth)

    useLayoutEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            console.log('Get token')
            dispatch(getUserProfile(token))
        } else {
            navigate('/login')
        }
    }, [])

    
    console.log(isLoading, isAuth)
    if (isLoading) {
        return <p>Загрузка</p>
    }
  
    return <Layout>{children}</Layout>;
};

export default PrivateRoute