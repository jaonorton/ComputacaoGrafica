import * as THREE from  'three';
import { OrbitControls } from '../../build/jsm/controls/OrbitControls.js';
import {initRenderer, 
        initCamera,
        initDefaultBasicLight,
        setDefaultMaterial,
        InfoBox,
        onWindowResize,
        createGroundPlaneXZ} from "../../libs/util/util.js";

let scene, renderer, camera, material, light, orbit; // Initial variables
scene = new THREE.Scene();    // Create main scene
renderer = initRenderer();    // Init a basic renderer
camera = initCamera(new THREE.Vector3(0, 15, 30)); // Init camera in this position
material = setDefaultMaterial("darkred"); // create a basic material
light = initDefaultBasicLight(scene); // Create a basic light to illuminate the scene
orbit = new OrbitControls( camera, renderer.domElement ); // Enable mouse rotation, pan, zoom etc.

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

// Show axes (parameter is size of each axis)
let axesHelper = new THREE.AxesHelper( 12 );
scene.add( axesHelper );

// create the ground plane
let plane = createGroundPlaneXZ(20, 20)
scene.add(plane);

// create a cube
let cubeGeometry = new THREE.BoxGeometry(11, 0.3, 6);
let cube = new THREE.Mesh(cubeGeometry, material);
// position the cube
cube.position.set(0.0, 3.0, 0.0);
// add the cube to the scene
scene.add(cube);

const cylinderGeometry = new THREE.CylinderGeometry( 0.2, 0.2, 3, 32 ); 
const cylinder2 = new THREE.Mesh( cylinderGeometry, material ); 
cylinder2.position.set(-5.0, -1.5, 2.5);
cube.add( cylinder2 );

const cylinder3 = new THREE.Mesh( cylinderGeometry, material ); 
cylinder3.position.set(5.0, -1.5, -2.5);
cube.add( cylinder3 );

const cylinder4 = new THREE.Mesh( cylinderGeometry, material ); 
cylinder4.position.set(-5.0, -1.5, -2.5);
cube.add( cylinder4 );

const cylinder = new THREE.Mesh( cylinderGeometry, material ); 
cylinder.position.set(5.0, -1.5, 2.5);
cube.add( cylinder );

// Use this to show information onscreen
let controls = new InfoBox();
  controls.add("Basic Scene");
  controls.addParagraph();
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