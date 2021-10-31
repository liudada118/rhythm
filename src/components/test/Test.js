import React, { useState, useEffect, useRef } from 'react'
import { Key } from '../../js/keyboard'
import video from '../../assets/video/video2.mp4'
import { Link } from 'react-router-dom'
import './test.css'
import { err, initialArr, small, dataArr1, dataArr, stableArr,maxArr } from '../../assets/data/data'
import { Data, sum } from '../../assets/js/data'
// const err = 150
let oldArr = new Array(8).fill(0);
let timeArr = new Array(8);
// let dataArr = [0, 0, 0, 0]
// let dataArr = new Array(8)
// let dataArr1 = new Array(8)
// let stableArr = new Array(8)
let jump = false
let startFlag = false
let flag = 0
let stableFlag = 0
// let time = 0
let initial = 0
// let initialArr = new Array(8)
let end = 0
let videoStart = false
let stOldArr = new Array(stableArr.length).fill(0)
let stold = new Array(8).fill(0)
// let smooth = new Array(8).fill(0)
let newsmooth = new Array(8).fill(0)
let oldsomenum = 0
let diff = 0
let oldDiff = 0
let varpArr = new Array(8)
for (let i = 0; i < 8; i++) {
    varpArr[i] = []
    // newsmooth[i] = []
    // stold[i] = []
}
let numFlag = true
let allStableNum = 0
export default function Test(props) {
    let time = 0
    let countdown = props.countdown
    const box1 = useRef()
    const box2 = useRef()
    const box3 = useRef()
    const box4 = useRef()
    const box5 = useRef()
    const box6 = useRef()
    const box7 = useRef()
    const box8 = useRef()
    const box9 = useRef()
    const failRef = useRef()
    const videoRef = useRef()
    const smoothRef = useRef()
    const smoothRef1 = useRef()
    const smoothRef2 = useRef()
    const [num, setNum] = useState(0)
    const [timeNum, setTimeNum] = useState(0)
    const [stable, setStable] = useState(0)
    const [countdownTime, setCountdown] = useState(0)
    const [allStable, setAllStable] = useState(0)
    const [nowStable, setNowStable] = useState(0)
    const [kll , setkll] = useState(0)
    useEffect(() => {
        const ws = new WebSocket('ws://127.0.0.1:9999')
        ws.onopen = () => {
            // connection opened
            console.info('connect success');
        };

        ws.onmessage = (e) => {
            //   console.log( initialArr,dataArr1,dataArr,maxArr)

            /**
             * 记录初始值stable
             * */
            // console.log(dataArr1, dataArr, stableArr, initialArr)

            if(props.allStable){
                const data = JSON.parse(e.data).data
                small(data)
                stableFlag++
    
                        if (stableFlag % 5 == 0) {
                            for (let i = 0; i < 8; i++) {
                                if (varpArr[i].length < 10) {
                                    // varpArr[i] = []
                                    varpArr[i].push(stableArr[i])
                                } else {
                                    varpArr[i].shift()
                                    varpArr[i].push(stableArr[i])
                                }
    
                                newsmooth[i] = newsmooth[i] + (Math.abs(Data(varpArr[i]) - stold[i]) - newsmooth[i]) / 10 > 20 ? 20 : newsmooth[i] + (Math.abs(Data(varpArr[i]) - stold[i]) - newsmooth[i]) / 10
                                // console.log(varpArr, newsmooth, Data(varpArr), stold)
                                setStable(newsmooth[4])
                                // console.log(newsmooth[4], stableArr, newsmooth)
                                stold[i] = Data(varpArr[i])
                            }
    
                            // console.log(newsmooth)
                            // newsmooth = newsmooth + (Math.abs(Data(varpArr) - stold) - newsmooth) / 10 > 20 ? 20 : newsmooth + (Math.abs(Data(varpArr) - stold) - newsmooth) / 10
                            // console.log(varpArr, newsmooth, Data(varpArr), stold)
                            // setStable(newsmooth)
                            // 平稳档
                            let valueNumber = 0
                            let indexarr = []
                            dataArr1.filter((a,index) => {
                                if(a == 1){
                                    indexarr.push(index) 
                                }
                            })
                            for(let i = 0 ; i < indexarr.length ; i ++){
                                valueNumber += newsmooth[indexarr[i]]
                            }
                            // valueNumber = valueNumber > 20 ? valueNumber : 0
                            console.log(indexarr , valueNumber)
                            allStableNum += valueNumber > 25 ? valueNumber : 0
                            setAllStable(allStableNum)
                            setkll((allStableNum/3000).toFixed(1))
                            setNowStable(valueNumber)
                        }
    
    
                        stOldArr = [...stableArr]
            }

            if (videoRef.current && box1.current.style) {
                videoRef.current.onplaying = () => {
                    videoStart = true

                }
                videoRef.current.onpause = () => {
                    videoStart = false
                    // box1.current.style.backgroundColor = '#f0f0f0'
                    // box2.current.style.backgroundColor = '#f0f0f0'
                    // box3.current.style.backgroundColor = '#f0f0f0'
                    // box4.current.style.backgroundColor = '#f0f0f0'
                    // box5.current.style.backgroundColor = '#f0f0f0'
                    // box6.current.style.backgroundColor = '#f0f0f0'
                    // box7.current.style.backgroundColor = '#f0f0f0'
                    // box8.current.style.backgroundColor = '#f0f0f0'
                    // box9.current.style.backgroundColor = '#f0f0f0'
                }


                if (!videoStart) {
                    
                    const data = JSON.parse(e.data).data
                    small(data)
                    if (props.allStable) {
    
                        // let oldNum
                        stableFlag++
    
                        if (stableFlag % 5 == 0) {
                            for (let i = 0; i < 8; i++) {
                                if (varpArr[i].length < 10) {
                                    // varpArr[i] = []
                                    varpArr[i].push(stableArr[i])
                                } else {
                                    varpArr[i].shift()
                                    varpArr[i].push(stableArr[i])
                                }
    
                                newsmooth[i] = newsmooth[i] + (Math.abs(Data(varpArr[i]) - stold[i]) - newsmooth[i]) / 10 > 20 ? 20 : newsmooth[i] + (Math.abs(Data(varpArr[i]) - stold[i]) - newsmooth[i]) / 10
                                // console.log(varpArr, newsmooth, Data(varpArr), stold)
                                setStable(newsmooth[4])
                                // console.log(newsmooth[4], stableArr, newsmooth)
                                stold[i] = Data(varpArr[i])
                            }
    
                            // console.log(newsmooth)
                            // newsmooth = newsmooth + (Math.abs(Data(varpArr) - stold) - newsmooth) / 10 > 20 ? 20 : newsmooth + (Math.abs(Data(varpArr) - stold) - newsmooth) / 10
                            // console.log(varpArr, newsmooth, Data(varpArr), stold)
                            // setStable(newsmooth)
                            // 平稳档
                            let valueNumber = 0
                            let indexarr = []
                            dataArr1.filter((a,index) => {
                                if(a == 1){
                                    indexarr.push(index) 
                                }
                            })
                            for(let i = 0 ; i < indexarr.length ; i ++){
                                valueNumber += newsmooth[indexarr[i]]
                            }
                            // valueNumber = valueNumber > 20 ? valueNumber : 0
                            console.log(indexarr , valueNumber,allStableNum/3000 )
                            allStableNum += valueNumber
                            setAllStable(allStableNum)
                            
                            setNowStable(valueNumber)
                        }
    
    
                        stOldArr = [...stableArr]
    
                    }
                }
    
    
                if (videoStart) {
                    console.log(11111111)
                    const data = JSON.parse(e.data).data
                    small(data)
                    // initial++
                    // if (initial == 1) {
                    //     for (let i = 0; i < 8; i++) {
                    //         initialArr[i] = data[i * 4] + 255 * data[i * 4 + 1]
                    //     }
                    // }
                    // console.log()
    
    
                    // for (let i = 0; i < 8; i++) {
    
                    //     dataArr[i] = data[i * 4] + 255 * data[i * 4 + 1]
                    //     // if (dataArr[i] < initialArr[i]) {
                    //     //     initialArr[i] = dataArr[i]
                    //     // }
                    //     dataArr1[i] = data[i * 4] + 255 * data[i * 4 + 1] > initialArr[i] + err[i] ? 1 : 0
                    //     stableArr[i] = data[i * 4] + 255 * data[i * 4 + 1] > initialArr[i] + err[i] ? data[i * 4] + 255 * data[i * 4 + 1] : 0
                    // }
                    // console.log(stableArr,dataArr1,dataArr)
                    if (dataArr1[7]) {
                        box1.current.style.backgroundColor = 'red'
                    } else {
                        box1.current.style.backgroundColor = '#f0f0f0'
                    }
    
                    if (dataArr1[7]) {
                        box2.current.style.backgroundColor = 'red'
                    } else {
                        box2.current.style.backgroundColor = '#f0f0f0'
                    }
    
                    if (dataArr1[6]) {
                        box3.current.style.backgroundColor = 'red'
                    } else {
                        box3.current.style.backgroundColor = '#f0f0f0'
                    }
                    if (dataArr1[5]) {
                        box4.current.style.backgroundColor = 'red'
                    } else {
                        box4.current.style.backgroundColor = '#f0f0f0'
                    }
                    if (dataArr1[4]) {
                        box5.current.style.backgroundColor = 'red'
                    } else {
                        box5.current.style.backgroundColor = '#f0f0f0'
                    }
                    if (dataArr1[2]) {
                        box6.current.style.backgroundColor = 'red'
                    } else {
                        box6.current.style.backgroundColor = '#f0f0f0'
                    }
                    if (dataArr1[3]) {
                        box7.current.style.backgroundColor = 'red'
                    } else {
                        box7.current.style.backgroundColor = '#f0f0f0'
                    }
                    if (dataArr1[1]) {
                        box8.current.style.backgroundColor = 'red'
                    } else {
                        box8.current.style.backgroundColor = '#f0f0f0'
                    }
                    if (dataArr1[0]) {
                        box9.current.style.backgroundColor = 'red'
                    } else {
                        box9.current.style.backgroundColor = '#f0f0f0'
                    }
    
                    // console.log(dataArr)
                    // dataArr.map((a, index) => { if (a > 150) { return a = 1 } else return a = 0 })
                    // console.log(dataArr1)
                    //  计数的两种方式
                    if (props.num) {
    
                        // 跳起来
                        if (props.jump) {
    
                            if (dataArr1.some(a => a > 0)) {
                                startFlag = true
                            }
                            // console.log(dataArr , oldArr,JSON.stringify(oldArr) != JSON.stringify(dataArr))
                            if (JSON.stringify(oldArr) != JSON.stringify(dataArr1) && dataArr1.every((a) => a == 0) && startFlag) {
    
                                flag++
                                setNum(parseInt(flag / 2))
                            }
                            // console.log(dataArr, oldArr)
                            oldArr = [...dataArr1]
                        }
    
                        // 一只脚一直不跳
                        if (!props.jump && !props.somejump) {
                            if (dataArr1.some(a => a > 0)) {
                                startFlag = true
                            }
                            if (JSON.stringify(oldArr) != JSON.stringify(dataArr1) && startFlag) {
    
                                flag++
                                setNum(flag)
                            }
                            // console.log(dataArr, oldArr)
                            oldArr = [...dataArr1]
                        }
    
                        // 偶尔跳  偶尔不跳
                        if (props.somejump) {
                            let num = dataArr1.filter(i => i == 1).length
                            diff = num - oldsomenum
                            if (dataArr1.some(a => a > 0)) {
                                startFlag = true
                            }
                            console.log(numFlag, diff / Math.abs(diff))
                            if (numFlag) {
                                // if (diff / Math.abs(diff) == - oldArr / Math.abs(oldDiff) && diff != 0 && oldDiff != 0) 
                                if (oldsomenum != num) {
                                    console.log(false)
                                    numFlag = false
                                    setTimeout(() => {
                                        numFlag = true
                                    }, 400)
                                    flag++
                                    setNum(flag)
                                }
                            }
    
                            oldDiff = diff;
                            oldsomenum = num
    
                        }
    
    
                    }
    
                    // 计时
                    if (props.time) {
    
                        // if (dataArr1.some(a => a > 0)) {
                        //     startFlag = true
                        // }
                        // // console.log(dataArr , oldArr,JSON.stringify(oldArr) != JSON.stringify(dataArr))
                        // if (startFlag) {
                        //     // console.log(end)
                        //     if (end == 51) {
                        //         // clearInterval(timer)
                        //         return
                        //     }
                        //     time++
                        //     // setTime(time + 1)
                        //     // console.log(dataArr1,end ,dataArr1.every(a => a == 0))
                        //     setTimeNum(parseInt((time) / 50))
                        //     if (dataArr1.every(a => a == 0)) {
                        //         end++
                        //     } else {
                        //         end = 0
                        //     }
    
                        // }
                        // console.log(dataArr, oldArr)
                        // oldArr = [...dataArr]
                    }
    
                    if (props.countdown) {
                        // if (dataArr1.some(a => a > 0)) {
                        //     startFlag = true
                        // }
                        // if (startFlag) {
                        //     countdown--
                        //     if (countdown == 0) {
                        //         return
                        //     }
                        //     setCountdown(parseInt((countdown) / 50))
                        // }
                    }
    
                    if (props.stableNum) {
                        if (dataArr1.some(a => a > 0)) {
                            startFlag = true
                        }
                        if (startFlag) {
                            if (dataArr1.filter(a => a == 1).length > props.stableNum) {
                                // startFlag = false
                                // failRef.current.style.display = 'block'
                                // videoRef.current.pause()
                            }
                        }
                    }
    
                    if (props.unstableNum) {
                        // console.log(object)
                        if (dataArr1.filter(a => a == 1).length > props.unstableNum) {
                            // videoRef.current.pause()
                            // smoothRef.current.style.transform = `translateX(${900}%)`
                            smoothRef.current.style.backgroundColor = 'red'
                            smoothRef1.current.style.backgroundColor = 'red'
                            smoothRef2.current.style.backgroundColor = 'red'
                            return
                        }
    
                    }
    
                    if (props.stable) {
    
                        // let oldNum
                        stableFlag++
    
                        if (stableFlag % 5 == 0) {
                            for (let i = 0; i < 8; i++) {
                                if (varpArr[i].length < 10) {
                                    // varpArr[i] = []
                                    varpArr[i].push(stableArr[i])
                                } else {
                                    varpArr[i].shift()
                                    varpArr[i].push(stableArr[i])
                                }
    
                                newsmooth[i] = newsmooth[i] + (Math.abs(Data(varpArr[i]) - stold[i]) - newsmooth[i]) / 10 > 20 ? 20 : newsmooth[i] + (Math.abs(Data(varpArr[i]) - stold[i]) - newsmooth[i]) / 10
                                // console.log(varpArr, newsmooth, Data(varpArr), stold)
                                setStable(newsmooth[4])
                                console.log(newsmooth[4], stableArr, newsmooth)
                                stold[i] = Data(varpArr[i])
                            }
    
                            // console.log(newsmooth)
                            // newsmooth = newsmooth + (Math.abs(Data(varpArr) - stold) - newsmooth) / 10 > 20 ? 20 : newsmooth + (Math.abs(Data(varpArr) - stold) - newsmooth) / 10
                            // console.log(varpArr, newsmooth, Data(varpArr), stold)
                            // setStable(newsmooth)
                            // 平稳档
                            if (newsmooth[4] < 1.5) {
                                smoothRef.current.style.backgroundColor = 'green'
                                smoothRef1.current.style.backgroundColor = '#fff'
                                smoothRef2.current.style.backgroundColor = '#fff'
                            }
                            // 不太稳
                            else if (newsmooth[4] < 4) {
                                smoothRef.current.style.backgroundColor = '#ffab57'
                                smoothRef1.current.style.backgroundColor = '#ffab57'
                                smoothRef2.current.style.backgroundColor = '#fff'
                            }
                            // 很不稳
                            else {
                                smoothRef.current.style.backgroundColor = 'red'
                                smoothRef1.current.style.backgroundColor = 'red'
                                smoothRef2.current.style.backgroundColor = 'red'
                            }
    
    
                            // if (props.allStable) {
                            //     setAllStable(sum(newsmooth))
                            // }
                        }
    
    
                        stOldArr = [...stableArr]
    
                    }
    
    
                }
            }


            

        }


        return () => {
            ws.close();
            console.log('close')
        }




    }, [])

    /**
     * 计数
     * */

    // 开合跳
    // useEffect(() => {
    //     let time
    //     // console.log(jump)
    //     if (props.num) {
    //         if (props.jump) {
    //             time = setInterval(() => {
    //                 if (dataArr.some(a => a > 0)) {
    //                     startFlag = true
    //                 }
    //                 // console.log(dataArr , oldArr,JSON.stringify(oldArr) != JSON.stringify(dataArr))
    //                 if (JSON.stringify(oldArr) != JSON.stringify(dataArr) && dataArr.every((a) => a == 0) && startFlag) {

    //                     flag++
    //                     setNum(flag)
    //                 }
    //                 // console.log(dataArr, oldArr)
    //                 oldArr = [...dataArr]
    //             }, 100);
    //         }
    //     }

    //     return () => {
    //         if (time) {
    //             clearInterval(time)
    //         }
    //     }


    // }, [])

    // // 一只脚动

    // useEffect(() => {
    //     let timer
    //     // console.log(props.jump)


    //     if (props.num) {
    //         if (!props.jump) {
    //             timer = setInterval(() => {
    //                 if (dataArr.some(a => a > 0)) {
    //                     startFlag = true
    //                 }
    //                 // console.log(dataArr , oldArr,JSON.stringify(oldArr) != JSON.stringify(dataArr))
    //                 if (JSON.stringify(oldArr) != JSON.stringify(dataArr) && startFlag) {

    //                     flag++
    //                     setNum(flag)
    //                 }
    //                 // console.log(dataArr, oldArr)
    //                 oldArr = [...dataArr]
    //             }, 100);
    //         }
    //     }


    //     return () => {
    //         if (timer) {
    //             clearInterval(timer)
    //         }

    //     }
    // }, [])

    // /**
    //  * 计时
    //  * */
    // useEffect(() => {
    //     let timer
    //     let end = 0
    //     if (props.time) {

    //         timer = setInterval(() => {
    //             if (dataArr.some(a => a > 0)) {
    //                 startFlag = true
    //             }
    //             // console.log(dataArr , oldArr,JSON.stringify(oldArr) != JSON.stringify(dataArr))
    //             if (startFlag) {
    //                 // console.log(end)
    //                 if (end == 50) {
    //                     clearInterval(timer)
    //                     return
    //                 }
    //                 time++
    //                 setTime(time)
    //                 if (dataArr.every(a => a == 0)) {
    //                     end++
    //                 } else {
    //                     end = 0
    //                 }

    //             }
    //             // console.log(dataArr, oldArr)
    //             oldArr = [...dataArr]
    //         }, 100);
    //     }



    //     return () => {
    //         if (timer) {
    //             clearInterval(timer)
    //         }
    //     }
    // }, [])


    // /**
    //  * 稳定
    //  * */
    // useEffect(() => {
    //     let oldArr = new Array(dataArr.length).fill(0)
    //     let oldNum
    //     let smooth = 0
    //     if (props.stable) {
    //         setInterval(() => {
    //             let sortArr = dataArr.sort((x, y) => x - y)
    //             let num = dataArr.indexOf(sortArr[sortArr.length - 1])
    //             if (oldNum != num) {
    //                 smooth = 0
    //                 smooth = smooth + (Math.abs(dataArr[num] - oldArr[num]) - smooth) / 30
    //                 setStable(smooth)
    //             } else {
    //                 smooth = smooth + (Math.abs(dataArr[num] - oldArr[num]) - smooth) / 30
    //                 setStable(smooth)
    //             }
    //             oldArr = [...dataArr]
    //             oldNum = num
    //         }, 100);
    //     }
    //     return () => {

    //     }
    // }, [])



    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', color: '#000', left: 0, display: 'block' }}>
                <button className='testButton'><Link to='/'>回到主页</Link> </button>
                <button className='testButton'> <Link to='test1'>测试1</Link> </button>
                <button className='testButton'><Link to='test2'>测试2</Link> </button>
                <button className='testButton'><Link to='test3'>测试3</Link> </button>
                <button className='testButton'><Link to='test4'>测试4</Link> </button>
            </div>
            <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', marginLeft: 50, color: '#fff', display: 'flex', fontWeight: 'bolder', flexDirection: 'column', fontSize: '70px', height: '100%', color: props.color, transform: props.smart ? 'translateX(-80%)' : 'unset' }}>
                    {props.num ? <div style={{ flex: 1, verticalAlign: 'bottom' }}> <span>个数：</span> <span style={{ fontSize: 100 }}>{parseInt(num / 2)}</span></div> : null}
                    {props.time ? <div style={{ flex: 1 }}> <span>时间 ：</span> <span style={{ fontSize: 100 }}>{timeNum}</span> </div> : null}
                    {props.stable ? <div style={{ flex: 1 }}>稳定程度
                        <div style={{ height: 40, width: 500, backgroundColor: '#ddd', borderRadius: 20, display: 'flex', position: 'relative' }}>
                            <div ref={smoothRef} style={{ width: '33%', height: '100%', borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}></div>
                            <div ref={smoothRef1} style={{ width: '34%', height: '100%', }}></div>
                            <div ref={smoothRef2} style={{ width: '33%', height: '100%', borderTopRightRadius: 20, borderBottomRightRadius: 20 }}></div>
                            {/* <div ref={smoothRef} style={{ width: '10%', height: '100%', borderRadius: 10, position: 'absolute', backgroundColor: '#000', top: 0, left: 0 }}></div> */}
                        </div>
                        {stable.toFixed(2)}
                    </div> : null}
                    {/* {props.countdown ? <div style={{ flex: 1 }}> <span>倒计时：</span> <span style={{ fontSize: 100 }}>{countdownTime}</span></div> : null} */}
                </div>

                {props.video ? <video ref={videoRef} controls style={{ height: props.height ? 'unset' : '100vh', width: props.height ? '100vw' : 'unset' }} className='video'>
                    <source src={props.video}
                        type="video/webm" />
                    <source src={props.video}
                        type="video/mp4" />
                </video> : null}
                {
                    props.allStable ? <><div style={{ fontSize: 60, zIndex: 20, position: 'absolute', right: 0 }}>
                        <div>{allStable}</div>
                        <div>{nowStable}</div>
                        <div>{kll}</div>
                    </div> </>: null
                }
                {/* {
                        props.image ? <img src={props.image} style={{ height: '100vh' }} alt="" /> : null
                    } */}
                {
                    // <div style={{ position: 'absolute', top: 'calc(50% - 30px)', left: 'calc(50% - 30px)', color: 'red', fontSize: '60px', display: 'none' }} ref={failRef}>fail</div>
                }
                <div className='yogaMat' style={{ transform: props.smart ? 'translate3d(100%,0,0)' : 'unset' }} >
                    <div className="yogamat">
                        <div ref={box1} className="yogamatbox"></div>
                        <div ref={box2} className="yogamatbox"></div>
                    </div>
                    <div className="bigBox">
                        <div className="yogamat">
                            <div ref={box3} className="yogamatbox"></div>
                            <div ref={box4} className="yogamatbox"></div>
                        </div>
                        <div ref={box5} className="yogamatbox1"></div>
                        <div className="yogamat">
                            <div ref={box6} className="yogamatbox"></div>
                            <div ref={box7} className="yogamatbox"></div>
                        </div>
                    </div>
                    <div className="yogamat">
                        <div ref={box8} className="yogamatbox"></div>
                        <div ref={box9} className="yogamatbox"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Test.defaultProps = {
//     jump: false,
//     num: true,
//     time: true,
//     stable: true,
//     video: video
// }