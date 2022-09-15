import { GLTFLoader } from '../libs/GLTFLoader.js';



/**
 * <<<<<<<<<<<<<<<<<<<<<<<<<<   MODELS (glb, gltf, ...)   >>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */


class Models{

    loader = new GLTFLoader();

// __________ Virus __________
    loadVirus(){
        

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

    }


// __________ CovidMask __________
    loadMask(){
        
        loader.load('/models3d/surgical_mask.glb', function(glb){
            const mask = glb.scene
            mask.traverse(function(node){
                if ( node.isMesh ) { node.castShadow = true }
            })
            mask.position.set(4, 1, -3)
            mask.castShadow = true
            //mask.scale.set(0.5, 0.5, 0.5)

            scene.add(mask)

        }, undefined, function(error) {
            console.error(error)
        })

    }


// __________ xBot __________
    loadBot(){
        
        loader.load('/models3d/Xbot.glb', function(glb){
            const model1 = glb.scene
            scene.add(model1)
            model1.position.set(4, 0.5, 2)
        }, undefined, function(error) {
            console.error(error)
        })
    }

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
}

