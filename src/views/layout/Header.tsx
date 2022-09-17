import React from 'react';
import '../../assets/scss/Common.scss'
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as SibDevLogo } from 'assets/imgs/sibdev-logo.svg'
import { IHeaderProps } from './Layout.interface';


const App: React.FC<IHeaderProps> = () => {
    const location = useLocation()

    return (
        <header>
            <div className="container">
                <SibDevLogo className='header-logo' />
                <ul role='navigation'>
                    <Link to='/' className={location.pathname === '/' ? 'active' : ''}><li>Поиск</li></Link>
                    <Link to='/favorite' className={location.pathname === '/favorite' ? 'active' : ''}><li>Избранное</li></Link>
                    <Link to='/logout' className={location.pathname === '/logout' ? 'active' : ''}><li>Выйти</li></Link>
                </ul>
            </div>
        </header>
    );
}

export default App;
