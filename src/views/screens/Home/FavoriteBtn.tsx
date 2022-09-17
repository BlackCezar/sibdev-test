import { useEffect, useState } from 'react';
import { ReactComponent as Heart } from 'assets/imgs/heart.svg'
import { Link } from 'react-router-dom';
import { useAppSelector } from 'store/hook';
import { FavoriteAcc } from './Home.interface';

const Favorite: React.FC<FavoriteAcc> = ({ addNewFavorite, hidden, query }) => {
    const [isAdded, markAsAdded] = useState(false)
    const list = useAppSelector(state => state.favorits.list)
    useEffect(() => {
        if (list.find(l => l.query === query)) {
            markAsAdded(true)
        } else markAsAdded(false)
    }, [query])

    if (hidden) return null;

    return <div className='favorite'>
        <Heart onClick={addNewFavorite} />
        {isAdded &&
            (<div className="tooltip-wrapper">
                <div className="tooltip">
                    <span>Поиск сохранён в разделе «Избранное»</span>
                    <Link to={'/favorite'}>Перейти в избранное</Link>
                </div>
            </div>)}
    </div>
}

export default Favorite