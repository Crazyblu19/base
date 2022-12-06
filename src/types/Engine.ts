import { Object3DEntity } from "./Object3DEntity";
import { IWorld } from 'bitecs'
import { Group3DEntity } from './Group3DEntity'
import { AnimationClip } from 'three'

export type Engine = {
  world: IWorld
  objects: Map<number, Object3DEntity>
  camera: THREE.PerspectiveCamera
  orbitControls?: any
  scene: THREE.Scene
  renderer: THREE.WebGLRenderer
  time: {
    dt: number
    last: number
    delta: number
    elapsed: number
  }
}
