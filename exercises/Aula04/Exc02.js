import * as THREE from 'three';
import GUI from '../../libs/util/dat.gui.module.js'
import {initRenderer, 
        initDefaultSpotlight,
        initCamera,
        createGroundPlane,
        onWindowResize} from "../../libs/util/util.js";

let scene    = new THREE.Scene();    // Create main scene
let renderer = initRenderer();    // View function in util/utils
let light    = initDefaultSpotlight(scene, new THREE.Vector3(7.0, 7.0, 7.0), 300); 
let camera   = initCamera(new THREE.Vector3(3.6, 4.6, 8.2)); // Init camera in this position

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

const targetPosition = new THREE.Vector3(4.0, 0.2, 3);
const targetPosition1 = new THREE.Vector3(4.0, 0.2, -3);

buildInterface();
render();

function buildInterface()
{     
  var controls = new function () {
    this.onReset = function () {
       reset();
    };
    this.onEsfera = function () {
      moveSphere();
    };
    this.onEsfera1 = function () {
      moveSphere1();
    };
 };

  let gui = new GUI();
  gui.add(controls, `onEsfera`).name("Esfera 1")
  gui.add(controls, `onEsfera1`).name("Esfera 2")

  gui.add(controls, `onReset`).name("Reset")

}

function moveSphere() {
  obj.position.set(targetPosition.x, targetPosition.y, targetPosition.z);
}

function moveSphere1() {
  obj1.position.set(targetPosition1.x, targetPosition1.y, targetPosition1.z);
}

function reset(){
  obj.position.set(-4, 0.2, 3);
  obj1.position.set(-4, 0.2, -3);
}

function render()
{   
  
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}

// sei que nao ta certo