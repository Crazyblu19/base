import { pipe } from "bitecs";
import { renderSystem } from "./systems/RenderSystem";
import { timeSystem } from "./systems/TimeSystem";
import { moveSystem } from "./systems/MoveSystem";

export const pipeline = pipe(
  timeSystem,
  renderSystem,
  moveSystem,
)
