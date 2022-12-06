import { Engine } from "../types/Engine";
import * as THREE from 'three'

export const renderSystem = (engine: Engine) => {
  engine.orbitControls.update()
  engine.renderer.render(engine.scene,engine.camera)
  return engine
}
