import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three'


/**
 * <<<<<<<<<<<<<<<<<<<<<<<<<<   MODELS (glb, gltf, ...)   >>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */


export default class Modelss{



    


// __________ Virus __________
    static loadVirus(path, x, y, z, world){
        
        const loader = new GLTFLoader();

        loader.load(path, function(glb){
            const virus = glb.scene
            virus.traverse(function(child){
            if ( child.isMesh ) {
                child.castShadow = true
                //this.object.push(child)
            }
            })
            virus.position.set(x, y, z)
            //virus.name = 'virus'
            virus.scale.set(0.5, 0.5, 0.5)
            world.add(virus)

        }, undefined, function(error) {
            console.error(error)
        })
        
    }


// __________ CovidMask __________
    static loadMask(path, x, y, z, parent){
        
        const loader = new GLTFLoader();

        loader.load(path, function(glb){
            const mask = glb.scene
            mask.traverse(function(child){
                if ( child.isMesh ) { 
                    child.castShadow = true
                }
            })
            
            mask.position.set(x, y, z)
            mask.castShadow = true
            //mask.scale.set(0.5, 0.5, 0.5)
            parent.add(mask)

        }, undefined, function(error) {
            console.error(error)
        })
        

    }



    static addObject( pathObj, world, worldRadius ){
        var lonsteps = 3
        var latstep = 2
        var r = worldRadius + 1.0
        

        for(var ss = 0; ss <= lonsteps; ss++){
            for(var tt = 0; tt <= latstep; tt++){
                var s = Math.PI/30 * (-3 + Math.random()*lonsteps) / lonsteps;
                //var t = 2*Math.PI * tt / latstep;
                var t = 2*Math.PI * (Math.random()*latstep) / latstep; 
                

                
                const pos = new THREE.Vector3();
                pos.setFromSphericalCoords(r, t, s) 
                //console.log(pos);
                

                if(pathObj == '/models3d/surgical_mask.glb'){
                    Modelss.loadMask(pathObj, pos.x, pos.y, pos.z, world)
                }
                if(pathObj == '/models3d/virus.glb'){
                    Modelss.loadVirus(pathObj, pos.x, pos.y, pos.z, world)
                }

                // randomObjArray['obj'+parseFloat(ss) +parseFloat(tt)] = new StreetLamp(pos.x, pos.y, pos.z);
                // randomObjArray['obj'+parseFloat(ss) +parseFloat(tt)].rotation.x -= -t;
                // //leftLamps['streetLampL'+parseFloat(tt)].baseLamp.rotation.y = Math.PI;
                // world.add['obj'+parseFloat(ss) +parseFloat(tt)];


                
            }

        }
    }



}





    // // __________ xBot __________
    //     loadBot(){
            
    //         loader.load('/models3d/Xbot.glb', function(glb){
    //             const model1 = glb.scene
    //             scene.add(model1)
    //             model1.position.set(4, 0.5, 2)
    //         }, undefined, function(error) {
    //             console.error(error)
    //         })
    //     }

        


