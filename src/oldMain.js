import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as TWEEN from '@tweenjs/tween.js';
import * as dat from 'dat.gui'

//import { Particle } from 'cannon-es';



var flagPlayAnim = true;
var flagEnvSupervision = false;
var flagOrbit = false;
var flagChangeCam = true;






// ---------------------------- Loaders and Loading ----------------------------

// _____ Loaders _____
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()
const loader = new GLTFLoader();



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

 //const gui = new dat.GUI()

 // Canvas
 const canvas = document.querySelector('canvas.webgl')
 
 // Scene
 const scene = new THREE.Scene()
 scene.background = background3d
 
 // ----- FOG -----
 scene.fog = new THREE.Fog(0xFFFFFF, 0, 50)
 




/**
 * <<<<<<<<<<<<<<<<<<<<<<<<<<   MODELS (glb, gltf, ...)   >>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */
// __________ Virus __________
let modelVirus
loader.load('/models3d/virus.glb', function(glb){
    const virus = glb.scene
    virus.traverse(function(node){
        if ( node.isMesh ) {
            node.castShadow = true
            modelVirus = node
        }
    })

    virus.position.set(-4, 1, -3)
    //virus.name = 'virus'
    scene.add(virus)

}, undefined, function(error) {
    console.error(error)
})



// __________ CovidMask __________
loader.load('/models3d/surgical_mask.glb', function(glb){
    const mask = glb.scene
    mask.traverse(function(node){
        if ( node.isMesh ) { node.castShadow = true }
    })
    mask.position.set(4, 1, -4)
    mask.castShadow = true
    //mask.scale.set(0.5, 0.5, 0.5)

    scene.add(mask)

}, undefined, function(error) {
    console.error(error)
})


// // __________ xBot __________
// loader.load('/models3d/Xbot.glb', function(glb){
//     const model1 = glb.scene
//     scene.add(model1)
//     model1.position.set(4, 0.5, 2)
// }, undefined, function(error) {
//     console.error(error)
// })


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
 * <<<<<<<<<<<<<<<<<<<<<<<<<<  OBJECTS (+ material and mesh)  >>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

/*
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
*/



// --------------------  WORLD  --------------------

//const worldGeom = new THREE.SphereGeometry( 200, 128, 64)
const worldGeom = new THREE.CylinderGeometry( 200, 200, 50, 128, 64)


// Plane material
const worldMaterial = new THREE.MeshStandardMaterial({
    color: 0xDDDDDD,
    normalMap: normalStreet,
    //map: road
})

// Plane Mesh
const world = new THREE.Mesh(worldGeom, worldMaterial)

world.receiveShadow = true
world.rotation.z = Math.PI/2
world.position.y = -200

// Adding the Plane in the Scene
scene.add( world )








// --------------------  SPHERE  --------------------
const sphereG = new THREE.SphereGeometry( 0.5, 32, 16 )

// Sphere material
const materialSphere = new THREE.MeshStandardMaterial()
//const material = new THREE.MeshBasicMaterial()
materialSphere.metalness = 0.5
materialSphere.roughness = 0.3
materialSphere.color = new THREE.Color(0xfff000)
materialSphere.normalMap = golfNormalTexture

// Sphere Mesh
const sphere = new THREE.Mesh( sphereG, materialSphere )

// Adding the Sphere in the Scene
scene.add( sphere )
sphere.position.set(-2, 0.5, -1)
sphere.castShadow = true



// --------------------  STREET LAMP  --------------------



const baseLampHeight = 1.0;
const baseLampWidth = 0.5;
const poleLampHeight = 10;
const poleLampRadius = 0.1;
const headLampHeight = 0.3;
const headLampWidth = 1.0;
const bulbLampRadius = 0.2;

// ----- BaseLamp -----
const baseLampGeom = new THREE.BoxGeometry( baseLampWidth, baseLampHeight, baseLampWidth )

// baseLamp material
const baseLampMaterial = new THREE.MeshStandardMaterial()
baseLampMaterial.metalness = 0.7
baseLampMaterial.roughness = 0.2
baseLampMaterial.color = new THREE.Color(0xdddddd)
baseLampMaterial.normalMap = golfNormalTexture

// baseLamp Mesh
const baseLamp1 = new THREE.Mesh( baseLampGeom, baseLampMaterial )

// Adding the baseLamp in the Scene
scene.add( baseLamp1 )
baseLamp1.position.set(-8, 0, -3)
baseLamp1.castShadow = true



// ----- Pole of the Lamp -----
const poleLampGeom = new THREE.CylinderGeometry( poleLampRadius, poleLampRadius, poleLampHeight, 16, 8)

// poleLamp material
const poleLampMaterial = new THREE.MeshStandardMaterial({
    metalness : 0.7,
    roughness : 0.2,
    color : new THREE.Color(0xdddddd),
    normalMap : golfNormalTexture
})

// poleLamp Mesh
const poleLamp1 = new THREE.Mesh(poleLampGeom, poleLampMaterial)

poleLamp1.castShadow = true
poleLamp1.position.set(0, 0.5*baseLampHeight, 0)
// Adding the Pole to the baseLamp
baseLamp1.add( poleLamp1 )


// ----- headLamp -----
const headLampGeom = new THREE.BoxGeometry( headLampWidth, headLampHeight, headLampWidth/2 )

// headLamp material
const headLampMaterial = new THREE.MeshStandardMaterial()
headLampMaterial.metalness = 0.7
headLampMaterial.roughness = 0.2
headLampMaterial.color = new THREE.Color(0xdddddd)
headLampMaterial.normalMap = golfNormalTexture

// headLamp Mesh
const headLamp1 = new THREE.Mesh( headLampGeom, headLampMaterial )

// Adding the baseLamp in the Scene
poleLamp1.add( headLamp1 )
headLamp1.position.set(0.4*headLampWidth, 0.5*poleLampHeight, 0)
headLamp1.castShadow = true



// ----- bulb of the Lamp -----
const bulbLampGeom = new THREE.SphereGeometry( bulbLampRadius, 8, 4)

// poleLamp material
const bulbLampMaterial = new THREE.MeshStandardMaterial({
    metalness : 0.7,
    roughness : 0.2,
    color : new THREE.Color(0xfff000),
    normalMap : golfNormalTexture
})

// bulbLamp Mesh
const bulbLamp1 = new THREE.Mesh(bulbLampGeom, bulbLampMaterial)

bulbLamp1.castShadow = true
bulbLamp1.position.set(0.3*headLampWidth, -0.3*headLampHeight, 0)
// Adding the Pole to the baseLamp
headLamp1.add( bulbLamp1 )



// ----- create other street lamp cloning the first one -----
const baseLamp2 = baseLamp1.clone(false)
const poleLamp2 = poleLamp1.clone(false)
const headLamp2 = headLamp1.clone(false)
const bulbLamp2 = bulbLamp1.clone(false)

baseLamp2.position.set(8, 0, -3)
baseLamp2.rotation.y = Math.PI
scene.add(baseLamp2)
baseLamp2.add(poleLamp2)
poleLamp2.add(headLamp2)
headLamp2.add(bulbLamp2)






// ____________________  Humanoid  ____________________

const torsoHeight = 1.5;
const torsoWidth = 0.7;
const headHeight = 0.6;
const headWidth = 0.6;
//const headRadius = 0.4;
const shoulderRadius = 0.2
const upperArmHeight = 0.6;
const upperArmWidth  = 0.15;
const elbowRadius = 0.08;
const lowerArmHeight = 0.5;
const lowerArmWidth  = 0.11;
const handHeight = 0.3;
const handWidth = 0.08;
const hipRadius = 0.2;
const upperLegHeight = 0.8;
const upperLegWidth  = 0.25;
const kneeRadius = 0.13;
const lowerLegHeight = 0.7;
const lowerLegWidth  = 0.2;
const footHeight = 0.08;
const footWidth = 0.25
const footLenght = 0.55;




// ____________  torso  ____________

const torsoGeom = new THREE.BoxGeometry( torsoWidth, torsoHeight, torsoWidth )

// Torso material
const torsoMaterial = new THREE.MeshStandardMaterial()
//torsoMaterial.metalness = 0.7
//torsoMaterial.roughness = 0.2
//torsoMaterial.color = new THREE.Color(0xfff000)
torsoMaterial.normalMap = golfNormalTexture

// Torso Mesh
const torso = new THREE.Mesh( torsoGeom, torsoMaterial )

// Adding the Torso in the Scene
scene.add( torso )
torso.position.set(0, footHeight + lowerLegHeight + upperLegHeight + (0.5*torsoHeight), 3)
torso.castShadow = true


// ____________  Head  ____________

const headGeom = new THREE.BoxGeometry( headWidth, headHeight, headWidth )
//const headGeom = new THREE.SphereGeometry( 0.25, 32, 16 )

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

// Adding the Head on the Torso
torso.add( head )
head.position.set(0, 0.5 * torsoHeight + 0.6 * headHeight, 0)
head.castShadow = true



// ____________  right Shoulder  ____________

const rightShoulderGeom = new THREE.SphereGeometry( shoulderRadius, 16, 32 )

// rightShoulder  material
const rightShoulderMaterial = new THREE.MeshStandardMaterial()
rightShoulderMaterial.normalMap = golfNormalTexture

// RightArm Mesh
const rightShoulder = new THREE.Mesh( rightShoulderGeom, rightShoulderMaterial )

// Adding the RightArm on the Torso
rightShoulder.position.set(0.5*torsoWidth, 0.3*torsoHeight, 0)
rightShoulder.rotation.set(0, 0, -Math.PI*(2/5) )
rightShoulder.castShadow = true
torso.add( rightShoulder )



// ____________  left Shoulder  ____________

const leftShoulderGeom = new THREE.SphereGeometry( shoulderRadius, 16, 32 )

// rightShoulder  material
const leftShoulderMaterial = new THREE.MeshStandardMaterial()
leftShoulderMaterial.normalMap = golfNormalTexture

// RightArm Mesh
const leftShoulder = new THREE.Mesh( leftShoulderGeom, leftShoulderMaterial )

// Adding the RightArm on the Torso
leftShoulder.position.set(-0.5*torsoWidth, 0.3*torsoHeight, 0)
leftShoulder.rotation.set(0, 0, Math.PI*(2/5) )
leftShoulder.castShadow = true
torso.add( leftShoulder )



// ____________  upperRight Arm  ____________

const upperRightArmGeom = new THREE.BoxGeometry( upperArmHeight, upperArmWidth, upperArmWidth )

// upperRightArm material
const upperRightArmMaterial = new THREE.MeshStandardMaterial()
upperRightArmMaterial.normalMap = golfNormalTexture

// RightArm Mesh
const upperRightArm = new THREE.Mesh( upperRightArmGeom, upperRightArmMaterial )

// Adding the RightArm on the Torso
upperRightArm.position.set(2.5*shoulderRadius, 0, 0)
upperRightArm.castShadow = true
rightShoulder.add( upperRightArm )



// ____________  upperLeft Arm  ____________

const upperLeftArmGeom = new THREE.BoxGeometry( upperArmHeight, upperArmWidth, upperArmWidth )

// upperLeftArm material
const upperLeftArmMaterial = new THREE.MeshStandardMaterial()
upperLeftArmMaterial.normalMap = golfNormalTexture

// LeftArm Mesh
const upperLeftArm = new THREE.Mesh( upperLeftArmGeom, upperLeftArmMaterial )

// Adding the LeftArm on the Torso
upperLeftArm.position.set(-2.5*shoulderRadius, 0, 0)
upperLeftArm.castShadow = true
leftShoulder.add( upperLeftArm )



// ____________  rightElbow  ____________

const rightElbowGeom = new THREE.SphereGeometry( elbowRadius, 32, 16 )

// rightElbow material
const rightElbowMaterial = new THREE.MeshStandardMaterial()
rightElbowMaterial.normalMap = golfNormalTexture

// rightElbow Mesh
const rightElbow = new THREE.Mesh( rightElbowGeom, rightElbowMaterial )

// Adding the rightElbow on the upperArm
rightElbow.position.set(0.6*upperArmHeight, 0, 0)
rightElbow.rotation.set(0, Math.PI*(2/3), 0)
rightElbow.castShadow = true
upperRightArm.add( rightElbow )



// ____________  leftElbow  ____________

const leftElbowGeom = new THREE.SphereGeometry( elbowRadius, 32, 16 )

// leftElbow material
const leftElbowMaterial = new THREE.MeshStandardMaterial()
leftElbowMaterial.normalMap = golfNormalTexture

// rightElbow Mesh
const leftElbow = new THREE.Mesh( leftElbowGeom, leftElbowMaterial )

// Adding the rightElbow on the upperArm
leftElbow.position.set(-0.6*upperArmHeight, 0, 0)
leftElbow.rotation.set(0, -Math.PI*(2/3), 0)
leftElbow.castShadow = true
upperLeftArm.add( leftElbow )




// ____________  lowerRight Arm  ____________

const lowerRightArmGeom = new THREE.BoxGeometry( lowerArmHeight, lowerArmWidth, lowerArmWidth )

// lowerRightArm material
const lowerRightArmMaterial = new THREE.MeshStandardMaterial()
lowerRightArmMaterial.normalMap = golfNormalTexture

// RightArm Mesh
const lowerRightArm = new THREE.Mesh( lowerRightArmGeom, lowerRightArmMaterial )

// Adding the lowerRightArm on the rightElbow
rightElbow.add( lowerRightArm )
lowerRightArm.position.set(3*elbowRadius, 0, 0)
lowerRightArm.castShadow = true


// ____________  lowerLeft Arm  ____________

const lowerLeftArmGeom = new THREE.BoxGeometry( lowerArmHeight, lowerArmWidth, lowerArmWidth )

// lowerLeftArm material
const lowerLeftArmMaterial = new THREE.MeshStandardMaterial()
lowerLeftArmMaterial.normalMap = golfNormalTexture


const lowerLeftArm = new THREE.Mesh( lowerLeftArmGeom, upperLeftArmMaterial )

// Adding the lowerLeftArm on the leftElbow
leftElbow.add( lowerLeftArm )
lowerLeftArm.position.set(-3*elbowRadius, 0, 0)
lowerLeftArm.castShadow = true



// ____________  Right Hand  ____________

const rightHandGeom = new THREE.BoxGeometry( handHeight, handWidth, handHeight )

// rightHand material
const rightHandMaterial = new THREE.MeshStandardMaterial()
rightHandMaterial.normalMap = golfNormalTexture

const rightHand = new THREE.Mesh( rightHandGeom, rightHandMaterial )

// Adding the rightHand on the lowerRightArm
lowerRightArm.add( rightHand )
rightHand.position.set(0.7*lowerArmHeight, 0, 0)
rightHand.castShadow = true


// ____________  Left Hand  ____________

const leftHandGeom = new THREE.BoxGeometry( handHeight, handWidth, handHeight )

// leftHand material
const leftHandMaterial = new THREE.MeshStandardMaterial()
leftHandMaterial.normalMap = golfNormalTexture

const leftHand = new THREE.Mesh( leftHandGeom, leftHandMaterial )

// Adding the leftHand on the lowerLeftArm
lowerLeftArm.add( leftHand )
leftHand.position.set(-0.7*lowerArmHeight, 0, 0)
leftHand.castShadow = true



// ____________  rightHip  ____________

const rightHipGeom = new THREE.SphereGeometry( hipRadius, 32, 16 )

// rightHip material
const rightHipMaterial = new THREE.MeshStandardMaterial()
rightHipMaterial.normalMap = golfNormalTexture

// LeftLeg Mesh
const rightHip = new THREE.Mesh( rightHipGeom, rightHipMaterial )

// Adding the LeftLeg in the Scene
torso.add( rightHip )
rightHip.position.set(0.35*torsoWidth, -0.5*torsoHeight, 0)
rightHip.castShadow = true



// ____________  leftHip  ____________

const leftHipGeom = new THREE.SphereGeometry( hipRadius, 32, 16 )

// leftHip material
const leftHipMaterial = new THREE.MeshStandardMaterial()
leftHipMaterial.normalMap = golfNormalTexture

// leftHip Mesh
const leftHip = new THREE.Mesh( leftHipGeom, leftHipMaterial )

// Adding the leftHip in the Scene
torso.add( leftHip )
leftHip.position.set(-0.35*torsoWidth, -0.5*torsoHeight, 0)
leftHip.castShadow = true

// ____________  upperRightLeg  ____________

const upperRightLegGeom = new THREE.BoxGeometry( upperLegWidth, upperLegHeight, upperLegWidth )

// upperRightLeg material
const upperRightLegMaterial = new THREE.MeshStandardMaterial()
//upperRightLegMaterial.metalness = 0.7
//upperRightLegMaterial.roughness = 0.2
//upperRightLegMaterial.color = new THREE.Color(0xfff000)
upperRightLegMaterial.normalMap = golfNormalTexture

// RightLeg Mesh
const upperRightLeg = new THREE.Mesh( upperRightLegGeom, upperRightLegMaterial )

// Adding the RightLeg on the Torso
rightHip.add( upperRightLeg )
upperRightLeg.position.set(0, -2*hipRadius, 0)
upperRightLeg.castShadow = true



// ____________  upperLeftLeg  ____________

const upperLeftLegGeom = new THREE.BoxGeometry( upperLegWidth, upperLegHeight, upperLegWidth )

// upperLeftLeg material
const upperLeftLegMaterial = new THREE.MeshStandardMaterial()
upperLeftLegMaterial.normalMap = golfNormalTexture

// LeftLeg Mesh
const upperLeftLeg = new THREE.Mesh( upperLeftLegGeom, upperLeftLegMaterial )

// Adding the LeftLeg on the Torso
leftHip.add( upperLeftLeg )
upperLeftLeg.position.set(0, -2*hipRadius, 0)
upperLeftLeg.castShadow = true


// ____________  rightKnee  ____________

const rightKneeGeom = new THREE.SphereGeometry( kneeRadius, 32, 16 )

// rightKnee material
const rightKneeMaterial = new THREE.MeshStandardMaterial()
rightKneeMaterial.normalMap = golfNormalTexture

// LeftLeg Mesh
const rightKnee = new THREE.Mesh( rightKneeGeom, rightKneeMaterial )

// Adding the LeftLeg in the Scene
upperRightLeg.add( rightKnee )
rightKnee.position.set(0, -0.6*upperLegHeight, 0)
rightKnee.castShadow = true


// ____________  leftKnee  ____________

const leftKneeGeom = new THREE.SphereGeometry( kneeRadius, 32, 16 )

// leftKnee material
const leftKneeMaterial = new THREE.MeshStandardMaterial()
leftKneeMaterial.normalMap = golfNormalTexture

// LeftLeg Mesh
const leftKnee = new THREE.Mesh( leftKneeGeom, leftKneeMaterial )

// Adding the LeftLeg in the Scene
upperLeftLeg.add( leftKnee )
leftKnee.position.set(0, -0.6*upperLegHeight, 0)
leftKnee.castShadow = true


// ____________  lowerRightLeg  ____________

const lowerRightLegGeom = new THREE.BoxGeometry( lowerLegWidth, lowerLegHeight, lowerLegWidth )

// lowerRightLeg material
const lowerRightLegMaterial = new THREE.MeshStandardMaterial()
upperRightLegMaterial.normalMap = golfNormalTexture

// RightLeg Mesh
const lowerRightLeg = new THREE.Mesh( lowerRightLegGeom, lowerRightLegMaterial )

// Adding the RightLeg in the Scene
rightKnee.add( lowerRightLeg )
lowerRightLeg.position.set(0, -3*kneeRadius, 0)
lowerRightLeg.castShadow = true


// ____________  lowerLeftLeg  ____________

const lowerLeftLegGeom = new THREE.BoxGeometry( lowerLegWidth, lowerLegHeight, lowerLegWidth )

// lowerLeftLeg material
const lowerLeftLegMaterial = new THREE.MeshStandardMaterial()
lowerLeftLegMaterial.normalMap = golfNormalTexture

// RightLeg Mesh
const lowerLeftLeg = new THREE.Mesh( lowerLeftLegGeom, lowerLeftLegMaterial )

// Adding the RightLeg in the Scene
leftKnee.add( lowerLeftLeg )
lowerLeftLeg.position.set(0, -3*kneeRadius, 0)
lowerLeftLeg.castShadow = true



// ____________  Right Foot  ____________

const rightFootGeom = new THREE.BoxGeometry( footWidth, footHeight, footLenght )

// rightFoot material
const rightFootMaterial = new THREE.MeshStandardMaterial()
rightFootMaterial.normalMap = golfNormalTexture

// rightFoot Mesh
const rightFoot = new THREE.Mesh( rightFootGeom, rightFootMaterial )

// Adding the rightFoot on the lowerRightLeg
lowerRightLeg.add( rightFoot )
rightFoot.position.set(0, -0.55*lowerLegHeight, -0.6*lowerLegWidth)
rightFoot.castShadow = true


// ____________  Left Foot  ____________

const leftFootGeom = new THREE.BoxGeometry( footWidth, footHeight, footLenght )

// leftFoot material
const leftFootMaterial = new THREE.MeshStandardMaterial()
leftFootMaterial.normalMap = golfNormalTexture

// rightFoot Mesh
const leftFoot = new THREE.Mesh( leftFootGeom, leftFootMaterial )

// Adding the leftFoot on the lowerRightLeg
lowerLeftLeg.add( leftFoot )
leftFoot.position.set(0, -0.55*lowerLegHeight, -0.6*lowerLegWidth)
leftFoot.castShadow = true




/**
 * <<<<<<<<<<<<<<<<<<<<<<<<<<   LIGHTS   >>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

// --------------------  Ambient Light  --------------------
//const ambientLight = new THREE.AmbientLight(0x222222)
//scene.add(ambientLight)





// --------------------  Directional Light  --------------------
const sun = new THREE.DirectionalLight(0xffffE0, 0.3)
sun.position.set(0, 10, 1)
sun.castShadow = true
scene.add(sun)

const directionalLightHelper = new THREE.DirectionalLightHelper(sun, 0.5, 'red')
scene.add(directionalLightHelper)




// --------------------  SpotLight1  --------------------
const spotLight1 = new THREE.SpotLight(0xffffE0, 1.0)
spotLight1.position.set(0, -0.5*bulbLampRadius, 0)
spotLight1.target = baseLamp1
//spotLight1.angle = Math.PI/6
spotLight1.penumbra = 0.3
spotLight1.castShadow = true

bulbLamp1.add(spotLight1)


// Add a folder in the GUI command relative to an object, for ordering purposes
const light1 = gui.addFolder('Light 1')

light1.add(spotLight1.position, 'x').min(-6).max(6).step(0.1)
light1.add(spotLight1.position, 'y').min(-3).max(3).step(0.05)
light1.add(spotLight1.position, 'z').min(-5).max(5).step(0.05)
light1.add(spotLight1, 'intensity').min(0).max(5).step(0.05)

// Change color on GUI
const spotLight1Color = {
    color: 0xffffE0
}
light1.addColor(spotLight1Color, 'color').onChange(() => {
    spotLight1.color.set(spotLight1Color.color)
})

const spotLight1Helper = new THREE.PointLightHelper(spotLight1, 0.5, 'blue')
scene.add(spotLight1Helper)



// --------------------  SpotLight2  --------------------
const spotLight2 = new THREE.SpotLight(0xffffE0, 1.0)
spotLight2.position.set(0, 0, 0)
spotLight2.target = baseLamp2
//spotLight2.angle = Math.PI/6
spotLight2.penumbra = 0.3
spotLight2.castShadow = true

bulbLamp2.add(spotLight2)


// Add a folder in the GUI command relative to an object, for ordering purposes
const light2 = gui.addFolder('Light 2')

light2.add(spotLight2.position, 'x').min(-6).max(6).step(0.1)
light2.add(spotLight2.position, 'y').min(-3).max(3).step(0.05)
light2.add(spotLight2.position, 'z').min(-5).max(5).step(0.05)
light2.add(spotLight2, 'intensity').min(0).max(5).step(0.05)

// Change color on GUI
const spotlight2Color = {
    color: 0xffffE0
}
light2.addColor(spotlight2Color, 'color').onChange(() => {
    spotLight2.color.set(spotlight2Color.color)
})

const spotLight2Helper = new THREE.PointLightHelper(spotLight2, 0.5, 'blue')
scene.add(spotLight2Helper)





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


// ___________________ TWEENS ____________________


const quadraticEasy = TWEEN.Easing.Quadratic.InOut
const easy = TWEEN.Easing.Circular.InOut
const sinEasy = TWEEN.Easing.Sinusoidal.InOut

var velTime = 200

// ----- LEGS -----
const tweenRightLeg1 = new TWEEN.Tween({xRotation: -Math.PI/4, yRotation:0, zRotation:0} )
.to({xRotation: Math.PI/3, yRotation:0 , zRotation:0}, velTime)
    .onUpdate((coords)=> {
        rightHip.rotation.set(coords.xRotation, coords.yRotation, coords.zRotation)

        new TWEEN.Tween({x2Rotation: -Math.PI/4, y2Rotation:0, z2Rotation:0} )
        .to({x2Rotation: -Math.PI/6, y2Rotation:0 , z2Rotation:0}, velTime)
            .onUpdate((coords)=> {
                rightKnee.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
                rightFoot.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
            })
            .easing(easy)
            .start()
    })
    .easing(easy)
    //.repeat(Infinity)
    //.delay(100)
    
const tweenRightLeg2 = new TWEEN.Tween({xRotation: Math.PI/3, yRotation:0, zRotation:0} )
    .to({xRotation: Math.PI/6, yRotation:0 , zRotation:0}, velTime)
        .onUpdate((coords)=> {
            rightHip.rotation.set(coords.xRotation, coords.yRotation, coords.zRotation)

    new TWEEN.Tween({x2Rotation: -Math.PI/6, y2Rotation:0, z2Rotation:0} )
    .to({x2Rotation: 0, y2Rotation:0 , z2Rotation:0}, velTime)
        .onUpdate((coords)=> {
            rightKnee.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
            rightFoot.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
        })
        .easing(easy)
        .start()


    // new TWEEN.Tween({TxRotation: 0, TyRotation:0, TzRotation:0} )
    // .to({TxRotation: -Math.PI/20, TyRotation:0 , TzRotation:0}, velTime)
    //     .onUpdate((coords)=> {
    //         torso.rotation.set(coords.TxRotation, coords.TyRotation, coords.TzRotation)
    //     })
    //     .easing(easy)
    //     .start()

    })
    .easing(easy)
    //.repeat(Infinity)
    //.delay(100)

const tweenRightLeg3 = new TWEEN.Tween({xRotation: Math.PI/6, yRotation:0, zRotation:0} )
    .to({xRotation: 0, yRotation:0 , zRotation:0}, velTime)
        .onUpdate((coords)=> {
            rightHip.rotation.set(coords.xRotation, coords.yRotation, coords.zRotation)

    new TWEEN.Tween({x2Rotation: 0, y2Rotation:0, z2Rotation:0} )
    .to({x2Rotation: -Math.PI/4, y2Rotation:0 , z2Rotation:0}, velTime)
        .onUpdate((coords)=> {
            rightKnee.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
            rightFoot.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
        })
        .easing(easy)
        .start()

    // new TWEEN.Tween({TxRotation: -Math.PI/20, TyRotation:0, TzRotation:0} )
    // .to({TxRotation: 0, TyRotation:0 , TzRotation:0}, velTime)
    //     .onUpdate((coords)=> {
    //         torso.rotation.set(coords.TxRotation, coords.TyRotation, coords.TzRotation)
    //     })
    //     .easing(easy)
    //     .start()

})
.easing(TWEEN.Easing.Quartic.InOut)
//.repeat(Infinity)
//.delay(100)

const tweenRightLeg4 = new TWEEN.Tween({xRotation: 0, yRotation:0, zRotation:0} )
    .to({xRotation: -Math.PI/4, yRotation:0 , zRotation:0}, velTime)
        .onUpdate((coords)=> {
            rightHip.rotation.set(coords.xRotation, coords.yRotation, coords.zRotation)

    new TWEEN.Tween({x2Rotation: -Math.PI/4, y2Rotation:0, z2Rotation:0} )
    .to({x2Rotation: -Math.PI/4, y2Rotation:0 , z2Rotation:0}, velTime)
        .onUpdate((coords)=> {
            rightKnee.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
            rightFoot.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
        })
        .easing(easy)
        .start()
})
.easing(easy)
//.repeat(Infinity)
//.delay(100)




const tweenLeftLeg1 = new TWEEN.Tween({xRotation: Math.PI/6, yRotation:0, zRotation:0} )
    .to({xRotation: 0, yRotation:0 , zRotation:0}, velTime)
        .onUpdate((coords)=> {
            leftHip.rotation.set(coords.xRotation, coords.yRotation, coords.zRotation)

    new TWEEN.Tween({x2Rotation: 0, y2Rotation:0, z2Rotation:0} )
    .to({x2Rotation: -Math.PI/6, y2Rotation:0 , z2Rotation:0}, velTime)
        .onUpdate((coords)=> {
            leftKnee.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
            leftFoot.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
        })
        .easing(easy)
        .start()
})
.easing(easy)
//.repeat(Infinity)
//.delay(100)

const tweenLeftLeg2 = new TWEEN.Tween({xRotation: 0, yRotation:0, zRotation:0} )
    .to({xRotation: -Math.PI/4, yRotation:0 , zRotation:0}, velTime)
        .onUpdate((coords)=> {
            leftHip.rotation.set(coords.xRotation, coords.yRotation, coords.zRotation)

    new TWEEN.Tween({x2Rotation: -Math.PI/6, y2Rotation:0, z2Rotation:0} )
    .to({x2Rotation: -Math.PI/4, y2Rotation:0 , z2Rotation:0}, velTime)
        .onUpdate((coords)=> {
            leftKnee.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
            leftFoot.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
        })
        .easing(easy)
        .start()
})
.easing(easy)
//.repeat(Infinity)
//.delay(100)

const tweenLeftLeg3 = new TWEEN.Tween({xRotation: -Math.PI/4, yRotation:0, zRotation:0} )
.to({xRotation: Math.PI/3, yRotation:0 , zRotation:0}, velTime)
    .onUpdate((coords)=> {
        leftHip.rotation.set(coords.xRotation, coords.yRotation, coords.zRotation)

        new TWEEN.Tween({x2Rotation: -Math.PI/4, y2Rotation:0, z2Rotation:0} )
        .to({x2Rotation: -Math.PI/4, y2Rotation:0 , z2Rotation:0}, velTime)
            .onUpdate((coords)=> {
                leftKnee.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
                leftFoot.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
            })
            .easing(easy)
            .start()
    })
    .easing(easy)
    //.repeat(Infinity)
    //.delay(100)
    
const tweenLeftLeg4 = new TWEEN.Tween({xRotation: Math.PI/3, yRotation:0, zRotation:0} )
    .to({xRotation: Math.PI/6, yRotation:0 , zRotation:0}, velTime)
        .onUpdate((coords)=> {
            leftHip.rotation.set(coords.xRotation, coords.yRotation, coords.zRotation)

    new TWEEN.Tween({x2Rotation: -Math.PI/4, y2Rotation:0, z2Rotation:0} )
    .to({x2Rotation: -Math.PI/6, y2Rotation:0 , z2Rotation:0}, velTime)
        .onUpdate((coords)=> {
            leftKnee.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
            leftFoot.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
        })
        .easing(easy)
        .start()
    })
    .easing(easy)
    //.repeat(Infinity)
    //.delay(100)




tweenRightLeg1.chain(tweenRightLeg2)
tweenRightLeg2.chain(tweenRightLeg3)
tweenRightLeg3.chain(tweenRightLeg4)
tweenRightLeg4.chain(tweenRightLeg1)

tweenRightLeg1.start()
//tweenRightupperLeg.stop()

tweenLeftLeg1.chain(tweenLeftLeg2)
tweenLeftLeg2.chain(tweenLeftLeg3)
tweenLeftLeg3.chain(tweenLeftLeg4)
tweenLeftLeg4.chain(tweenLeftLeg1)

tweenLeftLeg1.start()
//tweenLeftLeg1.stop()




// ----- ARMS -----

// ----- Right Arm -----
const tweenRightArm1 = new TWEEN.Tween({xRotation: 0} )
.to({xRotation: -Math.PI/4}, velTime)
        .onUpdate((coords)=> {
            rightShoulder.rotation.x = coords.xRotation

    new TWEEN.Tween({TyRotation:0} )
    .to({TyRotation: -Math.PI/30}, velTime)
        .onUpdate((coords)=> {
            torso.rotation.y = coords.TyRotation
        })
        .easing(sinEasy)
        .start()

    })
    .easing(easy)
    //.repeat(Infinity)
    //.delay(100)
    
const tweenRightArm2 = new TWEEN.Tween({xRotation: -Math.PI/4} )
.to({xRotation: 0}, velTime)
        .onUpdate((coords)=> {
            rightShoulder.rotation.x = coords.xRotation

    new TWEEN.Tween({TyRotation:-Math.PI/30} )
    .to({TyRotation: 0}, velTime)
        .onUpdate((coords)=> {
            torso.rotation.y = coords.TyRotation
        })
        .easing(sinEasy)
        .start()

    })
    .easing(easy)
    //.repeat(Infinity)
    //.delay(100)

const tweenRightArm3 = new TWEEN.Tween({xRotation: 0} )
.to({xRotation: Math.PI/4}, velTime)
        .onUpdate((coords)=> {
            rightShoulder.rotation.x = coords.xRotation

    new TWEEN.Tween({TyRotation: 0} )
    .to({TyRotation: Math.PI/30}, velTime)
        .onUpdate((coords)=> {
            torso.rotation.y = coords.TyRotation
        })
        .easing(sinEasy)
        .start()

})
.easing(easy)
//.repeat(Infinity)
//.delay(100)

const tweenRightArm4 = new TWEEN.Tween({xRotation: Math.PI/4} )
.to({xRotation: 0}, velTime)
        .onUpdate((coords)=> {
            rightShoulder.rotation.x = coords.xRotation

    new TWEEN.Tween({TyRotation:Math.PI/30} )
    .to({TyRotation: 0}, velTime)
        .onUpdate((coords)=> {
            torso.rotation.y = coords.TyRotation
        })
        .easing(sinEasy)
        .start()
})
.easing(easy)
//.repeat(Infinity)
//.delay(100)


// ----- Left Arm -----
const tweenLeftArm1 = new TWEEN.Tween({xRotation: 0} )
.to({xRotation: Math.PI/4}, velTime)
    .onUpdate((coords)=> {
        leftShoulder.rotation.x = coords.xRotation
    })
    .easing(easy)
    //.repeat(Infinity)
    //.delay(100)
    
const tweenLeftArm2 = new TWEEN.Tween({xRotation: Math.PI/4} )
.to({xRotation: 0}, velTime)
    .onUpdate((coords)=> {
        leftShoulder.rotation.x = coords.xRotation
    })
    .easing(easy)
    //.repeat(Infinity)
    //.delay(100)

const tweenLeftArm3 = new TWEEN.Tween({xRotation: 0} )
.to({xRotation: -Math.PI/4}, velTime)
    .onUpdate((coords)=> {
        leftShoulder.rotation.x = coords.xRotation
    })
    .easing(easy)
    //.repeat(Infinity)
    //.delay(100)

const tweenLeftArm4 = new TWEEN.Tween({xRotation: -Math.PI/4} )
.to({xRotation: 0}, velTime)
    .onUpdate((coords)=> {
        leftShoulder.rotation.x = coords.xRotation
    })
    .easing(easy)
    //.repeat(Infinity)
    //.delay(100)


tweenRightArm1.chain(tweenRightArm2)
tweenRightArm2.chain(tweenRightArm3)
tweenRightArm3.chain(tweenRightArm4)
tweenRightArm4.chain(tweenRightArm1)

tweenRightArm1.start()
//tweenRightArm1.stop()

tweenLeftArm1.chain(tweenLeftArm2)
tweenLeftArm2.chain(tweenLeftArm3)
tweenLeftArm3.chain(tweenLeftArm4)
tweenLeftArm4.chain(tweenLeftArm1)

tweenLeftArm1.start()
//tweenLeftArm1.stop()



// ______ TWEEN LIGHTS _____

const tweenSun = new TWEEN.Tween({lum: 0.1} )
.to({lum: 1}, 10000)
    .onUpdate((value)=> {
        sun.intensity = value.lum
    })
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .yoyo(true)
    .repeat(Infinity)
    //.delay(100)

tweenSun.start()



let step = 0;
let speed = 0.05;

(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()



// ---------------------------- animation function ----------------------------
function animate(time){


    if(flagPlayAnim == true) {
    
    
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
Footer