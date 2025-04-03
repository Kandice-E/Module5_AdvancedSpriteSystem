import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { createScene, createCamera, createRenderer } from './sceneSetup.js';
import { addControls } from './orbitControls.js';
import { addCube } from './geometries.js';
import { addSprites } from './spriteGeneration.js';
import { animateSprites, animatePoints, rotationSpeed } from './spriteAnimation.js';
import { addPoints, addSFPoints } from './pointGeneration.js';
import { addUserControls } from './spriteInteraction.js';
import { GUI } from 'dat.gui';

//-----INITIALIZE SCENE----//
let scene = createScene();
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

//Axes Helper for Testing
const axesHelper = new THREE.AxesHelper(200);
axesHelper.setColors(0xff0000, 0x00ff00, 0x0000ff);
//scene.add(axesHelper);

//Create pivot point to rotate camera with points
const pivot = new THREE.Object3D();
pivot.add(camera);
//Initialize camera position for default Sprite Scene
//camera.position.set(10, 10, 10);

//-----SPRITE SCENE-----//
const sceneSprites = createScene();
const sprites = addSprites();
sceneSprites.add(sprites);

//-----POINTS SCENE-----//
//Testing Point object with textures generation
const scenePoints = createScene();
scenePoints.fog = new THREE.FogExp2(0x000000, 0.008);
const points = addSFPoints();
scenePoints.add(points); 

//-----SCENE SWITCHER-----//
function switchScene() {
    switch (sceneSwitcher.type) {
        case 'sceneSprites':
            scene = sceneSprites;
            break;
        case 'scenePoints':
            scene = scenePoints;
            break;
    }
};
//-----CREATE GUI-----//
const gui = new GUI();
const sceneSwitcher = {
    type: 'sceneSprites'
};
const sceneFolder = gui.addFolder('Scenes');
sceneFolder.add(sceneSwitcher, 'type', ['sceneSprites', 'scenePoints']).onChange(switchScene);


//User interaction code
//addUserControls(camera, renderer, scene, points);
//-----UPDATE SCENE-----//
function animate() {
    requestAnimationFrame(animate);
    if (scene == sceneSprites) {
        camera.position.set(0, 0, 0);
        animateSprites(sprites);
        //orbitControls.update();
    }
    else if (scene == scenePoints) {
        //orbitControls.enabled = false;
        camera.position.set(150, 150, 150);
        animatePoints(points);
        pivot.rotation.y += rotationSpeed;
        camera.lookAt(10, 10, 10);
    }
    //animatePoints(points);
    //animateSprites(sprites);
    //pivot.rotation.y += rotationSpeed;
    //camera.lookAt(10, 10, 10);
    stats.update();
    renderer.render(scene, camera);
};
animate();