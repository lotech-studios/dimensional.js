import { Bank } from './Bank.js'

class StoredCursor {

    constructor ( url, oX, oY, type ) {

        this.oX = oX
        this.oY = oY
        this.type = type
        this.url = url

    }

}

class CursorBank extends Bank {

    constructor ( path ) {

        super()

        this._path = path

    }

    add ( name, url, oX, oY, type ) {

        this._Stored[ name ] = new StoredCursor( url, oX, oY, type )

        return

    }

    reset () {

        this.set( Object.keys( this._Stored )[ 0 ] )

        return

    }

    set ( name ) {

        const Cur = this._Stored[ name ]

        document.body.style.cursor = `url( ${ this._path + Cur.url } ) ${ Cur.oX } ${ Cur.oY }, ${ Cur.type }`

        return

    }

}

CursorBank.prototype.isCursorBank = true

export { CursorBank }