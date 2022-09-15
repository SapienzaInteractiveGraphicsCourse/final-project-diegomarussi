import * as TWEEN from '../libs/tween.umd.js';
import * as TWEEN from '../libs/tween.esm.js';

import Humanoid from '../env_Objs/humanoid.js'

class Tweens{


    


    // ___________________ TWEENS ____________________


    initHumanTweens(){

        const quadraticEasy = TWEEN.Easing.Quadratic.InOut
        const easy = TWEEN.Easing.Circular.InOut
        const sinEasy = TWEEN.Easing.Sinusoidal.InOut

        var velTime = 200

        // ----- LEGS -----
        const tweenRightLeg1 = new TWEEN.Tween({xRotation: -Math.PI/4, yRotation:0, zRotation:0} )
        .to({xRotation: Math.PI/3, yRotation:0 , zRotation:0}, velTime)
            .onUpdate((coords)=> {
                rightHip.rotation.set(coords.xRotation, coords.yRotation, coords.zRotation)

                new TWEEN.Tween({x2Rotation: -Math.PI/4, y2Rotation:0, z2Rotation:0} )
                .to({x2Rotation: -Math.PI/6, y2Rotation:0 , z2Rotation:0}, velTime)
                    .onUpdate((coords)=> {
                        rightKnee.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
                        rightFoot.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
                    })
                    .easing(easy)
                    .start()
            })
            .easing(easy)
            //.repeat(Infinity)
            //.delay(100)
            
        const tweenRightLeg2 = new TWEEN.Tween({xRotation: Math.PI/3, yRotation:0, zRotation:0} )
            .to({xRotation: Math.PI/6, yRotation:0 , zRotation:0}, velTime)
                .onUpdate((coords)=> {
                    rightHip.rotation.set(coords.xRotation, coords.yRotation, coords.zRotation)

            new TWEEN.Tween({x2Rotation: -Math.PI/6, y2Rotation:0, z2Rotation:0} )
            .to({x2Rotation: 0, y2Rotation:0 , z2Rotation:0}, velTime)
                .onUpdate((coords)=> {
                    rightKnee.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
                    rightFoot.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
                })
                .easing(easy)
                .start()


            // new TWEEN.Tween({TxRotation: 0, TyRotation:0, TzRotation:0} )
            // .to({TxRotation: -Math.PI/20, TyRotation:0 , TzRotation:0}, velTime)
            //     .onUpdate((coords)=> {
            //         torso.rotation.set(coords.TxRotation, coords.TyRotation, coords.TzRotation)
            //     })
            //     .easing(easy)
            //     .start()

            })
            .easing(easy)
            //.repeat(Infinity)
            //.delay(100)

        const tweenRightLeg3 = new TWEEN.Tween({xRotation: Math.PI/6, yRotation:0, zRotation:0} )
            .to({xRotation: 0, yRotation:0 , zRotation:0}, velTime)
                .onUpdate((coords)=> {
                    rightHip.rotation.set(coords.xRotation, coords.yRotation, coords.zRotation)

            new TWEEN.Tween({x2Rotation: 0, y2Rotation:0, z2Rotation:0} )
            .to({x2Rotation: -Math.PI/4, y2Rotation:0 , z2Rotation:0}, velTime)
                .onUpdate((coords)=> {
                    rightKnee.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
                    rightFoot.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
                })
                .easing(easy)
                .start()

            // new TWEEN.Tween({TxRotation: -Math.PI/20, TyRotation:0, TzRotation:0} )
            // .to({TxRotation: 0, TyRotation:0 , TzRotation:0}, velTime)
            //     .onUpdate((coords)=> {
            //         torso.rotation.set(coords.TxRotation, coords.TyRotation, coords.TzRotation)
            //     })
            //     .easing(easy)
            //     .start()

        })
        .easing(TWEEN.Easing.Quartic.InOut)
        //.repeat(Infinity)
        //.delay(100)

        const tweenRightLeg4 = new TWEEN.Tween({xRotation: 0, yRotation:0, zRotation:0} )
            .to({xRotation: -Math.PI/4, yRotation:0 , zRotation:0}, velTime)
                .onUpdate((coords)=> {
                    rightHip.rotation.set(coords.xRotation, coords.yRotation, coords.zRotation)

            new TWEEN.Tween({x2Rotation: -Math.PI/4, y2Rotation:0, z2Rotation:0} )
            .to({x2Rotation: -Math.PI/4, y2Rotation:0 , z2Rotation:0}, velTime)
                .onUpdate((coords)=> {
                    rightKnee.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
                    rightFoot.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
                })
                .easing(easy)
                .start()
        })
        .easing(easy)
        //.repeat(Infinity)
        //.delay(100)




        const tweenLeftLeg1 = new TWEEN.Tween({xRotation: Math.PI/6, yRotation:0, zRotation:0} )
            .to({xRotation: 0, yRotation:0 , zRotation:0}, velTime)
                .onUpdate((coords)=> {
                    leftHip.rotation.set(coords.xRotation, coords.yRotation, coords.zRotation)

            new TWEEN.Tween({x2Rotation: 0, y2Rotation:0, z2Rotation:0} )
            .to({x2Rotation: -Math.PI/6, y2Rotation:0 , z2Rotation:0}, velTime)
                .onUpdate((coords)=> {
                    leftKnee.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
                    leftFoot.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
                })
                .easing(easy)
                .start()
        })
        .easing(easy)
        //.repeat(Infinity)
        //.delay(100)

        const tweenLeftLeg2 = new TWEEN.Tween({xRotation: 0, yRotation:0, zRotation:0} )
            .to({xRotation: -Math.PI/4, yRotation:0 , zRotation:0}, velTime)
                .onUpdate((coords)=> {
                    leftHip.rotation.set(coords.xRotation, coords.yRotation, coords.zRotation)

            new TWEEN.Tween({x2Rotation: -Math.PI/6, y2Rotation:0, z2Rotation:0} )
            .to({x2Rotation: -Math.PI/4, y2Rotation:0 , z2Rotation:0}, velTime)
                .onUpdate((coords)=> {
                    leftKnee.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
                    leftFoot.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
                })
                .easing(easy)
                .start()
        })
        .easing(easy)
        //.repeat(Infinity)
        //.delay(100)

        const tweenLeftLeg3 = new TWEEN.Tween({xRotation: -Math.PI/4, yRotation:0, zRotation:0} )
        .to({xRotation: Math.PI/3, yRotation:0 , zRotation:0}, velTime)
            .onUpdate((coords)=> {
                leftHip.rotation.set(coords.xRotation, coords.yRotation, coords.zRotation)

                new TWEEN.Tween({x2Rotation: -Math.PI/4, y2Rotation:0, z2Rotation:0} )
                .to({x2Rotation: -Math.PI/4, y2Rotation:0 , z2Rotation:0}, velTime)
                    .onUpdate((coords)=> {
                        leftKnee.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
                        leftFoot.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
                    })
                    .easing(easy)
                    .start()
            })
            .easing(easy)
            //.repeat(Infinity)
            //.delay(100)
            
        const tweenLeftLeg4 = new TWEEN.Tween({xRotation: Math.PI/3, yRotation:0, zRotation:0} )
            .to({xRotation: Math.PI/6, yRotation:0 , zRotation:0}, velTime)
                .onUpdate((coords)=> {
                    leftHip.rotation.set(coords.xRotation, coords.yRotation, coords.zRotation)

            new TWEEN.Tween({x2Rotation: -Math.PI/4, y2Rotation:0, z2Rotation:0} )
            .to({x2Rotation: -Math.PI/6, y2Rotation:0 , z2Rotation:0}, velTime)
                .onUpdate((coords)=> {
                    leftKnee.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
                    leftFoot.rotation.set(coords.x2Rotation, coords.y2Rotation, coords.z2Rotation)
                })
                .easing(easy)
                .start()
            })
            .easing(easy)
            //.repeat(Infinity)
            //.delay(100)




        tweenRightLeg1.chain(tweenRightLeg2)
        tweenRightLeg2.chain(tweenRightLeg3)
        tweenRightLeg3.chain(tweenRightLeg4)
        tweenRightLeg4.chain(tweenRightLeg1)

        tweenRightLeg1.start()
        //tweenRightupperLeg.stop()

        tweenLeftLeg1.chain(tweenLeftLeg2)
        tweenLeftLeg2.chain(tweenLeftLeg3)
        tweenLeftLeg3.chain(tweenLeftLeg4)
        tweenLeftLeg4.chain(tweenLeftLeg1)

        tweenLeftLeg1.start()
        //tweenLeftLeg1.stop()




        // ----- ARMS -----

        // ----- Right Arm -----
        const tweenRightArm1 = new TWEEN.Tween({xRotation: 0} )
        .to({xRotation: -Math.PI/4}, velTime)
                .onUpdate((coords)=> {
                    rightShoulder.rotation.x = coords.xRotation

            new TWEEN.Tween({TyRotation:0} )
            .to({TyRotation: -Math.PI/30}, velTime)
                .onUpdate((coords)=> {
                    torso.rotation.y = coords.TyRotation
                })
                .easing(sinEasy)
                .start()

            })
            .easing(easy)
            //.repeat(Infinity)
            //.delay(100)
            
        const tweenRightArm2 = new TWEEN.Tween({xRotation: -Math.PI/4} )
        .to({xRotation: 0}, velTime)
                .onUpdate((coords)=> {
                    rightShoulder.rotation.x = coords.xRotation

            new TWEEN.Tween({TyRotation:-Math.PI/30} )
            .to({TyRotation: 0}, velTime)
                .onUpdate((coords)=> {
                    torso.rotation.y = coords.TyRotation
                })
                .easing(sinEasy)
                .start()

            })
            .easing(easy)
            //.repeat(Infinity)
            //.delay(100)

        const tweenRightArm3 = new TWEEN.Tween({xRotation: 0} )
        .to({xRotation: Math.PI/4}, velTime)
                .onUpdate((coords)=> {
                    rightShoulder.rotation.x = coords.xRotation

            new TWEEN.Tween({TyRotation: 0} )
            .to({TyRotation: Math.PI/30}, velTime)
                .onUpdate((coords)=> {
                    torso.rotation.y = coords.TyRotation
                })
                .easing(sinEasy)
                .start()

        })
        .easing(easy)
        //.repeat(Infinity)
        //.delay(100)

        const tweenRightArm4 = new TWEEN.Tween({xRotation: Math.PI/4} )
        .to({xRotation: 0}, velTime)
                .onUpdate((coords)=> {
                    rightShoulder.rotation.x = coords.xRotation

            new TWEEN.Tween({TyRotation:Math.PI/30} )
            .to({TyRotation: 0}, velTime)
                .onUpdate((coords)=> {
                    torso.rotation.y = coords.TyRotation
                })
                .easing(sinEasy)
                .start()
        })
        .easing(easy)
        //.repeat(Infinity)
        //.delay(100)


        // ----- Left Arm -----
        const tweenLeftArm1 = new TWEEN.Tween({xRotation: 0} )
        .to({xRotation: Math.PI/4}, velTime)
            .onUpdate((coords)=> {
                leftShoulder.rotation.x = coords.xRotation
            })
            .easing(easy)
            //.repeat(Infinity)
            //.delay(100)
            
        const tweenLeftArm2 = new TWEEN.Tween({xRotation: Math.PI/4} )
        .to({xRotation: 0}, velTime)
            .onUpdate((coords)=> {
                leftShoulder.rotation.x = coords.xRotation
            })
            .easing(easy)
            //.repeat(Infinity)
            //.delay(100)

        const tweenLeftArm3 = new TWEEN.Tween({xRotation: 0} )
        .to({xRotation: -Math.PI/4}, velTime)
            .onUpdate((coords)=> {
                leftShoulder.rotation.x = coords.xRotation
            })
            .easing(easy)
            //.repeat(Infinity)
            //.delay(100)

        const tweenLeftArm4 = new TWEEN.Tween({xRotation: -Math.PI/4} )
        .to({xRotation: 0}, velTime)
            .onUpdate((coords)=> {
                leftShoulder.rotation.x = coords.xRotation
            })
            .easing(easy)
            //.repeat(Infinity)
            //.delay(100)


        tweenRightArm1.chain(tweenRightArm2)
        tweenRightArm2.chain(tweenRightArm3)
        tweenRightArm3.chain(tweenRightArm4)
        tweenRightArm4.chain(tweenRightArm1)

        tweenRightArm1.start()
        //tweenRightArm1.stop()

        tweenLeftArm1.chain(tweenLeftArm2)
        tweenLeftArm2.chain(tweenLeftArm3)
        tweenLeftArm3.chain(tweenLeftArm4)
        tweenLeftArm4.chain(tweenLeftArm1)

        tweenLeftArm1.start()
        //tweenLeftArm1.stop()


    }





    initLightsTweens(){

        // ________________ TWEEN LIGHTS ________________

        const tweenSun = new TWEEN.Tween({lum: 0.1} )
        .to({lum: 1}, 10000)
            .onUpdate((value)=> {
                sun.intensity = value.lum
            })
            .easing(TWEEN.Easing.Sinusoidal.InOut)
            .yoyo(true)
            .repeat(Infinity)
            //.delay(100)

        tweenSun.start()

    }



}