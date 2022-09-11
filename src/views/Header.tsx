import React from 'react';
import '../assets/scss/Common.scss'
import {Link} from "react-router-dom";

export interface IHeaderProps {
}

const App: React.FC<IHeaderProps> = (props) => {
    return (
        <header>
            <img src="assets/imgs/sibdev-logo.svg" alt="Sibdev"/>
            <ul role='navigation'>
                <li><Link to='/'>Поиск</Link></li>
                <li><Link to='/'>Избранное</Link></li>
                <li><Link to='/'>Выйти</Link></li>
            </ul>
        </header>
    );
}

export default App;
