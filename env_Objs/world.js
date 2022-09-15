import * as THREE from '../libs/three.module.js'



// --------------------  WORLD  --------------------
class World{


    constructor(){
        this.world;
        this.texture;
    }


    getTexture(path){
        //loading texture
        textureLoader = new THREE.TextureLoader()
        this.texture = textureLoader.load(path)
    }

    createSphereWorld(){
        
        const groundNormalTexture = this.getTexture('/texture/normalMapGround.png')

        const worldGeom = new THREE.SphereGeometry( 200, 128, 64)

        // Plane material
        const worldMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            normalMap: groundNormalTexture,
            //map: groundTex
        })

        // Plane Mesh
        this.world = new THREE.Mesh(worldGeom, worldMaterial)

        this.world.receiveShadow = true
        this.world.position.y = -200

        // Passing the Plane in the main
        return this.world
    }

    createCylinderWorld(){
        
        const normalStreet = getTexture('/texture/streetNormal.png')

        const worldGeom = new THREE.CylinderGeometry( 200, 200, 50, 128, 64)

        // Plane material
        const worldMaterial = new THREE.MeshStandardMaterial({
            color: 0xDDDDDD,
            normalMap: normalStreet,
            //map: road
        })

        // Plane Mesh
        this.world = new THREE.Mesh(worldGeom, worldMaterial)

        this.world.receiveShadow = true
        this.world.rotation.z = Math.PI/2
        this.world.position.y = -200

        return this.world
    }


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

}