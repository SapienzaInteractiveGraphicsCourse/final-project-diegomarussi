import * as THREE from '../libs/three.module.js'


class streetLamp{

    constructor(){

        this.baseLamp;
        this.poleLamp;
        this.headLamp;
        this.bulbLamp;


    }


    createStreetLamp(){

    // --------------------  STREET LAMP  --------------------

        const baseLampHeight = 1.0;
        const baseLampWidth = 0.5;
        const poleLampHeight = 10;
        const poleLampRadius = 0.1;
        const headLampHeight = 0.3;
        const headLampWidth = 1.0;
        const bulbLampRadius = 0.2;

        // ----- BaseLamp -----
        const baseLampGeom = new THREE.BoxGeometry( baseLampWidth, baseLampHeight, baseLampWidth );

        // baseLamp material
        const baseLampMaterial = new THREE.MeshStandardMaterial();
        baseLampMaterial.metalness = 0.7;
        baseLampMaterial.roughness = 0.2;
        baseLampMaterial.color = new THREE.Color(0xdddddd);
        baseLampMaterial.normalMap = golfNormalTexture;

        // baseLamp Mesh
        this.baseLamp = new THREE.Mesh( baseLampGeom, baseLampMaterial );

        // Adding the baseLamp in the Scene
        //scene.add( this.baseLamp );
        this.baseLamp.position.set(-8, 0, -3);
        this.baseLamp.castShadow = true;



        // ----- Pole of the Lamp -----
        const poleLampGeom = new THREE.CylinderGeometry( poleLampRadius, poleLampRadius, poleLampHeight, 16, 8);

        // poleLamp material
        const poleLampMaterial = new THREE.MeshStandardMaterial({
            metalness : 0.7,
            roughness : 0.2,
            color : new THREE.Color(0xdddddd),
            normalMap : golfNormalTexture
        });

        // poleLamp Mesh
        this.poleLamp = new THREE.Mesh(poleLampGeom, poleLampMaterial);

        this.poleLamp.castShadow = true;
        this.poleLamp.position.set(0, 0.5*baseLampHeight, 0);
        // Adding the Pole to the baseLamp
        baseLamp1.add( this.poleLamp );


        // ----- headLamp -----
        const headLampGeom = new THREE.BoxGeometry( headLampWidth, headLampHeight, headLampWidth/2 );

        // headLamp material
        const headLampMaterial = new THREE.MeshStandardMaterial();
        headLampMaterial.metalness = 0.7;
        headLampMaterial.roughness = 0.2;
        headLampMaterial.color = new THREE.Color(0xdddddd);
        headLampMaterial.normalMap = golfNormalTexture;

        // headLamp Mesh
        this.headLamp = new THREE.Mesh( headLampGeom, headLampMaterial );

        // Adding the baseLamp in the Scene
        this.poleLamp.add( this.headLamp );
        this.headLamp.position.set(0.4*headLampWidth, 0.5*poleLampHeight, 0);
        this.headLamp.castShadow = true;



        // ----- bulb of the Lamp -----
        const bulbLampGeom = new THREE.SphereGeometry( bulbLampRadius, 8, 4);

        // poleLamp material
        const bulbLampMaterial = new THREE.MeshStandardMaterial({
            metalness : 0.7,
            roughness : 0.2,
            color : new THREE.Color(0xfff000),
            normalMap : golfNormalTexture
        });

        // bulbLamp Mesh
        this.bulbLamp = new THREE.Mesh(bulbLampGeom, bulbLampMaterial);

        this.bulbLamp.castShadow = true;
        this.bulbLamp.position.set(0.3*headLampWidth, -0.3*headLampHeight, 0);
        // Adding the Pole to the baseLamp
        this.headLamp.add( this.bulbLamp );


    }





}