// @flow
import React, {useLayoutEffect, useState} from 'react';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { fetchVideoSearch } from 'store/search/search.actions';
import { ReactComponent as ListView } from 'assets/imgs/list.svg';
import { ReactComponent as GridView } from 'assets/imgs/grid.svg';
import './Home.scss'
import { SearchResource } from 'store/search/search.interface';
import FavoriteComp from './FavoriteBtn';
import Modal from '../Favorite/Modal';
import { Favorite, YouTubeOrder } from 'store/favorits/favorits.interface';
import VideoItem from './VideoItem';
import { IHomeProps } from 'views/screens/NotFound';
import { LocationState, Query } from './Home.interface';
import FavoriteForm from '../Favorite/FavoriteForm';
import { defaultMaxCount, defaultViewType } from 'config/config';
import { useLocation } from 'react-router-dom';


const Home: React.FC<IHomeProps> = () => {
    const { isLoading, list, pageInfo, query: oldQuery } = useAppSelector(state => state.search)
    const user = useAppSelector(state => state.auth.user)
    const dispatch = useAppDispatch()
    const location = useLocation();
    const [selectedViewType, setViewType] = useState(defaultViewType)
    const [queryInput, setQueryInput] = useState(oldQuery)
    const [showModal, setShowModal] = useState(false)
    const [tmpFavorite, setTmpFavorite] = useState<Favorite | undefined>()
    const [query, setQuery] = React.useState<Query>({ 
        order: YouTubeOrder.relevance,
        maxResults: defaultMaxCount,
        q: oldQuery,
        part: 'snippet',
        type: 'video'
    }) 

    const searchQuery = () => {
        const newQuery: Query = {
            ...query,
            q: queryInput,
        }
        setQuery(newQuery)
        dispatch(fetchVideoSearch(newQuery))
    }

    const closeModal = () => setShowModal(false)

    const addNewFavorite = () => {
        const tmpFavorite: Favorite = {
            query: oldQuery,
            id: 0,
            maxCount: query.maxResults,
            name: oldQuery,
            sortBy: query.order,
            author: user?.id,
            viewType: selectedViewType
        }
        setTmpFavorite(tmpFavorite)
        setShowModal(true)
    }

    useLayoutEffect(() => {
        if (location.state) {
            const {viewType, query} = location.state as LocationState
            if (viewType) setViewType(viewType)
            if (query) {
                setQueryInput(query.q)
                setQuery(query)
            }
        } else window.history.replaceState({}, document.title)
    }, [location.state])

    const renderVideoList = React.useCallback((videos: Array<SearchResource>) => {
        return videos.map(video => <VideoItem key={video.id.videoId} video={video} />)
    }, [list],
    )

    return (
        <div className='search-page'>
            <div className={list ? 'search-page-container has-query' : 'search-page-container'}>
                <h1>Поиск видео</h1>
                <form className="search-page-form" onSubmit={ev => ev.preventDefault()}>
                    <input type="search" value={queryInput} onChange={ev => setQueryInput(ev.target.value)} placeholder='Что хотите посмотреть?' />
                    <FavoriteComp addNewFavorite={addNewFavorite} query={oldQuery} hidden={!list} />
                    <input type="submit" onClick={searchQuery} disabled={!!isLoading} value='Найти' />
                </form>
            </div>
            {!isLoading && list &&
                <div className="search-page-content">
                    <div className="search-page-row">
                        <div className="search-page-count">
                            Видео по запросу  <b>«{oldQuery}»</b> <span>{pageInfo && pageInfo.totalResults}</span>
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
            <Modal closeModal={closeModal} title="Сохранить запрос" show={showModal}>
                <FavoriteForm closeModal={closeModal} favorite={tmpFavorite} isEdit={false} />
            </Modal>
        </div>
    );
};

export default Home