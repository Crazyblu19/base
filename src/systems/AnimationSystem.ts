import {
  hasComponent,
} from "bitecs";

import {
  Animated,
} from '../components/Animations'

import {
  Mixer,
  enteredMixerQuery,
  exitedMixerQuery,
  mixerQuery
} from '../components/mixer'

import { Engine } from '../types/Engine'

const fadeDuration = 0.2

export const AnimationSystem = (engine: Engine) => {
  // remove mixer
  const exited = exitedMixerQuery(engine.world);
  for (let i = 0; i < exited.length; i++) {
    const eid = exited[i];
    engine.robotAnimations.delete(eid)
  }

  // set current Animation on Mixer start
  const entered = enteredMixerQuery(engine.world);
  for (let i = 0; i < entered.length; i++) {
    const eid = entered[i];
    const current = Animated.current[eid]

    const robotAnimations = engine.robotAnimations.get(eid)
    Animated.next[eid] = current
    const currentAnimation = robotAnimations?.get(current)
    if (currentAnimation) {
      currentAnimation.play()
    }

  }


  // Change animations , and update mixer
  const mixerEntities = mixerQuery(engine.world);
  for (let i = 0; i < mixerEntities.length; i++) {
    const eid = mixerEntities[i];

    const mixer = Mixer.store.get(eid)


    const next = Animated.next[eid]
    const current = Animated.current[eid]


    const robotAnimations = engine.robotAnimations.get(eid)
    if (current != next) {
      const nextAnimation = robotAnimations?.get(next)
      const currentAnimation = robotAnimations?.get(current)

      if (!currentAnimation || !nextAnimation) {
        throw new Error('Animation undefined //AnimationSystem');
      }
      currentAnimation.fadeOut(fadeDuration)
      nextAnimation.reset().fadeIn(fadeDuration).play();


      Animated.current[eid] = next
    }

    if (mixer) {
      mixer.update(engine.time.delta / 1000)
    }
  }

  return engine
};
