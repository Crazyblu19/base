import { addComponent,  } from "bitecs"
import * as THREE from "three"
//import * as SkeletonUtils from 'three/jsm/utils/SkeletonUtils.js';
import './styles.css'

import { Transform } from "./components/Transform"
import { Cube } from "./components/Cube"
import { createEngine } from "./functions/CreateEngine"
import { pipeline } from "./pipeline"
import { createObject3DEntity } from "./functions/CreateObject3DEntity"
import { Engine } from './types/Engine'

import { addEntity, createWorld, IWorld, removeEntity } from "bitecs";

(
  async function() {

    const world = createWorld()
    // noop entity
    addEntity(world);
    const engine : Engine = createEngine(world)

    engine.camera.position.set(1, 5, 2);
    engine.camera.lookAt(0, 0, 0)

    const color = new THREE.Color(0xff9528).convertSRGBToLinear()
    const plane = createObject3DEntity(engine.world,
      new THREE.BoxGeometry(15,1,10),
      new THREE.MeshLambertMaterial({color})
    )


    plane.receiveShadow = true
    engine.scene.add(plane)

    addComponent(engine.world, Transform, plane.eid)


    Transform.position.y[plane.eid] = 0
    Transform.position.z[plane.eid] = 0
    Transform.position.x[plane.eid] = 0


  const cube = createObject3DEntity(engine.world,
      new THREE.BoxGeometry(1,1,1),
      new THREE.MeshPhongMaterial({color: 'red'})
    )
    cube.castShadow = true

    engine.scene.add(cube)

    addComponent(engine.world, Transform, cube.eid)
    addComponent(engine.world, Cube, cube.eid)


    Transform.position.y[cube.eid] = 3



    const update = () =>
    {
      requestAnimationFrame( update )

      pipeline(engine)

    }

    update()
  }
)()
