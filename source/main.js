import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { createScene, createCamera, createRenderer } from './sceneSetup.js';
import { addSprites } from './spriteGeneration.js';
import { animateSprites, animatePoints, rotationSpeed } from './spriteAnimation.js';
import { addSFPoints } from './pointGeneration.js';
import { addUserControls } from './spriteInteraction.js';
import { GUI } from 'dat.gui';

//-----INITIALIZE SCENE----//
let scene = createScene();
const camera = createCamera();
camera.position.set(30, 30, 30);
const renderer = createRenderer();
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

//Create pivot point to rotate camera with points
const pivot = new THREE.Object3D();

//-----SPRITE SCENE WITH ANIMATIONS AND CONTROLS-----//
const sceneSpritesAnimation = createScene();
const sprites = addSprites();
sceneSpritesAnimation.add(sprites);
//-----POINTS SCENE-----//
const scenePoints = createScene();
scenePoints.fog = new THREE.FogExp2(0x000000, 0.008);
const points = addSFPoints();
scenePoints.add(points); 

//-----SCENE SWITCHER-----//
function switchScene() {
    switch (sceneSwitcher.type) {
        case 'sceneSpritesAnimation':
            scene = sceneSpritesAnimation;
            resetCameraForSceneSpritesAnimation();
            break;
        case 'scenePoints':
            scene = scenePoints;
            break;
    }
    renderer.render(scene, camera); // Ensure the renderer updates the scene
};

// Helper function to reset camera for Sprite Animation Scene
function resetCameraForSceneSpritesAnimation() {
    pivot.remove(camera);
    camera.position.set(30, 30, 30);
    camera.updateProjectionMatrix();
}

//-----CREATE GUI-----//
const gui = new GUI();
const sceneSwitcher = {
    type: 'sceneSpritesAnimation'
};
const sceneFolder = gui.addFolder('Scenes');
sceneFolder.add(sceneSwitcher, 'type', ['sceneSpritesAnimation', 'scenePoints']).onChange(switchScene);
scene = sceneSpritesAnimation; // Set the initial scene to sceneSpritesAnimation

//-----UPDATE SCENE-----//
function animate() {
    requestAnimationFrame(animate);
    //Adjusts settings for 100 sprite scene with animations
    if (scene === sceneSpritesAnimation) {
        animateSprites(sprites);
        addUserControls(camera, scene, scenePoints, sceneSpritesAnimation, sprites);
    }
    //Adjusts settings for 30,000 sprites scene
    else if (scene === scenePoints) {
        pivot.add(camera);  
        camera.position.set(150, 150, 150);
        animatePoints(points);
        pivot.rotation.y += rotationSpeed;
        camera.lookAt(10, 10, 10);
        camera.updateProjectionMatrix();
    }
    stats.update();
    renderer.render(scene, camera);
};
animate();