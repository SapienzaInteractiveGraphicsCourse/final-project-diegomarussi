//import './style.css'
import * as THREE from '../libs/three.module.js'
import { OrbitControls } from '../libs/OrbitControls.js'
import * as dat from '../libs/dat.gui.module.js'

//import { Particle } from 'cannon-es';


//file imports

import Humanoid from '../env_Objs/humanoid.js'
import Lights from '../env_Objs/lights.js';
import World from '../env_Objs/world.js';
import StreetLamp from '../env_Objs/streetLamp.js';
import Tween from './tweens.js';



var flagPlayAnim = true;
var flagEnvSupervision = false;
var flagOrbit = false;
var flagChangeCam = true;






// ---------------------------- Loaders and Loading ----------------------------

// _____ Loaders _____

const cubeTextureLoader = new THREE.CubeTextureLoader()




// _____ Textures _____
const groundNormalTexture = textureLoader.load('/texture/normalMapGround.png')
const normalStreet = textureLoader.load('/texture/streetNormal.png')
const golfNormalTexture = textureLoader.load('/texture/golfNormalMap.png')
const asphaltNormTexture = textureLoader.load('/texture/normalMapCylinder.png')
const groundTex = textureLoader.load('/texture/asfalto.jpg')
const asphalt = textureLoader.load('/img/asphalt1.jpg')
const road = textureLoader.load('/img/pavimentazione.jpg')

const background = textureLoader.load('/img/city3.jpg')
const background3d = cubeTextureLoader.load([
    '/img/cityChosen.jpg',
    '/img/cityChosen.jpg',
    '/img/space1.jpg',
    '/img/space1.jpg',
    '/img/cityChosen.jpg',
    '/img/cityChosen.jpg'
    ])



/**
 * <<<<<<<<<<<<<<<<<<<<<<<<<<   DEBUG and INIT   >>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

 const gui = new dat.GUI()

 // Canvas
 const canvas = document.querySelector('canvas.webgl')
 
 // Scene
 const scene = new THREE.Scene()
 scene.background = background3d
 
 // ----- FOG -----
 scene.fog = new THREE.Fog(0xFFFFFF, 0, 50)
 






/**
 * <<<<<<<<<<<<<<<<<<<<<<<<<<  OBJECTS (+ material and mesh)  >>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */


const terrain = new World()
terrain.createCylinderWorld();

// Adding the Plane in the Scene
scene.add( terrain )





// ____________________  HUMANOID  ____________________

const human = new Humanoid();
human.init();

//human.righthip

scene.add(human.torso)



/**
 * <<<<<<<<<<<<<<<<<<<<<<<<<<   Sizes Window Adapter   >>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})





/**
 * <<<<<<<<<<<<<<<<<<<<<<<<<<   RENDERER   >>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true




/**
 * <<<<<<<<<<<<<<<<<<<<<<<<<<   CAMERA   >>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 6, 10)
scene.add(camera)




// Controls
const orbit = new OrbitControls(camera, renderer.domElement) // or "canvas" instead of "renderer.domElement"
orbit.enableDamping = true
orbit.maxDistance = 200

// if(flagEnvSupervision){
//     orbit.autoRotate = true
//     orbit.autoRotateSpeed = 2.0 //default
//     flagChangeCam = true
// }

orbit.update()




/**
 * <<<<<<<<<<<<<<<<<<<<<<<<<<   AUDIO   >>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */
// Global Audio

// // create an AudioListener and add it to the camera
// const listener = new THREE.AudioListener();
// camera.add( listener );

// // create a global audio source
// const sound = new THREE.Audio( listener );

// // load a sound and set it as the Audio object's buffer
// const audioLoader = new THREE.AudioLoader();
// audioLoader.load( 'sounds/ambient.ogg', function( buffer ) {
// 	sound.setBuffer( buffer );
// 	sound.setLoop( true );
// 	sound.setVolume( 0.5 );
// 	sound.play();
// });




/**
 * <<<<<<<<<<<<<<<<<<<<<<<<<<   EVENT LISTENERS   >>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

// // ----- Ray caster -----
// /* tracking of the mouse position and when it encounter an object you can do functions, changing */
// const mousePosition = new THREE.Vector2();
// window.addEventListener("mousemove", function(e){
//     mousePosition.x = (e.clientX / window.innerWidth) *2 - 1
//     mousePosition.y = - (e.clientY / window.innerHeight) *2 + 1
// });

// const rayCaster = new THREE.Raycaster()

// const sphereID = sphere.id
// sphere.name = 'sphere'
// torso.name = 'bot'




// ----- Keys movements -----
var xMove = 0.3
var zMove = 0.3


document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 87) {
        torso.position.z -= zMove      // with the key "w" you can move behind 
    } else if (keyCode == 83) {
        torso.position.z += zMove      // with the key "s" you can move behind 
    } else if (keyCode == 65) {
        torso.position.x -= xMove      // with the key "a" you can move behind 
        //torso.rotation.y = Math.PI/6  -->  (this doesn't work because of the arm animation update every 200ms )
    } else if (keyCode == 68) {
        torso.position.x += xMove      // with the key "d" you can move behind 
        //torso.rotation.y = Math.PI/6
    
    } else if (keyCode == 79) {     // with the key "o" you can change the camera position 
        flagChangeCam = !flagChangeCam
    } else if (keyCode == 32) {     // with the key "space" you can pause the animation
        event.preventDefault()
        flagPlayAnim = !flagPlayAnim
        
    }
}




/**
 * <<<<<<<<<<<<<<<<<<<<<<<<<<   BUTTONS   >>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */





/**
 * <<<<<<<<<<<<<<<<<<<<<<<<<<   ANIMATE   >>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */


Tween.initHumanTweens();

Tween.initLightsTweens();




let step = 0;
let speed = 0.05;

(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()



// ---------------------------- animation function ----------------------------
function animate(time){


    if(flagPlayAnim == true) {
    
    //plane.rotation.z = time/1000
    world.rotation.x = time/10000;
    sphere.rotation.x = -time / 50;



    step += speed
    sphere.position.y = 2 * Math.abs(Math.sin(step))
    head.position.y = 1.05 + 0.2 * Math.abs(Math.sin(step))
    head.rotation.y = time / 1000


    // rayCaster.setFromCamera(mousePosition, camera)
    // const intersect = rayCaster.intersectObjects(scene.children)
    // console.log(intersect)

    // for (let i = 0; i < intersect.length; i++){
    //      if(intersect[i].object.name === 'sphere'){
    //          intersect[i].object.materialSphere.color.set(0xFFFFFF)
    //      }
    //      if(intersect[i].object.name === 'bot'){
    //          intersect[i].object.rotation.y = time /200
    //      }
    // }


    TWEEN.update(time)


    // if(flagOrbit){
    //     flagChangeCam = true
    //     if(flagEnvSupervision){
    //     orbit.autoRotate = true
    //     orbit.autoRotateSpeed = 2.0 //default
    //     flagChangeCam = true
    //     }
        
    // }else{
    //     if(flagChangeCam){
    //         camera.position.set(0, 6, 10)
    //         scene.add(camera)
    //     }else{
    //         camera.position.set(0, 4, -1)
    //         torso.add(camera)
    //     }
    // }


    
    
    renderer.render(scene, camera)
    

    }
}



renderer.setAnimationLoop(animate)



/*
// Event to rotate the sphere passing along with the mouse
document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth / 2
const windowHalfY = window.innerHeight / 2

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}


// event to create an effect of movement on the sphere when scrolling up and down
const updateSphere = (event) => {
    sphere.position.y = window.scrollY * .002
}

window.addEventListener('scroll', updateSphere);
*/




/*
// ------ Tick (time) function
const clock = new THREE.Clock()

const tick = () =>
{

    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y += 1.0 * elapsedTime

    sphere.rotation.x = .5 * (targetX - sphere.rotation.y)
    sphere.rotation.y = .5 * (targetY - sphere.rotation.x)
    sphere.position.z = -.5 * (targetY - targetX)


    // Update Orbital Controls
    // orbit.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

*/