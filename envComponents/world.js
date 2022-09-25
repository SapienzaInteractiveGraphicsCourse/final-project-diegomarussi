import * as THREE from 'three'
import Utils from './utils.js'



// --------------------  WORLD  --------------------
export default class Env{


    constructor(){
        
        this.mesh;
        this.worldRadius = 200;

        this.randomObjArray = [];
        this.collisionArrayWall = [];
        this.collisionArrayVirus = [];

        this.wallBB;
        this.virusBB;

        this.virusRadius = 1.0;

        this.utils = new Utils();

    }

    

    createSphereWorld(){
        
        const groundNormalTexture = this.utils.getTexture('/texture/streetNormal.png')

        const worldGeom = new THREE.SphereGeometry( this.worldRadius, 128, 64)

        // Plane material
        const worldMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            normalMap: groundNormalTexture,
            //map: groundTex
        })

        // Plane Mesh
        this.mesh = new THREE.Mesh(worldGeom, worldMaterial)

        this.mesh.receiveShadow = true
        this.mesh.position.y = -this.worldRadius

        // Passing the Plane in the main
        return this.mesh
    }

    createCylinderWorld(){
        
        const normalStreet = this.utils.getTexture('/texture/streetNormal.png')

        const worldGeom = new THREE.CylinderGeometry( this.worldRadius, this.worldRadius, 50, 128, 64)

        // Plane material
        const worldMaterial = new THREE.MeshStandardMaterial({
            color: 0xDDDDDD,
            roughness: 1.0,
            normalMap: normalStreet,
            //map: road
        })

        // Plane Mesh
        this.mesh = new THREE.Mesh(worldGeom, worldMaterial)

        this.mesh.receiveShadow = true
        this.mesh.rotation.z = Math.PI/2
        this.mesh.position.y = -this.worldRadius

        return this.mesh
    }



    // --------------------  VIRUS  --------------------

    createVirusObj(x, y, z){

        const virusTex = this.utils.getTexture('/img/virusTex.jpg')

        const virusgeom = new THREE.DodecahedronGeometry( this.virusRadius, 0 )

        // virusG material
        const virusmaterial = new THREE.MeshStandardMaterial()
        virusmaterial.metalness = 0.1
        virusmaterial.color = new THREE.Color(0xfff000)
        virusmaterial.map = virusTex

        // virusG Mesh
        this.mesh = new THREE.Mesh( virusgeom, virusmaterial )

        // Adding the Sphere in the Scene
        this.mesh.position.set(x, y, z)
        this.mesh.castShadow = true
        this.mesh.name = "virus";

        this.virusBB = new THREE.Sphere(this.mesh.position, 1.0)

        return {mesh: this.mesh, bb: this.virusBB}

    }


    // --------------------  WALL  --------------------

    createWallObj(x, y, z){

        const wallTex = this.utils.getTexture('/texture/wall2NormalMap.png')

        const wallgeom = new THREE.BoxGeometry( 3.0, 1.0 + Math.random()*2, 0.5 )

        // virusG material
        const wallmaterial = new THREE.MeshStandardMaterial()
        wallmaterial.metalness = 0.1
        wallmaterial.color = new THREE.Color(0xff8000)
        wallmaterial.normalMap = wallTex

        // virusG Mesh
        this.mesh = new THREE.Mesh( wallgeom, wallmaterial )

        // Adding the Sphere in the Scene
        this.mesh.position.set(x, y, z)
        this.mesh.castShadow = true
        this.mesh.name = "wall";

        this.wallBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
        this.wallBB.setFromObject(this.mesh);

        return {mesh: this.mesh, bb: this.wallBB}

    }



    //function place objects on the world sphere
    // s: fixed angle around y 
    // t: variable angle around z 
    addObject(obj, lonstep, latstep, world, worldRadius ){
        var lonsteps = lonstep;
        var latstep = latstep;
        var r = worldRadius + this.virusRadius;
        

        for(var ss = 0; ss <= lonsteps; ss++){
            for(var tt = 0; tt <= latstep; tt++){
                var s = Math.PI/30 * (-3 + Math.random()*lonsteps) / lonsteps;
                //var t = 2*Math.PI * tt / latstep;
                var t = 2*Math.PI * (Math.random()*latstep) / latstep;

                const pos = new THREE.Vector3();
                pos.setFromSphericalCoords(r, t, s) 
                //console.log(pos);
                

                if(obj == 'virus'){
                    this.randomObjArray['obj'+parseFloat(ss) +parseFloat(tt)] = this.createVirusObj(pos.x, pos.y , pos.z).mesh;
                    this.collisionArrayVirus['obj'+parseFloat(ss) +parseFloat(tt)] = this.createVirusObj(pos.x, pos.y , pos.z).bb;
                }
                if(obj == 'wall'){
                    this.randomObjArray['obj'+parseFloat(ss) +parseFloat(tt)] = this.createWallObj(pos.x, pos.y , pos.z).mesh;
                    this.collisionArrayWall['obj'+parseFloat(ss) +parseFloat(tt)] = this.createWallObj(pos.x, pos.y , pos.z).bb;
                    this.randomObjArray['obj'+parseFloat(ss) +parseFloat(tt)].rotation.x -= -t
                }

                world.add(this.randomObjArray['obj'+parseFloat(ss) +parseFloat(tt)]);


                
            }

        }
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