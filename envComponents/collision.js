import { update } from '@tweenjs/tween.js';
import * as THREE from 'three'

export default class Collision{

    constructor(){

        this.collidableObjects = [];


    }


    


    detectCollsion(scene, body, healtBar, maxHealth){
        
        
        // const rayCaster = new THREE.Raycaster()

        // rayCaster.setFromCamera(body.position, camera)
        // var intersect = rayCaster.intersectObjects(scene.children)
        // console.log(intersect)

        // for (let i = 0; i < intersect.length; i++){
        //     if(intersect[i].object.name === 'sphere'){
        //         intersect[i].object.materialSphere.color.set(0xFFFFFF)
        //     }
            
        // }


        for (var vertexIndex = 0; vertexIndex < body.geometry.attributes.position.array.length; vertexIndex++){		
            var localVertex = body.geometry.attributes.position.array[vertexIndex].clone();
            var globalVertex = localVertex.applyMatrix4( body.matrix );
            var directionVector = globalVertex.sub( body.position );
            
            var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
            var collisionResults = ray.intersectObjects( collidableMeshList );
            if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ){
                healtBar.health -= 25;
                healtBar.setValue(maxHealth);
            }
	    }	

}

    getDistance(x1, z1, x2, z2){
        let xDistance = x2 - x1;
        let zDistance = z2 - z1;
        
        return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(zDistance, 2));
    }

    detectCollsion2(humanBB, body, collisionArray, healtBar, maxHealth, flagObj){

        this.updateBB(humanBB, body)

        if(flagObj == 'wall'){
            for(var i = 0; i < collisionArray.length; i++){
                if(humanBB.intersectsBox(collisionArray['obj'+parseFloat(i)])){
                    console.log("COLLISION WALL!!");
                    healtBar.health -= 25;
                    healtBar.setValue(maxHealth);
                }
            }
        }else{
            for(var i = 0; i < collisionArray.length; i++){
                if(humanBB.intersectsSphere(collisionArray['obj'+parseFloat(i)])){
                    console.log("COLLISION VIRUS!!");
                    healtBar.health -= 75;
                    healtBar.setValue(maxHealth);
                }
            }
        }
    
    }
        


    detectCollsion3(body, objArray, healtBar, maxHealth, flagObj){

        if(flagObj == 'wall'){
            for(var i = 0; i < objArray.length; i++){
                if(this.getDistance(body.position.x, body.position.z, objArray['obj'+parseFloat(i)].position.x, objArray['obj'+parseFloat(i)].position.z) < 0.1){
                    console.log("COLLISION WALL!!");
                    healtBar.health -= 25;
                    healtBar.setValue(maxHealth);
                }
            }
        }else{
            for(var i = 0; i < objArray.length; i++){
                if(this.getDistance(body.position.x, body.position.z, objArray['obj'+parseFloat(i)].position.x, objArray['obj'+parseFloat(i)].position.z) < 0.1 ){
                    console.log("COLLISION VIRUS!!");
                    healtBar.health -= 75;
                    healtBar.setValue(maxHealth);
                }
            }
        }
    
    }


    updateBB(humanBB, body){

        humanBB.copy(body.geometry.boundingBox).applyMatrix4(body.matrixWorld);
        console.log("humanBB pos:  ", + humanBB.position);

    }



}

