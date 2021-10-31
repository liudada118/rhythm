import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Key } from '../../js/keyboard'
import img from '../../assets/images/play1.png'
import video from '../../assets/video/video4.mp4'

export default function Dance() {
	const playRef = useRef()
	const videoRef = useRef()

	const pausePlayHandler = (e) => {

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

		// scene object variables
		// import { cubeNum } from './compute'
		var renderer, scene, camera, pointLight, spotLight;
		var startFlag = false
		var textmesh, missmesh
		var newSpeed
		let timerA, timerB, timerC, timerD, timerE
		var circle, circle1, circle2, circle3, circle4

		let bpm = [1, 2, 3, 4, 3, 2, 1, 2, 3, 4, 3, 2, 1, 2, 3, 4, 3, 2, 1, 2, 3, 4, 3, 2, 1, 2, 3, 4, 3, 2, 1]

		let bpmArr = [1, 59, 120, 180, 241, 301, 360, 421, 477, 536, 597, 657, 715, 775, 834, 896, 953, 1011, 1072, 1133, 1191, 1249, 1309, 1372, 1430, 1491, 1549, 1608, 1667, 1729, 1786, 1847]

		const time = Date.parse(new Date())

		var fieldWidth = 6000, fieldHeight = 1000;
		var track, track1, track2, track3, track4
		const ppostion = -70
		const bpostion = 80
		var boxArr
		let goodFlagA = true, goodFlagB = true, goodFlagC = true, goodFlagD = true, goodFlagE = true

		var score1 = 0, score2 = 0, goodNum = 0

		// set opponent reflexes (0 - easiest, 1 - hardest)
		var difficulty = 0.2;
		let relData = new Array(8).fill(0)


		const trackWidth = 600
		const trackHeight = 130
		const trackDepth = 10;
		let paddleWidth = 100;
		let paddleHeight = 200;
		let paddleDepth = 20;
		let paddleQuality = 1;
		// ------------------------------------- //
		// ------- GAME FUNCTIONS -------------- //
		// ------------------------------------- //



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

		// 传入一个pisition 去定义滑块的位置
		function createTrack(position) {

			const Ttexture = new THREE.TextureLoader().load("./images/track.png");
			const track = new THREE.Mesh(

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
			scene.add(track);
			track.receiveShadow = true;
			track.castShadow = true;
			track.position.x = position;
			track.position.y = 80
			track.position.z = 301 * Math.sqrt(3)
			track.rotation.z = Math.PI / 2
			track.rotation.x = -Math.PI * 1 / 3

			return track
		}

		// 传入trackNum，规定滑块在哪条赛道上生成 ,positionNum 规定滑块在赛道上的距离
		function createBox(trackNum, positionNum) {
			const newWidth = 12
			const newHeight = 37
			const newDepth = 5
			const startY = 297
			const startZ = 301
			newSpeed = 324 / 30 / 4
			const Boxtexture = new THREE.TextureLoader().load("./images/box.png");
			const trackArr = {
				"1": -64,
				"2": -22,
				"3": 22,
				"4": 64
			}

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

			ball4.position.y = startY + (positionNum - 1) * newSpeed
			ball4.position.z = (startZ - (positionNum - 1) * newSpeed) * Math.sqrt(3)

			ball4.position.x = trackArr[trackNum] //bpm[i] == 1 ? -64 : bpm[i] == 2 ? -22 : bpm[i] == 3 ? 22 : bpm[i] == 4 ? 64 : 0

			ball4.receiveShadow = true;
			ball4.castShadow = true;
			ball4.rotation.z = Math.PI / 2
			ball4.rotation.x = -Math.PI * 1 / 3
		}

		// 传入赛道编号，生成对应的反馈材质
		function createCircle(trackNum) {
			const Btexture = new THREE.TextureLoader().load("./images/circle.png");
			const circleWidth = 200
			const circleHeight = 200
			const trackArr = {
				"1": -372,
				"2": -123,
				"3": 123,
				"4": 372
			}
			const circle = new THREE.Mesh(

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
			circle.position.x = trackArr[trackNum];
			circle.position.y = -170
			circle.position.z = 290 * Math.sqrt(3)
			circle.rotation.z = Math.PI / 2
			circle.rotation.x = -Math.PI * 1 / 3
			return circle
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

			// create the plane's material	
			var planeMaterial =
				new THREE.MeshLambertMaterial(
					{
						color: 0x0000ff,
						// opacity : 0.5,
						transparent: true
					});
			// create the table's material

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

			plane.rotation.z = Math.PI / 2
			plane.rotation.x = -Math.PI * 1 / 3
			plane.position.z = 200

			// // create the sphere's material






			const geometry = new THREE.PlaneGeometry(200, 112);

			const trackWidth = 600
			const trackHeight = 130
			const trackDepth = 10


			const Ttexture = new THREE.TextureLoader().load("./images/track.png");

			// 创建四个格子点击反馈
			track = createTrack(-200)
			track1 = createTrack(-67)
			track2 = createTrack(67)
			track3 = createTrack(200)

			// // add the sphere to the scene




			const newWidth = 12
			const newHeight = 37
			const newDepth = 5

			const deliy = 1.0    //延迟
			const startY = 297
			const startZ = 301
			const Boxtexture = new THREE.TextureLoader().load("./images/box.png");

			// 根据bpm创建滑块
			for (let i = 1; i < bpm.length; i++) {
				if (typeof bpm[i] == 'number') {
					createBox(bpm[i], bpmArr[i - 1])
				} else {
					for (let j = 0; j < bpm[i].length; j++) {
						createBox(bpm[i][j], bpmArr[i - 1])
					}
				}
			}

			boxArr = scene.children.filter((a, index) => {
				return a.geometry && a.geometry.type == 'BoxGeometry' && a.geometry.parameters.width == 12
			})


			const preTexture = new THREE.TextureLoader().load("./images/prefect.png");
			const preGeometry = new THREE.PlaneGeometry(748, 181);
			const preMaterial = new THREE.MeshBasicMaterial({
				transparent: true,
				opacity: 0,
				map: preTexture
			});
			textmesh = new THREE.Mesh(preGeometry, preMaterial);

			scene.add(textmesh)

			textmesh.rotation.x = Math.PI / 6
			textmesh.position.z = 200
			textmesh.position.y = 30
			textmesh.position.x = -150

			// miss




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

			missmesh.rotation.x = Math.PI / 6
			missmesh.position.z = 200
			missmesh.position.y = 30
			missmesh.position.x = -150




			const Btexture = new THREE.TextureLoader().load("./images/circle.png");
			const circleWidth = 200
			const circleHeight = 200


			circle = createCircle(1)
			circle1 = createCircle(2)
			circle2 = createCircle(3)
			circle3 = createCircle(4)





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

		// 键盘击中动画
		class Circle {
			constructor(circle, flag, timerA) {
				this.circle = circle
				this.flag = flag
				this.timerA = timerA
			}

			// 变大动画
			circleAni() {
				console.log(1)
				if (this.circle.opacity == 1) {
					console.log(2)
					this.circle.scale.x += 0.001
					this.circle.scale.y += 0.001
				}
			}

			showCircle() {
				if (this.flag) {

					this.circle.material.opacity = 1
					textmesh.material.opacity = 1
					this.flag = false


					if (!this.timerA) {
						this.timerA = setTimeout(() => {

							textmesh.material.opacity = 0
							this.circle.material.opacity = 0
							this.circle.scale.x = 1
							this.circle.scale.y = 1


							clearTimeout(this.timerA)
							this.timerA = null
						}, 400)
					}
				}
			}

			showText() {
				if (this.flag) {
					textmesh.material.opacity = 0

					missmesh.material.opacity = 1
					setTimeout(() => {
						missmesh.material.opacity = 0

					}, 200);
				}
			}

		}

		if (goodFlagA) {
			textmesh.material.opacity = 0

			missmesh.material.opacity = 1
			setTimeout(() => {
				missmesh.material.opacity = 0

			}, 200);
		}

		function draw() {
			// draw THREE.JS scene
			if (videoRef.current) {
				videoRef.current.onplaying = () => {
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
			let circleAni1 = new Circle(circle, goodFlagA, timerA)
			let circleAni2 = new Circle(circle1, goodFlagB, timerB)
			let circleAni3 = new Circle(circle2, goodFlagC, timerC)
			let circleAni4 = new Circle(circle3, goodFlagD, timerD)
			// 案件  圆盘变大
			boxArr.forEach((a, index) => {

				// if (circle.material.opacity == 1) {
				// 	// circle.scale.z += 0.001
				// 	circle.scale.x += 0.001
				// 	circle.scale.y += 0.001
				// }

				// if (circle1.material.opacity == 1) {
				// 	// circle1.scale.z += 0.001
				// 	circle1.scale.x += 0.001
				// 	circle1.scale.y += 0.001
				// }

				// if (circle2.material.opacity == 1) {
				// 	// circle2.scale.z += 0.001
				// 	circle2.scale.x += 0.001
				// 	circle2.scale.y += 0.001

				// }
				// if (circle3.material.opacity == 1) {
				// 	// circle3.scale.z += 0.001
				// 	circle3.scale.x += 0.001
				// 	circle3.scale.y += 0.001

				// }

				circleAni1.circleAni()
				circleAni2.circleAni()
				circleAni3.circleAni()
				circleAni4.circleAni()


				if (a.position.y >= -27 - 6 * newSpeed && a.position.y <= -27 + 5 * newSpeed) {
					if (a.position.y < -27 && a.position.y > -27 - newSpeed) {

						a.material.opacity = 0
					}

					// 键盘

					if (a.position.x == -64) {

						// if (Key.isDown('A')) {

						// 	if (goodFlagA) {

						// 		circle.material.opacity = 1
						// 		textmesh.material.opacity = 1
						// 		goodFlagA = false


						// 		if (!timerA) {
						// 			timerA = setTimeout(() => {

						// 				textmesh.material.opacity = 0
						// 				circle.material.opacity = 0
						// 				circle.scale.x = 1
						// 				circle.scale.y = 1


						// 				clearTimeout(timerA)
						// 				timerA = null
						// 			}, 400)
						// 		}
						// 	}



						// } else {

						// }

						circleAni1.showCircle()
					}

					if (a.position.x == -22) {
						if (Key.isDown('S')) {


							// if (goodFlagB) {

							// 	circle1.material.opacity = 1
							// 	textmesh.material.opacity = 1
							// 	goodFlagB = false

							// 	if (!timerB) {
							// 		timerB = setTimeout(() => {

							// 			textmesh.material.opacity = 0
							// 			circle1.material.opacity = 0
							// 			circle1.scale.x = 1
							// 			circle1.scale.y = 1
							// 			// goodFlag = tru

							// 			clearTimeout(timerB)
							// 			timerB = null
							// 		}, 400)
							// 	}
							// }
							circleAni2.showCircle()
						} else {
						}
					}

					if (a.position.x == 22) {
						if (Key.isDown('D')) {
							// if (goodFlagC) {

							// 	circle2.material.opacity = 1
							// 	textmesh.material.opacity = 1
							// 	goodFlagC = false

							// 	if (!timerC) {

							// 		timerC = setTimeout(() => {

							// 			circle2.material.opacity = 0
							// 			textmesh.material.opacity = 0
							// 			circle2.scale.x = 1
							// 			circle2.scale.y = 1


							// 			clearTimeout(timerC)
							// 			timerC = null
							// 		}, 400)
							// 	}
							// }
							circleAni3.showCircle()
						} else {
						}
					}


					if (a.position.x == 64) {
						if (Key.isDown('F')) {
							// if (goodFlagD) {

							// 	circle3.material.opacity = 1
							// 	textmesh.material.opacity = 1
							// 	goodFlagD = false

							// 	if (!timerD) {
							// 		timerD = setTimeout(() => {

							// 			textmesh.material.opacity = 0
							// 			circle3.material.opacity = 0
							// 			circle3.scale.x = 1
							// 			circle3.scale.y = 1
							// 			// goodFlag = tru

							// 			clearTimeout(timerD)
							// 			timerD = null
							// 		}, 400)
							// 	}
							// }
							circleAni4.showCircle()
						} else {
						}
					}
				}
				else if (a.position.y < -27 - 6 * newSpeed && a.position.y >= -27 - 9 * newSpeed) {
					if (a.position.x == -64) {

						// if (goodFlagA) {
						// 	textmesh.material.opacity = 0

						// 	missmesh.material.opacity = 1
						// 	setTimeout(() => {
						// 		missmesh.material.opacity = 0

						// 	}, 200);
						// }
						circleAni1.showText()

					}

					if (a.position.x == -22) {
						// if (goodFlagB) {
						// 	textmesh.material.opacity = 0

						// 	missmesh.material.opacity = 1
						// 	setTimeout(() => {
						// 		missmesh.material.opacity = 0

						// 	}, 200);
						// }
						circleAni2.showText()

					}

					if (a.position.x == 22) {

						// if (goodFlagC) {
						// 	textmesh.material.opacity = 0

						// 	missmesh.material.opacity = 1
						// 	setTimeout(() => {
						// 		missmesh.material.opacity = 0

						// 	}, 200);
						// }
						circleAni3.showText()

					}

					if (a.position.x == 64) {

						// if (goodFlagD) {
						// 	textmesh.material.opacity = 0

						// 	missmesh.material.opacity = 1
						// 	setTimeout(() => {
						// 		missmesh.material.opacity = 0

						// 	}, 200);
						// }
						circleAni4.showText()

					}
				} else if (a.position.y < -27 - 9 * newSpeed && a.position.y > -27 - 10 * newSpeed) {

					if (a.position.x == -64) {
						// goodFlagA = true
						circleAni1.flag = true
						goodNum = 0
					}
					if (a.position.x == -22) {
						// goodFlagB = true
						circleAni2.flag = true
					}
					if (a.position.x == 22) {
						// goodFlagC = true
						circleAni3.flag = true
					}
					if (a.position.x == 64) {
						// goodFlagD = true
						circleAni4.flag = true
					}

				} else if (a.position.y < -27 - 10 * newSpeed) {

					return
				}
				a.position.y -= newSpeed;
				a.position.z += newSpeed * Math.sqrt(3)

			})

			// 键盘
			if (Key.isDown('A')) {
				// console.log('AAA')

				track.material.opacity = 1

			} else {

				track.material.opacity = 0
			}

			if (Key.isDown('S')) {
				track1.material.opacity = 1

			} else {
				track1.material.opacity = 0
			}

			if (Key.isDown('D')) {
				track2.material.opacity = 1
			} else {
				track2.material.opacity = 0
			}

			if (Key.isDown('F')) {
				track3.material.opacity = 1
			} else {
				track3.material.opacity = 0
			}
		}

		// Handles CPU paddle movement and logic


		// Handles player's paddle movement
		function playerPaddleMovement() {

		}

		// Handles camera and lighting logic
		function cameraPhysics() {
			spotLight.position.x = -100;

			camera.position.z = 1200;


		}

		// Handles paddle collision logic


		// checks if either player or opponent has reached 7 points

	}, [])
	return (
		<>
			<div id='play' ref={playRef} onClick={() => { pausePlayHandler() }} style={{ position: 'absolute', width: '98vw', height: '98vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src={img} style={{ width: 100, height: 100 }} alt="" /></div>
			<video ref={videoRef} controls style={{ height: '100vh', display: 'none', position: 'absolute' }} className='video'>
				<source src={video}
					type="video/webm" />
				<source src={video}
					type="video/mp4" />
			</video>


			<div id='gameCanvas'></div>
		</>
	)
}
