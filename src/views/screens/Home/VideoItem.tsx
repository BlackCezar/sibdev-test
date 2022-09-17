import React, { useCallback } from 'react'
import Img from '../../ui/Image'
import { IVideoItem } from './Home.interface';



const VideoItem: React.FC<IVideoItem> = ({ video }) => {
    const renderViewsCount = useCallback(() => {
        const count = video.stats?.viewCount

        if (!count) return 0
        if (count > 1000000) {
            return `${Number(count / 1000000).toFixed(1)} млн.`
        }
        if (count > 1000) {
            return `${Number(count / 1000).toFixed(1)} тыс.`
        }
    }, [video.stats])

    return (
        <div key={video.id.videoId} className='video-item'>
            <Img src={video.snippet.thumbnails.high.url} />
            <span className='video-title'>{video.snippet.title}</span>
            <span className="video-channel">{video.snippet.channelTitle}</span>
            <span className='video-vcount'>{renderViewsCount()} просмотров </span>
        </div>
    )
}

export default VideoItem;