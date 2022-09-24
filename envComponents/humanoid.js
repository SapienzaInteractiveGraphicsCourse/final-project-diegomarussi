import * as THREE from 'three'
import Utils from './utils.js'



export default class Humanoid{


    constructor(){
        this.torso;
        this.head;
        this.rightShoulder;
        this.leftShoulder;
        this.upperLeftArm;
        this.upperRightArm;
        this.rightElbow;
        this.leftElbow;
        this.lowerRightArm;
        this.lowerLeftArm;
        this.rightHand;
        this.leftHand;
        this.rightHip;
        this.leftHip;
        this.upperRightLeg;
        this.upperLeftLeg;
        this.rightKnee;
        this.leftKnee;
        this.lowerRightLeg;
        this.lowerLeftLeg;
        this.rightFoot;
        this.leftFoot;

        this.collideBB;
        
        this.utils = new Utils();
        this.init();

    }



    // ____________________  HUMANOID  ____________________

  
    // ____________  torso  ____________
    init(){

        //loading texture
        const golfNormalTexture = this.utils.getTexture('/texture/streetNormal.png');
        
        

        const torsoHeight = 1.5;
        const torsoWidth = 0.7;
        const headHeight = 0.6;
        const headWidth = 0.6;
        //const headRadius = 0.4;
        const shoulderRadius = 0.2
        const upperArmHeight = 0.6;
        const upperArmWidth  = 0.15;
        const elbowRadius = 0.08;
        const lowerArmHeight = 0.5;
        const lowerArmWidth  = 0.11;
        const handHeight = 0.3;
        const handWidth = 0.08;
        const hipRadius = 0.2;
        const upperLegHeight = 0.8;
        const upperLegWidth  = 0.25;
        const kneeRadius = 0.13;
        const lowerLegHeight = 0.7;
        const lowerLegWidth  = 0.2;
        const footHeight = 0.08;
        const footWidth = 0.25
        const footLenght = 0.55;



        const torsoGeom = new THREE.BoxGeometry( torsoWidth, torsoHeight, torsoWidth )

        // Torso material
        const torsoMaterial = new THREE.MeshStandardMaterial()
        //torsoMaterial.metalness = 0.7
        //torsoMaterial.roughness = 0.2
        torsoMaterial.color = new THREE.Color(0xff0000)
        torsoMaterial.normalMap = golfNormalTexture

        // Torso Mesh
        this.torso = new THREE.Mesh( torsoGeom, torsoMaterial )

        // Adding the Torso in the Scene
        this.torso.position.set(0, footHeight + lowerLegHeight + upperLegHeight + (0.5*torsoHeight), 3)
        this.torso.castShadow = true


        this.collideBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
        this.collideBB.setFromObject(this.torso);
        //const dim = new THREE.Vector3(0.8, 2, 0.8);
        //this.collideBB.setFromCenterAndSize(this.torso.position, dim )
        
        
        


        // ____________  Head  ____________

        const headGeom = new THREE.BoxGeometry( headWidth, headHeight, headWidth )
        //const headGeom = new THREE.SphereGeometry( 0.25, 32, 16 )

        // Head material
        const headMultiMaterial = [
            new THREE.MeshStandardMaterial({ map: this.utils.getTexture('/img/roboticTexture.jpg')}),
            new THREE.MeshStandardMaterial({ map: this.utils.getTexture('/img/roboticTexture.jpg')}),
            new THREE.MeshStandardMaterial({ map: this.utils.getTexture('/img/roboticTexture.jpg')}),
            new THREE.MeshStandardMaterial({ map: this.utils.getTexture('/img/roboticTexture.jpg')}),
            new THREE.MeshStandardMaterial({ map: this.utils.getTexture('/img/smile1.jpg')}),
            new THREE.MeshStandardMaterial({ map: this.utils.getTexture('/img/roboticTexture.jpg')}),
        ]
        //const headMaterial = new THREE.MeshStandardMaterial()
        //headMaterial.metalness = 0.7
        //headMaterial.roughness = 0.2
        //headMaterial.color = new THREE.Color(0xfff000)
        //headMaterial.normalMap = golfNormalTexture

        // Head Mesh
        this.head = new THREE.Mesh( headGeom, headMultiMaterial )

        // Adding the Head on the Torso
        this.head.position.set(0, 0.5 * torsoHeight + 0.6 * headHeight, 0)
        this.head.castShadow = true
        this.torso.add( this.head )
        



        // ____________  right Shoulder  ____________

        const rightShoulderGeom = new THREE.SphereGeometry( shoulderRadius, 16, 32 )

        // rightShoulder  material
        const rightShoulderMaterial = new THREE.MeshStandardMaterial()
        rightShoulderMaterial.normalMap = golfNormalTexture
        rightShoulderMaterial.color = new THREE.Color(0xff0000)

        // RightArm Mesh
        this.rightShoulder = new THREE.Mesh( rightShoulderGeom, rightShoulderMaterial )

        // Adding the RightArm on the Torso
        this.rightShoulder.position.set(0.5*torsoWidth, 0.3*torsoHeight, 0)
        this.rightShoulder.rotation.set(0, 0, -Math.PI*(2/5) )
        this.rightShoulder.castShadow = true
        this.torso.add( this.rightShoulder )



        // ____________  left Shoulder  ____________

        const leftShoulderGeom = new THREE.SphereGeometry( shoulderRadius, 16, 32 )

        // rightShoulder  material
        const leftShoulderMaterial = new THREE.MeshStandardMaterial()
        leftShoulderMaterial.normalMap = golfNormalTexture
        leftShoulderMaterial.color = new THREE.Color(0xff0000)
        

        // RightArm Mesh
        this.leftShoulder = new THREE.Mesh( leftShoulderGeom, leftShoulderMaterial )
        

        // Adding the RightArm on the Torso
        this.leftShoulder.position.set(-0.5*torsoWidth, 0.3*torsoHeight, 0)
        this.leftShoulder.rotation.set(0, 0, Math.PI*(2/5) )
        this.leftShoulder.castShadow = true
        this.torso.add( this.leftShoulder )



        // ____________  upperRight Arm  ____________

        const upperRightArmGeom = new THREE.BoxGeometry( upperArmHeight, upperArmWidth, upperArmWidth )

        // upperRightArm material
        const upperRightArmMaterial = new THREE.MeshStandardMaterial()
        upperRightArmMaterial.normalMap = golfNormalTexture
        upperRightArmMaterial.color = new THREE.Color(0xff0000)

        // RightArm Mesh
        this.upperRightArm = new THREE.Mesh( upperRightArmGeom, upperRightArmMaterial )

        // Adding the RightArm on the Torso
        this.upperRightArm.position.set(2.5*shoulderRadius, 0, 0)
        this.upperRightArm.castShadow = true
        this.rightShoulder.add( this.upperRightArm )



        // ____________  upperLeft Arm  ____________

        const upperLeftArmGeom = new THREE.BoxGeometry( upperArmHeight, upperArmWidth, upperArmWidth )

        // upperLeftArm material
        const upperLeftArmMaterial = new THREE.MeshStandardMaterial()
        upperLeftArmMaterial.normalMap = golfNormalTexture
        upperLeftArmMaterial.color = new THREE.Color(0xff0000)

        // LeftArm Mesh
        this.upperLeftArm = new THREE.Mesh( upperLeftArmGeom, upperLeftArmMaterial )

        // Adding the LeftArm on the Torso
        this.upperLeftArm.position.set(-2.5*shoulderRadius, 0, 0)
        this.upperLeftArm.castShadow = true
        this.leftShoulder.add( this.upperLeftArm )



        // ____________  rightElbow  ____________

        const rightElbowGeom = new THREE.SphereGeometry( elbowRadius, 32, 16 )

        // rightElbow material
        const rightElbowMaterial = new THREE.MeshStandardMaterial()
        rightElbowMaterial.normalMap = golfNormalTexture
        rightElbowMaterial.color = new THREE.Color(0xff0000)

        // rightElbow Mesh
        this.rightElbow = new THREE.Mesh( rightElbowGeom, rightElbowMaterial )

        // Adding the rightElbow on the upperArm
        this.rightElbow.position.set(0.6*upperArmHeight, 0, 0)
        this.rightElbow.rotation.set(0, Math.PI*(2/3), 0)
        this.rightElbow.castShadow = true
        this.upperRightArm.add( this.rightElbow )



        // ____________  leftElbow  ____________

        const leftElbowGeom = new THREE.SphereGeometry( elbowRadius, 32, 16 )

        // leftElbow material
        const leftElbowMaterial = new THREE.MeshStandardMaterial()
        leftElbowMaterial.normalMap = golfNormalTexture
        leftElbowMaterial.color = new THREE.Color(0xff0000)

        // rightElbow Mesh
        this.leftElbow = new THREE.Mesh( leftElbowGeom, leftElbowMaterial )

        // Adding the rightElbow on the upperArm
        this.leftElbow.position.set(-0.6*upperArmHeight, 0, 0)
        this.leftElbow.rotation.set(0, -Math.PI*(2/3), 0)
        this.leftElbow.castShadow = true
        this.upperLeftArm.add( this.leftElbow )




        // ____________  lowerRight Arm  ____________

        const lowerRightArmGeom = new THREE.BoxGeometry( lowerArmHeight, lowerArmWidth, lowerArmWidth )

        // lowerRightArm material
        const lowerRightArmMaterial = new THREE.MeshStandardMaterial()
        lowerRightArmMaterial.normalMap = golfNormalTexture
        lowerRightArmMaterial.color = new THREE.Color(0xff0000)

        // RightArm Mesh
        this.lowerRightArm = new THREE.Mesh( lowerRightArmGeom, lowerRightArmMaterial )

        // Adding the lowerRightArm on the rightElbow
        this.rightElbow.add( this.lowerRightArm )
        this.lowerRightArm.position.set(3*elbowRadius, 0, 0)
        this.lowerRightArm.castShadow = true


        // ____________  lowerLeft Arm  ____________

        const lowerLeftArmGeom = new THREE.BoxGeometry( lowerArmHeight, lowerArmWidth, lowerArmWidth )

        // lowerLeftArm material
        const lowerLeftArmMaterial = new THREE.MeshStandardMaterial()
        lowerLeftArmMaterial.normalMap = golfNormalTexture
        lowerLeftArmMaterial.color = new THREE.Color(0xff0000)

        this.lowerLeftArm = new THREE.Mesh( lowerLeftArmGeom, upperLeftArmMaterial )

        // Adding the lowerLeftArm on the leftElbow
        this.leftElbow.add( this.lowerLeftArm )
        this.lowerLeftArm.position.set(-3*elbowRadius, 0, 0)
        this.lowerLeftArm.castShadow = true



        // ____________  Right Hand  ____________

        const rightHandGeom = new THREE.BoxGeometry( handHeight, handWidth, handHeight )

        // rightHand material
        const rightHandMaterial = new THREE.MeshStandardMaterial()
        rightHandMaterial.normalMap = golfNormalTexture

        this.rightHand = new THREE.Mesh( rightHandGeom, rightHandMaterial )

        // Adding the rightHand on the lowerRightArm
        this.lowerRightArm.add( this.rightHand )
        this.rightHand.position.set(0.7*lowerArmHeight, 0, 0)
        this.rightHand.castShadow = true


        // ____________  Left Hand  ____________

        const leftHandGeom = new THREE.BoxGeometry( handHeight, handWidth, handHeight )

        // leftHand material
        const leftHandMaterial = new THREE.MeshStandardMaterial()
        leftHandMaterial.normalMap = golfNormalTexture

        this.leftHand = new THREE.Mesh( leftHandGeom, leftHandMaterial )

        // Adding the leftHand on the lowerLeftArm
        this.lowerLeftArm.add( this.leftHand )
        this.leftHand.position.set(-0.7*lowerArmHeight, 0, 0)
        this.leftHand.castShadow = true



        // ____________  rightHip  ____________

        const rightHipGeom = new THREE.SphereGeometry( hipRadius, 32, 16 )

        // rightHip material
        const rightHipMaterial = new THREE.MeshStandardMaterial()
        rightHipMaterial.normalMap = golfNormalTexture
        rightHipMaterial.color = new THREE.Color(0x0000aa)

        // LeftLeg Mesh
        this.rightHip = new THREE.Mesh( rightHipGeom, rightHipMaterial )

        // Adding the LeftLeg in the Scene
        this.torso.add( this.rightHip )
        this.rightHip.position.set(0.35*torsoWidth, -0.5*torsoHeight, 0)
        this.rightHip.castShadow = true



        // ____________  leftHip  ____________

        const leftHipGeom = new THREE.SphereGeometry( hipRadius, 32, 16 )

        // leftHip material
        const leftHipMaterial = new THREE.MeshStandardMaterial()
        leftHipMaterial.normalMap = golfNormalTexture
        leftHipMaterial.color = new THREE.Color(0x0000aa)

        // leftHip Mesh
        this.leftHip = new THREE.Mesh( leftHipGeom, leftHipMaterial )

        // Adding the leftHip in the Scene
        this.torso.add( this.leftHip )
        this.leftHip.position.set(-0.35*torsoWidth, -0.5*torsoHeight, 0)
        this.leftHip.castShadow = true

        // ____________  upperRightLeg  ____________

        const upperRightLegGeom = new THREE.BoxGeometry( upperLegWidth, upperLegHeight, upperLegWidth )

        // upperRightLeg material
        const upperRightLegMaterial = new THREE.MeshStandardMaterial()
        //upperRightLegMaterial.metalness = 0.7
        //upperRightLegMaterial.roughness = 0.2
        upperRightLegMaterial.color = new THREE.Color(0x0000aa)
        upperRightLegMaterial.normalMap = golfNormalTexture

        // RightLeg Mesh
        this.upperRightLeg = new THREE.Mesh( upperRightLegGeom, upperRightLegMaterial )

        // Adding the RightLeg on the Torso
        this.rightHip.add( this.upperRightLeg )
        this.upperRightLeg.position.set(0, -2*hipRadius, 0)
        this.upperRightLeg.castShadow = true



        // ____________  upperLeftLeg  ____________

        const upperLeftLegGeom = new THREE.BoxGeometry( upperLegWidth, upperLegHeight, upperLegWidth )

        // upperLeftLeg material
        const upperLeftLegMaterial = new THREE.MeshStandardMaterial()
        upperLeftLegMaterial.normalMap = golfNormalTexture
        upperLeftLegMaterial.color = new THREE.Color(0x0000aa)

        // LeftLeg Mesh
        this.upperLeftLeg = new THREE.Mesh( upperLeftLegGeom, upperLeftLegMaterial )

        // Adding the LeftLeg on the Torso
        this.leftHip.add( this.upperLeftLeg )
        this.upperLeftLeg.position.set(0, -2*hipRadius, 0)
        this.upperLeftLeg.castShadow = true


        // ____________  rightKnee  ____________

        const rightKneeGeom = new THREE.SphereGeometry( kneeRadius, 32, 16 )

        // rightKnee material
        const rightKneeMaterial = new THREE.MeshStandardMaterial()
        rightKneeMaterial.normalMap = golfNormalTexture
        rightKneeMaterial.color = new THREE.Color(0x0000aa)

        // LeftLeg Mesh
        this.rightKnee = new THREE.Mesh( rightKneeGeom, rightKneeMaterial )

        // Adding the LeftLeg in the Scene
        this.upperRightLeg.add( this.rightKnee )
        this.rightKnee.position.set(0, -0.6*upperLegHeight, 0)
        this.rightKnee.castShadow = true


        // ____________  leftKnee  ____________

        const leftKneeGeom = new THREE.SphereGeometry( kneeRadius, 32, 16 )

        // leftKnee material
        const leftKneeMaterial = new THREE.MeshStandardMaterial()
        leftKneeMaterial.normalMap = golfNormalTexture
        leftKneeMaterial.color = new THREE.Color(0x0000aa)

        // LeftLeg Mesh
        this.leftKnee = new THREE.Mesh( leftKneeGeom, leftKneeMaterial )

        // Adding the LeftLeg in the Scene
        this.upperLeftLeg.add( this.leftKnee )
        this.leftKnee.position.set(0, -0.6*upperLegHeight, 0)
        this.leftKnee.castShadow = true


        // ____________  lowerRightLeg  ____________

        const lowerRightLegGeom = new THREE.BoxGeometry( lowerLegWidth, lowerLegHeight, lowerLegWidth )

        // lowerRightLeg material
        const lowerRightLegMaterial = new THREE.MeshStandardMaterial()
        lowerRightLegMaterial.normalMap = golfNormalTexture
        lowerRightLegMaterial.color = new THREE.Color(0x0000aa)

        // RightLeg Mesh
        this.lowerRightLeg = new THREE.Mesh( lowerRightLegGeom, lowerRightLegMaterial )

        // Adding the RightLeg in the Scene
        this.rightKnee.add( this.lowerRightLeg )
        this.lowerRightLeg.position.set(0, -3*kneeRadius, 0)
        this.lowerRightLeg.castShadow = true


        // ____________  lowerLeftLeg  ____________

        const lowerLeftLegGeom = new THREE.BoxGeometry( lowerLegWidth, lowerLegHeight, lowerLegWidth )

        // lowerLeftLeg material
        const lowerLeftLegMaterial = new THREE.MeshStandardMaterial()
        lowerLeftLegMaterial.normalMap = golfNormalTexture
        lowerLeftLegMaterial.color = new THREE.Color(0x0000aa)

        // RightLeg Mesh
        this.lowerLeftLeg = new THREE.Mesh( lowerLeftLegGeom, lowerLeftLegMaterial )

        // Adding the RightLeg in the Scene
        this.leftKnee.add( this.lowerLeftLeg )
        this.lowerLeftLeg.position.set(0, -3*kneeRadius, 0)
        this.lowerLeftLeg.castShadow = true



        // ____________  Right Foot  ____________

        const rightFootGeom = new THREE.BoxGeometry( footWidth, footHeight, footLenght )

        // rightFoot material
        const rightFootMaterial = new THREE.MeshStandardMaterial()
        rightFootMaterial.normalMap = golfNormalTexture
        rightFootMaterial.color = new THREE.Color('black')

        // rightFoot Mesh
        this.rightFoot = new THREE.Mesh( rightFootGeom, rightFootMaterial )

        // Adding the rightFoot on the lowerRightLeg
        this.lowerRightLeg.add( this.rightFoot )
        this.rightFoot.position.set(0, -0.55*lowerLegHeight, -0.6*lowerLegWidth)
        this.rightFoot.castShadow = true


        // ____________  Left Foot  ____________

        const leftFootGeom = new THREE.BoxGeometry( footWidth, footHeight, footLenght )

        // leftFoot material
        const leftFootMaterial = new THREE.MeshStandardMaterial()
        leftFootMaterial.normalMap = golfNormalTexture
        leftFootMaterial.color = new THREE.Color('black')

        // rightFoot Mesh
        this.leftFoot = new THREE.Mesh( leftFootGeom, leftFootMaterial )

        // Adding the leftFoot on the lowerRightLeg
        this.lowerLeftLeg.add( this.leftFoot )
        this.leftFoot.position.set(0, -0.55*lowerLegHeight, -0.6*lowerLegWidth)
        this.leftFoot.castShadow = true

    }

}