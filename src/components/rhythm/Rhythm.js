import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Key } from '../../js/keyboard'
import img from '../../assets/images/play1.png'
import video from '../../assets/video/video4.mp4'
import {err , initialArr , small,dataArr1 ,dataArr} from '../../assets/data/data'
export default function Dance() {
	const playRef = useRef()
	const videoRef = useRef()

	const  pausePlayHandler = (e) => {
		console.log(11)
		var playBtn = document.getElementById('play');
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

	useEffect(() => {

		// --------------------------------------------- //
		// ------- 3D PONG built with Three.JS --------- //
		// -------- Created by Nikhil Suresh ----------- //
		// -------- Three.JS is by Mr. doob  ----------- //
		// --------------------------------------------- //

		// ------------------------------------- //
		// ------- GLOBAL VARIABLES ------------ //
		// ------------------------------------- //

		// scene object variables
		// import { cubeNum } from './compute'
		var renderer, scene, camera, pointLight, spotLight;
		var startFlag = false
		var textmesh, missmesh
		var newSpeed
		let timerA, timerB, timerC, timerD, timerE
		var circle, circle1, circle2, circle3, circle4
		// let bpm = [0,
		// 	[2, 4], 3, [2, 4], 3, [1, 3], 3, [3,], 3, [2, 4], 3, [2, 4], 3, [1, 3], 3, [3,], 3, [2, 4], 3, [2, 4], 3, [1, 3], 3, [3,], 3, [2, 4], 3, [2, 4], 3, [1, 3], 3, [3,]]
		let bpm = [1, 2, 3, 4, 3, 2, 1, 2, 3, 4, 3, 2, 1, 2, 3, 4, 3, 2, 1, 2, 3, 4, 3, 2, 1, 2, 3, 4, 3, 2, 1]
		// let bpmArr = [1, 29, 60, 90, 121, 151, 180, 211, 237, 266, 297, 327, 355, 385, 414, 446, 473, 501, 532, 563, 591, 619, 649, 682, 710, 741, 769, 798, 827, 859, 886, 917]
		let bpmArr = [1, 59, 120, 180, 241, 301, 360, 421, 477, 536, 597, 657, 715, 775, 834, 896, 953, 1011, 1072, 1133, 1191, 1249, 1309, 1372, 1430, 1491, 1549, 1608, 1667, 1729, 1786, 1847]
		// let cubenum = cubeNum(bpm)
		const time = Date.parse(new Date())
		// field variables
		var fieldWidth = 6000, fieldHeight = 1000;
		let timein = 0, index = 0, nowball = []
		// paddle variables
		var track, track1, track2, track3, track4
		var paddleWidth, paddleHeight, paddleDepth, paddleQuality;
		var paddle1DirY = 0, paddle2DirY = 0, paddleSpeed = 6.6;
		const ppostion = -70
		const bpostion = 80
		var boxArr
		let goodFlagA = true, goodFlagB = true, goodFlagC = true, goodFlagD = true, goodFlagE = true
		let goodNum = 0
		// ball variables
		var ball, paddle1, paddle2, paddle3, paddle4, paddle5, ball1, ball2, ball3, ball4;
		var ballDirX = -1, ballDirY = 1, ballSpeed = 25;
		// const ballArr = [ball, ball1, ball2, ball3, ball4]
		// const paddleArr = [paddle1, paddle2, paddle3, paddle4, paddle5]
		// game-related variables
		var score1 = 0, score2 = 0;
		// let dataArr = new Array(8)
		// let dataArr1 = new Array(8)
		// let err = [150,150,220,220,300,220,300,220]
		// let err = new Array(8).fill(200)
		// let err = [100, 100, 80, 200, 200, 200, 200, 200]
		let initial = 0
		// let initialArr = new Array(8)
		// let initialArr = [440, 479, 558, 423, 423, 331, 479, 519]
		// you can change this to any positive whole number
		var maxScore = 7;

		// set opponent reflexes (0 - easiest, 1 - hardest)
		var difficulty = 0.2;
		let relData = new Array(8).fill(0)
		// ------------------------------------- //
		// ------- GAME FUNCTIONS -------------- //
		// ------------------------------------- //

		const ws = new WebSocket('ws://127.0.0.1:9999')

		ws.onopen = () => {
			console.log('ws open')
		}
		ws.onmessage = (e) => {

			const data = JSON.parse(e.data).data
			// dataArr[i] = data[i * 4] + 255 * data[i * 4 + 1]
			initial++
			small(data)
			// if (initial == 1) {
			// 	for (let i = 0; i < 8; i++) {
			// 		initialArr[i] = data[i * 4] + 255 * data[i * 4 + 1]
			// 	}
			// }
			// console.log()
			// const dataArr1 = small(data)
			// for (let i = 0; i < 8; i++) {

			// 	dataArr[i] = data[i * 4] + 255 * data[i * 4 + 1]
			// 	// if (dataArr[i] < initialArr[i]) {
			// 	// 	initialArr[i] = dataArr[i]
			// 	// }
			// 	dataArr1[i] = data[i * 4] + 255 * data[i * 4 + 1] > initialArr[i] + err[i] ? 1 : 0
			// 	// stableArr[i] = data[i * 4] + 255 * data[i * 4 + 1] > initialArr[i] + err ? data[i * 4] + 255 * data[i * 4 + 1] : 0
			// }
			console.log(dataArr1, initialArr ,dataArr)
		}

		setup()
		function setup() {
			// update the board to reflect the max score for match win


			// now reset player and opponent scores
			score1 = 0;
			score2 = 0;

			// set up all the 3D objects in the scene	
			createScene();

			// and let's get cracking!
			draw();
		}


		function createScene() {
			// set the scene size
			var WIDTH = window.innerWidth,
				HEIGHT = window.innerHeight;

			// set some camera attributes
			var VIEW_ANGLE = 50,
				ASPECT = WIDTH / HEIGHT,
				NEAR = 0.1,
				FAR = 10000;

			var c = document.getElementById("gameCanvas");

			// create a WebGL renderer, camera
			// and a scene
			renderer = new THREE.WebGLRenderer();
			camera =
				new THREE.PerspectiveCamera(
					VIEW_ANGLE,
					ASPECT,
					NEAR,
					FAR);

			scene = new THREE.Scene();

			// add the camera to the scene
			scene.add(camera);

			// set a default position for the camera
			// not doing this somehow messes up shadow rendering
			camera.position.z = 320;

			// start the renderer
			renderer.setSize(WIDTH, HEIGHT);

			// attach the render-supplied DOM element
			c.appendChild(renderer.domElement);

			// set up the playing surface plane 
			var planeWidth = fieldWidth,
				planeHeight = fieldHeight,
				planeQuality = 10;

			// create the paddle1's material
			var paddle1Material =
				new THREE.MeshLambertMaterial(
					{
						color: 0xffcccc,
						transparent: true
					});
			// create the paddle2's material
			var paddle2Material =
				new THREE.MeshLambertMaterial(
					{
						color: 0xffcccc,
						transparent: true
					});

			var paddle3Material =
				new THREE.MeshLambertMaterial(
					{
						color: 0xffcccc,
						transparent: true
					});

			var paddle4Material =
				new THREE.MeshLambertMaterial(
					{
						color: 0xffcccc,
						transparent: true
					});

			var paddle5Material =
				new THREE.MeshLambertMaterial(
					{
						color: 0xffcccc,
						transparent: true
					});
			// create the plane's material	
			var planeMaterial =
				new THREE.MeshLambertMaterial(
					{
						color: 0x0000ff,
						// opacity : 0.5,
						transparent: true
					});
			// create the table's material
			var tableMaterial =
				new THREE.MeshLambertMaterial(
					{
						color: 0x111111
					});
			// create the pillar's material
			var pillarMaterial =
				new THREE.MeshLambertMaterial(
					{
						color: 0x534d0d
					});
			// create the ground's material
			const texture = new THREE.TextureLoader().load("./images/bg.jpg");
			var groundMaterial =
				new THREE.MeshLambertMaterial(
					{
						color: 0x888888,
						map: texture
					});


			// create the playing surface plane
			var plane = new THREE.Mesh(

				new THREE.PlaneGeometry(
					planeWidth * 0.95,	// 95% of table width, since we want to show where the ball goes out-of-bounds
					planeHeight,
					planeQuality,
					planeQuality),

				planeMaterial);

			// scene.add(plane);
			// plane.receiveShadow = true;
			plane.rotation.z = Math.PI / 2
			plane.rotation.x = -Math.PI * 1 / 3
			plane.position.z = 200
			// plane.position.y = 200
			// plane.position.x = 200

			// var table = new THREE.Mesh(

			// 	new THREE.CubeGeometry(
			// 		planeWidth * 1.05,	// this creates the feel of a billiards table, with a lining
			// 		planeHeight * 1.03,
			// 		100,				// an arbitrary depth, the camera can't see much of it anyway
			// 		planeQuality,
			// 		planeQuality,
			// 		1),

			// 	tableMaterial);
			// table.position.z = -51;	// we sink the table into the ground by 50 units. The extra 1 is so the plane can be seen
			// scene.add(table);
			// table.receiveShadow = true;

			// // set up the sphere vars
			// lower 'segment' and 'ring' values will increase performance
			var radius = 5,
				segments = 6,
				rings = 6;

			// // create the sphere's material
			var sphereMaterial =
				new THREE.MeshLambertMaterial(
					{
						color: 0xD43001,
						transparent: true
					});
			var sphereMaterial1 =
				new THREE.MeshLambertMaterial(
					{
						color: 0xD43001,
						transparent: true
					});
			var sphereMaterial2 =
				new THREE.MeshLambertMaterial(
					{
						color: 0xD43001,
						transparent: true
					});
			var sphereMaterial3 =
				new THREE.MeshLambertMaterial(
					{
						color: 0xD43001,
						transparent: true
					});
			var sphereMaterial4 =
				new THREE.MeshLambertMaterial(
					{
						color: 0xD43001,
						transparent: true
					});



			let textLeft, videoLeft, ifVideoLeft = false;
			// videoLeft = document.createElement('video');
			// videoLeft.preload = 'auto';
			// videoLeft.controls = 'controls';
			// videoLeft.volume = 1;
			// videoLeft.style.objectFit = 'fill';
			// let videoSource = document.createElement('source');
			// videoSource.type = 'video/mp4';
			// videoSource.src = './video/video.mp4';
			// videoLeft.appendChild(videoSource);

			const geometry = new THREE.PlaneGeometry(200, 112);

			const trackWidth = 600
			const trackHeight = 130
			const trackDepth = 10


			const Ttexture = new THREE.TextureLoader().load("./images/track.png");

			track = new THREE.Mesh(

				new THREE.PlaneGeometry(
					trackWidth,
					trackHeight,
				),

				new THREE.MeshBasicMaterial(
					{
						// color: 0x666666,
						transparent: true,
						opacity: 0,
						map: Ttexture
					})
			);

			// // add the sphere to the scene
			scene.add(track);
			track.receiveShadow = true;
			track.castShadow = true;
			track.position.x = -200;
			track.position.y = 80
			track.position.z = 301 * Math.sqrt(3)
			track.rotation.z = Math.PI / 2
			track.rotation.x = -Math.PI * 1 / 3

			track1 = new THREE.Mesh(

				new THREE.PlaneGeometry(
					trackWidth,
					trackHeight,
				),

				new THREE.MeshBasicMaterial(
					{
						// color: 0x666666,
						transparent: true,
						opacity: 0,
						map: Ttexture
					})
			);

			// // add the sphere to the scene
			scene.add(track1);
			track1.receiveShadow = true;
			track1.castShadow = true;
			track1.position.x = -67;
			track1.position.y = 80
			track1.position.z = 301 * Math.sqrt(3)
			track1.rotation.z = Math.PI / 2
			track1.rotation.x = -Math.PI * 1 / 3

			track2 = new THREE.Mesh(

				new THREE.PlaneGeometry(
					trackWidth,
					trackHeight,
				),

				new THREE.MeshBasicMaterial(
					{
						// color: 0x666666,
						transparent: true,
						opacity: 0,
						map: Ttexture
					})
			);

			// // add the sphere to the scene
			scene.add(track2);
			track2.receiveShadow = true;
			track2.castShadow = true;
			track2.position.x = 67;
			track2.position.y = 80
			track2.position.z = 301 * Math.sqrt(3)
			track2.rotation.z = Math.PI / 2
			track2.rotation.x = -Math.PI * 1 / 3


			track3 = new THREE.Mesh(

				new THREE.PlaneGeometry(
					trackWidth,
					trackHeight,
				),

				new THREE.MeshBasicMaterial(
					{
						// color: 0x666666,
						transparent: true,
						opacity: 0,
						map: Ttexture
					})
			);

			// // add the sphere to the scene
			scene.add(track3);
			track3.receiveShadow = true;
			track3.castShadow = true;
			track3.position.x = 200;
			track3.position.y = 80
			track3.position.z = 301 * Math.sqrt(3)
			track3.rotation.z = Math.PI / 2
			track3.rotation.x = -Math.PI * 1 / 3


			// // add the sphere to the scene


			paddleWidth = 100;
			paddleHeight = 200;
			paddleDepth = 20;
			paddleQuality = 1;



			// const ball4 = new THREE.Mesh(

			// 	new THREE.BoxGeometry(
			// 		12,
			// 		37,
			// 		5,
			// 	),

			// 	new THREE.MeshBasicMaterial(
			// 		{
			// 			color: 0x0000ff, refractionRatio: 0.98, reflectivity: 0.9, opacity: 0.4
			// 		}));
			// scene.add(ball4);
			// // ball4.position.z = radius;
			// // ball4.position.y = bpostion * deliy + bpmArr[i - 1] * ballSpeed;
			// // ball4.position.y = bpostion * deliy + bpmArr[i - 1] * ballSpeed *Math.sqrt(3); 
			// ball4.position.y = 297
			// ball4.position.z = 301 * Math.sqrt(3);
			// // ball4.position.x = 67   //左右距离
			// // ball4.position.y = -27
			// // ball4.position.z = 625 * Math.sqrt(3);
			// ball4.position.x = -64 
			// ball4.receiveShadow = true;
			// ball4.castShadow = true;
			// ball4.rotation.z = Math.PI / 2
			// ball4.rotation.x = -Math.PI * 1 / 3
			// // ball4.position.z = 200
			// scene.add(ball4)
			const newWidth = 12
			const newHeight = 37
			const newDepth = 5
			newSpeed = 324 / 30 / 4
			const deliy = 1.0    //延迟
			const startY = 297
			const startZ = 301
			const Boxtexture = new THREE.TextureLoader().load("./images/box.png");
			// const Boxtexture = new THREE.TextureLoader().load( "./images/top.png" );
			// const Boxtexture1 = new THREE.TextureLoader().load( "./images/left.png" );
			// const Boxtextures = [Boxtexture ,Boxtexture1,Boxtexture ,Boxtexture1,Boxtexture ,Boxtexture1, ]

			for (let i = 1; i < bpm.length; i++) {
				if (typeof bpm[i] == 'number') {
					const ball4 = new THREE.Mesh(

						new THREE.BoxGeometry(
							newWidth,
							newHeight,
							newDepth,
						),

						new THREE.MeshBasicMaterial(
							{
								// color: 0x00a8e2, 
								refractionRatio: 0.98,
								reflectivity: 0.9,
								// opacity: 0.8,
								transparent: true,
								map: Boxtexture
							}));
					scene.add(ball4);

					ball4.position.y = startY + (bpmArr[i - 1] - 1) * newSpeed
					ball4.position.z = (startZ - (bpmArr[i - 1] - 1) * newSpeed) * Math.sqrt(3)

					ball4.position.x = bpm[i] == 1 ? -64 : bpm[i] == 2 ? -22 : bpm[i] == 3 ? 22 : bpm[i] == 4 ? 64 : 0

					ball4.receiveShadow = true;
					ball4.castShadow = true;
					ball4.rotation.z = Math.PI / 2
					ball4.rotation.x = -Math.PI * 1 / 3
					// ball4.position.z = 200
					// scene.add(ball4)
				} else {
					for (let j = 0; j < bpm[i].length; j++) {
						const ball4 = new THREE.Mesh(

							new THREE.BoxGeometry(
								newWidth,
								newHeight,
								newDepth,
							),

							new THREE.MeshBasicMaterial(
								{
									// color: 0x00a8e2,
									refractionRatio: 0.98, reflectivity: 0.9,
									//  opacity: 0.8,
									transparent: true, map: Boxtexture

								}));
						scene.add(ball4);
						// ball4.position.z = radius;
						ball4.position.y = startY + (bpmArr[i - 1] - 1) * newSpeed
						ball4.position.z = (startZ - (bpmArr[i - 1] - 1) * newSpeed) * Math.sqrt(3)

						ball4.position.x = bpm[i][j] == 1 ? -64 : bpm[i][j] == 2 ? -22 : bpm[i][j] == 3 ? 22 : bpm[i][j] == 4 ? 64 : 0

						ball4.receiveShadow = true;
						ball4.castShadow = true;
						ball4.rotation.z = Math.PI / 2
						ball4.rotation.x = -Math.PI * 1 / 3
						// ball4.position.z = 200
						// scene.add(ball4)
					}
				}
			}

			boxArr = scene.children.filter((a, index) => {
				return a.geometry && a.geometry.type == 'BoxGeometry' && a.geometry.parameters.width == 12
			})
			// const loader = new THREE.FontLoader();

			// loader.load('font/a.json', function (font) {

			// 	const text = new THREE.TextGeometry('213', {
			// 		font: font,
			// 		size: 100,
			// 		height: 20,
			// 		curveSegments: 12,
			// 		bevelEnabled: true,
			// 		bevelThickness: 10,
			// 		bevelSize: 1,
			// 		bevelOffset: 0,
			// 		bevelSegments: 5
			// 	});
			// 	// materialargs.color = new THREE.Color().setHSL( Math.random(), 0.5, 0.5 );
			// 	const material = new THREE.MeshBasicMaterial({
			// 		transparent: true,
			// 		opacity: 1
			// 	});
			// 	textmesh = new THREE.Mesh(text, material);

			// 	scene.add(textmesh)
			// 	// textmesh.rotation.x = Math.PI / 2
			// 	// textmesh.rotation.y = -Math.PI / 2
			// 	// textmesh.rotation.x =- Math.PI * 1 / 6
			// 	textmesh.rotation.x = Math.PI/6
			// 	textmesh.position.z = 200
			// 	textmesh.position.y = 30
			// 	textmesh.position.x = -150
			// });

			const preTexture = new THREE.TextureLoader().load("./images/prefect.png");
			const preGeometry = new THREE.PlaneGeometry(748, 181);
			const preMaterial = new THREE.MeshBasicMaterial({
				transparent: true,
				opacity: 0,
				map: preTexture
			});
			textmesh = new THREE.Mesh(preGeometry, preMaterial);

			scene.add(textmesh)
			// textmesh.rotation.x = Math.PI / 2
			// textmesh.rotation.y = -Math.PI / 2
			// textmesh.rotation.x =- Math.PI * 1 / 6
			textmesh.rotation.x = Math.PI / 6
			textmesh.position.z = 200
			textmesh.position.y = 30
			textmesh.position.x = -150

			// miss



			// loader.load('font/a.json', function (font) {

			// 	const text = new THREE.TextGeometry('miss', {
			// 		font: font,
			// 		size: 100,
			// 		height: 5,
			// 		curveSegments: 12,
			// 		bevelEnabled: true,
			// 		bevelThickness: 10,
			// 		bevelSize: 1,
			// 		bevelOffset: 0,
			// 		bevelSegments: 5
			// 	});
			// 	// materialargs.color = new THREE.Color().setHSL( Math.random(), 0.5, 0.5 );
			// 	const material = new THREE.MeshLambertMaterial({
			// 		color : 0xff0000 ,
			// 		transparent: true,
			// 		opacity: 0
			// 	});
			// 	missmesh = new THREE.Mesh(text, material);

			// 	scene.add(missmesh)
			// 	// missmesh.rotation.x = Math.PI / 2
			// 	// missmesh.rotation.y = -Math.PI / 2
			// 	// missmesh.rotation.z = -Math.PI/2
			// 	missmesh.position.z = 200
			// 	missmesh.position.y = 30
			// 	missmesh.position.x = -150
			// });
			const missTexture = new THREE.TextureLoader().load("./images/miss.png");
			const missGeometry = new THREE.PlaneGeometry(455, 181);
			const msissMaterial = new THREE.MeshLambertMaterial({
				color: 0xff0000,
				transparent: true,
				opacity: 0,
				map: missTexture
			});
			missmesh = new THREE.Mesh(missGeometry, msissMaterial);

			scene.add(missmesh)
			// missmesh.rotation.x = Math.PI / 2
			// missmesh.rotation.y = -Math.PI / 2
			// missmesh.rotation.z = -Math.PI/2
			missmesh.rotation.x = Math.PI / 6
			missmesh.position.z = 200
			missmesh.position.y = 30
			missmesh.position.x = -150

			// text = new THREE.TextGeometry( 'Hello three.js!', {
			// 	// font: font,
			// 	size: 80,
			// 	height: 5,
			// 	curveSegments: 12,
			// 	bevelEnabled: true,
			// 	bevelThickness: 10,
			// 	bevelSize: 8,
			// 	bevelOffset: 0,
			// 	bevelSegments: 5
			// } );


			const Btexture = new THREE.TextureLoader().load("./images/circle.png");
			const circleWidth = 200
			const circleHeight = 200
			circle = new THREE.Mesh(

				new THREE.PlaneGeometry(
					circleWidth,
					circleHeight,
				),

				new THREE.MeshBasicMaterial(
					{
						// color: 0x666666,
						transparent: true,
						opacity: 0,
						map: Btexture
					})
			);

			// // add the sphere to the scene
			scene.add(circle);
			circle.receiveShadow = true;
			circle.castShadow = true;
			circle.position.x = -372;
			circle.position.y = -170
			circle.position.z = 290 * Math.sqrt(3)
			circle.rotation.z = Math.PI / 2
			circle.rotation.x = -Math.PI * 1 / 3

			circle1 = new THREE.Mesh(

				new THREE.PlaneGeometry(
					circleWidth,
					circleHeight,
				),

				new THREE.MeshBasicMaterial(
					{
						// color: 0x666666,
						transparent: true,
						opacity: 0,
						map: Btexture
					})
			);

			// // add the sphere to the scene
			scene.add(circle1);
			circle1.receiveShadow = true;
			circle1.castShadow = true;
			circle1.position.x = -123;
			circle1.position.y = -170
			circle1.position.z = 290 * Math.sqrt(3)
			circle1.rotation.z = Math.PI / 2
			circle1.rotation.x = -Math.PI * 1 / 3

			circle2 = new THREE.Mesh(

				new THREE.PlaneGeometry(
					circleWidth,
					circleHeight,
				),

				new THREE.MeshBasicMaterial(
					{
						// color: 0x666666,
						transparent: true,
						opacity: 0,
						map: Btexture
					})
			);

			// // add the sphere to the scene
			scene.add(circle2);
			circle2.receiveShadow = true;
			circle2.castShadow = true;
			circle2.position.x = 123;
			circle2.position.y = -170
			circle2.position.z = 290 * Math.sqrt(3)
			circle2.rotation.z = Math.PI / 2
			circle2.rotation.x = -Math.PI * 1 / 3


			circle3 = new THREE.Mesh(

				new THREE.PlaneGeometry(
					circleWidth,
					circleHeight,
				),

				new THREE.MeshBasicMaterial(
					{
						// color: 0x666666,
						transparent: true,
						opacity: 0,
						map: Btexture
					})
			);

			// // add the sphere to the scene
			scene.add(circle3);
			circle3.receiveShadow = true;
			circle3.castShadow = true;
			circle3.position.x = 372;
			circle3.position.y = -170
			circle3.position.z = 290 * Math.sqrt(3)
			circle3.rotation.z = Math.PI / 2
			circle3.rotation.x = -Math.PI * 1 / 3



			// finally we finish by adding a ground plane
			// to show off pretty shadows
			var ground = new THREE.Mesh(

				new THREE.PlaneGeometry(
					// WIDTH,
					// HEIGHT,
					2436,
					1125,
					// 3,
					// 1,
					// 1,
					// 1
				),

				groundMaterial);
			// set ground to arbitrary z position to best show off shadowing
			// ground.position.z = -132;
			// ground.rotation.z = -Math.PI/2
			ground.receiveShadow = true;
			scene.add(ground);

			// // create a point light
			pointLight =
				new THREE.PointLight(0xffffff);

			// set its position
			pointLight.position.x = -1000;
			pointLight.position.y = 0;
			pointLight.position.z = 1000;
			pointLight.intensity = 2.9;
			pointLight.distance = 10000;
			// add to the scene
			scene.add(pointLight);

			// add a spot light
			// this is important for casting shadows
			spotLight = new THREE.SpotLight(0xF8D898);
			spotLight.position.set(0, 0, 460);
			spotLight.intensity = 1.5;
			spotLight.castShadow = true;
			// scene.add(spotLight);

			// MAGIC SHADOW CREATOR DELUXE EDITION with Lights PackTM DLC
			renderer.shadowMapEnabled = true;
		}

		function draw() {
			// draw THREE.JS scene
			if(videoRef.current){videoRef.current.onplaying = () => {
                startFlag = true

            }
            videoRef.current.onpause = () => {
                startFlag = false
            }
		}
			if (startFlag) {

				run()
			}
			renderer.render(scene, camera);
			// loop draw function call
			// if () {
				requestAnimationFrame(draw);
			// }


			// ballPhysics();
			// paddlePhysics();
			cameraPhysics();
			playerPaddleMovement();


		}



		function run(ball) {

			// console.log('run')
			boxArr.forEach((a, index) => {
				// console.log(a.position.x)

				if (circle.material.opacity == 1) {
					// circle.scale.z += 0.001
					circle.scale.x += 0.001
					circle.scale.y += 0.001
					// console.log(circle)
				}

				if (circle1.material.opacity == 1) {
					// circle1.scale.z += 0.001
					circle1.scale.x += 0.001
					circle1.scale.y += 0.001
					// console.log(circle)
				}

				if (circle2.material.opacity == 1) {
					// circle2.scale.z += 0.001
					circle2.scale.x += 0.001
					circle2.scale.y += 0.001
					// console.log(circle)
				}
				if (circle3.material.opacity == 1) {
					// circle3.scale.z += 0.001
					circle3.scale.x += 0.001
					circle3.scale.y += 0.001
					// console.log(circle)
				}

				if (a.position.y >= -27 - 6 * newSpeed && a.position.y <= -27 + 5 * newSpeed) {
					// A按键
					// a.material.opacity = 1
					// if (a.position.x == -75) {
					// 	a.material.opacity = 0
					// }


					if (a.position.y < -27 && a.position.y > -27 - newSpeed) {
						console.log(goodFlagA, goodNum, 85, textmesh.material.opacity)
						a.material.opacity = 0

					}

					// 键盘

					if (a.position.x == -64) {
						// console.log('jinle2',textmesh.material.opacity)
						if (dataArr1[7]) {

							console.log('jinle')
							if (goodFlagA) {
								console.log('80-50', goodFlagA)
								circle.material.opacity = 1
								textmesh.material.opacity = 1
								goodFlagA = false
								console.log('80-502', goodFlagA)
								// console.log('jinle2', textmesh.material.opacity)
								if (!timerA) {
									timerA = setTimeout(() => {
										// console.log(false, timerA)
										textmesh.material.opacity = 0
										circle.material.opacity = 0
										circle.scale.x = 1
										circle.scale.y = 1
										// goodFlag = tru

										clearTimeout(timerA)
										timerA = null
									}, 400)
								}
							}



						} else {
							// paddle5.material.color.r = 1
							// paddle5.material.color.b = 0.8125
							// paddle5.material.color.g = 0.8125
							// textmesh.material.opacity = 0
						}
					}

					if (a.position.x == -22) {
						if (dataArr1[6] || dataArr1[5]) {
							// paddle4.material.color.r = 0.5
							// paddle4.material.color.b = 0.5
							// paddle4.material.color.g = 0.5
							// textmesh.material.opacity = 1

							if (goodFlagB) {
								console.log('jinle2', goodFlagB)
								circle1.material.opacity = 1
								textmesh.material.opacity = 1
								goodFlagB = false
								console.log('jinle2', textmesh.material.opacity)
								if (!timerB) {
									timerB = setTimeout(() => {
										console.log(false, timerB)
										textmesh.material.opacity = 0
										circle1.material.opacity = 0
										circle1.scale.x = 1
										circle1.scale.y = 1
										// goodFlag = tru

										clearTimeout(timerB)
										timerB = null
									}, 400)
								}
							}
						} else {
							// paddle4.material.color.r = 1
							// paddle4.material.color.b = 0.8125
							// paddle4.material.color.g = 0.8125
							// textmesh.material.opacity = 0
						}
					}

					if (a.position.x == 22) {
						if (dataArr1[2] || dataArr1[3]) {
							// paddle3.material.color.r = 0.5
							// paddle3.material.color.b = 0.5
							// paddle3.material.color.g = 0.5
							// textmesh.material.opacity = 1

							if (goodFlagC) {
								console.log('75', goodFlagC)
								circle2.material.opacity = 1
								textmesh.material.opacity = 1
								goodFlagC = false
								console.log('75-2', goodFlagC, timerC)
								if (!timerC) {
									console.log('timec')
									timerC = setTimeout(() => {
										console.log(false, textmesh.material.opacity)
										circle2.material.opacity = 0
										textmesh.material.opacity = 0
										circle2.scale.x = 1
										circle2.scale.y = 1
										console.log(false, textmesh.material.opacity)
										// goodFlag = tru

										clearTimeout(timerC)
										timerC = null
									}, 400)
								}
							}
						} else {
							// paddle3.material.color.r = 1
							// paddle3.material.color.b = 0.8125
							// paddle3.material.color.g = 0.8125
							// textmesh.material.opacity = 0
						}
					}


					if (a.position.x == 64) {
						if (dataArr1[1] || dataArr1[0]) {
							// paddle2.material.color.r = 0.5
							// paddle2.material.color.b = 0.5
							// paddle2.material.color.g = 0.5
							// textmesh.material.opacity = 1
							if (goodFlagD) {
								console.log('jinle2', goodFlagD)
								circle3.material.opacity = 1
								textmesh.material.opacity = 1
								goodFlagD = false
								console.log('jinle2', textmesh.material.opacity)
								if (!timerD) {
									timerD = setTimeout(() => {
										console.log(false, timerD)
										textmesh.material.opacity = 0
										circle3.material.opacity = 0
										circle3.scale.x = 1
										circle3.scale.y = 1
										// goodFlag = tru

										clearTimeout(timerD)
										timerD = null
									}, 400)
								}
							}
						} else {
							// paddle2.material.color.r = 1
							// paddle2.material.color.b = 0.8125
							// paddle2.material.color.g = 0.8125
							// textmesh.material.opacity = 0
						}
					}

					// if (a.position.y == -80) {
					// 	if (Key.isDown(Key.G)) {
					// 		paddle1.material.color.r = 0.5
					// 		paddle1.material.color.b = 0.5
					// 		paddle1.material.color.g = 0.5
					// 		// textmesh.material.opacity = 1

					// 		if (goodFlagE) {
					// 			console.log('jinle2', goodFlagE)
					// 			textmesh.material.opacity = 1
					// 			goodFlagE = false
					// 			console.log('jinle2', textmesh.material.opacity,timerE)
					// 			if (!timerE) {
					// 				console.log('timerE')
					// 				timerE = setTimeout(() => {
					// 					console.log(false, timerE,textmesh.material.opacity )
					// 					textmesh.material.opacity = 0
					// 					console.log(false, timerE,textmesh.material.opacity )
					// 					// goodFlag = tru

					// 					clearTimeout(timerE)
					// 					timerE = null
					// 				}, 100)
					// 			}
					// 		}
					// 	} else {
					// 		paddle1.material.color.r = 1
					// 		paddle1.material.color.b = 0.8125
					// 		paddle1.material.color.g = 0.8125
					// 		// textmesh.material.opacity = 0
					// 	}
					// }

					// 瑜伽垫

					// if (a.position.y == 80) {
					// 	// console.log('jinle2',textmesh.material.opacity)
					// 	if (relData[7] > 150) {
					// 		paddle5.material.color.r = 0.5
					// 		paddle5.material.color.b = 0.5
					// 		paddle5.material.color.g = 0.5
					// 		// console.log('jinle')
					// 		if (goodFlagA) {
					// 			console.log('80-50', goodFlagA)
					// 			textmesh.material.opacity = 1
					// 			goodFlagA = false
					// 			console.log('80-502', goodFlagA)
					// 			// console.log('jinle2', textmesh.material.opacity)
					// 			if (!timerA) {
					// 				timerA = setTimeout(() => {
					// 					// console.log(false, timerA)
					// 					textmesh.material.opacity = 0
					// 					// goodFlag = tru

					// 					clearTimeout(timerA)
					// 					timerA = null
					// 				}, 100)
					// 			}
					// 		}



					// 	} else {
					// 		paddle5.material.color.r = 1
					// 		paddle5.material.color.b = 0.8125
					// 		paddle5.material.color.g = 0.8125
					// 		// textmesh.material.opacity = 0
					// 	}
					// }

					// if (a.position.y == 40) {
					// 	if (relData[5] > 150 || relData[6] > 150) {
					// 		paddle4.material.color.r = 0.5
					// 		paddle4.material.color.b = 0.5
					// 		paddle4.material.color.g = 0.5
					// 		// textmesh.material.opacity = 1

					// 		if (goodFlagB) {
					// 			console.log('jinle2', goodFlagB)
					// 			textmesh.material.opacity = 1
					// 			goodFlagB = false
					// 			console.log('jinle2', textmesh.material.opacity)
					// 			if (!timerB) {
					// 				timerB = setTimeout(() => {
					// 					console.log(false, timerB)
					// 					textmesh.material.opacity = 0
					// 					// goodFlag = tru

					// 					clearTimeout(timerB)
					// 					timerB = null
					// 				}, 100)
					// 			}
					// 		}
					// 	} else {
					// 		paddle4.material.color.r = 1
					// 		paddle4.material.color.b = 0.8125
					// 		paddle4.material.color.g = 0.8125
					// 		// textmesh.material.opacity = 0
					// 	}
					// }

					// if (a.position.y == 0) {
					// 	if (relData[4] > 150) {
					// 		paddle3.material.color.r = 0.5
					// 		paddle3.material.color.b = 0.5
					// 		paddle3.material.color.g = 0.5
					// 		// textmesh.material.opacity = 1

					// 		if (goodFlagC) {
					// 			console.log('75', goodFlagC)
					// 			textmesh.material.opacity = 1
					// 			goodFlagC = false
					// 			console.log('75-2', goodFlagC, timerC)
					// 			if (!timerC) {
					// 				console.log('timec')
					// 				timerC = setTimeout(() => {
					// 					console.log(false, textmesh.material.opacity)
					// 					textmesh.material.opacity = 0
					// 					console.log(false, textmesh.material.opacity)
					// 					// goodFlag = tru

					// 					clearTimeout(timerC)
					// 					timerC = null
					// 				}, 100)
					// 			}
					// 		}
					// 	} else {
					// 		paddle3.material.color.r = 1
					// 		paddle3.material.color.b = 0.8125
					// 		paddle3.material.color.g = 0.8125
					// 		// textmesh.material.opacity = 0
					// 	}
					// }


					// if (a.position.y == -40) {
					// 	if (relData[2] > 150 || relData[3] > 150) {
					// 		paddle2.material.color.r = 0.5
					// 		paddle2.material.color.b = 0.5
					// 		paddle2.material.color.g = 0.5
					// 		// textmesh.material.opacity = 1
					// 		if (goodFlagD) {
					// 			console.log('jinle2', goodFlagD)
					// 			textmesh.material.opacity = 1
					// 			goodFlagD = false
					// 			console.log('jinle2', textmesh.material.opacity)
					// 			if (!timerD) {
					// 				timerD = setTimeout(() => {
					// 					console.log(false, timerD)
					// 					textmesh.material.opacity = 0
					// 					// goodFlag = tru

					// 					clearTimeout(timerD)
					// 					timerD = null
					// 				}, 100)
					// 			}
					// 		}
					// 	} else {
					// 		paddle2.material.color.r = 1
					// 		paddle2.material.color.b = 0.8125
					// 		paddle2.material.color.g = 0.8125
					// 		// textmesh.material.opacity = 0
					// 	}
					// }

					// if (a.position.y == -80) {
					// 	if (relData[0] > 150 || relData[1] > 150) {
					// 		paddle1.material.color.r = 0.5
					// 		paddle1.material.color.b = 0.5
					// 		paddle1.material.color.g = 0.5
					// 		// textmesh.material.opacity = 1

					// 		if (goodFlagE) {
					// 			console.log('jinle2', goodFlagE)
					// 			textmesh.material.opacity = 1
					// 			goodFlagE = false
					// 			console.log('jinle2', textmesh.material.opacity, timerE)
					// 			if (!timerE) {
					// 				console.log('timerE')
					// 				timerE = setTimeout(() => {
					// 					console.log(false, timerE, textmesh.material.opacity)
					// 					textmesh.material.opacity = 0
					// 					console.log(false, timerE, textmesh.material.opacity)
					// 					// goodFlag = tru

					// 					clearTimeout(timerE)
					// 					timerE = null
					// 				}, 100)
					// 			}
					// 		}
					// 	} else {
					// 		paddle1.material.color.r = 1
					// 		paddle1.material.color.b = 0.8125
					// 		paddle1.material.color.g = 0.8125
					// 		// textmesh.material.opacity = 0
					// 	}
					// }




				}

				// else if (a.position.y < -27 && a.position.y > -27 - newSpeed) {
				// 	console.log(goodFlagA, goodNum, 85, textmesh.material.opacity)
				// 	a.material.opacity = 0

				// } 
				else if (a.position.y < -27 - 6 * newSpeed && a.position.y >= -27 - 9 * newSpeed) {
					if (a.position.x == -64) {
						// console.log(goodFlagA,goodNum,95)
						if (goodFlagA) {
							textmesh.material.opacity = 0
							// console.log('为1')
							missmesh.material.opacity = 1
							setTimeout(() => {
								missmesh.material.opacity = 0
								// console.log('为0')
							}, 200);
						}

					}

					if (a.position.x == -22) {
						// console.log(goodFlagA,goodNum,95)
						if (goodFlagB) {
							textmesh.material.opacity = 0
							// console.log('为1')
							missmesh.material.opacity = 1
							setTimeout(() => {
								missmesh.material.opacity = 0
								// console.log('为0')
							}, 200);
						}

					}

					if (a.position.x == 22) {
						// console.log(goodFlagA,goodNum,95)
						if (goodFlagC) {
							textmesh.material.opacity = 0
							// console.log('为1')
							missmesh.material.opacity = 1
							setTimeout(() => {
								missmesh.material.opacity = 0
								// console.log('为0')
							}, 200);
						}

					}

					if (a.position.x == 64) {
						// console.log(goodFlagA,goodNum,95)
						if (goodFlagD) {
							textmesh.material.opacity = 0
							// console.log('为1')
							missmesh.material.opacity = 1
							setTimeout(() => {
								missmesh.material.opacity = 0
								// console.log('为0')
							}, 200);
						}

					}

					// if (a.position.y == -80) {
					// 	// console.log(goodFlagA,goodNum,95)
					// 	if (goodFlagE) {
					// 		textmesh.material.opacity = 0
					// 		// console.log('为1')
					// 		missmesh.material.opacity = 1
					// 		setTimeout(() => {
					// 			missmesh.material.opacity = 0
					// 			// console.log('为0')
					// 		}, 50);
					// 	}

					// }
					// if(goodFlagB){
					// 	textmesh.material.opacity = 0
					// 	missmesh.material.opacity = 1
					// 	setTimeout(() => {
					// 		missmesh.material.opacity = 0
					// 	}, 50);
					// }
					// if(goodFlagC){
					// 	textmesh.material.opacity = 0
					// 	missmesh.material.opacity = 1
					// 	setTimeout(() => {
					// 		missmesh.material.opacity = 0
					// 	}, 50);
					// }
					// if(goodFlagD){
					// 	textmesh.material.opacity = 0
					// 	missmesh.material.opacity = 1
					// 	setTimeout(() => {
					// 		missmesh.material.opacity = 0
					// 	}, 50);
					// }
					// if(goodFlagE){
					// 	textmesh.material.opacity = 0
					// 	missmesh.material.opacity = 1
					// 	setTimeout(() => {
					// 		missmesh.material.opacity = 0
					// 	}, 50);
					// }

					// return
				} else if (a.position.y < -27 - 9 * newSpeed && a.position.y > -27 - 10 * newSpeed) {
					console.log(textmesh.material.opacity)
					if (a.position.x == -64) {
						goodFlagA = true
						goodNum = 0
					}
					if (a.position.x == -22) {
						goodFlagB = true
					}
					if (a.position.x == 22) {
						goodFlagC = true
					}
					if (a.position.x == 64) {
						goodFlagD = true
					}
					// if (a.position.y == -80) {
					// 	goodFlagE = true
					// }

				} else if (a.position.y < -27 - 10 * newSpeed) {
					// console.log('end')
					// console.log(goodFlagA)
					return
				}
				// if(a.position.y<-27){
				// 	a.material.opacity = 0
				// }
				a.position.y -= newSpeed;
				a.position.z += newSpeed * Math.sqrt(3)

			})

			// 键盘
			if (dataArr1[7]) {
				track.material.opacity = 1
			} else {
				track.material.opacity = 0
			}

			if (dataArr1[6] || dataArr1[5]) {
				track1.material.opacity = 1
			} else {
				track1.material.opacity = 0
			}

			if (dataArr1[2] || dataArr1[3]) {
				track2.material.opacity = 1
			} else {
				track2.material.opacity = 0
			}

			if (dataArr1[1] || dataArr1[0]) {
				track3.material.opacity = 1
			} else {
				track3.material.opacity = 0
			}

			// if (Key.isDown(Key.G)) {
			// 	track4.material.opacity = 1
			// } else {
			// 	track4.material.opacity = 0
			// }



			// 瑜伽垫

			// if (relData[7] > 150) {
			// 	track.material.opacity = 1
			// } else {
			// 	track.material.opacity = 0
			// }

			// if (relData[5] > 150 || relData[6] > 150) {
			// 	track1.material.opacity = 1
			// } else {
			// 	track1.material.opacity = 0
			// }

			// if (relData[4] > 150) {
			// 	track2.material.opacity = 1
			// } else {
			// 	track2.material.opacity = 0
			// }

			// if (relData[2] > 150 || relData[3] > 150) {
			// 	track3.material.opacity = 1
			// } else {
			// 	track3.material.opacity = 0
			// }

			// if (relData[0] > 150 || relData[1] > 150) {
			// 	track4.material.opacity = 1
			// } else {
			// 	track4.material.opacity = 0
			// }


		}

		// Handles CPU paddle movement and logic


		// Handles player's paddle movement
		function playerPaddleMovement() {

		}

		// Handles camera and lighting logic
		function cameraPhysics() {
			// we can easily notice shadows if we dynamically move lights during the game
			spotLight.position.x = -100;

			// move to behind the player's paddle
			// camera.position.x = -90 - 75;
			// camera.position.z = 10 + 100 + 0.04 * 20;
			// camera.position.x = -800;
			camera.position.z = 1200;

			// rotate to face towards the opponent
			// camera.rotation.y = -60 * Math.PI / 180;
			// camera.rotation.z = -90 * Math.PI / 180;

		}

		// Handles paddle collision logic


		// checks if either player or opponent has reached 7 points

	}, [])
	return (
		<>
			<div id='play' ref={playRef} onClick={() => {pausePlayHandler()}} style={{ position: 'absolute', width: '98vw', height: '98vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src={img} style={{ width: 100, height: 100 }} alt="" /></div>
			<video ref={videoRef} controls style={{ height: '100vh' ,display : 'none' , position : 'absolute'}} className='video'>
				<source src={video}
					type="video/webm" />
				<source src={video}
					type="video/mp4" />
			</video>


			<div id='gameCanvas'></div>
		</>
	)
}
