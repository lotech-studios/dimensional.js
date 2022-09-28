export { FSMState } from './extras/FSMState.js'
export { PointCaster } from './extras/PointCaster.js'

export * as Apps from './apps/pack.js'
export * as Banks from './banks/pack.js'
export * as ECS from './ecs/pack.js'
export * as Libs from './libs/pack.js'
export * as Managers from './managers/pack.js'
export * as PostProcessing from './postprocessing/pack.js'
export * as Three from './three/src/pack.js'
export * as ThreeX from './three/examples/pack.js'
export * as Utils from './utils/pack.js'

/**
 * These are the default constants, you can add as many as you like.
 * They are super useful for storing data and accessing it anywhere
 * in your program where you import the engine.
 */

export const C = {
    Actors: {},
    Banks: {},
    Cameras: {},
    Controls: {},
    Data: {},
    ECS: {},
    Elements: {},
    Scenes: {},
    Renderers: {},
}