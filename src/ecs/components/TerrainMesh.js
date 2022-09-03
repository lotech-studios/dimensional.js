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

class TerrainMeshFace {

    constructor ( aTY, aTX, tY, tX, a, b, c, lA, lB, lC ) {

        this.array = [ a, b, c ]
        this.literals = [ lA, lB, lC ]

        this.a = a // 0
        this.b = b // 1
        this.c = c // 2
        this.lA = lA // 0
        this.lB = lB // 1
        this.lC = lC // 2
        this.aTX = aTX
        this.aTY = aTY
        this.tX = tX
        this.tY = tY

    }

    setA ( index ) {

        this.a = index

    }

    setB ( index ) {

        this.b = index

    }

    setC ( index ) {

        this.c = index

    }

    setLA ( index ) {

        this.lA = index

    }

    setLB ( index ) {

        this.lB = index

    }

    setLC ( index ) {

        this.lC = index

    }

    setColor ( colorAttribute, color ) {

        colorAttribute.setXYZ( this.lA, color.r, color.g, color.b )
        colorAttribute.setXYZ( this.lB, color.r, color.g, color.b )
        colorAttribute.setXYZ( this.lC, color.r, color.g, color.b )

    }

    getMinMaxDifference ( vertexArray ) {

        const values = [
            vertexArray[ ( this.lA * 3 ) + 2 ],
            vertexArray[ ( this.lB * 3 ) + 2 ],
            vertexArray[ ( this.lC * 3 ) + 2 ]
        ]

        const max = Math.max( ...values ),
            min = Math.min( ...values )
            
        return max - min

    }

    getMax ( vertexArray ) {

        const values = [
            vertexArray[ ( this.lA * 3 ) + 2 ],
            vertexArray[ ( this.lB * 3 ) + 2 ],
            vertexArray[ ( this.lC * 3 ) + 2 ]
        ]

        return Math.max( ...values )

    }

    getMin ( vertexArray ) {

        const values = [
            vertexArray[ ( this.lA * 3 ) + 2 ],
            vertexArray[ ( this.lB * 3 ) + 2 ],
            vertexArray[ ( this.lC * 3 ) + 2 ]
        ]

        return Math.min( ...values )

    }

}

class TerrainMeshVertex {

    constructor ( targetGeometry, x, y ) {

        this.indexes = [] // [ 0, 1 ]
        this.x = x
        this.y = y

        this.TargetGeometry = targetGeometry

    }

    addIndex ( index ) {

        this.indexes.push( index )

    }

    getCoords () {

        return new Vector3( this.x, this.y, this.getHeight() )

    }

    getCoordsFromArray ( vertexArray ) {

        return new Vector3( 
            this.x, this.y, 
            this.getHeightFromArray( vertexArray ) 
        )

    }

    getHeight () {

        return this.TargetGeometry.attributes.position
            .array[ ( this.indexes[ 0 ] * 3 ) + 2 ]
        
    }

    getHeightFromArray ( vertexArray ) {

        return vertexArray[ ( this.indexes[ 0 ] * 3 ) + 2 ]
        
    }

    setHeight ( height ) {

        for ( let i = 0; i < this.indexes.length; i++ ) {

            this.TargetGeometry.attributes.position
                .array[ ( this.indexes[ i ] * 3 ) + 2 ] = height

        }

    }

    setHeightFromArray ( vertexArray, height ) {

        for ( let i = 0; i < this.indexes.length; i++ ) {

            vertexArray[ ( this.indexes[ i ] * 3 ) + 2 ] = height

        }

    }

}

class TerrainMeshComponent extends ECSComponent {

    constructor ( proxy, params ) {

        super( proxy )

        this._chunkDivisions = params.chunkDivisions
        this._chunksX = params.chunksX
        this._chunksY = params.chunksY
        this._scale = params.scale

        this._chunks = []

        this._Group = new Group()

        this._Material = new MeshPhongMaterial( {
            color: 0x8c7f56,
            flatShading: true,
        } )

        this.rebuild()
        
    }

    // private

    _buildMeshes () {

        for ( let y = 0; y < this._chunksY; y++ ) {

            this._chunks.push( [] )

            for ( let x = 0; x < this._chunksX; x++ ) {

                const Geometry = new PlaneGeometry(
                    this._chunkDivisions * this._scale,
                    this._chunkDivisions * this._scale,
                    this._chunkDivisions,
                    this._chunkDivisions
                )

                // create data array

                const alphaSize = this._chunkDivisions * this._chunkDivisions
                const alphaData = new Uint8Array( alphaSize )

                // raise to RGB (255) range instead of binary

                for ( let i = 0; i < alphaSize; i++ ) {

                    alphaData[ i ] = 255

                }

                // create texture

                const alphaTex = new DataTexture( 
                    alphaData, this._chunkDivisions, this._chunkDivisions, 
                    LuminanceFormat, UnsignedByteType 
                )
        
                // update its values
        
                alphaTex.flipY = true
                alphaTex.wrapS = ClampToEdgeWrapping
                alphaTex.wrapT = ClampToEdgeWrapping
                alphaTex.generateMipmaps = false
                alphaTex.magFilter = NearestFilter
                alphaTex.minFilter = NearestFilter
                alphaTex.needsUpdate = true

                const Material = new MeshPhongMaterial( {
                    color: 0x8c7f56,
                    alphaMap: alphaTex,
                    side: DoubleSide,
                    transparent: true,
                    opacity: 1,
                } )

                // create mesh

                const _Mesh = new Mesh( Geometry, Material )
                _Mesh.alphaData = alphaData
                _Mesh.alphaTex = alphaTex
                _Mesh.iX = x
                _Mesh.iY = y
                _Mesh.geometryFaces = []
                _Mesh.geometryVertices = []
                _Mesh.rotateX( Math.PI / -2 )
                _Mesh.position.x = ( ( ( this._chunksX / -2 ) 
                    - ( this._chunkDivisions / 2 ) ) + ( x * this._chunkDivisions ) ) 
                    * this._scale
                _Mesh.position.z = ( ( ( this._chunksY / -2 ) 
                    - ( this._chunkDivisions / 2 ) ) + ( y * this._chunkDivisions ) ) 
                    * this._scale

                this._chunks[ y ][ x ] = _Mesh

                // resolve chunk geometry

                let faceCount = 0

                /**
                 * Grab data from the indexed geometry's vertices so we can
                 * create an array of organized Vertex classes to use. This
                 * will make manipulating vertices so much simpler.
                 */

                const OV = _Mesh.geometry.attributes.position

                for ( let i = 0; i < OV.array.length; i += 3 ) {

                    _Mesh.geometryVertices.push( new TerrainMeshVertex(
                        _Mesh.geometry, OV.array[ i ], OV.array[ i + 1 ]
                    ) )

                }

                // Change geometry to non-indexed geometry

                _Mesh.geometry = _Mesh.geometry.toNonIndexed()

                // Get indexes of newly calculated vertices

                const NV = _Mesh.geometry.attributes.position

                let picked = []

                let tileY = 0, tileX = 0, stopCount = 0

                for ( let i = 0; i < NV.count; i++ ) {

                    for ( let j = 0; j < _Mesh.geometryVertices.length; j++ ) {

                        if ( 
                            _Mesh.geometryVertices[ j ].x == NV.array[ i * 3 ] &&
                            _Mesh.geometryVertices[ j ].y == NV.array[ ( i * 3 ) + 1 ]
                        ) {

                            _Mesh.geometryVertices[ j ].addIndex( i )

                            picked.push( j )

                        }

                    }

                    faceCount++

                    if ( faceCount == 3 ) {

                        _Mesh.geometryFaces.push( new TerrainMeshFace(
                            tileY, tileX,
                            ( this._chunkDivisions * y ) + tileY,
                            ( this._chunkDivisions * x ) + tileX,
                            picked[ 0 ], picked[ 1 ], picked[ 2 ], 
                            i - 2, i - 1, i 
                        ) )

                        picked = []
                        faceCount = 0
                        stopCount++

                        if ( stopCount == 2 ) {

                            stopCount = 0
                            tileX++

                            if ( tileX >= this._chunkDivisions ) {

                                tileX = 0
                                tileY++

                            }

                        }

                    }

                }

                // add to group

                this._Group.add( _Mesh )

            }

        }

        return

    }

    _resolveGroup () {

        this._chunks = []
        this._Group.children = []

        return

    }

    // public

    addToParent ( parent ) {

        this._Parent = parent

        parent.add( this._Group )

        return

    }

    rebuild () {

        this._resolveGroup()
        this._buildMeshes()
 
        return

    }

    setMaterial ( material ) {

        if ( material.isMaterial ) {

            this._Material = material

            for ( let y = 0; y < this._chunksY; y++ ) {
    
                for ( let x = 0; x < this._chunksX; x++ ) {
    
                    this._chunks[ y ][ x ].material = this._Material
    
                }
    
            }

        } else {

            console.error( '<Altantis.ECS.Components.TerrainMesh.setMaterial()>: This material class is not compatible with this version of the engine.' )

        }

        return

    }

    setTileAlpha ( cY, cX, tY, tX, binary ) {

        const n = ( tY * this._chunkDivisions ) + tX

        this._chunks[ cY ][ cX ].alphaData[ n ] = 255 * binary
        this._chunks[ cY ][ cX ].alphaTex.needsUpdate = true

        return

    }

}

TerrainMeshComponent.prototype._name = 'TerrainMesh'
TerrainMeshComponent.prototype._requires = []

export { TerrainMeshComponent, TerrainMeshFace }
