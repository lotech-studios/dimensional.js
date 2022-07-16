class Bank {

    constructor () {

        this._Stored = {}

    }

    add ( name, content ) {

        this._Stored[ name ] = content

        return

    }

    get ( name ) {

        return this._Stored[ name ]

    }

    remove ( name ) {

        delete this._Stored[ name ]

        return

    }

}

export { Bank }