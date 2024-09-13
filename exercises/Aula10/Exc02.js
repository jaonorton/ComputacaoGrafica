import * as THREE from  'three';
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


// Create main object
let geom = new THREE.SphereGeometry(3, 64, 64);
let colormap = 	new THREE.TextureLoader().load("../../assets/textures/displacement/rockWall.jpg");
    colormap.colorSpace = THREE.SRGBColorSpace;
let normalmap = new THREE.TextureLoader().load("../../assets/textures/displacement/rockWall_Normal.jpg");
let dispmap = 	new THREE.TextureLoader().load("../../assets/textures/displacement/rockWall_Height.jpg");

let mat = new THREE.MeshStandardMaterial({
	side: THREE.DoubleSide,
	color:"white",
	map: colormap,
	normalMap: normalmap,
	displacementMap: dispmap,
	displacementScale: 0.2,
});
mat.normalScale.set(0.2, 0.2);

let mesh = new THREE.Mesh(geom, mat);
setTextureOptions(mesh.material, 4, 3); // Set repeat and wrapping modes
function setTextureOptions(material, repu, repv){
	material.map.repeat.set(repu,repv);
	material.displacementMap.repeat.set(repu,repv);
	material.normalMap.repeat.set(repu,repv);
	
	material.map.wrapS = material.displacementMap.wrapS = material.normalMap.wrapS = THREE.RepeatWrapping;
	material.map.wrapT = material.displacementMap.wrapT = material.normalMap.wrapT = THREE.RepeatWrapping;	
}
scene.add(mesh);

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
