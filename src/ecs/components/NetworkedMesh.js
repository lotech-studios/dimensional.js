import {
    ClampToEdgeWrapping,
    DataTexture,
    DoubleSide,
    Group,
    LuminanceFormat,
    Mesh,
    MeshPhongMaterial,
    NearestFilter,
    PlaneGeometry,
    UnsignedByteType,
    Vector3
} from '../../three/src/pack.js'
import { ECSComponent } from '../component.js'

class NetworkedMeshComponent extends ECSComponent {

    constructor ( proxy, width, height, pack ) {

        super( proxy )

        this._width = width
        this._height = height

        this._Pack = pack

        this._map = []
        this._meshMap = []
        this._size = this._width * this._height

        this._buildMap()
        
    }

    // private

    _buildMap () {

        for ( let y = 0; y < this._height; y++ ) {

            this._map.push( [] )
            this._meshMap.push( [] )

            for ( let x = 0; x < this._width; i++ ) {

                this._map[ y ][ x ] = 0
                this._meshMap[ y ][ x ] = null

            }

        }

        return

    }

    // public

    check ( y, x ) {

        return

    }

    place ( y, x ) {

        this._map[ y ][ x ] = 1

        return

    }

}

NetworkedMeshComponent.prototype._name = 'NetworkedMesh'
NetworkedMeshComponent.prototype._requires = []

export { NetworkedMeshComponent }
