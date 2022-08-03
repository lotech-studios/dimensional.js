import { Bank } from './Bank.js'
import { MaterialLoader } from '../loaders/MaterialLoader.js'

class MaterialBank extends Bank {

    constructor ( path ) {

        this.Loader = new MaterialLoader( path ? path : '' )
        this.Loader.setBank( this )

    }

}

MaterialBank.prototype.isMaterialBank = true

export { MaterialBank }