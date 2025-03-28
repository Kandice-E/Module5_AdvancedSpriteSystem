import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { createScene, createCamera, createRenderer } from './sceneSetup.js';
import { addControls } from './orbitControls.js';
import { addCube } from './geometries.js';
import { addSprites } from './spriteGeneration.js';

//-----INITIALIZE SCENE----//
const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();
//Add Orbit Controls
const orbitControls = addControls(camera, renderer.domElement);
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

//Test Scene setup
//const box = addCube();
//scene.add(box);
const sprites = addSprites();
//NOTE>>>>>>>Random sprite color not working properly

//-----UPDATE SCENE-----//
function animate() {
    requestAnimationFrame(animate);
    orbitControls.update();
    renderer.render(scene, camera);
    stats.update();
};
animate();