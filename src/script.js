import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as TWEEN from '@tweenjs/tween.js';
//const TWEEN = require('@tweenjs/tween.js')
import * as dat from 'dat.gui'



// ---------------------------- Loading ----------------------------
const textureLoader = new THREE.TextureLoader()

const groundNormalTexture = textureLoader.load('/texture/normalMapGround.png')
const golfNormalTexture = textureLoader.load('/texture/golfNormalMap.png')
const groundTex = textureLoader.load('/texture/asfalto.jpg')

const cubeTexLoader = new THREE.CubeTextureLoader()
const spaceTexture = cubeTexLoader.load([
    '/img/space3.jpg',
    '/img/space2.jpg',
    '/img/space1.jpg',
    '/img/space4.jpg',
    '/img/space2.jpg',
    '/img/space3.jpg'
    ])

const loader = new GLTFLoader();
loader.load('/models3d/Xbot.glb', function(glb){
    const model1 = glb.scene
    scene.add(model1)
    model1.position.set(2, 1, 3)
}, undefined, function(error) {
    console.error(error)
})

loader.load('/models3d/virus.glb', function(glb){
    const virus = glb.scene
    virus.traverse(function(node){
        if ( node.isMesh ) { node.castShadow = true }
    })
    virus.position.set(-2, 1, -2)
    virus.name = 'virus'

    scene.add(virus)

}, undefined, function(error) {
    console.error(error)
})

loader.load('/models3d/surgical_mask.glb', function(glb){
    const mask = glb.scene
    mask.traverse(function(node){
        if ( node.isMesh ) { node.castShadow = true }
    })
    mask.position.set(2, 1, -2)
    mask.castShadow = true
    //mask.scale.set(0.5, 0.5, 0.5)

    scene.add(mask)

}, undefined, function(error) {
    console.error(error)
})

/*
loader.load('/models3d/zero_suit.glb', function(glb){
    const woman = glb.scene
    scene.add(woman)
    woman.position.set(-2, 2, 4)
    woman.scale.set(0.2, 0.2, 0.2)
}, undefined, function(error) {
    console.error(error)
})
 */

/*
loader.load('/models3d/man_in_suit.glb', function(glb){
    const man = glb.scene
    scene.add(man)
    man.position.set(-2, 2, 4)
    man.scale.set(0.01, 0.01, 0.01)
}, undefined, function(error) {
    console.error(error)
})
*/



/**
 * <<<<<<<<<<<<<<<<<<<<<<<<<<   DEBUG and INIT   >>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = spaceTexture

// ----- FOG -----
scene.fog = new THREE.Fog(0xFFFFFF, 0, 50)




/**
 * <<<<<<<<<<<<<<<<<<<<<<<<<<  OBJECTS (+ material and mesh)  >>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */


// --------------------  PLANE  --------------------
const planeG = new THREE.PlaneGeometry( 30, 30)

// Plane material
const materialPlane = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    //normalMap: groundNormalTexture,
    map: groundTex
})

// Plane Mesh
const plane = new THREE.Mesh(planeG, materialPlane)

// Adding the Plane in the Scene
scene.add( plane )
plane.rotation.x = -0.5 * Math.PI
plane.receiveShadow = true



// --------------------  SPHERE  --------------------
const sphereG = new THREE.SphereBufferGeometry( 0.5, 32, 16 )

// Sphere material
const materialSphere = new THREE.MeshStandardMaterial()
//const material = new THREE.MeshBasicMaterial()
materialSphere.metalness = 0.5
materialSphere.roughness = 0.3
materialSphere.color = new THREE.Color(0xfff000)
materialSphere.color.se
materialSphere.normalMap = golfNormalTexture

// Sphere Mesh
const sphere = new THREE.Mesh( sphereG, materialSphere )

// Adding the Sphere in the Scene
scene.add( sphere )
sphere.position.y += 0.5
sphere.castShadow = true



// ____________________  Humanoid or Robot?  ____________________

const torsoHeight = 1.3;
const torsoWidth = 0.5;
const headHeight = 0.5;
const headWidth = 0.5;
const armHeight = 0.15;
const armWidth  = 0.6;
const legHeight = 0.8;
const legWidth  = 0.20;




// -----  torso  -----
const torsoGeom = new THREE.BoxGeometry( torsoWidth, torsoHeight, torsoWidth )

// Head material
const torsoMaterial = new THREE.MeshStandardMaterial()
//torsoMaterial.metalness = 0.7
//torsoMaterial.roughness = 0.2
//torsoMaterial.color = new THREE.Color(0xfff000)
torsoMaterial.normalMap = golfNormalTexture

// Head Mesh
const torso = new THREE.Mesh( torsoGeom, torsoMaterial )


// Adding the Head in the Scene
scene.add( torso )
torso.position.set(0, 2, 2)
torso.castShadow = true


// -----  Head  -----
const headGeom = new THREE.BoxGeometry( headWidth, headHeight, headWidth )

// Head material
const headMultiMaterial = [
    new THREE.MeshBasicMaterial({ map: textureLoader.load('/img/roboticTexture.jpg')}),
    new THREE.MeshBasicMaterial({ map: textureLoader.load('/img/roboticTexture.jpg')}),
    new THREE.MeshBasicMaterial({ map: textureLoader.load('/img/roboticTexture.jpg')}),
    new THREE.MeshBasicMaterial({ map: textureLoader.load('/img/roboticTexture.jpg')}),
    new THREE.MeshBasicMaterial({ map: textureLoader.load('/img/robotFace.jpg')}),
    new THREE.MeshBasicMaterial({ map: textureLoader.load('/img/roboticTexture.jpg')}),
]
//const headMaterial = new THREE.MeshStandardMaterial()
//headMaterial.metalness = 0.7
//headMaterial.roughness = 0.2
//headMaterial.color = new THREE.Color(0xfff000)
//headMaterial.normalMap = golfNormalTexture


// Head Mesh
const head = new THREE.Mesh( headGeom, headMultiMaterial )


// Adding the Head in the Scene
torso.add( head )
head.position.set(0, 0.5, 0)
head.castShadow = true


// -----  Right Arm  -----
const rightArmGeom = new THREE.BoxGeometry( armWidth, armHeight, armHeight )

// RightArm material
const rightArmMaterial = new THREE.MeshStandardMaterial()
//rightArmMaterial.metalness = 0.7
//rightArmMaterial.roughness = 0.2
//rightArmMaterial.color = new THREE.Color(0xfff000)
rightArmMaterial.normalMap = golfNormalTexture

// RightArm Mesh
const rightArm = new THREE.Mesh( rightArmGeom, rightArmMaterial )


// Adding the RightArm in the Scene
torso.add( rightArm )
rightArm.position.set(-0.4, 0.1, 0)
rightArm.castShadow = true


// -----  Left Arm  -----
const leftArmGeom = new THREE.BoxGeometry( armWidth, armHeight, armHeight )

// LeftArm material
const leftArmMaterial = new THREE.MeshStandardMaterial()
//leftArmMaterial.metalness = 0.7
//leftArmMaterial.roughness = 0.2
//leftArmMaterial.color = new THREE.Color(0xfff000)
leftArmMaterial.normalMap = golfNormalTexture

// LeftArm Mesh
const leftArm = new THREE.Mesh( leftArmGeom, leftArmMaterial )


// Adding the LeftArm in the Scene
torso.add( leftArm )
leftArm.position.set(0.4, 0.1, 0)
leftArm.castShadow = true



// -----  RightLeg  -----
const rightLegGeom = new THREE.BoxGeometry( legWidth, legHeight, legWidth )

// RightLeg material
const rightLegMaterial = new THREE.MeshStandardMaterial()
//rightLegMaterial.metalness = 0.7
//rightLegMaterial.roughness = 0.2
//rightLegMaterial.color = new THREE.Color(0xfff000)
rightLegMaterial.normalMap = golfNormalTexture

// RightLeg Mesh
const rightLeg = new THREE.Mesh( rightLegGeom, rightLegMaterial )


// Adding the RightLeg in the Scene
torso.add( rightLeg )
rightLeg.position.set(-0.35*torsoWidth, -0.8*torsoHeight, 0)
rightLeg.castShadow = true



// -----  LeftLeg  -----
const leftLegGeom = new THREE.BoxGeometry( legWidth, legHeight, legWidth )

// LeftLeg material
const leftLegMaterial = new THREE.MeshStandardMaterial()
//leftLegMaterial.metalness = 0.7
//leftLegMaterial.roughness = 0.2
//leftLegMaterial.color = new THREE.Color(0xfff000)
leftLegMaterial.normalMap = golfNormalTexture

// LeftLeg Mesh
const leftLeg = new THREE.Mesh( leftLegGeom, leftLegMaterial )


// Adding the LeftLeg in the Scene
torso.add( leftLeg )
leftLeg.position.set(0.35*torsoWidth, -0.8*torsoHeight, 0)
leftLeg.castShadow = true




/**
 * <<<<<<<<<<<<<<<<<<<<<<<<<<   LIGHTS   >>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

// --------------------  Ambient Light  --------------------
const ambientLight = new THREE.AmbientLight(0x222222)
scene.add(ambientLight)


// --------------------  Directional Light  --------------------
const directionalLight = new THREE.DirectionalLight(0x999999, 0.3)
directionalLight.position.set(0, 5, 3)
directionalLight.castShadow = true
scene.add(directionalLight)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.5)
scene.add(directionalLightHelper)

// const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// scene.add(dLightShadowHelper)


// --------------------  SpotLight1  --------------------
const spotLight1 = new THREE.PointLight(0x000fff, 3)
spotLight1.position.set(1.8, -2.4, -1.2)

scene.add(spotLight1)


// Add a folder in the GUI command relative to an object, for ordering purposes
const light1 = gui.addFolder('Light 1')

light1.add(spotLight1.position, 'x').min(-6).max(6).step(0.1)
light1.add(spotLight1.position, 'y').min(-3).max(3).step(0.05)
light1.add(spotLight1.position, 'z').min(-5).max(5).step(0.05)
light1.add(spotLight1, 'intensity').min(0).max(5).step(0.05)

// Change color on GUI
const spotLight1Color = {
    color: 0x000fff
}
light1.addColor(spotLight1Color, 'color').onChange(() => {
    spotLight1.color.set(spotLight1Color.color)
})

// const pointLight2Helper = new THREE.PointLightHelper(pointLight2, 0.5)
// scene.add(pointLight2Helper)



// --------------------  SpotLight2  --------------------
const spotLight2 = new THREE.PointLight(0xff0000, 1.0)
spotLight2.position.set(-1, 2, 0.5)
//spotLight2.castShadow = true

scene.add(spotLight2)


// Add a folder in the GUI command relative to an object, for ordering purposes
const light2 = gui.addFolder('Light 2')

light2.add(spotLight2.position, 'x').min(-6).max(6).step(0.1)
light2.add(spotLight2.position, 'y').min(-3).max(3).step(0.05)
light2.add(spotLight2.position, 'z').min(-5).max(5).step(0.05)
light2.add(spotLight2, 'intensity').min(0).max(5).step(0.05)

// Change color on GUI
const spotlight2Color = {
    color: 0xff0000
}
light2.addColor(spotlight2Color, 'color').onChange(() => {
    spotLight2.color.set(spotlight2Color.color)
})

// const pointLight2Helper = new THREE.PointLightHelper(pointLight2, 0.5)
// scene.add(pointLight2Helper)





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




/**
 * <<<<<<<<<<<<<<<<<<<<<<<<<<   CAMERA   >>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(2, 5, 7)
scene.add(camera)

// Controls
const orbit = new OrbitControls(camera, renderer.domElement) // or "canvas" instead of "renderer.domElement"
orbit.enableDamping = true

orbit.update()



/**
 * <<<<<<<<<<<<<<<<<<<<<<<<<<   EVENT LISTENERS   >>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

// ----- Ray caster -----
/* tracking of the mouse position and when it encounter an object you can do functions, changing */
const mousePosition = new THREE.Vector2();
window.addEventListener("mousemove", function(e){
    mousePosition.x = (e.clientX / window.innerWidth) *2 - 1
    mousePosition.y = - (e.clientY / window.innerHeight) *2 + 1
});

const rayCaster = new THREE.Raycaster()

const sphereID = sphere.id
sphere.name = 'sphere'
torso.name = 'bot'





/**
 * <<<<<<<<<<<<<<<<<<<<<<<<<<   ANIMATE   >>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */


// tweens
//const virusGeom = scene.getObjectByName("virus")
const virus = new THREE.Mesh(scene.getObjectByName("virus"))

const tween = new TWEEN.Tween({position: virus.position , xRotation: 0})
    .to({position: (5, 5, 0), xRotation: Math.PI /2 }, 2000)
    .onUpdate((coords)=> {
        virus.position = coords.position
        virus.rotation.x  = coords.xRotation
    })
    .repeat(Infinity)
    .delay(500)

tween.start()


/*
// tween 2
setInterval(function() {
    new TWEEN.Tween(torso.position)
      .to(
        {
          x: Math.random() * 5 - 2.5,
          z: Math.random() * 5 - 2.5
        },
        1000
      )
      .start();
    new TWEEN.Tween(torso.position)
      .to(
        {
          y: 3
        },
        500
      )
      .easing(TWEEN.Easing.Cubic.Out)
      .start()
      .onComplete(() => {
        new TWEEN.Tween(torso.position)
          .to(
            {
              y: 0
            },
            500
          )
          .easing(TWEEN.Easing.Bounce.Out)
          .start();
      });
  }, 2000);
*/



let step = 0;
let speed = 0.05;

let lightStep = 0;
let lightVariation = 0.001;

// ---------------------------- animation function ----------------------------
function animate(time){
    plane.rotation.z = time/1000
    sphere.rotation.x = time / 1000
    sphere.rotation.y = time / 1000



    lightStep += lightVariation
    directionalLight.intensity = 2 * Math.abs(Math.sin(lightStep))


    step += speed
    sphere.position.y = 2 * Math.abs(Math.sin(step))

    step += speed
    virus.position.y = 2 * Math.abs(Math.sin(step))


    rayCaster.setFromCamera(mousePosition, camera)
    const intersect = rayCaster.intersectObjects(scene.children)
    //console.log(intersect)

    // for (let i = 0; i < intersect.length; i++){
    //      if(intersect[i].object.name === 'sphere'){
    //          intersect[i].object.materialSphere.color.set(0xFFFFFF)
    //      }
    //      if(intersect[i].object.name === 'bot'){
    //          intersect[i].object.rotation.y = time /200
    //      }
    // }


    TWEEN.update(time)


    renderer.render(scene, camera)
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