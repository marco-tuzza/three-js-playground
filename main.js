import * as THREE from 'three';

//Scene
const scene = new THREE.Scene();

//Sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial( 
  {
    color: "red"
  } 
);
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Light
const light = new THREE.PointLight(0xffffff, 70, 100, 1.7);
light.position.set(0, 0, 10);
scene.add(light);

//Camera
const camera = new THREE.PerspectiveCamera(45, 800 / 600, 1, 1000);
camera.position.z = 20;
scene.add(camera);

//Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(800, 600);
renderer.render(scene, camera);