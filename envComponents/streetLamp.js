import * as THREE from '../libs/three_js/three.module.js'
import Utils from './utils.js'
// import Env from '/envComponents/world.js'


export default class StreetLamp{

    constructor(x, y, z){

        this.baseLamp;
        this.poleLamp;
        this.headLamp;
        this.bulbLamp;
        this.bulbLampRadius;

        this.x = x;
        this.y = y;
        this.z = z;

        this.utils = new Utils();
        this.createStreetLamp();

    }


    createStreetLamp(){

        //loading texture
        const golfNormalTexture = this.utils.getTexture('../static/texture/streetNormal.png');

    // --------------------  STREET LAMP  --------------------

        const baseLampHeight = 1.0;
        const baseLampWidth = 0.5;
        const poleLampHeight = 6;
        const poleLampRadius = 0.1;
        const headLampHeight = 0.3;
        const headLampWidth = 1.0;
        this.bulbLampRadius = 0.2;

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

        
        this.baseLamp.position.set(this.x, this.y, this.z);
        this.baseLamp.name = "lamp";
        //this.baseLamp.rotation.x = Math.PI
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
        this.poleLamp.position.set(0, 0.5*poleLampHeight, 0);
        // Adding the Pole to the baseLamp
        this.baseLamp.add( this.poleLamp );


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
        const bulbLampGeom = new THREE.SphereGeometry( this.bulbLampRadius, 8, 4);

        // poleLamp material
        const bulbLampMaterial = new THREE.MeshStandardMaterial({
            metalness : 0.3,
            roughness : 0.8,
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


    
    //function place lamps
    // s: fixed angle around y 
    // t: variable angle around z 
    static addStreetLamps(lampsNum, world, worldRadius ){
        // var lonsteps = 12
        // latstep = 24
        var r = worldRadius
        var s = 0
        var leftLamps = [];
        var rightLamps = [];

        //for(var tt = 0; tt <= lonsteps; tt++){
        for(var tt = 0; tt <= lampsNum; tt++){
            //var s = 2*Math.PI * tt / lonsteps;
            //var t = -Math.PI/2 * tt / lampsNum;
            var t = 2*Math.PI * tt / lampsNum;
            
            // var x = r * Math.cos(s) * Math.sin(t);
            // var y = r * Math.sin(s) * Math.sin(t);
            // var z = r * Math.cos(t);

            const pos = new THREE.Vector3();
            pos.setFromSphericalCoords(r, t, s) 
            //console.log(pos);
            

            // Left side street lamps
            leftLamps['streetLampL'+parseFloat(tt)]= new StreetLamp(-10,pos.y,pos.z);
            leftLamps['streetLampL'+parseFloat(tt)].baseLamp.rotation.x -= -t;
            //leftLamps['streetLampL'+parseFloat(tt)].baseLamp.rotation.y = Math.PI;
            world.add(leftLamps['streetLampL'+parseFloat(tt)].baseLamp);

            // Right side street lamps
            rightLamps['streetLampR'+parseFloat(tt)]= new StreetLamp(10,pos.y,pos.z);
            rightLamps['streetLampR'+parseFloat(tt)].baseLamp.rotation.x -= -t;
            rightLamps['streetLampR'+parseFloat(tt)].baseLamp.rotation.y = Math.PI;
            
            world.add(rightLamps['streetLampR'+parseFloat(tt)].baseLamp);
            
        }

        return {rightLamps: rightLamps, leftLamps: leftLamps};

    }



    static objOnSphere(rightLamps, leftLamps, lampsNum, world, worldRadius ){

        rightLamps.reverse().pop()
        leftLamps.reverse().pop()
    
        var t = -Math.PI/2;
        var s = 0;
        //var t = 0
        const pos = new THREE.Vector3();
        pos.setFromSphericalCoords(worldRadius, t, s);
    
        // Left side street lamps
        leftLamps['streetLampL'+parseFloat(lampsNum-1)]= new StreetLamp(-10,pos.y,pos.z);
        leftLamps['streetLampL'+parseFloat(lampsNum-1)].baseLamp.rotation.x -= -t;
        //leftLamps['streetLampL'+parseFloat(tt)].baseLamp.rotation.y = Math.PI;
    
    
        // Right side street lamps
        rightLamps['streetLampR'+parseFloat(lampsNum-1)]= new StreetLamp(10,pos.y,pos.z);
        rightLamps['streetLampR'+parseFloat(lampsNum-1)].baseLamp.rotation.x -= -t;
        rightLamps['streetLampR'+parseFloat(lampsNum-1)].baseLamp.rotation.y = Math.PI;
    
    
        // rightLamps.push(rightLamps['streetLampR'+parseFloat(lampsNum-1)])
        // leftLamps.push(leftLamps['streetLampL'+parseFloat(lampsNum-1)])

        world.add(rightLamps['streetLampR'+parseFloat(lampsNum-1)].baseLamp)
        world.add(leftLamps['streetLampL'+parseFloat(lampsNum-1)].baseLamp)

    
    }



}


