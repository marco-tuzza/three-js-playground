import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//Scene
const scene = new THREE.Scene();

//Sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial( 
  {
    color: "red",
    roughness: 0.4,
  } 
);
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

//Light
const light = new THREE.PointLight(0xffffff, 70, 100, 1.7);
light.position.set(0, 10, 10);
light.intensity = 100;
scene.add(light);

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);

//Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

//Resize
window.addEventListener("resize", () => {
  //Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  //Update renderer
  renderer.setSize(sizes.width, sizes.height);
});

//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 2;


const loop = () => {
  //Render
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
}
loop();

// Timeline
const tl = gsap.timeline({defaults: {duration: 2}});
tl.fromTo(mesh.scale,{x: 0, y: 0, z: 0},{x: 1, y: 1, z: 1});
tl.fromTo('nav', {y: "-100%"}, {y:"0%"})
tl.fromTo('#title', {opacity: 0}, {opacity: 1})

// Cursor
let mouseDown = false;
let rgb = [];

window.addEventListener('mousedown', () => {
  mouseDown = true;
})
window.addEventListener('mouseup', () => {
  mouseDown = false;
})
window.addEventListener('mousemove', (e) => {
  if(mouseDown){
    rgb = [Math.round((e.pageX / sizes.width) * 255), Math.round((e.pageY / sizes.height) * 255), Math.round(((e.pageX + e.pageY) / (sizes.width + sizes.height)) * 255)];
    let newColor = new THREE.Color(rgb[0] / 255, rgb[1] / 255, rgb[2] / 255);
    gsap.to(mesh.material.color, newColor);
  }
}
)