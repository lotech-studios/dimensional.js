class Bank {

    constructor () {

        this.Stored = {}

    }

    async add ( name, content ) {

        this.Stored[ name ] = content

    }

    async addMulti () {

        for ( let i of arguments ) await this.add( i[ 0 ], i[ 1 ] )

    }

    get ( name ) {

        return this.Stored[ name ]

    }

    async remove ( name ) {

        delete this.Stored[ name ]

    }

    async removeMulti () {

        for ( let i of arguments ) await this.remove( i )

    }

}

Bank.prototype.isBank = true

export { Bank }