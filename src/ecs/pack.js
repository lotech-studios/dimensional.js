import { ECSComponent } from './component.js'
import { ECSEntity } from './entity.js'
import { ECSManager } from './manager.js'

// import components

import { AlphaMapMaterialComponent } from './components/AlphaMap.js'
import { ConstantSpinComponent } from './components/ConstantSpin.js'
import { MeshComponent } from './components/Mesh.js'
import { MusicVideoShaderComponent } from './components/MusicVideoShader.js'
import { RainbowShaderComponent } from './components/RainbowShader.js'
import { TerrainMeshComponent } from './components/TerrainMesh.js'
import { WormholeShaderComponent } from './components/WormholeShader.js'

// exports

export const Components = {
    AlphaMapMaterial: AlphaMapMaterialComponent,
    ConstantSpin: ConstantSpinComponent,
    Mesh: MeshComponent,
    MusicVideoShader: MusicVideoShaderComponent,
    RainbowShader: RainbowShaderComponent,
    TerrainMesh: TerrainMeshComponent,
    WormholeShader: WormholeShaderComponent,
}

export {
    ECSComponent as Component,
    ECSEntity as Entity,
    ECSManager as Manager
}

