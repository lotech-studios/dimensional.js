import * as Three from '../three/src/pack.js'

class InterfaceState {

    constructor ( name, options = {} ) {

        this.id = options.id ? options.id : Three.MathUtils.generateUUID()
        this.name = name

        this.Element = document.createElement( 'state' )
        this.Parent = options.parent ? options.parent : 
            document.body.querySelector( 'ui' ) ? document.body.querySelector( 'ui' ) : document.body

        if ( options.hide ) this.hide()

    }

    async addElement ( element ) {

        this.Element.appendChild( element )

    }

    async addElements ( xmlString ) {

        const Elements = new DOMParser().parseFromString( xmlString, 'text/xml' )

        for ( let i of Elements.childNodes ) {

            await this.addElement( i )

        }

    }

    async build () {

        this.Element.id = this.name
        this.Element.setAttribute( 'uuid', this.id )
        this.Element.setAttribute( 'name', this.name )
       
        await this.setStyle( {
            position: 'absolute',
            left: '0px',
            top: '0px',
            width: this.Parent == document.body ? '100vw' : '100%',
            height: this.Parent == document.body ? '100vh' : '100%',
            pointerEvents: 'none',
        } )

        this.Parent.appendChild( this.Element )

    }

    async setStyle ( properties = {} ) {

        for ( const p in properties ) this.Element.style[ p ] = properties[ p ]

    }

    getElement () {

        return this.Element

    }

    getId () {

        return this.id

    }

    getName () {

        return this.name

    }
    
    hide () {

        this.Element.style.display = 'none'

    }

    show () {

        this.Element.style.display = 'inline-block'

    }

}

class InterfaceManager {

    constructor () {

        this.States = {}

    }

    async buildState ( name, options = {}, callback = async () => {} ) {

        const State = new InterfaceState( name, options )
        
        await State.build()

        this.States[ name ] = State

        await callback( State )

    }

    getState ( name ) {

        return this.States[ name ]

    }

    hideState ( name ) {

        this.States[ name ].hide()

    }

    showState ( name ) {

        this.States[ name ].show()

    }

}

export { InterfaceManager }