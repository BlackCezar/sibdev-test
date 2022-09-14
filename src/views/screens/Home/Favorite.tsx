import * as React from 'react';
import {ReactComponent as Heart} from 'assets/imgs/heart.svg'
import { Link } from 'react-router-dom';

interface FavoriteAcc {
    query?: string
}

const Favorite: React.FC<FavoriteAcc> = () => {
    return <div className='favorite'>
        <Heart />
        <div className="tooltip-wrapper">
            <div className="tooltip">
                <span>Поиск сохранён в разделе «Избранное»</span>
                <Link to={'/favorite'}>Перейти в избранное</Link>
            </div>
        </div>
    </div>
}

export default Favorite