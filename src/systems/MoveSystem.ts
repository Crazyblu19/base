import {
  Transform,
} from '../components/Transform'

import {
  cubeQuery
} from '../components/Cube'

import { Engine } from '../types/Engine'

export const moveSystem = (engine: Engine) => {
  // set current Animation on Mixer start
  const entities = cubeQuery(engine.world);
  for (let i = 0; i < entities.length; i++) {
    const eid = entities[i];

    Transform.position.x[eid] = Math.cos(engine.time.dt)
    Transform.position.z[eid] = Math.sin(engine.time.dt)
  }
  return engine
};
