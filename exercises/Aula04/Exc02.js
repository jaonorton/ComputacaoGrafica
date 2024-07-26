import * as THREE from 'three';
import GUI from '../../libs/util/dat.gui.module.js'
import {TrackballControls} from '../../build/jsm/controls/TrackballControls.js';
import {initRenderer, 
        initDefaultSpotlight,
        initCamera,
        createGroundPlane,
        onWindowResize} from "../../libs/util/util.js";

let scene    = new THREE.Scene();    // Create main scene
let renderer = initRenderer();    // View function in util/utils
let light    = initDefaultSpotlight(scene, new THREE.Vector3(7.0, 7.0, 7.0), 300); 
let camera   = initCamera(new THREE.Vector3(3.6, 4.6, 8.2)); // Init camera in this position
let trackballControls = new TrackballControls(camera, renderer.domElement );

// Show axes 
let axesHelper = new THREE.AxesHelper( 5 );
  axesHelper.translateY(0.1);
scene.add( axesHelper );

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

let groundPlane = createGroundPlane(10, 10, 40, 40); // width, height, resolutionW, resolutionH
  groundPlane.rotateX(THREE.MathUtils.degToRad(-90));
scene.add(groundPlane);

// Create sphere
let geometry = new THREE.SphereGeometry( 0.2, 32, 16 );
let material = new THREE.MeshPhongMaterial({color:"red", shininess:"200"});
let obj = new THREE.Mesh(geometry, material);
  obj.castShadow = true;
  obj.position.set(-4, 0.2, 3);
scene.add(obj);

let obj1 = new THREE.Mesh(geometry, material);
  obj1.castShadow = true;
  obj1.position.set(-4, 0.2, -3);
scene.add(obj1)

// Variables that will be used for linear interpolation
const lerpConfig = {
  destination: new THREE.Vector3(4.0, 0.2, 3),
  alpha: 0.01,
  move: true
}

const lerpConfig1 = {
  destination: new THREE.Vector3(4.0, 0.2, -3),
  alpha: 0.05,
  move: true
}

buildInterface();
render();

function buildInterface()
{     
  var controls = new function () {
    this.onReset = function () {
       reset();
    };
    this.onEsfera = function () {
      
    };
    this.onEsfera1 = function () {
      
    };
 };

  let gui = new GUI();
  gui.add(lerpConfig, "move", true).name("Esfera 1")
  gui.add(lerpConfig1, "move", true).name("Esfera 2")
  gui.add(controls, `onReset`).name("Reset")

}


function reset(){
  obj.position.set(-4, 0.2, 3);
  obj1.position.set(-4, 0.2, -3);

}

function render()
{
  trackballControls.update();

  if(lerpConfig.move){
    obj.position.lerp(lerpConfig.destination, lerpConfig.alpha);
  }
  if(lerpConfig1.move){
    obj1.position.lerp(lerpConfig1.destination, lerpConfig1.alpha);
  }
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}