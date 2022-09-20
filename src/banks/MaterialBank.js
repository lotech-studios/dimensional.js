import { Bank } from './Bank.js'
import { MaterialLoader } from '../loaders/MaterialLoader.js'

class MaterialBank extends Bank {

    constructor ( textureBank ) {

        super()

        this.Loader = new MaterialLoader( textureBank )

    }

    async addFromJSON ( name, url ) {

        const Material = await this.Loader.loadFromJSON( name, url )

        await this.add( name, Material )

    }

    async addMultiFromJSON () {

        for ( let i of arguments ) await this.addFromJSON( i[ 0 ], i[ 1 ] )

    }

}

MaterialBank.prototype.isMaterialBank = true

export { MaterialBank }