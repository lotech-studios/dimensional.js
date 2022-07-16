import { 
    ClampToEdgeWrapping,
    DataTexture,
    DoubleSide,
    LinearFilter,
    LuminanceFormat, 
    MeshPhongMaterial,
    NearestFilter,
    UnsignedByteType 
} from '../../../src/three/src/pack.js'

import { ECSComponent } from '../component.js'

class AlphaMapMaterialComponent extends ECSComponent {

    constructor ( proxy, width, height, color, blend, random ) {

        super( proxy )

        this._blend = blend
        this._color = color
        this._demoMode = false
        this._height = height
        this._size = width * height
        this._width = width

        this.rebuild( random )
        
    }

    // private

    _buildMaterial () {

        // create material

        this.Material = new MeshPhongMaterial( {
            color: this._color,
            alphaMap: this._Texture,
            side: DoubleSide,
            transparent: true,
            opacity: 1,
        } )

        // update it

        this.updateMaterial()

        // change mesh material

        if ( this._Proxy._Components.namesToIndex.includes( 'Mesh' ) ) {

            this._Proxy.getComponent( 'Mesh' ).setMaterial( this.Material )

        } else if ( this._Proxy._Components.namesToIndex.includes( 'TerrainMesh' ) ) {

            this._Proxy.getComponent( 'TerrainMesh' ).setMaterial( this.Material )

        }

    }

    _buildTexture () {

        // create texture

        this._Texture = new DataTexture( 
            this._data, this._width, this._height, 
            LuminanceFormat, UnsignedByteType 
        )

        // update its values

        this._Texture.flipY = true
        this._Texture.wrapS = ClampToEdgeWrapping
        this._Texture.wrapT = ClampToEdgeWrapping
        this._Texture.generateMipmaps = false

        return

    }

    _resetData ( random ) {

        // create data array

        this._data = new Uint8Array( this._size )

        // raise to RGB (255) range instead of binary

        for ( let i = 0; i < this._size; i++ ) {

            if ( random ) {

                this._data[ i ] = Math.random() * 256

            } else {

                this._data[ i ] = 255

            }

        }

        return

    }

    _resolveFilter () {

        // check if filter should be blended

        if ( this._blend ) {

            this._Texture.magFilter = LinearFilter
            this._Texture.minFilter = LinearFilter

        } else {

            this._Texture.magFilter = NearestFilter
            this._Texture.minFilter = NearestFilter

        }

        // update texture

        this._updateTexture()

        return

    }

    _updateMapSize () {

        // reset size of map

        this._size = this._width * this._height

        return

    }

    _updateTexture () {

        // update texture

        this._Texture.needsUpdate = true

        return

    }

    // public

    rebuild ( random = false ) {

        this._updateMapSize() // reset size of map
        this._resetData( random ) // build new data array
        this._buildTexture() // create texutre
        this._resolveFilter() // check if filter should be blended
        this._buildMaterial() // create the material

        return

    }

    setColor ( color ) {

        // change color of material

        this.Material.color = color

        // update it

        this.updateMaterial()

        return

    }

    setFilter ( filter ) {

        // update the "blend" bool

        if ( filter == LinearFilter ) {

            this._blend = true

        } else {

            this._blend = false

        }

        // set filters

        this._Texture.magFilter = filter
        this._Texture.minFilter = filter

        // update the material

        this.updateMaterial()

        return

    }

    setHeight ( height ) {

        // change height

        this._height = height

        // rebuild map

        this.rebuild()

        return

    }

    setTileAlpha ( y, x, binary ) {

        const n = ( y * this._height ) + x

        this._data[ n ] = 255 * binary

        this.updateMaterial()

        return

    }
 
    setWidth ( width ) {

        // change width

        this._width = width

        // rebuild map

        this.rebuild()

        return

    }

    toggleDemoMode () {

        if ( this._demoMode ) {

            clearInterval( this._interval )

            this._demoMode = false

        } else {

            this._demoMode = true

            this._interval = setInterval( () => {

                const filters = [ LinearFilter, NearestFilter ]

                this._width = Math.floor( Math.random() * 17 ) + 1
                this._height = Math.floor( Math.random() * 16 ) + 1

                this.rebuild( true )
                this.setFilter( 
                    filters[ Math.floor( Math.random() * filters.length ) ] )

            }, 500 )

        }

    }

    updateMaterial () {

        // update texture

        this._updateTexture()

        // update material

        this.Material.needsUpdate = true

        return

    }

}

AlphaMapMaterialComponent.prototype._name = 'AlphaMapMaterial'
AlphaMapMaterialComponent.prototype._requires = []

export { AlphaMapMaterialComponent }
