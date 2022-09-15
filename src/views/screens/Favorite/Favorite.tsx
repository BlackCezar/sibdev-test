import './Favorite.scss'
import Modal from './Modal'
interface IFavorite {}

const Favorite: React.FC<IFavorite> = () => {
    return (<div className="favorite-page">
        <div className="favorite-container">
            <h1>Избранное</h1>
            <div className="favorite-list">
                <div className="favorite-item">
                    <span>видео</span>
                    <button className='favorite-edit'>Изменить</button>
                    <button className='favorite-remove'>Удалить</button>
                </div>
                <div className="favorite-item">
                    <span>видео</span>
                    <button className='favorite-edit'>Изменить</button>
                    <button className='favorite-remove'>Удалить</button>
                </div>
                <div className="favorite-item">
                    <span>видео</span>
                    <button className='favorite-edit'>Изменить</button>
                    <button className='favorite-remove'>Удалить</button>
                </div>
            </div>
        </div>
        <Modal isEdit={true} query=''/>
    </div>)
}

export default Favorite