import {
  defineComponent,
  defineQuery,
  enterQuery,
  exitQuery,
} from "bitecs"

export const Cube = defineComponent()

export const cubeQuery = defineQuery([Cube]);
export const enteredCubeQuery = enterQuery(cubeQuery);
export const exitedCubeQuery = exitQuery(cubeQuery);
