class DropdownSettings {

    constructor ( selected, listObj ) {

        this._selected = ''

        this._Options = listObj

        this.select( selected )

    }

    select ( value ) {

        if ( this._Options[ value ] ) {

            this._selected = value

        }

        return this._selected

    }

    getSelectedName () {

        return this._selected

    }

    getSelectedValue () {

        return this._Options[ this._selected ]

    }

}

export function buildDropdown ( selected, listObj ) {

    return new DropdownSettings( selected, listObj )

}