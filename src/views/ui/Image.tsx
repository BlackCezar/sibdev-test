import React from 'react'
import { useState } from "react"

interface IImage {
    src: string
}

const Image: React.FC<IImage> = ({src}) => {
    const [loaded, setLoaded] = useState(false)

    const handleImageLoaded = () => {
        setLoaded(true)
    }
    
    return (<div className='image-placeholder'>
        <img 
            src={src} 
            onLoad={handleImageLoaded}
            style={{display: loaded ? 'block' : 'none'}} />
    </div>)
}

export default Image