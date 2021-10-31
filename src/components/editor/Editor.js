import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './editor.css'
import {Key} from '../../js/keyboard'
export default function Editor() {
    const audios = useRef()
    const music = (e) => {
        console.log(e.target.files[0])
        console.log()
        // audio.current.children[0].src = 
        const src = window.URL.createObjectURL(e.target.files[0])
        var audio = document.createElement('audio');
        audio.src = src;
        audio.controls = true;
        audio.volume = '0.2';
        audios.current.appendChild(audio)
        // console.log()
        // audio.current.children[0].onload = function (){
        //     window.URL.revokeObjectURL(this.src);
        // }
    }
    useEffect(() => {
        const Aarr = []
        const Sarr = []
        const Darr = []
        const Farr = []
        const Garr = []
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        scene.add( cube );

        camera.position.z = 5;


        const animate = function () {
            if(Key.isDown(Key.A)){
                Aarr.push(1)
            }else{
                Aarr.push(0)
            }
            if(Key.isDown(Key.S)){
                Sarr.push(1)
            }else{
                Sarr.push(0)
            }
            if(Key.isDown(Key.D)){
                Darr.push(1)
            }else{
                Darr.push(0)
            }
            if(Key.isDown(Key.F)){
                Farr.push(1)
            }else{
                Farr.push(0)
            }
            if(Key.isDown(Key.G)){
                Garr.push(1)
            }else{
                Garr.push(0)
            }
            console.log(Aarr,Sarr)
            // document.getElementById('arr').innerHTML = arr
            requestAnimationFrame( animate );

            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            renderer.render( scene, camera );
        };

        animate();
    }, [])
    return (
        <div>
            <input id='mp3' type="file" onChange={(e) => { music(e) }} />
            <div class='content'>
                <div className="musicItems">
                    <div className="musicItem"></div>
                    <div className="musicItem"></div>
                    <div className="musicItem"></div>
                    <div className="musicItem"></div>
                    <div className="musicItem"></div>
                </div>
            </div>
            {/* <audio ref={audio} id='audio' controls="controls">
                <source  type="audio/mp3" />
                <source  type="audio/ogg" />
                Your browser does not support this audio format.
            </audio> */}
            <div style={{ position: 'absolute', bottom: 0, width: '100%' }} ref={audios} id='audio'></div>
        </div>
    )
}
