import { Loader } from './Loader.js'
import * as Three from '../three/src/pack.js'

class MaterialLoader extends Loader {

    constructor ( path ) {

        super( path )

        this.bankType = 'Material'

    }

    async load ( url, cb = function () {} ) {

        const Response = await fetch( this.path + url )
        const Data = await Response.json()
        const type = Data.type.toLowerCase()

        const Material = new Three.ShaderMaterial( {
            uniforms: Three.ShaderLib[ type ].uniforms,
            fragmentShader: Three.ShaderLib[ type ].fragmentShader,
            vertexShader: Three.ShaderLib[ type ].vertexShader,
        } )

        if ( this.isBank() ) {

            await this.BankProxy.add( Data.name, Material )

        }

        cb( Material )

    }

}

export { MaterialLoader }