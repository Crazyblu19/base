
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
 import { Engine } from '../types/Engine'

export async function loadRobot(engine: Engine) {
  const loader = new FBXLoader();
  const robot = await loader.loadAsync("./Robot.fbx")

  robot.scale.setScalar(0.01)
  engine.animations = robot.animations
  const res = SkeletonUtils.clone(robot)
  return res
}
/*
  loader.load("./Robot.fbx", (fbx) => {
    animationsMap = loadModel(fbx, 0.01);

    console.log(animationsMap)
    characterControls = new CharacterControls(model, mixer,
      animationsMap, controls,
      camera,  'Punch',
      new RAPIER.Ray(
        { x: 0, y: 0, z: 0 },
        { x: 0, y: -1, z: 0}
      ), characterRigidBody)
    })


  function loadAssets(fbx : any, scalar : number) {
    model = fbx
    animations = fbx.animations

    model.scale.setScalar(scalar)
    model.traverse(c  => {
      c.castShadow = true;
    })

    mixer = new AnimationMixer(model);
    const animationsMap: Map<string, THREE.AnimationAction> = new Map();
    model.animations.filter(a => a.name != 'TPose').forEach((a: any) => {
      let name = a.name.replace("RobotArmature|Robot_", "")
      switch(name) {
        case "Running":
        name = "Run";
        break;
        case "Walking":
        name = "Walk";
        break;
      }

      animationsMap.set(name, mixer.clipAction(a));

    })

    scene.add(model)
    return animationsMap
  }
  */
