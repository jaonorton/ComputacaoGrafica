import * as THREE from  'three';
import GUI from '../../libs/util/dat.gui.module.js'
import { OrbitControls } from '../../build/jsm/controls/OrbitControls.js';
import {initRenderer, 
        setDefaultMaterial,
        initDefaultBasicLight,        
        onWindowResize, 
        createLightSphere} from "../../libs/util/util.js";
import {loadLightPostScene} from "../../libs/util/utilScenes.js";

let scene, renderer, camera, orbit;
scene = new THREE.Scene();    // Create main scene
renderer = initRenderer();    // View function in util/utils
   renderer.setClearColor("rgb(30, 30, 42)");
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
   camera.lookAt(0, 0, 0);
   camera.position.set(5, 5, 5);
   camera.up.set( 0, 1, 0 );
orbit = new OrbitControls( camera, renderer.domElement ); // Enable mouse rotation, pan, zoom etc.


// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

// Show axes (parameter is size of each axis)
let axesHelper = new THREE.AxesHelper( 3 );
  axesHelper.visible = false;
scene.add( axesHelper );

let material, material2, material3, material4;
material = setDefaultMaterial("green"); 
material2 = setDefaultMaterial("lightblue");
material3 = setDefaultMaterial("darkred"); 
material4 = setDefaultMaterial("yellow"); 

// create a cube
let cubeGeometry = new THREE.BoxGeometry(0.5, 1, 0.5);
let cube = new THREE.Mesh(cubeGeometry, material);
cube.castShadow = true;
cube.position.set(3.0, 0.5, 2.0);
scene.add(cube);

// create a cube
let cube2 = new THREE.Mesh(cubeGeometry, material3);
cube2.position.set(3.0, 0.5, 0.0);
cube2.castShadow = true;
scene.add(cube2);

//create cylinder
const cylinderGeometry = new THREE.CylinderGeometry( 0.25, 0.25, 1, 32 ); 
const cylinder = new THREE.Mesh( cylinderGeometry, material2 ); 
cylinder.position.set(0.0, 0.5, 3.0);
cylinder.castShadow = true;
scene.add( cylinder );

const cylinder2 = new THREE.Mesh( cylinderGeometry, material4 ); 
cylinder2.position.set(1, 0.5, -2.0);
cylinder2.castShadow = true;
scene.add( cylinder2 );

// luz direcional
// let dirPosition = new THREE.Vector3(0, 2, 1);
// const dirLight = new THREE.DirectionalLight('white', 1.0);
// dirLight.position.copy(dirPosition);
// dirLight.castShadow = true;
// scene.add(dirLight);  

// Load default scene
loadLightPostScene(scene)

// luz ambiente
let ambientLightColor = "rgb(80,80,80)";
let ambientLight = new THREE.AmbientLight(ambientLightColor);
scene.add( ambientLight );

// spot light
let spotPosition = new THREE.Vector3(0, 2, 1);
let spotColor = "rgb(255,255,255)";
let spotLight = new THREE.SpotLight(spotColor, 1);
spotLight.position.copy(spotPosition);
spotLight.angle = THREE.MathUtils.degToRad(40);
spotLight.castShadow = true;
spotLight.target.position.set(0,0,1)
scene.add(spotLight);



//---------------------------------------------------------
// Load external objects
buildInterface();
render();

function buildInterface()
{
  // GUI interface
  let gui = new GUI();
  // gui.add(controls, 'lightType', ['Spot', 'Point', 'Direction'])
  //   .name("Light Type")
  //   .onChange(function(e) { controls.onChangeLight(); });
  // gui.add(controls, 'lightIntensity', 0, 20)
  //   .name("Light Intensity")
  //   .onChange(function(e) { controls.onUpdateLightIntensity() });
  // gui.add(controls, 'ambientLight', true)
  //   .name("Ambient Light")
  //   .onChange(function(e) { controls.onEnableAmbientLight() });
}

function render()
{
  requestAnimationFrame(render);
  renderer.render(scene, camera)
}
