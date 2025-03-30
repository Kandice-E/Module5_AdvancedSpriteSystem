import * as THREE from 'three';

const speed = 1;
const rotationSpeed = 0.001;
export function animateSprites(sprites, camera, scene) {
    for (let i = 0; i < sprites.children.length; i++){
        const randomSpeed = Math.random();
        const child = sprites.children[ i ];
        child.position.x += 0.001;
        child.position.z += Math.sin(child.position.x);
        if (child.position.x < -100 || child.position.x > 100) {
            child.position.x = 0;
        };
    };
    //sprites.children.forEach(sprite => {
        //sprite.rotation.y += rotationSpeed;
        //sprite.position.x += Math.sin(speed);
        //sprite.position.z += Math.sin(speed);
    //});
    //sprites.rotation.y += rotationSpeed;
    //sprites.position.x += Math.sin(Math.PI / 4);
    //camera.lookAt(sprites.position);

};
export function animatePoints(points) {
    points.rotation.y += rotationSpeed;
};