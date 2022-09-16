// @flow
import * as React from 'react';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { fetchVideoSearch } from 'store/search/search.actions';
import { ReactComponent as ListView } from 'assets/imgs/list.svg';
import { ReactComponent as GridView } from 'assets/imgs/grid.svg';
import Img from '../../ui/Image'
import './Home.scss'
import { SearchResource } from 'store/search/search.interface';
import FavoriteComp from './Favorite';
import Modal from '../Favorite/Modal';
import { Favorite, YouTubeOrder } from 'store/favorits/favorits.interface';

export interface IHomeProps {

}

const Home: React.FC<IHomeProps> = (props) => {
    const [query, setQuery] = React.useState<Favorite>({
        id: 0,
        name: '',
        query: '',
        sortBy: YouTubeOrder.relevance,
        maxCount: 12
    })
    const [tmpQuery, setTmpQuery] = React.useState('')
    const dispatch = useAppDispatch()
    const { isLoading, list, pageInfo } = useAppSelector(state => state.search)
    const [selectedViewType, setViewType] = React.useState('grid')
    const [showModal, setShowModal] = React.useState(false)

    const searchQuery = () => {
        setQuery({
            id: 0,
            sortBy: YouTubeOrder.relevance,
            maxCount: 12,
            query: tmpQuery,
            name: tmpQuery
        })
        dispatch(fetchVideoSearch(tmpQuery))
    }

    const closeModal = () => setShowModal(false)

    const renderVideoList = React.useCallback((videos: Array<SearchResource>) => {
        return videos.map(video => renderVideoItem(video))
    }, [list],
    )

    const renderVideoItem = React.useCallback((video: SearchResource) => {
        return (<div key={video.id.videoId} className='video-item'>
            <Img src={video.snippet.thumbnails.high.url} />
            <span className='video-title'>{video.snippet.title}</span>
            <span className="video-channel">{video.snippet.channelTitle}</span>
        </div>)
    }, [list])


    return (
        <div className='search-page'>
            <div className={query ? 'search-page-container has-query' : 'search-page-container'}>
                <h1>Поиск видео</h1>
                <form className="search-page-form" onSubmit={ev => ev.preventDefault()}>
                    <input type="search" value={tmpQuery} onChange={ev => setTmpQuery(ev.target.value)} placeholder='Что хотите посмотреть?' />
                    <FavoriteComp hidden={!query} setShowModal={setShowModal} />
                    <input type="submit" onClick={searchQuery} value='Найти' />
                </form>
            </div>
            {!isLoading && list &&
                <div className="search-page-content">
                    <div className="search-page-row">
                        <div className="search-page-count">
                            Видео по запросу  <b>«{tmpQuery}»</b> <span>{pageInfo && pageInfo.totalResults}</span>
                        </div>
                        <div className="search-page-view">
                            <ListView className={selectedViewType === 'list' ? 'active' : ''} onClick={() => setViewType('list')} /> 
                            <GridView className={selectedViewType === 'grid' ? 'active' : ''} onClick={() => setViewType('grid')} />
                        </div>
                    </div>
                    <div className={`search-page-row search-page-${selectedViewType}`}>
                        {renderVideoList(list as Array<SearchResource>)}
                    </div>
                </div>}
            <Modal closeModal={closeModal} query={query} isEdit={false} show={showModal} />
        </div>
    );
};

export default Home