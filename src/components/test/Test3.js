import React from 'react'
import Test from './Test'
import video from '../../assets/video/video3.mp4'
export default function Test1() {
    return (
        <div>
            <Test color='black' countdown={751} stable unstableNum={1} height video={video}/>            
        </div>
    )
}
