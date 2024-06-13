import * as THREE from  'three';
import { OrbitControls } from '../../build/jsm/controls/OrbitControls.js';
import {initRenderer, 
        initCamera,
        initDefaultBasicLight,
        setDefaultMaterial,
        InfoBox,
        onWindowResize,
        createGroundPlaneXZ} from "../../libs/util/util.js";
//import {TrackballControls} from '../../build/jsm/controls/TrackballControls.js';
import GUI from '../../libs/util/dat.gui.module.js';



let scene, renderer, camera, material, light, orbit;; // Initial variables
scene = new THREE.Scene();    // Create main scene
renderer = initRenderer();    // Init a basic renderer
camera = initCamera(new THREE.Vector3(0, 15, 30)); // Init camera in this position
material = setDefaultMaterial("red"); // create a basic material
light = initDefaultBasicLight(scene); // Create a basic light to illuminate the scene
orbit = new OrbitControls( camera, renderer.domElement ); // Enable mouse rotation, pan, zoom etc.
//let trackballControls = new TrackballControls(camera, renderer.domElement );

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

// Show axes (parameter is size of each axis)
let axesHelper = new THREE.AxesHelper( 12 );
scene.add( axesHelper );

// create the ground plane
let plane = createGroundPlaneXZ(20, 20)
scene.add(plane);

const lerpConfig = {
  destination: new THREE.Vector3(0.0, 0.2, 0.0),
  alpha: 0.01,
  move: true
}

const sphereGeometry = new THREE.SphereGeometry( 0.5, 32, 32 ); 


const sphere2 = new THREE.Mesh( sphereGeometry, material );
sphere2.position.set(-5, 2.0, 5.0);
scene.add( sphere2 );


const sphere1 = new THREE.Mesh( sphereGeometry, material );
sphere1.position.set(-5, 2.0, -5.0);
sphere2.add( sphere1 );

render();

function render()
{
  if(lerpConfig.move) sphere1.position.lerp(lerpConfig.destination, lerpConfig.alpha);


  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}