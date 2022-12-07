import {
  defineComponent,
  defineQuery,
  enterQuery,
  exitQuery,
  Types,
} from "bitecs"


const { ui8 } = Types

export const UnitSchema = {
  hp: ui8,
  ad: ui8,
  armor: ui8,
}

export type UnitComponentType = {
  hp: Uint8Array,
  ad: Uint8Array,
  armor: Uint8Array,
}

export const Unit = defineComponent<UnitComponentType>(UnitSchema)

export const unitQuery = defineQuery([Unit]);
export const enteredUnitQuery = enterQuery(unitQuery);
export const exitedUnitQuery = exitQuery(unitQuery);
