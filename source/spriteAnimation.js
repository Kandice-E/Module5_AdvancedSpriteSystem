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
    const positions = points.geometry.attributes.positions.array;
    for (let i = 0; i < points.length; i+=3){
        //const currentX = positionArray[i];
        //const currentY = positionArray[i+1];
        //const currentZ = positionArray[i+2];
        //points.geometry.attributes.position.array[i] += ((Math.sin(currentY) + Math.sin(currentZ)*0.01))*0.03;
        //points.geometry.attributes.position.array[i+2] += ((Math.sin(currentY) + Math.sin(currentX)*0.01))*0.03;

        //if (currentX > 250) {
            //points.geometry.attributes.position.array[i] = -250;
        //};
        //if (currentX < -250) {
            //points.geometry.attributes.position.array[i] = 250;
        //}
        //if (currentZ > 250) {
            //points.geometry.attributes.position.array[i+2] = -250;
        //};
        //if (currentZ < -250) {
            //points.geometry.attributes.position.array[i+2] = 250;
        //};
        positions[i] = Math.sin(Date.now() * 0.001 + i) * 5;
    };
    //points.rotation.y += rotationSpeed;
    points.geometry.attributes.position.needsUpdate = true;
};