import * as THREE from 'three';

let selectedSprite = null;
let spriteSpeed = 0.01;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

export function addUserControls(camera, renderer, scene, points) {
    document.addEventListener('mousedown', (event) => {
        event.preventDefault();

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        //const positions = points.geometry.getAttribute("position").array;
        //const sprites = scene.getObjectByName('points');
        const intersects = raycaster.intersectObject(points);

        if (intersects.length > 0) {
            selectedSprite = intersects[0].object;

            selectedSprite.material.color.set(0xff0000);
        }
        else {
            if (selectedSprite) {
                selectedSprite.material.color.set(0xffffff);
                selectedSprite = null;
            }
        }
    });

    document.addEventListener('keydown', (event) => {
        if (selectedSprite) {
            switch (event.key) {
                case 'w':
                    selectedSprite.position.z -= spriteSpeed;
                    break;
                case 'a':
                    selectedSprite.position.x -= spriteSpeed;
                    break;
                case 's':
                    selectedSprite.position.z += spriteSpeed;
                    break;
                case 'd':
                    selectedSprite.position.x += spriteSpeed;
                    break;
            }
        }
    });
};