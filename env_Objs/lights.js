import * as THREE from 'three'
import * as dat from 'dat.gui'

/**
 * <<<<<<<<<<<<<<<<<<<<<<<<<<   LIGHTS   >>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

 var gui = new dat.GUI()

class Lights {

 constructor() {

    this.ambientLight;
    this.sun;
    this.spotLight1;
    this.spotLight2;
    this.createLights();

  }
  
update() {
    // event handling
    // recompute the game state
  }





    createLights() {


        // --------------------  Ambient Light  --------------------
        //this.ambientLight = new THREE.AmbientLight(0x222222)
        //scene.add(this.ambientLight)


        // --------------------  Directional Light  --------------------
        this.sun = new THREE.DirectionalLight(0xffffE0, 0.3)
        this.sun.position.set(0, 10, 1)
        this.sun.castShadow = true
        scene.add(this.sun)

        // const directionalLightHelper = new THREE.DirectionalLightHelper(sun, 0.5, 'red')
        // scene.add(directionalLightHelper)




        // --------------------  SpotLight1  --------------------
        this.spotLight1 = new THREE.SpotLight(0xffffE0, 1.0)
        this.spotLight1.position.set(0, -0.5*this.bulbLampRadius, 0)
        this.spotLight1.target = this.baseLamp1
        //this.spotLight1.angle = Math.PI/6
        this.spotLight1.penumbra = 0.3
        this.spotLight1.castShadow = true

        this.bulbLamp1.add(this.spotLight1)


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
            this.spotLight1.color.set(spotLight1Color.color)
        })

        // const spotLight1Helper = new THREE.PointLightHelper(spotLight1, 0.5, 'blue')
        // scene.add(spotLight1Helper)



        // --------------------  SpotLight2  --------------------
        this.spotLight2 = new THREE.SpotLight(0xffffE0, 1.0)
        this.spotLight2.position.set(0, 0, 0)
        this.spotLight2.target = this.baseLamp2
        //this.spotLight2.angle = Math.PI/6
        this.spotLight2.penumbra = 0.3
        this.spotLight2.castShadow = true

        this.bulbLamp2.add(this.spotLight2)


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
            this.spotLight2.color.set(spotlight2Color.color)
        })

        // const spotLight2Helper = new THREE.PointLightHelper(spotLight2, 0.5, 'blue')
        // scene.add(spotLight2Helper)

        
        }


}

