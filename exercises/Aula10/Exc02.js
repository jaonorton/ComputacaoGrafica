/*
Based on the following example:
http://jyunming-chen.github.io/tutsplus/tutsplus28.html
*/

import * as THREE from  'three';
import GUI from '../../libs/util/dat.gui.module.js'
import {OrbitControls} from '../../build/jsm/controls/OrbitControls.js';
import {initRenderer, 
		initCamera,
		onWindowResize,
  	    initDefaultBasicLight,      
		initDefaultSpotlight,
      createGroundPlane} from "../../libs/util/util.js";

let scene = new THREE.Scene();
let camera = initCamera(new THREE.Vector3(0, 12, 45)); // Init camera in this position
let renderer = initRenderer(); 
	renderer.setClearColor(new THREE.Color("rgb(200, 200, 240)"));
let light = initDefaultBasicLight(scene); // Create a basic light to illuminate the scene

let orbitcontrols = new OrbitControls (camera, renderer.domElement);
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

let floorFile = "../../assets/textures/floorWood.jpg";


var textureLoader = new THREE.TextureLoader();
let floor  = textureLoader.load('../../assets/textures/floorWood.jpg');
   floor.colorSpace = THREE.SRGBColorSpace;
var groundPlane = createGroundPlane(100.0, 100.0, 100, 100); // width and height
   groundPlane.rotateX(THREE.MathUtils.degToRad(-90));
   groundPlane.receiveShadow = true;
   groundPlane.material.map = floor;
   groundPlane.position.y = -7.6;
   groundPlane.rotation.x = -0.5 * Math.PI;
scene.add(groundPlane);

render();

function createMesh(geom, imageFile, normal) {
	let nmap = (normal ? new THREE.TextureLoader().load(normal) : null);
	var tex = new THREE.TextureLoader().load(imageFile);
	    tex.colorSpace = THREE.SRGBColorSpace;   
	var mat = new THREE.MeshPhongMaterial({
		map: tex,
		normalMap: nmap,
      normalScale: new THREE.Vector2(2.5, 2.5),
	});

   console.log(mat)

	var mesh = new THREE.Mesh(geom, mat);
	return mesh;
}


function render() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}
