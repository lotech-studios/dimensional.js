import { Bank } from './Bank.js'

class AudioBank extends Bank {

    constructor ( path = '' ) {

        super()

        this.setPath( path )

    }

    async add ( name, url ) {

        this.Stored[ name ] = this.path + url

    }

    setPath ( path ) {

        this.path = path

    }

}

AudioBank.prototype.isAudioBank = true

export { AudioBank }