import { ECSComponent } from './component.js'
import { ECSEntity } from './entity.js'
import { ECSManager } from './manager.js'

// import components

import { AlphaMapMaterialComponent } from './components/AlphaMap.js'
import { ConstantSpinComponent } from './components/ConstantSpin.js'
import { GLTFModelComponent } from './components/GLTFModelComponent.js'
import { MeshComponent } from './components/Mesh.js'
import { MeshManipulatorComponent } from './components/MeshManipulator.js'
import { RainbowShaderComponent } from './components/RainbowShader.js'
import { TerrainMeshComponent } from './components/TerrainMesh.js'

// exports

export const Components = {
    AlphaMapMaterial: AlphaMapMaterialComponent,
    ConstantSpin: ConstantSpinComponent,
    GLTFModel: GLTFModelComponent,
    Mesh: MeshComponent,
    MeshManipulator: MeshManipulatorComponent,
    RainbowShader: RainbowShaderComponent,
    TerrainMesh: TerrainMeshComponent,
}

export {
    ECSComponent as Component,
    ECSEntity as Entity,
    ECSManager as Manager
}

