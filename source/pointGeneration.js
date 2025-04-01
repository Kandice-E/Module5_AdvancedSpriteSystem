import * as THREE from 'three';
import { colors, randomSize } from './spriteGeneration';

export function addPoints() {
    const vertices = [];
    const numSprites = 10000;
    const range = 100;
    //Randomly position sprites
    for ( let i = 0; i < numSprites; i++ ) {
        const x = Math.random() * range;
        const y = Math.random() * range;
        const z = Math.random() * range;
        let point = new THREE.Vector3(x, y, z);
        vertices.push( point );
    };
    //Randomly color sprites
    const colorArray = new Float32Array(vertices.length * 3);
    vertices.forEach((e, i) => {
        const c = colors[Math.floor(Math.random()*colors.length)];
        colorArray[i * 3] = c.r;
        colorArray[i * 3 + 1] = c.g;
        colorArray[i * 3 + 2] = c.b;
    });
    //Create buffer geometry from vertices and create color attribute
    const bufferGeometry = new THREE.BufferGeometry().setFromPoints(vertices);
    bufferGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3, true));
    //bufferGeometry.computeBoundingBox();
    //const boundingBox = bufferGeometry.boundingBox;
    //Create points material
    const pointMaterial = new THREE.PointsMaterial({
        size: randomSize(0.1, 2),
        vertexColors: true,
        color: 0xffffff,
        depthWrite: false
    });
    //Create instance of point object using buffer geometry and point material
    const points = new THREE.Points(bufferGeometry, pointMaterial);

    return points;
};