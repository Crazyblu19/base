import {
  defineComponent,
  defineQuery,
  addComponent,
  removeComponent,
  enterQuery,
  hasComponent,
  exitQuery,
  IWorld
} from "bitecs";
import { AnimationMixer } from 'three'
import { Animated } from './Animations'


import {defineMapComponent} from "../functions/MapComponents"


const MixerSoA = defineComponent({});
export const Mixer = defineMapComponent<AnimationMixer, typeof MixerSoA>(MixerSoA);

export const mixerQuery = defineQuery([Mixer]);
export const enteredMixerQuery = enterQuery(mixerQuery);
export const exitedMixerQuery = exitQuery(mixerQuery);


export function addMixer(world: IWorld, eid: number, mixer: AnimationMixer) {
  addComponent(world, Mixer, eid);
  addComponent(world, Animated, eid);
  Mixer.store.set(eid, mixer);
}

export function removeMixer(world: IWorld, eid: number, mixer: AnimationMixer) {
  removeComponent(world, Animated, eid);
  removeComponent(world, Mixer, eid);
  Mixer.store.delete(eid);
}
