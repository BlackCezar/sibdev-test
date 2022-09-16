import * as React from 'react';
import {ReactComponent as Heart} from 'assets/imgs/heart.svg'
import { Link } from 'react-router-dom';
import { addFavoritToList } from 'store/favorits/favorits.slice';
import Modal from '../Favorite/Modal';

interface FavoriteAcc {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    hidden: Boolean
}

const Favorite: React.FC<FavoriteAcc> = ({setShowModal, hidden}) => {
    const openModal = () => setShowModal(true)

    if (hidden) return null;
    
    return <div className='favorite'>
        <Heart onClick={openModal} />
        <div className="tooltip-wrapper">
            <div className="tooltip">
                <span>Поиск сохранён в разделе «Избранное»</span>
                <Link to={'/favorite'}>Перейти в избранное</Link>
            </div>
        </div>
    </div>
}

export default Favorite