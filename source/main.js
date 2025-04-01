import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { createScene, createCamera, createRenderer } from './sceneSetup.js';
import { addControls } from './orbitControls.js';
import { addCube } from './geometries.js';
import { addSprites } from './spriteGeneration.js';
import { animateSprites, animatePoints } from './spriteAnimation.js';
import { addPoints } from './pointGeneration.js';

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
const axesHelper = new THREE.AxesHelper(200);
axesHelper.setColors(0xff0000, 0x00ff00, 0x0000ff);
scene.add(axesHelper);
//const sprites = addSprites();
//scene.add(sprites);
//Testing addPoint function
const points = addPoints();
scene.add(points);


//-----UPDATE SCENE-----//
function animate() {
    requestAnimationFrame(animate);
    //animateSprites(sprites);
    //animateSprites(sprites, camera, scene);
    animatePoints(points);
    //points.geometry.attributes.position.needsUpdate = true;
    //camera.rotateY(Math.Pi / 4);
    //sprites.rotation.y += Math.Pi / 4;
    //const positions = points.geometry.getAttribute("position").array;
    //for (let i = 0; i < positions.length; i += 3) {
        //const angle = performance.now() * 0.001 + i * 0.1;
        //positions[i] = Math.cos(angle) * 2;
        //positions[i+2] = Math.sin(angle) * 2;
    //};
    //points.geometry.getAttribute("position").needsUpdate = true;
    orbitControls.update();
    stats.update();
    renderer.render(scene, camera);
};
animate();