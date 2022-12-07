import { pipe } from "bitecs";
import { renderSystem } from "./systems/RenderSystem";
import { timeSystem } from "./systems/TimeSystem";
import { AnimationSystem } from "./systems/AnimationSystem";

export const pipeline = pipe(
  timeSystem,
  AnimationSystem,
  renderSystem,
)
