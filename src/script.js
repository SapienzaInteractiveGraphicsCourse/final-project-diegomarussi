import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as TWEEN from '@tweenjs/tween.js';
import * as dat from 'dat.gui'

//import * from 'cannon-es';

//importing classes
import Env from '../envComponents/world.js'
import { SpotLight, SunLight } from '../envComponents/light.js'
import Humanoid from '../envComponents/humanoid.js'
import StreetLamp from '../envComponents/streetLamp.js'
import Modelss from '../envComponents/models3D.js'
import {HealthBar, Score} from '../envComponents/health_score.js'
import Collision from '../envComponents/collision.js'
import Button from '../envComponents/buttons.js'
import Tweens from './tweens.js'








// ---------------------------- Loaders and Loading ----------------------------

// _____ Loaders _____
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()
const loader = new GLTFLoader();



// _____ Textures _____

const normalStreet = textureLoader.load('/texture/streetNormal.png')
const golfNormalTexture = textureLoader.load('/texture/golfNormalMap.png')
const asphaltNormTexture = textureLoader.load('/texture/normalMapCylinder.png')


const background = textureLoader.load('/img/city3.jpg')
const cubicBackground = cubeTextureLoader.load([
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

 //const gui = new dat.GUI()

 // Canvas
 const canvas = document.querySelector('canvas.webgl')

 
 // Scene
 const scene = new THREE.Scene()
 scene.background = cubicBackground;
 
 
// shows fps and other stats
(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()



// _____ FLAGS _____

var flagPlayAnim = true;
var flagOrbit = true;
var flagCameraAround = false;
var flagChangeCam = true;
var flagGameOver = false;




// ---------- COLLISION OBJ ----------

const collision = new Collision()
// const collisionArray = collision.collidableObjects; 





/**
 * <<<<<<<<<<<<<<<<<<<<<<<<<<  OBJECTS (+ material and mesh)  >>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */




// --------------------  WORLD  --------------------

const world = new Env()
world.createSphereWorld()

// Adding the Plane in the Scene
scene.add( world.mesh )



// const grid = new World()
// grid.createGrid(scene)







// --------------------  Camera center  --------------------
// Utilizing this object we can turn the camera around the scene
// linking it as a child to the central object

const centerG = new THREE.SphereGeometry( 0.01, 32, 16 )

// centerMaterial
const centerMaterial = new THREE.MeshStandardMaterial()
// center material = new THREE.MeshBasicMaterial()
centerMaterial.transparent = true


// Sphere Mesh
const center = new THREE.Mesh( centerG, centerMaterial )

// Adding the Sphere in the Scene
scene.add( center )
center.position.set(0, 3, 0)


// ---------- SpotLight targets ----------


// Sphere Mesh
const centerSpotR = new THREE.Mesh( centerG, centerMaterial )
const centerSpotL = new THREE.Mesh( centerG, centerMaterial )

// Adding the Sphere in the Scene
centerSpotR.position.set(10, 1, -3)
centerSpotL.position.set(-10, 1, -3)
scene.add( centerSpotR )
scene.add(centerSpotL)








// --------------------  VIRUS 3Dobject  --------------------


// const virObj = new Env();
// virObj.createVirusObj();
// scene.add(virObj.mesh);

const virusArray = new Env();
virusArray.addObject('virus', 3, 4, world.mesh, world.worldRadius)
console.log("VirusArray: ", virusArray)






// --------------------  WALL 3Dobject  --------------------


// const wallObj = new Env();
// wallObj.createWallObj();
// scene.add(wallObj.mesh);

const wallArray = new Env();
wallArray.addObject('wall', 4, 10, world.mesh, world.worldRadius)
console.log("WallArray: ", wallArray)






// --------------------  STREET LAMP  --------------------
const lampsNum = 30
// const rightLamps = [];
// const leftLamps = [];


const {rightLamps, leftLamps} = StreetLamp.addStreetLamps(lampsNum, world.mesh, world.worldRadius);





// --------------------  HUMANOID  --------------------


const human = new Humanoid();
scene.add(human.torso);

console.log("position: ", +human.torso.position);




// ----- HealthBar -----


const hBar = new HealthBar(document.querySelector('.health-bar'));
// hbar.setValue(25);


// ----- ScoreBar -----

let score = 0;

const scoreBar = new Score(document.querySelector('.score-bar'), 0);

scoreBar.velDifficulty = 1.0;






/**
 * <<<<<<<<<<<<<<<<<<<<<<<<<<   MODELS (glb, gltf, ...)   >>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

 const virusPath = '/models3d/virus.glb';
 const maskPath = '/models3d/surgical_mask.glb';
 
 // add the mask object on the world
 Modelss.addObject(maskPath, world.mesh, world.worldRadius)
 

//  Modelss.loadVirus(virusPath, -1, 3.2, 3, scene);







/**
 * <<<<<<<<<<<<<<<<<<<<<<<<<<   LIGHTS   >>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

// --------------------  Ambient Light  --------------------

//const ambientLight = new THREE.AmbientLight(0x222222)
//scene.add(ambientLight)


// --------------------  Directional Light  --------------------



const sun = new SunLight(0, 20, 3);
sun.sun.target = human.torso;
scene.add(sun.sun)
//scene.add(sun.sunHelper)



// --------------------  Spot Lights  --------------------

var leftSpotLights = [];
var rightSpotLights = [];

// MAKE A METHOD TO INSERT SPOTLIGHT EACH SIDE IN THE ANIMATION
// ONTO THE STREETLAMPS, BUT PROBLEM OVERWHELMING THE SHADER

// for(var l = 0; l <= lampsNum; l++){

//     leftSpotLights['spotLightL'+parseFloat(l)] = new SpotLight().spotLight
//     leftSpotLights['spotLightL'+parseFloat(l)].target = leftLamps['streetLampL'+parseFloat(l)].baseLamp;
//     leftLamps['streetLampL'+parseFloat(l)].bulbLamp.add(leftSpotLights['spotLightL'+parseFloat(l)])

//     rightSpotLights['spotLightR'+parseFloat(l)] = new SpotLight().spotLight
//     rightSpotLights['spotLightR'+parseFloat(l)].target = rightLamps['streetLampR'+parseFloat(l)].baseLamp;
//     rightLamps['streetLampR'+parseFloat(l)].bulbLamp.add(rightSpotLights['spotLightR'+parseFloat(l)])


// }



const spotLight1 = new SpotLight(10, 6, -2).spotLight
spotLight1.target = centerSpotR;
scene.add(spotLight1)

const spotLight2 = new SpotLight(-10, 6, -2).spotLight
spotLight2.target = centerSpotL;
scene.add(spotLight2)






// ---------------------------- Helpers ----------------------------
// The helpers, for now, are under their respective object to control

const axesHelper = new THREE.AxesHelper(6)
scene.add(axesHelper)






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
//document.body.appendChild( renderer.domElement );




/**
 * <<<<<<<<<<<<<<<<<<<<<<<<<<   CAMERA   >>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 50)
camera.position.set(0, 6, 10)
scene.add(camera)

// ----- FOG -----
scene.fog = new THREE.Fog(0xFFFFFF, 30, 50)




// Controls
const orbit = new OrbitControls(camera, renderer.domElement) // or "canvas" instead of "renderer.domElement"
orbit.enableDamping = true
orbit.maxDistance = 40

orbit.update()




/**
 * <<<<<<<<<<<<<<<<<<<<<<<<<<   AUDIO   >>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */
// Global Audio

// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add( listener );

// create a global audio source
const sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load( 'sound/mixSuspence.ogg', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 5 );
	sound.play(100);
    
});




/**
 * <<<<<<<<<<<<<<<<<<<<<<<<<<   EVENT LISTENERS   >>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

// ----- Ray caster -----
/* tracking of the mouse position and when it encounter an object you can do functions, changing */
// const mousePosition = new THREE.Vector2();
// window.addEventListener("mousemove", function(e){
//     mousePosition.x = (e.clientX / window.innerWidth) *2 - 1
//     mousePosition.y = - (e.clientY / window.innerHeight) *2 + 1
// });

// const rayCaster = new THREE.Raycaster()

// const sphereID = sphere.id
// sphere.name = 'sphere'
// human.torso.name = 'bot'




// ---------- KEYBOARD MOVEMENTS ----------

var xMove = 0.3
var zMove = 0.3

document.addEventListener("keydown", onDocumentKeyDown, false);

function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 87) {
        //jumpTween    // with the key "w" you can jump 
    } else if (keyCode == 65 && human.torso.position.x >-11) {
        human.torso.position.x -= xMove      // with the key "a" you can move behind 
        //human.torso.rotation.y = Math.PI/6  -->  (this doesn't work because of the arm animation update every 200ms )
    } else if (keyCode == 68 && human.torso.position.x <11) {
        human.torso.position.x += xMove      // with the key "d" you can move behind 
        //human.torso.rotation.y = Math.PI/6
    
    } else if (keyCode == 79) {     // with the key "o" you can change the camera position 
        flagChangeCam = !flagChangeCam
    } else if (keyCode == 32) {     // with the key "space" you can pause the animation
        event.preventDefault()
        flagPlayAnim = !flagPlayAnim
        sound.pause();
        
    }
}








/**
 * <<<<<<<<<<<<<<<<<<<<<<<<<<   BUTTONS   >>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

const orbitButton = new Button('.orbitButton');
orbitButton.button.addEventListener('click', function onClick() {
    flagOrbit = !flagOrbit;
    orbitButton.setValue(flagOrbit);
  });

const cameraAroundButton = new Button('.cameraRotationButton');
cameraAroundButton.button.addEventListener('click', function onClick() {
    flagCameraAround = !flagCameraAround;
    cameraAroundButton.setValue(flagCameraAround);
});








/**
 * <<<<<<<<<<<<<<<<<<<<<<<<<<   ANIMATE   >>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */


// ___________________ TWEENS ____________________


const mainTween = new Tweens(human, sun.sun, spotLight1, spotLight2);



let step = 0;
let speed = 0.05;
let stepCam = 0;
let speedCam = 0.005;


var clock = new THREE.Clock();
var delta = 0;


// ---------------------------- animation function ----------------------------
function animate(time){

    if(flagPlayAnim == true) {

        delta = clock.getDelta();
    
        if(flagGameOver == true) {
            stop()
        }

        updateAnim(time)
        updateAnim(delta)
        renderer.render(scene, camera)

        
    }else{
        
    }
    
    

    requestAnimationFrame( animate );
    

}


animate()
//renderer.setAnimationLoop(animate)



function stop() {
    animate(null );
}

function updateAnim(time){
    
        world.mesh.rotation.x = time/(scoreBar.velDifficulty*10000);

        step += speed
        human.head.position.y = 1.05 + 0.2 * Math.abs(Math.sin(step))
        human.head.rotation.y = time / (scoreBar.velDifficulty *1000)


        TWEEN.update(time/(scoreBar.velDifficulty))

 
        // Score and Difficulty
        scoreBar.setScore(Math.round(time/1000));        
        scoreBar.setDifficulty(scoreBar.score, scoreBar.velDifficulty);


        if(hBar.health == 0){
            stop();
        }else{

        // collision.detectCollsion(scene, human.torso, hBar)
        //collision.detectCollsion2(human.collideBB, human.torso, virusArray.collisionArrayVirus, hBar, hBar.health, 'virus' );
        //collision.detectCollsion2(human.collideBB, human.torso, wallArray.collisionArrayWall, hBar, hBar.health, 'wall' );


        collision.detectCollsion3(human.torso, virusArray.randomObjArray, hBar, hBar.health, 'virus' );
        collision.detectCollsion3(human.torso, wallArray.randomObjArray, hBar, hBar.health, 'wall' );
        
        }


        stepCam += speedCam

        if(flagOrbit){
            orbit.update();
            flagChangeCam = true;
            scene.add(camera);
            if(flagCameraAround && flagOrbit){
                hBar.health = 100;
                center.rotation.y = time/(scoreBar.velDifficulty*2000);
                center.add(camera)
                camera.position.y = 2 + 4 * (Math.sin(stepCam))
                
            }else{
                scene.add(camera)
                center.rotation.y = 0;
            }
            
        }else{
            flagCameraAround = false
            if(flagChangeCam){
                camera.position.set(0, 6, 10)
                scene.add(camera)
            }else{
                camera.position.set(0, 4, -1)
                human.torso.add(camera)
            }
        }


}




// __________________________ OTHER POSSBILE FUNCTIONS THAT DIDN'T MAKE IT __________________________

 // setInterval(function(){
        //     StreetLamp.objOnSphere(rightLamps, leftLamps, lampsNum, world.mesh, world.worldRadius)
        // },3000);

        // var indexLight = 0;


        // setInterval(function(){
        
        //     indexLight += 1
        //     leftSpotLights['spotLightL'+parseFloat(indexLight)] = new SpotLight().spotLight
        //     leftSpotLights['spotLightL'+parseFloat(indexLight)].target = leftLamps['streetLampL'+parseFloat(indexLight)].baseLamp;
        //     leftLamps['streetLampL'+parseFloat(indexLight)].bulbLamp.add(leftSpotLights['spotLightL'+parseFloat(indexLight)])

        //     rightSpotLights['spotLightR'+parseFloat(indexLight)] = new SpotLight().spotLight
        //     rightSpotLights['spotLightR'+parseFloat(indexLight)].target = rightLamps['streetLampR'+parseFloat(indexLight)].baseLamp;
        //     rightLamps['streetLampR'+parseFloat(indexLight)].bulbLamp.add(rightSpotLights['spotLightR'+parseFloat(indexLight)])

        // },time/3000);



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