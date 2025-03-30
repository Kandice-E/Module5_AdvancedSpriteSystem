import * as THREE from 'three';

const speed = 1;
const rotationSpeed = Math.Pi/180;
export function animateSprites(sprites) {
    //for (let i = 0; i < sprites.children.length; i++){
        //const object = sprites.children[ i ];
        //object.rotation.y = Math.sin(rotationSpeed);
    //};
    sprites.children.forEach(sprite => {
        //sprite.rotation.y = rotationSpeed;
        //sprite.position.x += Math.sin(speed);
        //sprite.position.z += Math.sin(speed);
    });
};