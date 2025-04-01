import * as THREE from 'three';

const speed = 1;
const rotationSpeed = 0.001;
export function animateSprites(sprites, camera, scene) {
    for (let i = 0; i < sprites.children.length; i++){
        const randomSpeed = Math.random();
        const child = sprites.children[ i ];
        //child.rotation.y += rotationSpeed;
        child.position.x += ((Math.sin(child.position.y) + (Math.sin(child.position.z)) * 0.01))*0.03;
        if (child.position.x > 50) {
            child.position.x = -50;
        };
        if (child.position.x < -50) {
            child.position.x = 50;
        };
        child.position.z += ((Math.sin(child.position.x) + (Math.sin(child.position.y)) * 0.01))*0.03;
        if (child.position.z > 50) {
            child.position.z = -50;
        };
        if (child.position.z < -50) {
            child.position.z = 50;
        };
    };
    //sprites.children.forEach(sprite => {
        //sprite.rotation.y += rotationSpeed;
        //sprite.position.x += Math.sin(speed);
        //sprite.position.z += Math.sin(speed);
    //});
    sprites.rotation.y += rotationSpeed;
    //sprites.position.x += Math.sin(Math.PI / 4);
    //camera.lookAt(sprites.position);

};
export function animatePoints(points) {
    //const positionAttribute = points.geometry.getAttribute('position');
    //const positionArray = positionAttribute.array;
    const range = 250;
    const box = new THREE.Box3().setFromObject(points);
    const min = box.min;
    const max = box.max;
    //console.log(min);
    const positions = points.geometry.getAttribute("position").array;
    for (let i = 0; i < positions.length; i+=3){
        //const angle = performance.now() * 0.001 + i * 0.1;
        //const currentX = positions[i];
        //const currentZ = positions[i+2];
        //const currentY = positions[i+1];
        const x = points.geometry.attributes.position.getX(i);
        const y = points.geometry.attributes.position.getY(i+1);
        const z = points.geometry.attributes.position.getZ(i+2);
        const clampedX = THREE.MathUtils.clamp(positions[i], min, max);
        const clampedY = THREE.MathUtils.clamp(positions[i+1], min, max);
        const clampedZ = THREE.MathUtils.clamp(positions[i+2], min, max);
        points.geometry.attributes.position.setXYZ(i, clampedX, clampedY, clampedZ);
        positions[i] += (Math.sin(positions[i+1]) + Math.sin(positions[i+2]) * 2) * 0.01;
        positions[i+2] += (Math.sin(positions[i+1]) + Math.sin(positions[i]) * 2) * 0.01;
        box.setFromObject(points);
        

        //if (positions[i] < min/2 || positions[i] > max/2) {
            //positions[i] = Math.random() * (max-min)/2;
            //positions[i+2] = Math.random() * (max-min)/2;
        //};
        //if (positions[i] > range/2) {
            //positions[i] = Math.random() * range;
            //positions[i+2] = Math.random() * range;
        //};
        //if (positions[i] < -range/2) {
            //positions[i] = Math.random() * range;
            //positions[i+2] = Math.random() * range;
        //};
        //if (positions[i+2] < min/2 || positions[i+2] > max/2) {
            //positions[i] = Math.random() * (max-min)/2;
            //positions[i+2] = Math.random() * (max-min)/2;
        //};
        points.geometry.getAttribute("position").needsUpdate = true;
    };
    //points.rotation.y += rotationSpeed;
};