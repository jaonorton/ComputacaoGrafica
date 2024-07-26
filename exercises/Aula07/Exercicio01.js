import * as THREE from  'three';
import { OrbitControls } from '../../build/jsm/controls/OrbitControls.js';
import {TeapotGeometry} from '../../build/jsm/geometries/TeapotGeometry.js';
import {initRenderer, 
        initCamera,
        initDefaultBasicLight,
        setDefaultMaterial,
        InfoBox,
        onWindowResize,
        createGroundPlaneXZ} from "../../libs/util/util.js";

let scene, renderer, camera, orbit; // Initial variables
scene = new THREE.Scene();    // Create main scene
renderer = initRenderer();    // Init a basic renderer
camera = initCamera(new THREE.Vector3(0, 15, 30)); // Init camera in this position
orbit = new OrbitControls( camera, renderer.domElement ); // Enable mouse rotation, pan, zoom etc.

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

// Show axes (parameter is size of each axis)
// let axesHelper = new THREE.AxesHelper( 12 );
// scene.add( axesHelper );

// create the ground plane
let plane = createGroundPlaneXZ(20, 20)
scene.add(plane);

// create a teapot
let teapotColor = "rgb(255,20,20)"; // Define the color of the object
let teapotShininess = 100;          // Define the shininess of the object

let geometryTeapot = new TeapotGeometry(0.5);
let materialTeapot = new THREE.MeshPhongMaterial({color: teapotColor, specular: "rgb(255,255,255)", shininess: teapotShininess});
  materialTeapot.side = THREE.DoubleSide;
let teapot = new THREE.Mesh(geometryTeapot, materialTeapot);
  teapot.castShadow = true;
  teapot.position.set(0.0, 0.5, 0.0);
  teapot.castShadow = true;
  teapot.reciveShadow = true;
  
scene.add(teapot);

// create a cylinder
let cylinderColor = "rgb(30,30,255)"; 
const cylinderGeometry = new THREE.CylinderGeometry( 0.1, 1, 3, 8 );
let materialCylinder = new THREE.MeshPhongMaterial({
  color: cylinderColor, 
  flatShading: true
});
materialCylinder.side = THREE.DoubleSide; 
const cylinder =  new THREE.MeshPhongMaterial({color: teapotColor, specular: "rgb(255,255,255)", shininess: teapotShininess});
cylinder.position.set(1.5, 1.5, 3);
cylinder.castShadow = true;
scene.add( cylinder );

//create sphere
let sphereColor = "rgb(30,255,30)"; 
const sphereGeometry = new THREE.SphereGeometry( 0.5, 32, 32 ); 
let materialSphere = new THREE.MeshPhongMaterial({
  color: sphereColor, 
  flatShading: true,
  shininess: 0
});
const sphere =  new THREE.MeshPhongMaterial({color: sphereColor, specular: "rgb(255,255,255)", shininess: teapotShininess});
sphere.position.set(-1.5, 2.0, -3.0);
scene.add( sphere );

// luz ambiente
let ambientLight = new THREE.AmbientLight("rgb(80,80,80");
scene.add( ambientLight );

// luz direcional
let dirLight = new THREE.DirectionalLight("rgb(255,255,255", 1);
let dirLightPosition = new THREE.Vector3(1,1,3);
dirLight.position.copy(dirLightPosition);
dirLight.castShadow = true;
scene.add(dirLight);


// Use this to show information onscreen
let controls = new InfoBox();
  controls.add("Use mouse to interact:");
  controls.add("* Left button to rotate");
  controls.add("* Right button to translate (pan)");
  controls.add("* Scroll to zoom in/out.");
  controls.show();

render();
function render()
{
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}