import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red" });

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cubeMesh);

// Add borders (edges) to the cube
const edgesGeometry = new THREE.EdgesGeometry(cubeGeometry);
const edgesMaterial = new THREE.LineBasicMaterial({ color: "white" }); // Border color
const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
scene.add(edges);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  20,
  window.innerWidth / window.innerHeight,
  0.1,
  30
);
camera.position.z = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);

const maxPixelRatio = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(maxPixelRatio);

// instaniate the controls

const controls = new OrbitControls(camera, canvas);

controls.enableDamping = true;
controls.autoRotate = true;

window.addEventListener("resize", (e) => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const renderloop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
renderer.render(scene, camera);
