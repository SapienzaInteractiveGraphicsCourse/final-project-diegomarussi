import * as THREE from '../libs/three_js/three.module.js'


export default class Utils{

getTexture(path){
    //loading texture
    let texture
    const textureLoader = new THREE.TextureLoader()
    return texture = textureLoader.load(path)
    }



}


