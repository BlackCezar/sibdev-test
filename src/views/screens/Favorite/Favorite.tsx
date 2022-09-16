import { useCallback, useState } from 'react'
import { Favorite, YouTubeOrder } from 'store/favorits/favorits.interface'
import { removeFavoriteFromList } from 'store/favorits/favorits.slice'
import { useAppSelector } from 'store/hook'
import './Favorite.scss'
import Modal from './Modal'
interface IFavorite { }

const FavoritePage: React.FC<IFavorite> = () => {
    const { list, isLoading, error } = useAppSelector(state => state.favorits)
    const [showModal, setShowModal] = useState(false)
    const [selectedQuery, selectQuery] = useState<Favorite>({
        id: 0,
        name: '',
        query: '',
        sortBy: YouTubeOrder.relevance,
        maxCount: 12
    })
    const closeModal = () => setShowModal(false)
    const openModal = (query: Favorite) => {
        selectQuery(query)
        setShowModal(true)
    }
    const renderFavorits = useCallback((favList: Array<Favorite>) => {
        return favList.map(fav => (<div className="favorite-item">
            <span>{fav.name}</span>
            <button onClick={() => openModal(fav)} className='favorite-edit'>Изменить</button>
            <button onClick={() => removeFavoriteFromList(fav.id)} className='favorite-remove'>Удалить</button>
        </div>))
    }, [list])

    return (<div className="favorite-page">
        <div className="favorite-container">
            <h1>Избранное</h1>
            {isLoading && <span>Загрузка</span>}
            <div className="favorite-list">
                {renderFavorits(list)}
            </div>
        </div>
        <Modal closeModal={closeModal} show={showModal} isEdit={true} query={selectedQuery} />
    </div>)
}

export default FavoritePage