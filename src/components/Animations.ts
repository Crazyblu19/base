import {
  defineComponent,
  defineQuery,
  enterQuery,
  exitQuery,
  Types
} from "bitecs"

const { ui8 } = Types

export const AnimationSchema = {
  current: ui8,
  next: ui8,
}

export type AnimationComponentType = {
  current: Uint8Array
  next: Uint8Array
}

export const Animated = defineComponent<AnimationComponentType>(AnimationSchema)

export const animatedQuery = defineQuery([Animated]);
export const enteredAnimatedQuery = enterQuery(animatedQuery);
export const exitedAnimatedQuery = exitQuery(animatedQuery);
