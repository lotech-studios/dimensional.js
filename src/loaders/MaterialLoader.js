import * as StringUtils from '../utils/strings.js'
import * as Three from '../three/src/pack.js'
import { Loader } from './Loader.js'

class MaterialLoader extends Loader {

    constructor ( textureBank ) {

        super()

        this.TextureBank = textureBank ? textureBank : null

    }

    async loadFromJSON ( name, url ) {

        const File = await this.loadJSON( url )
        const Data = File[ name ]
        
        if ( this.TextureBank && Data.options.map ) {

            Data.options.map = this.TextureBank.get( Data.options.map )

            console.log( Data.options.map )

        }

        return new Three[ `${ Data.type }Material` ]( Data.options )

    }

}

export { MaterialLoader }