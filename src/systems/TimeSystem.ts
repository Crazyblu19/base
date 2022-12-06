import { Engine } from "../types/Engine";
import { Clock } from 'three'

const clock = new Clock()

export const timeSystem = (engine: Engine) => {
  const now = performance.now()
  engine.time.dt = clock.getElapsedTime();
  engine.time.delta = now - engine.time.last
  engine.time.elapsed += engine.time.delta
  engine.time.last = now
  engine.time = engine.time
  return engine
}
