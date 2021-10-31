import React from 'react'
import Test from './Test'
import video from '../../assets/video/video1.mp4'
export default function Test1() {
    return (
        <div>
            <Test color='black' countdown={1001} stable stableNum={3} smart video={video}/>            
        </div>
    )
}
