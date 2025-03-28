import * as THREE from 'three';

const numSprites = 100;
const range = 5;
const spriteGroup = new THREE.Group();
const colors = [new THREE.Color().setHex(0xff0000), new THREE.Color().setHex(0x00ff00), new THREE.Color().setHex(0x0000ff), new THREE.Color().setHex(0xffffff), new THREE.Color().setHex(0xcccccc)];

export function addSprites() {
    const spriteMaterial = new THREE.SpriteMaterial({ size: 0.1, color: colors[Math.floor(Math.random()*colors.length)] });

    for (let i = 0; i < numSprites; i++) {
        const x = Math.random() * range;
        const y = Math.random() * range;
        const z = Math.random() * range;

        const sprite = new THREE.Sprite(spriteMaterial);

        sprite.position.set(x, y, z);
        spriteGroup.add(sprite);
    };
return spriteGroup;
};
