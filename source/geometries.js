import * as THREE from 'three';
import { material4, material6, material8 } from './materials.js';

//-----REGULAR STAIRCASE GEOMETRY-----//
let newStaircase = new THREE.Group();
function addStep(x, y, z) {
    const geometry = new THREE.BoxGeometry(8, 2, 2);
    const newStep = new THREE.Mesh(geometry, material4);
    newStep.position.set(x, y, z);
    return newStep;
};
export function addStaircase() {
    for (let i = 0; i < 75; i++){
        const step = addStep(0, i * 2, i * 2);
        newStaircase.add(step);
    }
    return newStaircase;
};

//-----SPIRAL STAIRCASE GEOMETRY-----//
let newSpiralStaircase = new THREE.Group();
function addSpiralStep(x, y, z, i) {
    const geometry = new THREE.BoxGeometry(104, 4, 8);
    const newSpiralStep = new THREE.Mesh(geometry);
    newSpiralStep.scale.set(i / 100, i / 100, i / 100);
    newSpiralStep.position.set(x, y, z);
    newSpiralStep.rotateY( i * (Math.PI / 15));
    return newSpiralStep;
};
export function addSpiralStaircase() {
    for (let i = 0; i < 100; i++) {
        const spiralStep = addSpiralStep(0.5, i * 2, 0, i + 1);
        newSpiralStaircase.add(spiralStep);
    }
    return newSpiralStaircase;
};

export function addPlane() {
    const planeGeometry = new THREE.PlaneGeometry(2000, 2000);
    const planeMesh = new THREE.Mesh(planeGeometry, material8);
    planeMesh.rotateX(Math.PI / 2);
    planeMesh.position.set(-200, -450, -400);
    return planeMesh;
};

export function addCircularPlane() {
    const cGeometry = new THREE.CircleGeometry(900, 64);
    const cMesh = new THREE.Mesh(cGeometry, material8);
    cMesh.receiveShadow = true;
    cMesh.rotateX(Math.PI / 2);
    cMesh.position.set(-200, -600, -400);
    return cMesh;
};

export function addCube() {
    const cubeGeometry = new THREE.BoxGeometry(2000, 1500, 2000, 5, 5, 5);
    const cubeMesh = new THREE.Mesh(cubeGeometry, material6);
    cubeMesh.position.set(-200, -200, -400);
    return cubeMesh;
};

export function addSphere() {
    const sphereGeometry = new THREE.SphereGeometry(1300, 64, 32);
    const sphereMesh = new THREE.Mesh(sphereGeometry);
    sphereMesh.position.set(-200, -200, -400);
    return sphereMesh;
};