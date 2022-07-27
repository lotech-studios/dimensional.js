class Loader {

    constructor ( path ) {

        this.bankType = ''
        this.path = path ? path : ''

    }

    async load ( url, cb = function () {} ) {

        const response = await fetch( this.path + url )
        const json = await response.json()

        cb( json )

    }

    isBank () {

        if ( this.BankProxy ) return true
        else return false

    }

    setBank ( proxy ) {

        if ( proxy[ `is${ this.bankType }Bank` ] ) {

            this.BankProxy = proxy

        }

    }

}

export { Loader }