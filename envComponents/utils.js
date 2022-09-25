import * as THREE from 'three';


export default class Utils{

getTexture(path){
    //loading texture
    let texture
    const textureLoader = new THREE.TextureLoader()
    return texture = textureLoader.load(path)
    }



}


