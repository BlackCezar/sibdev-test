// @flow
import * as React from 'react';
import SibDevLogo from 'assets/imgs/sibdev-logo.svg'
import {ILogin} from "./Login.interface";
import './Login.scss'
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/hook";
import {signInFetch} from "../../../store/authentication/authentication.actions";
import { useNavigate } from 'react-router-dom';
import useToken from 'views/lib/useToken';
import InputField from 'views/ui/InputField';
import { clearSearch } from 'store/search/search.slice';

const Login: React.FC<ILogin> = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {setToken} = useToken()
    const {isLoading, msg} = useAppSelector(state => state.auth)

    const signInFn = async () => {
        const token = await dispatch(signInFetch({login, password}))
        
        if (token) {
            setToken(token)
            dispatch(clearSearch())
            navigate('/')
        }
    }

    return (
        <div className='login-page'>
            <div className="login-page-container">
                <img src={SibDevLogo} alt="sibdev" className="login-page-logo"/>
                <h1>Вход</h1>
                <InputField label='Логин' name='login' change={(val) => setLogin(val)} />
                <InputField label='Пароль' name='pass' type='password' change={val => setPassword(val)} />
                <button className="login-page-submit" onClick={signInFn}>{isLoading ? 'Загрузка' : 'Войти'}</button>
                {msg && <span className='login-page-error'>{msg}</span>}
            </div>
        </div>
    );
}

export default Login