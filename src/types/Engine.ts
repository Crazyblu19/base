import { Object3DEntity } from "./Object3DEntity";
import { IWorld } from 'bitecs'
import { Group3DEntity } from './Group3DEntity'
import { AnimationClip } from 'three'

export type User = {
  name: string,
  eid: number,
  id: string
}

export type Engine = {
  player: {
    name: string
  }
  users: User[]
  ws: WebSocket
  functions: {
    sendWantsToMoveMessage: Function,
    sendStopToMoveMessage: Function,
  }
  world: IWorld
  LocalPlayerEId: number
  playersModels: Map<number, Group3DEntity>
  planetCenter: any
  sendMessage: any
  keys: {
    forward: boolean,
    backward: boolean,
    left: boolean,
    right: boolean,
    space: boolean,
    shift: boolean,
    escape: boolean
  }
  line: any
  debugRenderer: any
  robotAnimations:  Map<number, Map<number, THREE.AnimationAction>>
  animations: AnimationClip[]
  objects: Map<number, Object3DEntity>
  camera: THREE.PerspectiveCamera
  orbitControls: any
  scene: THREE.Scene
  renderer: THREE.WebGLRenderer
  time: {
    dt: number
    last: number
    delta: number
    elapsed: number
  }
}
