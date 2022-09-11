// @flow
import * as React from 'react';
import Header from '../Header'
export interface IHomeProps {

}
const Home: React.FC<IHomeProps> = (props) => {
    return (
        <div className='search-page'>
            <Header />
            <div className="search-page-container">
                <h1>Поиск видео</h1>
                <form className="search-page-form">
                    <input type="search" placeholder='Что хотите посмотреть?'/>
                    <input type="submit" value='Найти'/>
                </form>
            </div>
        </div>
    );
};

export default Home