import * as StringUtils from '../utils/strings.js'
import * as Three from '../three/src/pack.js'
import { Loader } from './Loader.js'

class TextureLoader extends Loader {

    constructor () {

        super()

    }

    async loadFromJSON ( name, url ) {

        const File = await this.loadJSON( url )
        const Data = File[ name ]

        const Texture = new Three.TextureLoader().load( Data.map )
        
        if ( Data.magFilter ) Texture.magFilter = Three[ Data.magFilter ]
        if ( Data.minFilter ) Texture.minFilter = Three[ Data.minFilter ]

        if ( Data.repeat && Data.repeat.length == 2 ) {

            Texture.wrapS = Three.RepeatWrapping
            Texture.wrapT = Three.RepeatWrapping
            Texture.repeat.set( ...Data.repeat )

        }

        return Texture

    }

}

export { TextureLoader }