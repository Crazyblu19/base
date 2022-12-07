import { IWorld, addEntity } from 'bitecs'
import * as THREE from 'three'

import { Transform } from "../components/Transform"
import { addMixer } from "../components/mixer"
import { Animated } from "../components/Animations"
import { Group3DEntity } from "../types/Group3DEntity"
import { Engine } from '../types/Engine'

import { loadRobot } from '../models/AssetLoader'

export const createRobotEntity = async (
  engine: Engine,
  materialMain = new THREE.MeshBasicMaterial( { wireframe: true } )
): Promise<Group3DEntity> => {
  const { world, robotAnimations } = engine

  const eid = addEntity(world)

  const robot  = await loadRobot(engine) as unknown as Group3DEntity
  robot.eid = eid
  engine.playersModels.set(eid, robot)

  const mixer = new THREE.AnimationMixer(robot);
  robotAnimations.set(eid, new Map)
  const animations = robotAnimations.get(eid)
  engine.animations.filter(a =>  a.name.replace("RobotArmature|Robot_", "") != 'TPose').forEach((a: any,i: number) => {
      animations?.set(i, mixer.clipAction(a));
    })
  addMixer(world, eid, mixer)
  Animated.current[eid] = 5


  robot.traverse( (el) => {
    if (el.material?.length > 1) {
      el.material[0] = materialMain
    }
  });

  // position
  Object.defineProperty(robot.position, 'eid', { get: () => eid })
  Object.defineProperty(robot.position, 'store', { get: () => Transform.position })

  Object.defineProperty(robot.position, 'x', {
    get () { return this.store.x[this.eid] },
    set (n) { this.store.x[this.eid] = n }
  })
  Object.defineProperty(robot.position, 'y', {
    get () { return this.store.y[this.eid] },
    set (n) { this.store.y[this.eid] = n }
  })
  Object.defineProperty(robot.position, 'z', {
    get () { return this.store.z[this.eid] },
    set (n) { this.store.z[this.eid] = n }
  })

  // rotation
  Object.defineProperty(robot.rotation, 'eid', { get: () => eid })
  Object.defineProperty(robot.rotation, 'store', { get: () => Transform.rotation })

  Object.defineProperty(robot.rotation, '_x', {
    get () { return this.store.x[this.eid] },
    set (n) { this.store.x[this.eid] = n }
  })
  Object.defineProperty(robot.rotation, '_y', {
    get () { return this.store.y[this.eid] },
    set (n) { this.store.y[this.eid] = n }
  })
  Object.defineProperty(robot.rotation, '_z', {
    get () { return this.store.z[this.eid] },
    set (n) { this.store.z[this.eid] = n }
  })

  return robot
}
