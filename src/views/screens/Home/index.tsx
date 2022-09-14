// @flow
import * as React from 'react';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { fetchVideoSearch } from 'store/search/search.actions';
import { ReactComponent as ListView } from 'assets/imgs/list.svg';
import { ReactComponent as GridView } from 'assets/imgs/grid.svg';
import Img from '../../ui/Image'
import './Home.scss'
import { SearchResource } from 'store/search/search.interface';
import Favorite from './Favorite';

export interface IHomeProps {

}

const Home: React.FC<IHomeProps> = (props) => {
    const [query, setQuery] = React.useState('')
    const [tmpQuery, setTmpQuery] = React.useState('')
    const dispatch = useAppDispatch()
    const { isLoading, list, pageInfo } = useAppSelector(state => state.search)
    const [selectedViewType, setViewType] = React.useState('grid')

    const searchQuery = () => {
        setQuery(tmpQuery)
        dispatch(fetchVideoSearch(tmpQuery))
    }

    const renderVideoList = React.useCallback((videos: Array<SearchResource>) => {
        return videos.map(video => renderVideoItem(video))
    }, [list],
    )

    const renderVideoItem = React.useCallback((video: SearchResource) => {
        return (<div className='video-item'>
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
                    <Favorite />
                    <input type="submit" onClick={searchQuery} value='Найти' />
                </form>
            </div>
            {!isLoading && list &&
                <div className="search-page-content">
                    <div className="search-page-row">
                        <div className="search-page-count">
                            Видео по запросу  <b>«{query}»</b> <span>{pageInfo && pageInfo.totalResults}</span>
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
        </div>
    );
};

export default Home