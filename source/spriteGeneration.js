import * as THREE from 'three';

const numSprites = 100;
const range = 25;
const spriteGroup = new THREE.Group();
const colors = [
    new THREE.Color().setHex(0xff0000),
    new THREE.Color().setHex(0x00ff00),
    new THREE.Color().setHex(0x0000ff),
    new THREE.Color().setHex(0xffffff),
    new THREE.Color().setHex(0xcccccc)
];
//Returns a random sprite size between a specified range
export function randomSize(minSize, maxSize) {
    let size = Math.random() * (maxSize + 1);
    if (size <= minSize)
    {
        return minSize;
    }
    else if (size >= maxSize + 1)
    {
        return maxSize;
    }
    else
    return size;
};

export function addSprites() {

    for (let i = 0; i < numSprites; i++) {
        const spriteMaterial = new THREE.SpriteMaterial({ 
            color: colors[Math.floor(Math.random()*colors.length)],
            depthWrite: false
        });
        const x = Math.random() * range;
        const y = Math.random() * range;
        const z = Math.random() * range;

        const sprite = new THREE.Sprite(spriteMaterial);
        const randomScale = randomSize(0.1, 2);
        sprite.scale.set(randomScale, randomScale, randomScale);
        sprite.position.set(x, y, z);
        spriteGroup.add(sprite);
    };
return spriteGroup;
};
export { colors };