import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { createScene, createCamera, createRenderer } from './sceneSetup.js';
import { addControls } from './orbitControls.js';
import { addCube } from './geometries.js';
import { addSprites } from './spriteGeneration.js';
import { animateSprites, animatePoints, rotationSpeed } from './spriteAnimation.js';
import { addPoints } from './pointGeneration.js';

//-----INITIALIZE SCENE----//
const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();
//Add Orbit Controls
//const orbitControls = addControls(camera, renderer.domElement);
//orbitControls.target.set(0,0,0);
//orbitControls.autoRotate = true;
//orbitControls.autoRotateSpeed = rotationSpeed;
//Add FPS stats
const stats = Stats();
document.body.appendChild(stats.dom);
//-----HANDLE WINDOW RESIZING-----//
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};
window.addEventListener('resize', onWindowResize, false);
//Add Fog
scene.fog = new THREE.FogExp2(0x000000, 0.008);

//Axes Helper for Testing
const axesHelper = new THREE.AxesHelper(200);
axesHelper.setColors(0xff0000, 0x00ff00, 0x0000ff);
//scene.add(axesHelper);

//Testing Sprite object generation
//const sprites = addSprites();
//scene.add(sprites);
const points = addPoints();
scene.add(points);

//Create pivot point to rotate camera with points
const pivot = new THREE.Object3D();
pivot.add(camera);
camera.position.set(250, 250, 250);

//-----UPDATE SCENE-----//
function animate() {
    requestAnimationFrame(animate);
    animatePoints(points);
    pivot.rotation.y += rotationSpeed;
    camera.lookAt(0,0,0);
    stats.update();
    renderer.render(scene, camera);
};
animate();