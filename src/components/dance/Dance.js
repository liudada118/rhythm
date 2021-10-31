import { ifStatement } from '@babel/types'
import { cleanup } from '@testing-library/react'
import React, { useEffect, useRef } from 'react'
import img from '../../assets/images/explode.png'
import img1 from '../../assets/images/top.png'
// import img1 from '../../assets/images/top.png'
import play from '../../assets/images/play.png'
import video from '../../assets/video/video.mp4'
import lt from '../../assets/images/lt.png'
import c from '../../assets/images/c.png'
import lb from '../../assets/images/lb.png'
import rt from '../../assets/images/rt.png'
import rb from '../../assets/images/rb.png'
import {err , initialArr , small,dataArr1 ,dataArr} from '../../assets/data/data'
const width = window.innerWidth
const height = window.innerHeight
let goodFlagA = false, goodFlagB = false, goodFlagC = false, goodFlagD = false, goodFlagE = false
const bpm = [
    [2, 4], 0, [2, 4], 0, [1, 3], 0, [3, 5], 0, [2, 4], 0, [2, 4], 0, [1, 3], 0, [3, 5], 0, [2, 4], 0, [2, 4], 0, [1, 3], 0, [3, 5], 0, [2, 4], 0, [2, 4], 0, [1, 3], 0, [3, 5]]
// // const bpm = [1,2,3]
// let bpmArr = [1, 29, 60, 90, 121, 151, 180, 211, 237, 266, 297, 327, 355, 385, 414, 446, 473, 501, 532, 563, 591, 619, 649, 682, 710, 741, 769, 798, 827, 859, 886, 917]
// let bpm = [1, 2, 3, 4, 3, 2, 1, 2, 3, 4, 3, 2, 1, 2, 3, 4, 3, 2, 1, 2, 3, 4, 3, 2, 1, 2, 3, 4, 3, 2, 1]
		let bpmArr = [1, 29, 60, 90, 121, 151, 180, 211, 237, 266, 297, 327, 355, 385, 414, 446, 473, 501, 532, 563, 591, 619, 649, 682, 710, 741, 769, 798, 827, 859, 886, 917]
		// let bpmArr = [1, 59, 120, 180, 241, 301, 360, 421, 477, 536, 597, 657, 715, 775, 834, 896, 953, 1011, 1072, 1133, 1191, 1249, 1309, 1372, 1430, 1491, 1549, 1608, 1667, 1729, 1786, 1847]
const speed = (height - 25) / 60
let imgArr = []
let start = 0
let startFlag = false
let raf
let relArr = new Array(8).fill(0);
// let dataArr = new Array(8)
// let dataArr1 = new Array(8)
// let err = [100, 100, 80, 200, 200, 200, 200, 200]
let initial = 0
// let initialArr = new Array(8)
// let initialArr = [440, 479, 558, 423, 423, 331, 479, 519]
export default function Dance() {
    let ctx
    const videoRef = useRef()
    const good = useRef()
    const miss = useRef()
    useEffect(() => {

        const ws = new WebSocket('ws://127.0.0.1:9999')

        ws.onopen = () => {
            console.log('ws open')
        }

        ws.onmessage = (e) => {
            const data = JSON.parse(e.data).data
            initial++
            // if (initial == 1) {
            //     for (let i = 0; i < 8; i++) {
            //         initialArr[i] = data[i * 4] + 255 * data[i * 4 + 1]
            //     }
            // }
            // console.log()

            small(data)

            // for (let i = 0; i < 8; i++) {

            //     dataArr[i] = data[i * 4] + 255 * data[i * 4 + 1]
            //     // if (dataArr[i] < initialArr[i]) {
            //     //     initialArr[i] = dataArr[i]
            //     // }
            //     dataArr1[i] = data[i * 4] + 255 * data[i * 4 + 1] > initialArr[i] + err[i] ? 1 : 0
            //     // stableArr[i] = data[i * 4] + 255 * data[i * 4 + 1] > initialArr[i] + err ? data[i * 4] + 255 * data[i * 4 + 1] : 0
            // }
            console.log(dataArr,initialArr,dataArr1)
        }

        var playBtn = document.getElementById('play-btn');
        playBtn.addEventListener('click', pausePlayHandler, false);
        function pausePlayHandler(e) {
            console.log(11)
            if (videoRef.current.paused) {
                // 如果已暂停，则播放
                videoRef.current.play();
                // 显示暂停按钮，隐藏播放按钮
                // pauseBtn.style.visibility = 'visible';
                playBtn.style.visibility = 'hidden';
            } else {
                // 如果正在播放，则暂停
                videoRef.current.pause();
                // 显示播放按钮，隐藏暂停按钮
                // pauseBtn.style.visibility = 'hidden';
                playBtn.style.visibility = 'visible';
            }
        }


        function initVideo() {
            videoRef.current.muted = false
            videoRef.current.play();
        }
        // initVideo()

        function init() {

            console.log(videoRef)
            const canvas = document.getElementById('canvas');
            canvas.width = width
            canvas.height = height
            ctx = canvas.getContext('2d');

            ctx.fillStyle = 'rgba(255,255,255,0)';
            ctx.fillRect(0, 0, width, height);
            // var ctx = document.getElementById('canvas').getContext('2d');

            // 上下左右中

            // ctx.beginPath();
            // ctx.moveTo(0 , 200 +height + ((bpmArr[index]) - start) * speed);
            // ctx.lineTo(0 , 50 +height + ((bpmArr[index]) - start) * speed);
            // ctx.lineTo(50 , 100 +height + ((bpmArr[index]) - start) * speed);
            // ctx.lineTo(125 , 25 +height + ((bpmArr[index]) - start) * speed);
            // ctx.lineTo(175 , 75 +height + ((bpmArr[index]) - start) * speed);
            // ctx.lineTo(100 , 150 +height + ((bpmArr[index]) - start) * speed);
            // ctx.lineTo(150 , 200 +height + ((bpmArr[index]) - start) * speed);
            // ctx.stroke();

            ctx.lineWidth = 6;
            ctx.beginPath();
            ctx.moveTo(0, 200);
            ctx.lineTo(0, 50);
            ctx.lineTo(50, 100);
            ctx.lineTo(125, 25);
            ctx.lineTo(175, 75);
            ctx.lineTo(100, 150);
            ctx.lineTo(150, 200);
            ctx.lineTo(0, 200);
            ctx.stroke();


            ctx.beginPath();
            ctx.moveTo(200, 25);
            ctx.lineTo(350, 25);
            ctx.lineTo(300, 75);
            ctx.lineTo(375, 150);
            ctx.lineTo(325, 200);
            ctx.lineTo(250, 125);
            ctx.lineTo(200, 175);
            ctx.lineTo(200, 25);
            ctx.stroke();


            ctx.strokeRect(400, 25, 175, 175)

            ctx.beginPath();
            ctx.moveTo(600, 150);
            ctx.lineTo(675, 75);
            ctx.lineTo(625, 25);
            ctx.lineTo(775, 25);
            ctx.lineTo(775, 175);
            ctx.lineTo(725, 125);
            ctx.lineTo(650, 200);
            ctx.lineTo(600, 150);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(800, 75);
            ctx.lineTo(850, 25);
            ctx.lineTo(925, 100);
            ctx.lineTo(975, 50);
            ctx.lineTo(975, 200);
            ctx.lineTo(825, 200);
            ctx.lineTo(875, 150);
            ctx.lineTo(800, 75);
            ctx.stroke();

            ctx.strokeStyle = ''

            // 节奏格子

            console.log(ctx)

            draw()
        }
        init()

        // videoRef.current.onplaying = () => {
        //     startFlag = true
        //     window.requestAnimationFrame(game);

        // }
        // if(startFlag ){
        //     window.requestAnimationFrame(game);
        // }
        function game() {

            clean()
            draw()

        }
        function clean() {
            if (startFlag)
                ctx.clearRect(0, 0, width, height)
        }
        console.log(speed)
        function draw() {
            if(videoRef.current){videoRef.current.onplaying = () => {
                startFlag = true

            }
            videoRef.current.onpause = () => {
                startFlag = false 
            }

            // 按键反馈
            

            ctx.lineWidth = 20;
            ctx.beginPath();
            ctx.moveTo(0, 200);
            ctx.lineTo(0, 50);
            ctx.lineTo(50, 100);
            ctx.lineTo(125, 25);
            ctx.lineTo(175, 75);
            ctx.lineTo(100, 150);
            ctx.lineTo(150, 200);
            ctx.lineTo(0, 200);
            // ctx.strokeStyle = 'black'
            if(dataArr1[2]){
                ctx.fillStyle = 'blue'
            }else{
                ctx.fillStyle = 'black'
            }
            ctx.fill();


            ctx.beginPath();
            ctx.moveTo(200, 25);
            ctx.lineTo(350, 25);
            ctx.lineTo(300, 75);
            ctx.lineTo(375, 150);
            ctx.lineTo(325, 200);
            ctx.lineTo(250, 125);
            ctx.lineTo(200, 175);
            ctx.lineTo(200, 25);
            // ctx.strokeStyle = 'black'
            if(dataArr1[6]){
                ctx.fillStyle = 'blue'
            }else{
                ctx.fillStyle = 'black'
            }
            ctx.fill();

            ctx.beginPath();
            if(dataArr1[4]){
                ctx.fillStyle = 'blue'
            }else{
                ctx.fillStyle = 'black'
            }
            ctx.fillRect(400, 25, 175, 175)
           
            
            // ctx.strokeStyle = 'black'

            ctx.beginPath();
            ctx.moveTo(600, 150);
            ctx.lineTo(675, 75);
            ctx.lineTo(625, 25);
            ctx.lineTo(775, 25);
            ctx.lineTo(775, 175);
            ctx.lineTo(725, 125);
            ctx.lineTo(650, 200);
            ctx.lineTo(600, 150);
            
            if(dataArr1[5]){
                ctx.fillStyle = 'blue'
            }else{
                ctx.fillStyle = 'black'
            }
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(800, 75);
            ctx.lineTo(850, 25);
            ctx.lineTo(925, 100);
            ctx.lineTo(975, 50);
            ctx.lineTo(975, 200);
            ctx.lineTo(825, 200);
            ctx.lineTo(875, 150);
            ctx.lineTo(800, 75);
            // ctx.strokeStyle = 'black'
            if(dataArr1[3]){
                ctx.fillStyle = 'blue'
            }else{
                ctx.fillStyle = 'black'
            }
            ctx.fill();

            if (startFlag) {
                start++
                // ctx.strokeRect(200 * (1 - 1), height + ((400) - start) * speed, 200, 200)
                bpm.forEach((a, index) => {
                    if (typeof a == 'number') {
                        // ctx.fillRect(200 * (a - 1), height + ((bpmArr[index]) - start) * speed, 200, 200)
                        ctx.fillStyle = 'red'
                        if (a == 1) {
                            ctx.beginPath();
                            ctx.moveTo(0, 200 + height + ((bpmArr[index]) - start) * speed);
                            ctx.lineTo(0, 50 + height + ((bpmArr[index]) - start) * speed);
                            ctx.lineTo(50, 100 + height + ((bpmArr[index]) - start) * speed);
                            ctx.lineTo(125, 25 + height + ((bpmArr[index]) - start) * speed);
                            ctx.lineTo(175, 75 + height + ((bpmArr[index]) - start) * speed);
                            ctx.lineTo(100, 150 + height + ((bpmArr[index]) - start) * speed);
                            ctx.lineTo(150, 200 + height + ((bpmArr[index]) - start) * speed);
                            ctx.lineTo(0, 200 + height + ((bpmArr[index]) - start) * speed);
                            ctx.strokeStyle = 'rgba(0,0,0,1)'
                                if (height + ((bpmArr[index]) - start) * speed > 25 - 6*speed && height + ((bpmArr[index]) - start) * speed < 25 + 6 * speed) {
                                    if (dataArr1[2]) {
                                        goodFlagA = true
                                        ctx.strokeStyle = 'rgba(0,0,0,0)'
                                        good.current.style.opacity = 1
                                        miss.current.style.opacity = 0
                                        setTimeout(() => {
                                            good.current.style.opacity = 0
                                            goodFlagA = false
                                        }, 500)
                                    }
                                }
                                
                                else if (height + ((bpmArr[index]) - start) * speed <= 25 -  6*speed && height + ((bpmArr[index]) - start) * speed >= 25 - 10 * speed) {
                                    console.log(goodFlagA , '++++++++++++++')
                                    if (!goodFlagA) {
                                        miss.current.style.opacity = 1
                                        good.current.style.opacity = 0
                                        setTimeout(() => {
                                            miss.current.style.opacity = 0
                                        }, 200)
                                    }
                                } else if (height + ((bpmArr[index]) - start) * speed < 25 - 10 * speed) {
                                    return
                                }
                            ctx.stroke();
                            ctx.closePath();
                        }

                        if (a == 2) {
                            ctx.beginPath();
                            ctx.moveTo(200, 25 + height + ((bpmArr[index]) - start) * speed);
                            ctx.lineTo(350, 25 + height + ((bpmArr[index]) - start) * speed);
                            ctx.lineTo(300, 75 + height + ((bpmArr[index]) - start) * speed);
                            ctx.lineTo(375, 150 + height + ((bpmArr[index]) - start) * speed);
                            ctx.lineTo(325, 200 + height + ((bpmArr[index]) - start) * speed);
                            ctx.lineTo(250, 125 + height + ((bpmArr[index]) - start) * speed);
                            ctx.lineTo(200, 175 + height + ((bpmArr[index]) - start) * speed);
                            ctx.lineTo(200, 25 + height + ((bpmArr[index]) - start) * speed);
                            ctx.strokeStyle = 'rgba(0,0,0,1)'
                                if (height + ((bpmArr[index]) - start) * speed > 25 - 6*speed && height + ((bpmArr[index]) - start) * speed < 25 + 6 * speed) {
                                    if (dataArr1[6]) {
                                        goodFlagB = true
                                        ctx.strokeStyle = 'rgba(0,0,0,0)'
                                        good.current.style.opacity = 1
                                        miss.current.style.opacity = 0
                                        setTimeout(() => {
                                            good.current.style.opacity = 0
                                            goodFlagB = false
                                        }, 500)
                                    }
                                }
                                
                                else if (height + ((bpmArr[index]) - start) * speed <= 25 - 6* speed && height + ((bpmArr[index]) - start) * speed >= 25 - 10 * speed) {
                                    console.log(goodFlagB , '++++++++++++++')
                                    if (!goodFlagB) {
                                        miss.current.style.opacity = 1
                                        good.current.style.opacity = 0
                                        setTimeout(() => {
                                            miss.current.style.opacity = 0
                                        }, 200)
                                    }
                                } else if (height + ((bpmArr[index]) - start) * speed < 25 - 10 * speed) {
                                    return
                                }
                            ctx.stroke();
                            ctx.closePath();
                        }
                        if (a == 3) {
                            // ctx.beginPath();
                            // ctx.moveTo(200, 0);
                            // ctx.lineTo(350, 0);
                            // ctx.lineTo(300, 50);
                            // ctx.lineTo(375, 125);
                            // ctx.lineTo(325, 175);
                            // ctx.lineTo(250, 100);
                            // ctx.lineTo(200, 150);
                            // ctx.lineTo(200, 0);
                            // ctx.stroke();
                            ctx.beginPath();

                            ctx.strokeStyle = 'rgba(0,0,0,1)'
                                if (height + ((bpmArr[index]) - start) * speed > 25 - 6*speed && height + ((bpmArr[index]) - start) * speed < 25 + 6 * speed) {
                                    if (dataArr1[4]) {
                                        goodFlagC = true
                                        ctx.strokeStyle = 'rgba(0,0,0,0)'
                                        good.current.style.opacity = 1
                                        miss.current.style.opacity = 0
                                        setTimeout(() => {
                                            good.current.style.opacity = 0
                                            goodFlagC = false
                                        }, 500)
                                    }
                                }
                                
                                else if (height + ((bpmArr[index]) - start) * speed <= 25 -  6*speed && height + ((bpmArr[index]) - start) * speed >= 25 - 10 * speed) {
                                    console.log(goodFlagC , '++++++++++++++')
                                    if (!goodFlagC) {
                                        miss.current.style.opacity = 1
                                        good.current.style.opacity = 0
                                        setTimeout(() => {
                                            miss.current.style.opacity = 0
                                        }, 200)
                                    }
                                } else if (height + ((bpmArr[index]) - start) * speed < 25 - 10 * speed) {
                                    return
                                }
                            ctx.strokeRect(400, 0 + height + ((bpmArr[index]) - start) * speed, 175, 175)
                            ctx.closePath();
                        }
                        if (a == 4) {
                            ctx.beginPath();
                            ctx.moveTo(600, 125 + height + ((bpmArr[index]) - start) * speed);
                            ctx.lineTo(675, 50 + height + ((bpmArr[index]) - start) * speed);
                            ctx.lineTo(625, 0 + height + ((bpmArr[index]) - start) * speed);
                            ctx.lineTo(775, 0 + height + ((bpmArr[index]) - start) * speed);
                            ctx.lineTo(775, 150 + height + ((bpmArr[index]) - start) * speed);
                            ctx.lineTo(725, 100 + height + ((bpmArr[index]) - start) * speed);
                            ctx.lineTo(650, 175 + height + ((bpmArr[index]) - start) * speed);
                            ctx.lineTo(600, 125 + height + ((bpmArr[index]) - start) * speed);
                            ctx.strokeStyle = 'rgba(0,0,0,1)'
                            if (height + ((bpmArr[index]) - start) * speed > 25 - 6*speed && height + ((bpmArr[index]) - start) * speed < 25 + 6 * speed) {
                                if (dataArr1[5]) {
                                    goodFlagD = true
                                    ctx.strokeStyle = 'rgba(0,0,0,0)'
                                    good.current.style.opacity = 1
                                    miss.current.style.opacity = 0
                                    setTimeout(() => {
                                        good.current.style.opacity = 0
                                        goodFlagD = false
                                    }, 500)
                                }
                            }
                            
                            else if (height + ((bpmArr[index]) - start) * speed <= 25 -  6*speed && height + ((bpmArr[index]) - start) * speed >= 25 - 10 * speed) {
                                console.log(goodFlagD , '++++++++++++++')
                                if (!goodFlagD) {
                                    miss.current.style.opacity = 1
                                    good.current.style.opacity = 0
                                    setTimeout(() => {
                                        miss.current.style.opacity = 0
                                    }, 200)
                                }
                            } else if (height + ((bpmArr[index]) - start) * speed < 25 - 10 * speed) {
                                return
                            }
                            ctx.stroke();
                            ctx.closePath();
                        }

                        if (a == 5) {
                            ctx.beginPath();
                            ctx.moveTo(800, 50 + height + ((bpmArr[index]) - start) * speed);
                            ctx.lineTo(850, 0 + height + ((bpmArr[index]) - start) * speed);
                            ctx.lineTo(925, 75 + height + ((bpmArr[index]) - start) * speed);
                            ctx.lineTo(975, 25 + height + ((bpmArr[index]) - start) * speed);
                            ctx.lineTo(975, 175 + height + ((bpmArr[index]) - start) * speed);
                            ctx.lineTo(825, 175 + height + ((bpmArr[index]) - start) * speed);
                            ctx.lineTo(875, 125 + height + ((bpmArr[index]) - start) * speed);
                            ctx.lineTo(800, 50 + height + ((bpmArr[index]) - start) * speed);
                            ctx.strokeStyle = 'rgba(0,0,0,1)'
                                if (height + ((bpmArr[index]) - start) * speed > 25 -6* speed && height + ((bpmArr[index]) - start) * speed < 25 + 6 * speed) {
                                    if (dataArr1[3]) {
                                        goodFlagE = true
                                        ctx.strokeStyle = 'rgba(0,0,0,0)'
                                        good.current.style.opacity = 1
                                        miss.current.style.opacity = 0
                                        setTimeout(() => {
                                            good.current.style.opacity = 0
                                            goodFlagE = false
                                        }, 500)
                                    }
                                }
                                
                                else if (height + ((bpmArr[index]) - start) * speed <= 25 - 6* speed && height + ((bpmArr[index]) - start) * speed >= 25 - 10 * speed) {
                                    console.log(goodFlagE , '++++++++++++++')
                                    if (!goodFlagE) {
                                        miss.current.style.opacity = 1
                                        good.current.style.opacity = 0
                                        setTimeout(() => {
                                            miss.current.style.opacity = 0
                                        }, 200)
                                    }
                                } else if (height + ((bpmArr[index]) - start) * speed < 25 - 10 * speed) {
                                    return
                                }
                            ctx.stroke();
                            ctx.closePath();
                        }
                        // console.log(((bpmArr[index]) - start) * speed)
                    } else {
                        for (let i = 0; i < a.length; i++) {
                            if (a[i] == 1) {
                                ctx.beginPath();
                                ctx.moveTo(0, 200 + height + ((bpmArr[index]) - start) * speed);
                                ctx.lineTo(0, 50 + height + ((bpmArr[index]) - start) * speed);
                                ctx.lineTo(50, 100 + height + ((bpmArr[index]) - start) * speed);
                                ctx.lineTo(125, 25 + height + ((bpmArr[index]) - start) * speed);
                                ctx.lineTo(175, 75 + height + ((bpmArr[index]) - start) * speed);
                                ctx.lineTo(100, 150 + height + ((bpmArr[index]) - start) * speed);
                                ctx.lineTo(150, 200 + height + ((bpmArr[index]) - start) * speed);
                                ctx.lineTo(0, 200 + height + ((bpmArr[index]) - start) * speed);
                                ctx.strokeStyle = 'rgba(0,0,0,1)'
                                if (height + ((bpmArr[index]) - start) * speed > 25 - 6*speed && height + ((bpmArr[index]) - start) * speed < 25 + 6 * speed) {
                                    if (dataArr1[2]) {
                                        goodFlagA = true
                                        ctx.strokeStyle = 'rgba(0,0,0,0)'
                                        good.current.style.opacity = 1
                                        miss.current.style.opacity = 0
                                        setTimeout(() => {
                                            good.current.style.opacity = 0
                                            goodFlagA = false
                                        }, 500)
                                    }
                                }
                                
                                else if (height + ((bpmArr[index]) - start) * speed <= 25 -  6*speed && height + ((bpmArr[index]) - start) * speed >= 25 - 10 * speed) {
                                    console.log(goodFlagA , '++++++++++++++')
                                    if (!goodFlagA) {
                                        miss.current.style.opacity = 1
                                        good.current.style.opacity = 0
                                        setTimeout(() => {
                                            miss.current.style.opacity = 0
                                        }, 200)
                                    }
                                } else if (height + ((bpmArr[index]) - start) * speed < 25 - 10 * speed) {
                                    return
                                }
                                ctx.stroke();
                                ctx.closePath();
                            }

                            if (a[i] == 2) {
                                ctx.beginPath();
                                ctx.moveTo(200, 25 + height + ((bpmArr[index]) - start) * speed);
                                ctx.lineTo(350, 25 + height + ((bpmArr[index]) - start) * speed);
                                ctx.lineTo(300, 75 + height + ((bpmArr[index]) - start) * speed);
                                ctx.lineTo(375, 150 + height + ((bpmArr[index]) - start) * speed);
                                ctx.lineTo(325, 200 + height + ((bpmArr[index]) - start) * speed);
                                ctx.lineTo(250, 125 + height + ((bpmArr[index]) - start) * speed);
                                ctx.lineTo(200, 175 + height + ((bpmArr[index]) - start) * speed);
                                ctx.lineTo(200, 25 + height + ((bpmArr[index]) - start) * speed);
                                ctx.strokeStyle = 'rgba(0,0,0,1)'
                                if (height + ((bpmArr[index]) - start) * speed > 25 - 6*speed && height + ((bpmArr[index]) - start) * speed < 25 + 6 * speed) {
                                    if (dataArr1[6]) {
                                        goodFlagB = true
                                        ctx.strokeStyle = 'rgba(0,0,0,0)'
                                        good.current.style.opacity = 1
                                        miss.current.style.opacity = 0
                                        setTimeout(() => {
                                            good.current.style.opacity = 0
                                            goodFlagB = false
                                        }, 500)
                                    }
                                }
                                
                                else if (height + ((bpmArr[index]) - start) * speed <= 25 -  6*speed && height + ((bpmArr[index]) - start) * speed >= 25 - 10 * speed) {
                                    console.log(goodFlagB , '++++++++++++++')
                                    if (!goodFlagB) {
                                        miss.current.style.opacity = 1
                                        good.current.style.opacity = 0
                                        setTimeout(() => {
                                            miss.current.style.opacity = 0
                                        }, 200)
                                    }
                                } else if (height + ((bpmArr[index]) - start) * speed < 25 - 10 * speed) {
                                    return
                                }
                                ctx.stroke();
                                ctx.closePath();
                            }
                            if (a[i] == 3) {
                                // ctx.beginPath();
                                // ctx.moveTo(200, 0);
                                // ctx.lineTo(350, 0);
                                // ctx.lineTo(300, 50);
                                // ctx.lineTo(375, 125);
                                // ctx.lineTo(325, 175);
                                // ctx.lineTo(250, 100);
                                // ctx.lineTo(200, 150);
                                // ctx.lineTo(200, 0);
                                // ctx.stroke();
                                ctx.beginPath();

                                ctx.strokeStyle = 'rgba(0,0,0,1)'
                                if (height + ((bpmArr[index]) - start) * speed > 25 - 6*speed && height + ((bpmArr[index]) - start) * speed < 25 + 6 * speed) {
                                    if (dataArr1[4]) {
                                        goodFlagC = true
                                        ctx.strokeStyle = 'rgba(0,0,0,0)'
                                        good.current.style.opacity = 1
                                        miss.current.style.opacity = 0
                                        setTimeout(() => {
                                            good.current.style.opacity = 0
                                            goodFlagC = false
                                        }, 500)
                                    }
                                }
                                
                                else if (height + ((bpmArr[index]) - start) * speed <= 25 - 6* speed && height + ((bpmArr[index]) - start) * speed >= 25 - 10 * speed) {
                                    console.log(goodFlagC , '++++++++++++++')
                                    if (!goodFlagC) {
                                        miss.current.style.opacity = 1
                                        good.current.style.opacity = 0
                                        setTimeout(() => {
                                            miss.current.style.opacity = 0
                                        }, 200)
                                    }
                                } else if (height + ((bpmArr[index]) - start) * speed < 25 - 10 * speed) {
                                    return
                                }
                                ctx.strokeRect(400, 0 + height + ((bpmArr[index]) - start) * speed, 175, 175)
                                ctx.closePath();
                            }
                            if (a[i] == 4) {
                                ctx.beginPath();
                                ctx.moveTo(600, 125 + height + ((bpmArr[index]) - start) * speed);
                                ctx.lineTo(675, 50 + height + ((bpmArr[index]) - start) * speed);
                                ctx.lineTo(625, 0 + height + ((bpmArr[index]) - start) * speed);
                                ctx.lineTo(775, 0 + height + ((bpmArr[index]) - start) * speed);
                                ctx.lineTo(775, 150 + height + ((bpmArr[index]) - start) * speed);
                                ctx.lineTo(725, 100 + height + ((bpmArr[index]) - start) * speed);
                                ctx.lineTo(650, 175 + height + ((bpmArr[index]) - start) * speed);
                                ctx.lineTo(600, 125 + height + ((bpmArr[index]) - start) * speed);
                                ctx.strokeStyle = 'rgba(0,0,0,1)'
                                if (height + ((bpmArr[index]) - start) * speed > 25 - 6*speed && height + ((bpmArr[index]) - start) * speed < 25 + 6 * speed) {
                                    if (dataArr1[5]) {
                                        goodFlagD = true
                                        ctx.strokeStyle = 'rgba(0,0,0,0)'
                                        good.current.style.opacity = 1
                                        miss.current.style.opacity = 0
                                        setTimeout(() => {
                                            good.current.style.opacity = 0
                                            goodFlagD = false
                                        }, 500)
                                    }
                                }
                                
                                else if (height + ((bpmArr[index]) - start) * speed <= 25 - 6* speed && height + ((bpmArr[index]) - start) * speed >= 25 - 10 * speed) {
                                    console.log(goodFlagD , '++++++++++++++')
                                    if (!goodFlagD) {
                                        miss.current.style.opacity = 1
                                        good.current.style.opacity = 0
                                        setTimeout(() => {
                                            miss.current.style.opacity = 0
                                        }, 200)
                                    }
                                } else if (height + ((bpmArr[index]) - start) * speed < 25 - 10 * speed) {
                                    return
                                }
                                ctx.stroke();
                                ctx.closePath();
                            }

                            if (a[i] == 5) {
                                ctx.beginPath();
                                ctx.moveTo(800, 50 + height + ((bpmArr[index]) - start) * speed);
                                ctx.lineTo(850, 0 + height + ((bpmArr[index]) - start) * speed);
                                ctx.lineTo(925, 75 + height + ((bpmArr[index]) - start) * speed);
                                ctx.lineTo(975, 25 + height + ((bpmArr[index]) - start) * speed);
                                ctx.lineTo(975, 175 + height + ((bpmArr[index]) - start) * speed);
                                ctx.lineTo(825, 175 + height + ((bpmArr[index]) - start) * speed);
                                ctx.lineTo(875, 125 + height + ((bpmArr[index]) - start) * speed);
                                ctx.lineTo(800, 50 + height + ((bpmArr[index]) - start) * speed);

                                ctx.strokeStyle = 'rgba(0,0,0,1)'
                                if (height + ((bpmArr[index]) - start) * speed > 25 -6* speed && height + ((bpmArr[index]) - start) * speed < 25 + 6 * speed) {
                                    if (dataArr1[3]) {
                                        goodFlagE = true
                                        ctx.strokeStyle = 'rgba(0,0,0,0)'
                                        good.current.style.opacity = 1
                                        miss.current.style.opacity = 0
                                        setTimeout(() => {
                                            good.current.style.opacity = 0
                                            goodFlagE = false
                                        }, 500)
                                    }
                                }
                                
                                else if (height + ((bpmArr[index]) - start) * speed <= 25 - 6* speed && height + ((bpmArr[index]) - start) * speed >= 25 - 10 * speed) {
                                    console.log(goodFlagE , '++++++++++++++')
                                    if (!goodFlagE) {
                                        miss.current.style.opacity = 1
                                        good.current.style.opacity = 0
                                        setTimeout(() => {
                                            miss.current.style.opacity = 0
                                        }, 200)
                                    }
                                } else if (height + ((bpmArr[index]) - start) * speed < 25 - 10* speed) {
                                    return
                                }
                                ctx.stroke();
                                ctx.closePath();
                            }
                            // ctx.fillRect(200 * (a[i] - 1), height + ((bpmArr[index]) - start) * speed, 200, 200)

                        }
                    }
                })
            }
        }


            // videoRef.current.onplaying = () => {
            raf = window.requestAnimationFrame(game);

            // }

        }
        return () => {
            cancelAnimationFrame(raf)
        }
    }, [])
    return (
        <>
            {/* <div style={{ zIndex: 1, position: 'absolute', opacity: 1 }}>
                <img src={lb} style={{
                    // position: 'absolute',
                    width: 200, height: 200, //top: 0, left: 0, zIndex : 0
                }} alt="" />
                <img src={lt} style={{
                    // position: 'absolute',
                    width: 200, height: 200, //top: 0, left: 0, zIndex : 0
                }} alt="" />
                <img src={c} style={{
                    // position: 'absolute',
                    width: 200, height: 200, //top: 0, left: 0, zIndex : 0
                }} alt="" />
                <img src={rt} style={{
                    // position: 'absolute',
                    width: 200, height: 200, //top: 0, left: 0, zIndex : 0
                }} alt="" />
                <img src={rb} style={{
                    // position: 'absolute',
                    width: 200, height: 200, //top: 0, left: 0, zIndex : 0
                }} alt="" />


            </div> */}

            <div style={{ zIndex: 0, position: 'absolute' }}>
                <video ref={videoRef} id='video' style={{
                    height: '100vh', //position: 'absolute'
                }}
                    className='video'>
                    <source src={video}
                        type="video/webm" />
                    <source src={video}
                        type="video/mp4" />
                </video>

                {/* <iframe id="ifm" allow="autoplay" style="display:none" src={video}></iframe> */}
            </div>
            <div id="play-btn" class="video-controls" style={{ zIndex: 20, position: 'absolute', top: '50%', left: '50%' }}>
                <img style={{ width: 50 }} src={play} alt="" />
            </div>
            <div ref={good} style={{ position: 'absolute', left: 400, top: '40%', fontSize: '120px', color: 'blue',fontWeight : 'bold', opacity: 0 }}>good</div>
            <div ref={miss} style={{ position: 'absolute', left: 400, top: '40%', fontSize: '120px', color: 'red',fontWeight : 'bold', opacity: 0 }}>miss</div>
            <canvas id='canvas' style={{
                position: 'absolute',  //top: 0, left: 0, zIndex : 0
            }}></canvas>

        </>
    )
}
