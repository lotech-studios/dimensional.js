import { ECSComponent } from './component.js'
import { ECSEntity } from './entity.js'
import { ECSManager } from './manager.js'

// import components

import { AlphaMapMaterialComponent as AlphaMapMaterial } from './components/AlphaMap.js'
import { ConstantSpinComponent as ConstantSpin } from './components/ConstantSpin.js'
import { FiniteStateMachineComponent as FiniteStateMachine } from './components/FiniteStateMachine.js'
import { GLTFModelComponent as GLTFModel } from './components/GLTFModel.js'
import { MeshComponent as Mesh } from './components/Mesh.js'
import { MeshManipulatorComponent as MeshManipulator } from './components/MeshManipulator.js'
import { RainbowShaderComponent as RainbowShader } from './components/RainbowShader.js'
import { TerrainMeshComponent as TerrainMesh } from './components/TerrainMesh.js'

// exports

export const Components = {
    AlphaMapMaterial,
    ConstantSpin,
    FiniteStateMachine,
    GLTFModel,
    Mesh,
    MeshManipulator,
    RainbowShader,
    TerrainMesh,
}

export {
    ECSComponent as Component,
    ECSEntity as Entity,
    ECSManager as Manager
}

