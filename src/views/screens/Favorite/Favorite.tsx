import { defaultViewType } from 'config/config'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Favorite, YouTubeOrder } from 'store/favorits/favorits.interface'
import { removeFavoriteFromList } from 'store/favorits/favorits.slice'
import { useAppDispatch, useAppSelector } from 'store/hook'
import { fetchVideoSearch } from 'store/search/search.actions'
import { Query } from '../Home/Home.interface'
import { IFavorite } from './favorite.interface'
import './Favorite.scss'
import FavoriteForm from './FavoriteForm'
import Modal from './Modal'

const FavoritePage: React.FC<IFavorite> = () => {
    const { list, isLoading } = useAppSelector(state => state.favorits)
    const user = useAppSelector(state => state.auth.user)
    const [showModal, setShowModal] = useState(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [selectedQuery, selectQuery] = useState<Favorite>({
        id: 0,
        name: '',
        query: '',
        sortBy: YouTubeOrder.relevance,
        maxCount: 12,
        viewType: defaultViewType
    })
    const closeModal = () => setShowModal(false)
    const openModal = (query: Favorite) => {
        selectQuery(query)
        setShowModal(true)
    }
    const runQuery = (favorite: Favorite) => {
        const newQuery: Query = {
            q: favorite.query,
            maxResults: favorite.maxCount,
            order: favorite.sortBy as YouTubeOrder,
            part: 'snippet',
            type: 'video'
        }
        dispatch(fetchVideoSearch(newQuery))
        navigate('/', {
            state: {
                viewType: favorite.viewType,
                query: newQuery
            }
        })
    }
    const renderFavorits = useCallback((favList: Array<Favorite>) => {
        return favList.filter(f => f.author === user?.id).map((fav, index) => (<div className="favorite-item" key={index}>
            <span>{fav.name}</span>
            <button onClick={() => runQuery(fav)} className='favorite-run'>Выполнить</button>
            <button onClick={() => openModal(fav)} className='favorite-edit'>Изменить</button>
            <button onClick={() => dispatch(removeFavoriteFromList(fav.id))} className='favorite-remove'>Удалить</button>
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
        <Modal closeModal={closeModal} title="Изменить запрос" show={showModal}>
            <FavoriteForm closeModal={closeModal} favorite={selectedQuery} isEdit={true} />
        </Modal>
    </div>)
}

export default FavoritePage