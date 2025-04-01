import * as THREE from 'three';
import { colors, randomSize } from './spriteGeneration';

    const vertices = [];
    const numSprites = 30000;
    const range = 300;
    const boundingBox = new THREE.Box3(new THREE.Vector3(0,0,0), new THREE.Vector3(300,300,300));
export function addPoints() {
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
    //Create points material
    const pointMaterial = new THREE.PointsMaterial({
        size: randomSize(0.1, 2),
        vertexColors: true,
        color: 0xffffff,
        depthWrite: false,
        depthTest: false,
        sizeAttenuation: true
    });
    //Create instance of point object using buffer geometry and point material
    const points = new THREE.Points(bufferGeometry, pointMaterial);

    return points;
};
export function addSFPoints() {
    //Randomly position sprites
     for ( let i = 0; i < numSprites; i++ ) {
        const x = Math.random() * range;
        const y = Math.random() * range;
        const z = Math.random() * range;
        let point = new THREE.Vector3(x, y, z);
        vertices.push( point );
    };
    //Create buffer geometry from vertices and create color attribute
    const bufferGeometry = new THREE.BufferGeometry().setFromPoints(vertices);
    //Load Snowflake Texture
    const texture = new THREE.TextureLoader().load("./assets/snowflake2.png");
    //Create points material
    const pointMaterial = new THREE.PointsMaterial({
        size: randomSize(0.1, 2),
        vertexColors: false,
        color: 0xffffff,
        map: texture,
        transparent: true,
        opacity: 0.8,
        alphaTest: 0.01
    });
    //Create instance of point object using buffer geometry and point material
    const points = new THREE.Points(bufferGeometry, pointMaterial);

    return points;
};

export { boundingBox };