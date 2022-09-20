import { Bank } from './Bank.js'
import { TextureLoader } from '../loaders/TextureLoader.js'

class TextureBank extends Bank {

    constructor () {

        super()

        this.Loader = new TextureLoader()

    }

    async addFromJSON ( name, url ) {

        const Texture = await this.Loader.loadFromJSON( name, url )

        await this.add( name, Texture )

    }

    async addMultiFromJSON () {

        for ( let i of arguments ) await this.addFromJSON( i[ 0 ], i[ 1 ] )

    }

}

TextureBank.prototype.isTextureBank = true

export { TextureBank }