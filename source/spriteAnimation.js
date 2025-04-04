import * as THREE from 'three';
import { boundingBox } from './pointGeneration';

const rotationSpeed = 0.005;
export function animateSprites(sprites) {
    for (let i = 0; i < sprites.children.length; i++){
        const child = sprites.children[ i ];
        child.position.x += ((Math.sin(child.position.y) + (Math.sin(child.position.z)) * 3))*0.01;
        if (child.position.x > 50) {
            child.position.x = -50;
        };
        if (child.position.x < -50) {
            child.position.x = 50;
        };
        child.position.z += ((Math.sin(child.position.x) + (Math.sin(child.position.y)) * 3))*0.01;
        if (child.position.z > 50) {
            child.position.z = -50;
        };
        if (child.position.z < -50) {
            child.position.z = 50;
        };
    };
    sprites.rotation.y += rotationSpeed / 2;
};
export function animatePoints(points) {
    const positions = points.geometry.getAttribute("position").array;
    for (let i = 0; i < positions.length; i+=3){
        positions[i] += (Math.sin(positions[i+1]) + Math.sin(positions[i+2]) * 3) * 0.01;
        positions[i+2] += (Math.sin(positions[i+1]) + Math.sin(positions[i]) * 3) * 0.01;
        const x = positions[i];
        const z = positions[i+2];
        const newX = Math.max(boundingBox.min.x, Math.min(boundingBox.max.x, x));
        const newZ = Math.max(boundingBox.min.z, Math.min(boundingBox.max.z, z));
        positions[i] = newX;
        positions[i+2] = newZ;
        points.geometry.getAttribute("position").needsUpdate = true;
    };
    points.rotation.y += rotationSpeed;
};
export { rotationSpeed };