import React from 'react'
import {Link} from 'react-router-dom'
export default function Home() {
    return (
        <div>
            <Link to='rhythm'>节奏大师</Link>
            <Link to='number'>计数</Link>
            <Link to='time'>计时</Link>
            <Link to='test1'>测试</Link>
            <Link to='dance'>跳舞机</Link>
            <Link to='edit'>编辑</Link>
        </div>
    )
}
