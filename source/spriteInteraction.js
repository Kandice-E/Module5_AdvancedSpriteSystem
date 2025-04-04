import * as THREE from 'three';

let selectedSprite = null;
let spriteSpeed = 0.001;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

export function addUserControls(camera, scene, scenePoints, sprites) {
    //Check for scene selection before proceeding with event listeners
    if (scene == scenePoints) {
        return;
    }
    //Mouse controls for selecting, highlighting, and unselecting a sprite
    document.addEventListener('mousedown', eventMouse => {
        mouse.x = (eventMouse.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(eventMouse.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(sprites, true);
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
    //Key controls for moving a selected sprite along the x and z axes
    document.addEventListener('keydown', eventKeys => {
        if (selectedSprite) {
            switch (eventKeys.key) {
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