import * as THREE from 'three';

//-----BASIC MATERIALS-----//
let material = new THREE.MeshBasicMaterial({color: 0xffffff});
const material1 = new THREE.MeshPhongMaterial({
    color: 0xc0c0c0,
    shininess: 175,
    specular: 0xc0c0c0
    });
const material2 = new THREE.MeshLambertMaterial({ color: 0xff2400}); 
const material3 = new THREE.MeshDepthMaterial();
const material4 = new THREE.MeshNormalMaterial({ wireframe: true });
const material5 = new THREE.MeshBasicMaterial({ wireframe: true});

//-----SHADER MATERIALS WITH CUSTOM SHADERS-----//
const textureLoader = new THREE.TextureLoader();
const material6 = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    wireframe: true,
    uniforms: {
        time: { value: 0.0 }
    },
    vertexShader: `varying vec2 vUv;
                   uniform float time;
                   void main() {
                        vUv = uv;

                        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,
    fragmentShader: `uniform float time;
                     varying vec2 vUv;
                     void main() {
                        vec2 distortedUV = vUv;

                        gl_FragColor = vec4(distortedUV, 0.5 +0.5 * sin(time), 1.0);
    }`,
});
const textureClouds = textureLoader.load('./assets/freepik_AIClouds.jpg');
const textureLava = textureLoader.load('./assets/lava.png');
const material7 = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    uniforms: {
        time: { value: 0.0 },
        textureMap: { value: textureClouds }
    },
    vertexShader: `varying vec2 vUv;
                   uniform float time;

                   void main() {
                        vUv = uv;

                        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,
    fragmentShader: `uniform float time;
                     uniform sampler2D textureMap;

                     varying vec2 vUv;

                     void main() {
                        vec2 distortedUV = vUv;

                        gl_FragColor = vec4(texture2D(textureMap, distortedUV).xyz, 1.0);
    }`,
});
const material8 = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    uniforms: {
        time: { value: 0.0 },
        waveFrequency: { value: 1.0},
        waveAmplitude: { value: 1.0},
        textureMap: { value: textureLava }
    },
    vertexShader: `varying vec2 vUv;
                   uniform float time;
                   uniform float waveFrequency;
                   uniform float waveAmplitude;

                   void main() {
                        vUv = uv;

                        vec3 newPos = position;
                        newPos.z += sin(length(position.xy) * waveFrequency + time) * waveAmplitude;
                        newPos.x += sin(length(position.yz) * waveFrequency + time) * waveAmplitude;
                        

                        gl_Position = projectionMatrix * modelViewMatrix * vec4( newPos, 1.0 );
    }`,
    fragmentShader: `uniform float time;
                     uniform sampler2D textureMap;
                     uniform float waveFrequency;
                     uniform float waveAmplitude;

                     varying vec2 vUv;

                     void main() {
                        vec2 distortedUV = vUv;

                        gl_FragColor = vec4(texture2D(textureMap, distortedUV).xyz, 1.0);
    }`,
});

const material9 = new THREE.ShaderMaterial({
    wireframe: true,
    uniforms: {
        time: { value: 0.0 },
        waveFrequency: { value: 10.0},
        waveAmplitude: { value: 25.0},
    },
    vertexShader: `varying vec2 vUv;
                   uniform float time;
                   uniform float waveFrequency;
                   uniform float waveAmplitude;

                   void main() {
                        vUv = uv;

                        vec3 newPos = position;
                        newPos.z += sin(length(position.xy) * waveFrequency + time) * waveAmplitude;
                        newPos.x += sin(length(position.yz) * waveFrequency + time) * waveAmplitude;
                        newPos.y += sin(length(position.xz) * waveFrequency + time) * waveAmplitude;

                        gl_Position = projectionMatrix * modelViewMatrix * vec4( newPos, 1.0 );
    }`,
    fragmentShader: `uniform float time;
                     uniform float waveFrequency;
                     uniform float waveAmplitude;

                     varying vec2 vUv;

                     void main() {
                        vec2 distortedUV = vUv;

                        gl_FragColor = vec4(distortedUV, 0.5 + (0.75 * sin(time)), 0.8);
    }`,
})

//-----CODE FOR SWITCHING MATERIALS IF USING DAT.GUI-----//
const materialSwitcher = {
        type: 'Phong'
    };

function switchMaterial() {
    switch (materialSwitcher.type){
        case 'Phong':
            material = material1;
            break;
        case 'Lambert':
            material = material2;
            break;
        case 'Depth':
            material = material3;
            break;
        case 'Normal':
            material = material4;
            break;
        case 'Basic':
            material = material5;
            break;
    };
};
export {switchMaterial, materialSwitcher, material1, material2, material3, material4, material5, material6, material7, material8, material9};