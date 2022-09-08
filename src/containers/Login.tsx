// @flow
import * as React from 'react';
import '../assets/scss/Login.scss'
import SivdevLogo from '../assets/imgs/sibdev-logo.svg'

type Props = {

};
type State = {};

export default class Login extends React.Component<Props, State> {
    render() {
        return (
            <div className='login-page'>
                <div className="login-page-container">
                    <img src={SivdevLogo} alt="sibdev" className="login-page-logo"/>
                    <h1>Вход</h1>
                    <div className="login-page-field">
                        <label htmlFor="login">Логин</label>
                        <input type="text" className="login-page-input"/>
                    </div>
                    <div className="login-page-field">
                        <label htmlFor="login">Пароль</label>
                        <input type="password" className="login-page-input"/>
                    </div>
                    <button className="login-page-submit">Войти</button>
                </div>
            </div>
        );
    };
};