import { addEntity, IWorld } from "bitecs"
import * as THREE from "three"

import { Transform } from "../components/Transform"
import { Object3DEntity } from "../types/Object3DEntity"

export const createObject3DEntity = (
  world: IWorld,
  geometry: any,
  material = new THREE.MeshBasicMaterial( { wireframe: true } )
): Object3DEntity => {
  if(!geometry) {
    geometry = new THREE.BoxGeometry( 200, 200, 200 )
  }

  const eid = addEntity(world)

  const obj3d = new THREE.Mesh(geometry, material) as unknown as Object3DEntity

  obj3d.eid = eid

  // position
  Object.defineProperty(obj3d.position, 'eid', { get: () => eid })
  Object.defineProperty(obj3d.position, 'store', { get: () => Transform.position })

  Object.defineProperty(obj3d.position, 'x', {
    get () { return this.store.x[this.eid] },
    set (n) { this.store.x[this.eid] = n }
  })
  Object.defineProperty(obj3d.position, 'y', {
    get () { return this.store.y[this.eid] },
    set (n) { this.store.y[this.eid] = n }
  })
  Object.defineProperty(obj3d.position, 'z', {
    get () { return this.store.z[this.eid] },
    set (n) { this.store.z[this.eid] = n }
  })

  // rotation
  Object.defineProperty(obj3d.rotation, 'eid', { get: () => eid })
  Object.defineProperty(obj3d.rotation, 'store', { get: () => Transform.rotation })

  Object.defineProperty(obj3d.rotation, '_x', {
    get () { return this.store.x[this.eid] },
    set (n) { this.store.x[this.eid] = n }
  })
  Object.defineProperty(obj3d.rotation, '_y', {
    get () { return this.store.y[this.eid] },
    set (n) { this.store.y[this.eid] = n }
  })
  Object.defineProperty(obj3d.rotation, '_z', {
    get () { return this.store.z[this.eid] },
    set (n) { this.store.z[this.eid] = n }
  })

  // scale
  // Object.defineProperty(obj3d.scale, 'eid', { get: () => eid })
  // Object.defineProperty(obj3d.scale, 'store', { get: () => TransformComponent.scale })

  // Object.defineProperty(obj3d.scale, 'x', {
  //   get () { return this.store.x[this.eid] },
  //   set (n) { this.store.x[this.eid] = n }
  // })
  // Object.defineProperty(obj3d.scale, 'y', {
  //   get () { return this.store.y[this.eid] },
  //   set (n) { this.store.y[this.eid] = n }
  // })
  // Object.defineProperty(obj3d.scale, 'z', {
  //   get () { return this.store.z[this.eid] },
  //   set (n) { this.store.z[this.eid] = n }
  // })

  return obj3d
}
