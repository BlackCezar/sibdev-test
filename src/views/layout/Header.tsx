import React from 'react';
import '../../assets/scss/Common.scss'
import {Link} from "react-router-dom";
import {ReactComponent as SibDevLogo} from 'assets/imgs/sibdev-logo.svg'
export interface IHeaderProps {
}

const App: React.FC<IHeaderProps> = (props) => {
    return (
        <header>
            <div className="container">
                <SibDevLogo className='header-logo' />
                <ul role='navigation'>
                <Link to='/'><li>Поиск</li></Link>
                    <Link to='/query'><li>Избранное</li></Link>
                    <Link to='/logout'><li>Выйти</li></Link>
                </ul>
            </div>
        </header>
    );
}

export default App;
