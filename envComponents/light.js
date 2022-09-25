// import { GUI } from 'dat.gui';
import * as THREE from '../libs/three_js/three.module.js'
import StreetLamp from './streetLamp.js';

/**
 * <<<<<<<<<<<<<<<<<<<<<<<<<<   LIGHTS   >>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */


export class SunLight {

 constructor(x, y, z, gui) {

    this.sun;
    this.sunHelper;
    this.x = x;
    this.y = y;
    this.z = z;

    this.createSun(gui);

  }


    createSun(gui) {

        // --------------------  Directional Light  --------------------
        //this.sun = new THREE.DirectionalLight(0xffffE0, 0.3)
        this.sun = new THREE.DirectionalLight(0xffffE0, 0.3)
        this.sun.position.set(this.x, this.y, this.z)
        this.sun.castShadow = true
        //this.sun.shadow.camera.position.set(0, 30, 0)
        this.sun.shadow.camera.scale.set(4, 4, 1)



        // Add a folder in the GUI command relative to an object, for ordering purposes
        const light = gui.addFolder('SunLight control')

        //light.add(this.sun.position, 'x').min(-20).max(20).step(1.0)
        light.add(this.sun.position, 'y').min(-5).max(50).step(1.0)
        //light.add(this.sun.position, 'z').min(-20).max(20).step(1.0)
        light.add(this.sun, 'intensity').min(0).max(5).step(0.1)

        // Change color on GUI
        const sunLightColor = {
            color: 0xffffE0
        }
        light.addColor(sunLightColor, 'color').onChange(() => {
            this.sun.color.set(sunLightColor.color)
        })

        this.sunHelper = new THREE.CameraHelper( this.sun.shadow.camera, 'red' );

        // const directionalLightHelper = new THREE.DirectionalLightHelper(sun, 0.5, 'red')

    }

}
  


export class SpotLight {

    constructor(x, y, z, gui, guiFolder) {

       this.spotLight;
       this.x = x;
       this.y = y;
       this.z = z;
   
       this.streetLamp = new StreetLamp();
       this.createSpotLightCenter(this.x, this.y, this.z, gui, guiFolder);
   
     }



    createSpotLightCenter(x, y, z, gui, guiFolder){
        
        // --------------------  SpotLight  --------------------
        this.spotLight = new THREE.SpotLight(0xffffE0, 1.0)
        this.spotLight.position.set(x, y, z)
        this.spotLight.target = null
        //this.spotLight.angle = Math.PI/6
        this.spotLight.penumbra = 0.3
        this.spotLight.castShadow = true


        // Add a folder in the GUI command relative to an object, for ordering purposes
        const light = gui.addFolder(guiFolder)

        light.add(this.spotLight.position, 'x').min(-20).max(20).step(1.0)
        light.add(this.spotLight.position, 'y').min(-5).max(50).step(1.0)
        light.add(this.spotLight.position, 'z').min(-20).max(20).step(1.0)
        light.add(this.spotLight, 'intensity').min(0).max(5).step(0.1)
        light.add(this.spotLight, 'penumbra').min(0).max(1.0).step(0.1)

        // Change color on GUI
        const spotLightColor = {
            color: 0xffffE0
        }
        light.addColor(spotLightColor, 'color').onChange(() => {
            this.spotLight.color.set(spotLightColor.color)
        })
  
    }


}

