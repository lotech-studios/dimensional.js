class AudioBank extends Bank {

    constructor ( path = '' ) {

        super()

        this.setPath( path )

    }

    async add ( name, url ) {

        this._Stored[ name ] = this.path + url

    }

    setPath ( path ) {

        this.path = path

    }

}

AudioBank.prototype.isAudioBank = true

export { AudioBank }