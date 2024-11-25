import * as THREE from  'three';
import GUI from '../../libs/util/dat.gui.module.js'
import {OrbitControls} from '../../build/jsm/controls/OrbitControls.js';
import {initRenderer, 
		initCamera,
		onWindowResize,
		lightFollowingCamera,
		initDefaultSpotlight} from "../../libs/util/util.js";

let scene = new THREE.Scene();
let camera = initCamera(new THREE.Vector3(0, 0, 45)); // Init camera in this position
let renderer = initRenderer(); 
let light = initDefaultSpotlight(scene, camera.position, 5000);
let orbitcontrols = new OrbitControls (camera, renderer.domElement);
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

var textureLoader = new THREE.TextureLoader();

let textureFile = "../../assets/textures/NormalMapping/cross.png"
let normalMapFile = "../../assets/textures/NormalMapping/crossNormal.png"

// Create boxes with and without normal map
let nmap = new THREE.TextureLoader().load(normalMapFile);
var texture = new THREE.TextureLoader().load(textureFile);
var mat = new THREE.MeshPhongMaterial({
		map: texture,
		normalMap: nmap,
		normalScale: new THREE.Vector2(2.5, 2.5)
	});

var mesh = new THREE.Mesh(new THREE.BoxGeometry(15, 15, 0.5), mat);

scene.add(mesh);

render();

//-- Functions ------------------------------------------------------

function render() {
	lightFollowingCamera(light, camera);
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}