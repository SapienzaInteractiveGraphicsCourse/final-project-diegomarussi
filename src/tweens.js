import * as TWEEN from '@tweenjs/tween.js';
import Humanoid from '../envComponents/humanoid.js'
import { SunLight } from '../envComponents/light.js';

export default class Tweens{


    constructor(human, sun, spotL1, spotL2){

        this.tweenRightLeg1;
        this.tweenRightLeg2;
        this.tweenRightLeg3;
        this.tweenRightLeg4;

        this.tweenLeftLeg1;
        this.tweenLeftLeg2;
        this.tweenLeftLeg3;
        this.tweenLeftLeg4;

        this.tweenRightArm1;
        this.tweenRightArm2;
        this.tweenRightArm3;
        this.tweenRightArm4;

        this.tweenLeftArm1;
        this.tweenLeftArm2;
        this.tweenLeftArm3;
        this.tweenLeftArm4;

        this.tweenSunLum;
        this.tweenSunPos;


        this.h = human;
        this.s = sun;
        this.spotl1 = spotL1;
        this.spotl2 = spotL2;
        this.initHumanTweens();
        this.initLightsTweens();

    }


    // ___________________ TWEENS ____________________


    initHumanTweens(){

        const quadraticEasy = TWEEN.Easing.Quadratic.InOut
        const easy = TWEEN.Easing.Circular.InOut
        const sinEasy = TWEEN.Easing.Sinusoidal.InOut

        var velTime = 200

        // ----- LEGS -----
        this.tweenRightLeg1 = new TWEEN.Tween({xRotation: -Math.PI/4, yRotation:0, zRotation:0} )
        .to({xRotation: Math.PI/3, yRotation:0 , zRotation:0}, velTime)
            .onUpdate((coords)=> {
                this.h.rightHip.rotation.set(coords.xRotation, coords.yRotation, coords.zRotation)

                new TWEEN.Tween({x2Rotation: -Math.PI/4, y2Rotation:0, z2Rotation:0} )
                .to({x2Rotation: -Math.PI/6, y2Rotation:0 , z2Rotation:0}, velTime)
                    .onUpdate((coords)=> {
                        this.h.rightKnee.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
                        this.h.rightFoot.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
                    })
                    .easing(easy)
                    .start()
            })
            .easing(easy)
            //.repeat(Infinity)
            //.delay(100)
            
        this.tweenRightLeg2 = new TWEEN.Tween({xRotation: Math.PI/3, yRotation:0, zRotation:0} )
            .to({xRotation: Math.PI/6, yRotation:0 , zRotation:0}, velTime)
                .onUpdate((coords)=> {
                    this.h.rightHip.rotation.set(coords.xRotation, coords.yRotation, coords.zRotation)

            new TWEEN.Tween({x2Rotation: -Math.PI/6, y2Rotation:0, z2Rotation:0} )
            .to({x2Rotation: 0, y2Rotation:0 , z2Rotation:0}, velTime)
                .onUpdate((coords)=> {
                    this.h.rightKnee.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
                    this.h.rightFoot.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
                })
                .easing(easy)
                .start()


            })
            .easing(easy)
            //.repeat(Infinity)
            //.delay(100)

        this.tweenRightLeg3 = new TWEEN.Tween({xRotation: Math.PI/6, yRotation:0, zRotation:0} )
            .to({xRotation: 0, yRotation:0 , zRotation:0}, velTime)
                .onUpdate((coords)=> {
                    this.h.rightHip.rotation.set(coords.xRotation, coords.yRotation, coords.zRotation)

            new TWEEN.Tween({x2Rotation: 0, y2Rotation:0, z2Rotation:0} )
            .to({x2Rotation: -Math.PI/4, y2Rotation:0 , z2Rotation:0}, velTime)
                .onUpdate((coords)=> {
                    this.h.rightKnee.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
                    this.h.rightFoot.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
                })
                .easing(easy)
                .start()


        })
        .easing(TWEEN.Easing.Quartic.InOut)
        //.repeat(Infinity)
        //.delay(100)

        this.tweenRightLeg4 = new TWEEN.Tween({xRotation: 0, yRotation:0, zRotation:0} )
            .to({xRotation: -Math.PI/4, yRotation:0 , zRotation:0}, velTime)
                .onUpdate((coords)=> {
                    this.h.rightHip.rotation.set(coords.xRotation, coords.yRotation, coords.zRotation)

            new TWEEN.Tween({x2Rotation: -Math.PI/4, y2Rotation:0, z2Rotation:0} )
            .to({x2Rotation: -Math.PI/4, y2Rotation:0 , z2Rotation:0}, velTime)
                .onUpdate((coords)=> {
                    this.h.rightKnee.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
                    this.h.rightFoot.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
                })
                .easing(easy)
                .start()
        })
        .easing(easy)
        //.repeat(Infinity)
        //.delay(100)




        this.tweenLeftLeg1 = new TWEEN.Tween({xRotation: Math.PI/6, yRotation:0, zRotation:0} )
            .to({xRotation: 0, yRotation:0 , zRotation:0}, velTime)
                .onUpdate((coords)=> {
                    this.h.leftHip.rotation.set(coords.xRotation, coords.yRotation, coords.zRotation)

            new TWEEN.Tween({x2Rotation: 0, y2Rotation:0, z2Rotation:0} )
            .to({x2Rotation: -Math.PI/6, y2Rotation:0 , z2Rotation:0}, velTime)
                .onUpdate((coords)=> {
                    this.h.leftKnee.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
                    this.h.leftFoot.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
                })
                .easing(easy)
                .start()
        })
        .easing(easy)
        //.repeat(Infinity)
        //.delay(100)

        this.tweenLeftLeg2 = new TWEEN.Tween({xRotation: 0, yRotation:0, zRotation:0} )
            .to({xRotation: -Math.PI/4, yRotation:0 , zRotation:0}, velTime)
                .onUpdate((coords)=> {
                    this.h.leftHip.rotation.set(coords.xRotation, coords.yRotation, coords.zRotation)

            new TWEEN.Tween({x2Rotation: -Math.PI/6, y2Rotation:0, z2Rotation:0} )
            .to({x2Rotation: -Math.PI/4, y2Rotation:0 , z2Rotation:0}, velTime)
                .onUpdate((coords)=> {
                    this.h.leftKnee.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
                    this.h.leftFoot.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
                })
                .easing(easy)
                .start()
        })
        .easing(easy)
        //.repeat(Infinity)
        //.delay(100)

        this.tweenLeftLeg3 = new TWEEN.Tween({xRotation: -Math.PI/4, yRotation:0, zRotation:0} )
            .to({xRotation: Math.PI/3, yRotation:0 , zRotation:0}, velTime)
                .onUpdate((coords)=> {
                    this.h.leftHip.rotation.set(coords.xRotation, coords.yRotation, coords.zRotation)

            new TWEEN.Tween({x2Rotation: -Math.PI/4, y2Rotation:0, z2Rotation:0} )
            .to({x2Rotation: -Math.PI/4, y2Rotation:0 , z2Rotation:0}, velTime)
                .onUpdate((coords)=> {
                    this.h.leftKnee.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
                    this.h.leftFoot.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
                })
                .easing(easy)
                .start()
            })
            .easing(easy)
            //.repeat(Infinity)
            //.delay(100)
            
        this.tweenLeftLeg4 = new TWEEN.Tween({xRotation: Math.PI/3, yRotation:0, zRotation:0} )
            .to({xRotation: Math.PI/6, yRotation:0 , zRotation:0}, velTime)
                .onUpdate((coords)=> {
                    this.h.leftHip.rotation.set(coords.xRotation, coords.yRotation, coords.zRotation)

            new TWEEN.Tween({x2Rotation: -Math.PI/4, y2Rotation:0, z2Rotation:0} )
            .to({x2Rotation: -Math.PI/6, y2Rotation:0 , z2Rotation:0}, velTime)
                .onUpdate((coords)=> {
                    this.h.leftKnee.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
                    this.h.leftFoot.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
                })
                .easing(easy)
                .start()
            })
            .easing(easy)
            //.repeat(Infinity)
            //.delay(100)




        this.tweenRightLeg1.chain(this.tweenRightLeg2)
        this.tweenRightLeg2.chain(this.tweenRightLeg3)
        this.tweenRightLeg3.chain(this.tweenRightLeg4)
        this.tweenRightLeg4.chain(this.tweenRightLeg1)

        this.tweenRightLeg1.start()
        //this.tweenRightupperLeg.stop()

        this.tweenLeftLeg1.chain(this.tweenLeftLeg2)
        this.tweenLeftLeg2.chain(this.tweenLeftLeg3)
        this.tweenLeftLeg3.chain(this.tweenLeftLeg4)
        this.tweenLeftLeg4.chain(this.tweenLeftLeg1)

        this.tweenLeftLeg1.start()
        //this.tweenLeftLeg1.stop()




        // ----- ARMS -----

        // ----- Right Arm -----
        this.tweenRightArm1 = new TWEEN.Tween({xRotation: 0} )
        .to({xRotation: -Math.PI/4}, velTime)
                .onUpdate((coords)=> {
                    this.h.rightShoulder.rotation.x = coords.xRotation

            new TWEEN.Tween({TyRotation:0} )
            .to({TyRotation: -Math.PI/30}, velTime)
                .onUpdate((coords)=> {
                    //this.h.torso.rotation.y = coords.TyRotation
                })
                .easing(sinEasy)
                .start()

            })
            .easing(easy)
            //.repeat(Infinity)
            //.delay(100)
            
        this.tweenRightArm2 = new TWEEN.Tween({xRotation: -Math.PI/4} )
        .to({xRotation: 0}, velTime)
                .onUpdate((coords)=> {
                    this.h.rightShoulder.rotation.x = coords.xRotation

            new TWEEN.Tween({TyRotation:-Math.PI/30} )
            .to({TyRotation: 0}, velTime)
                .onUpdate((coords)=> {
                    //this.h.torso.rotation.y = coords.TyRotation
                })
                .easing(sinEasy)
                .start()

            })
            .easing(easy)
            //.repeat(Infinity)
            //.delay(100)

        this.tweenRightArm3 = new TWEEN.Tween({xRotation: 0} )
        .to({xRotation: Math.PI/4}, velTime)
                .onUpdate((coords)=> {
                    //this.h.rightShoulder.rotation.x = coords.xRotation

            new TWEEN.Tween({TyRotation: 0} )
            .to({TyRotation: Math.PI/30}, velTime)
                .onUpdate((coords)=> {
                    //this.h.torso.rotation.y = coords.TyRotation
                })
                .easing(sinEasy)
                .start()

        })
        .easing(easy)
        //.repeat(Infinity)
        //.delay(100)

        this.tweenRightArm4 = new TWEEN.Tween({xRotation: Math.PI/4} )
        .to({xRotation: 0}, velTime)
                .onUpdate((coords)=> {
                    this.h.rightShoulder.rotation.x = coords.xRotation

            new TWEEN.Tween({TyRotation:Math.PI/30} )
            .to({TyRotation: 0}, velTime)
                .onUpdate((coords)=> {
                    //this.h.torso.rotation.y = coords.TyRotation
                })
                .easing(sinEasy)
                .start()
        })
        .easing(easy)
        //.repeat(Infinity)
        //.delay(100)


        // ----- Left Arm -----
        this.tweenLeftArm1 = new TWEEN.Tween({xRotation: 0} )
        .to({xRotation: Math.PI/4}, velTime)
            .onUpdate((coords)=> {
                this.h.leftShoulder.rotation.x = coords.xRotation
            })
            .easing(easy)
            //.repeat(Infinity)
            //.delay(100)
            
        this.tweenLeftArm2 = new TWEEN.Tween({xRotation: Math.PI/4} )
        .to({xRotation: 0}, velTime)
            .onUpdate((coords)=> {
                this.h.leftShoulder.rotation.x = coords.xRotation
            })
            .easing(easy)
            //.repeat(Infinity)
            //.delay(100)

        this.tweenLeftArm3 = new TWEEN.Tween({xRotation: 0} )
        .to({xRotation: -Math.PI/4}, velTime)
            .onUpdate((coords)=> {
                this.h.leftShoulder.rotation.x = coords.xRotation
            })
            .easing(easy)
            //.repeat(Infinity)
            //.delay(100)

        this.tweenLeftArm4 = new TWEEN.Tween({xRotation: -Math.PI/4} )
        .to({xRotation: 0}, velTime)
            .onUpdate((coords)=> {
                this.h.leftShoulder.rotation.x = coords.xRotation
            })
            .easing(easy)
            //.repeat(Infinity)
            //.delay(100)


        this.tweenRightArm1.chain(this.tweenRightArm2)
        this.tweenRightArm2.chain(this.tweenRightArm3)
        this.tweenRightArm3.chain(this.tweenRightArm4)
        this.tweenRightArm4.chain(this.tweenRightArm1)

        this.tweenRightArm1.start()
        //this.tweenRightArm1.stop()

        this.tweenLeftArm1.chain(this.tweenLeftArm2)
        this.tweenLeftArm2.chain(this.tweenLeftArm3)
        this.tweenLeftArm3.chain(this.tweenLeftArm4)
        this.tweenLeftArm4.chain(this.tweenLeftArm1)

        this.tweenLeftArm1.start()
        //this.tweenLeftArm1.stop()


    }





    initLightsTweens(){

        // ________________ TWEEN LIGHTS ________________

        this.tweenSunLum = new TWEEN.Tween({lum: 0.05} )
        .to({lum: 1.0}, 10000)
            .onUpdate((value)=> {
                this.s.intensity = value.lum
        
            })
            .easing(TWEEN.Easing.Sinusoidal.InOut)
            .yoyo(true)
            .repeat(Infinity)
            //.delay(100)

            this.tweenSunLum.start()


        this.tweenSunPos = new TWEEN.Tween({x:-20, z:3} )
        .to({x:20, z:-3}, 20000)
            .onUpdate((value)=> {
                this.s.position.x = value.x
                this.s.position.z = value.z
            })
            .easing(TWEEN.Easing.Sinusoidal.InOut)
            .repeat(Infinity)
            //.delay(100)

            this.tweenSunPos.start()



            this.tweenSpotLum = new TWEEN.Tween({lum: 1.0} )
            .to({lum: 0.05}, 10000)
                .onUpdate((value)=> {
                    this.spotl1.intensity = value.lum
                    this.spotl2.intensity = value.lum
            
                })
                .easing(TWEEN.Easing.Sinusoidal.InOut)
                .yoyo(true)
                .repeat(Infinity)
                //.delay(100)
    
                this.tweenSpotLum.start()

    }



}