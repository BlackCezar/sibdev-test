// @flow
import * as React from 'react';
import SibDevLogo from 'assets/imgs/sibdev-logo.svg'
import {ILogin} from "./Login.interface";
import './Login.scss'
import PasswordToggle from "../../ui/passwordToggle";
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/hook";
import {signInFetch} from "../../../store/authentication/authentication.actions";
import { useNavigate } from 'react-router-dom';

const Login: React.FC<ILogin> = (props) => {
    const [passwordType, setPasswordType] = useState('password')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {isLoading, isAuth, msg} = useAppSelector(state => state.auth)

    const togglePasswordType = () => {
        passwordType === 'password' ? setPasswordType('text') : setPasswordType('password')
    }
    const signInFn = () => {
        
        dispatch( signInFetch({login, password}))
    }

    React.useEffect(() => {
        if (!isLoading && isAuth) navigate('/')
    }, [isLoading, isAuth])

    return (
        <div className='login-page'>
            <div className="login-page-container">
                <img src={SibDevLogo} alt="sibdev" className="login-page-logo"/>
                <h1>Вход</h1>
                <div className="login-page-field">
                    <label htmlFor="login">Логин</label>
                    <input type="text" value={login} onChange={ev => setLogin(ev.target.value)}
                           className="login-page-input"/>
                </div>
                <div className="login-page-field">
                    <label htmlFor="login">Пароль</label>
                    <input type={passwordType} value={password} onChange={ev => setPassword(ev.target.value)} className="login-page-input"/>
                    <PasswordToggle showPass={togglePasswordType} hidePass={togglePasswordType}/>
                </div>
                <button className="login-page-submit" onClick={signInFn}>{isLoading ? 'Загрузка' : 'Войти'}</button>
                {msg && <span className='login-page-error'>{msg}</span>}
            </div>
        </div>
    );
}

export default Login