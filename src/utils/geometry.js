import * as Arraytils from './array.js'
import * as MathUtils from './math.js'
import { PlaneGeometry } from '../three/src/pack.js'

// class BufferFace {

//     constructor ( geo, aTY, aTX, tY, tX, a, b, c, lA, lB, lC ) {

//         this.array = [ a, b, c ]
//         this.literals = [ lA, lB, lC ]

//         this.a = a // 0
//         this.b = b // 1
//         this.c = c // 2
//         this.lA = lA // 0
//         this.lB = lB // 1
//         this.lC = lC // 2
//         this.aTX = aTX
//         this.aTY = aTY
//         this.tX = tX
//         this.tY = tY

//         this.Parent = geo

//     }

//     setA ( index ) {

//         this.a = index

//     }

//     setB ( index ) {

//         this.b = index

//     }

//     setC ( index ) {

//         this.c = index

//     }

//     setLA ( index ) {

//         this.lA = index

//     }

//     setLB ( index ) {

//         this.lB = index

//     }

//     setLC ( index ) {

//         this.lC = index

//     }

//     setColor ( color ) {

//         this.Parent.attributes.color.array.setXYZ( this.lA, color.r, color.g, color.b )
//         this.Parent.attributes.color.array.setXYZ( this.lB, color.r, color.g, color.b )
//         this.Parent.attributes.color.array.setXYZ( this.lC, color.r, color.g, color.b )

//     }

//     getMinMaxDifference () {

//         const values = [
//             this.Parent.attributes.position.array[ ( this.lA * 3 ) + 2 ],
//             this.Parent.attributes.position.array[ ( this.lB * 3 ) + 2 ],
//             this.Parent.attributes.position.array[ ( this.lC * 3 ) + 2 ]
//         ]

//         const max = Math.max( ...values ), min = Math.min( ...values )
            
//         return max - min

//     }

//     getMax () {

//         const values = [
//             this.Parent.attributes.position.array[ ( this.lA * 3 ) + 2 ],
//             this.Parent.attributes.position.array[ ( this.lB * 3 ) + 2 ],
//             this.Parent.attributes.position.array[ ( this.lC * 3 ) + 2 ]
//         ]

//         return Math.max( ...values )

//     }

//     getMin () {

//         const values = [
//             this.Parent.attributes.position.array[ ( this.lA * 3 ) + 2 ],
//             this.Parent.attributes.position.array[ ( this.lB * 3 ) + 2 ],
//             this.Parent.attributes.position.array[ ( this.lC * 3 ) + 2 ]
//         ]

//         return Math.min( ...values )

//     }

// }

class LinkedVertex {

    constructor ( geo, x, y ) {

        this.indexes = [] // [ 0, 1 ]
        this.x = x
        this.y = y

        this.Parent = geo

    }

    addIndex () {

        this.indexes.push( ...arguments )

    }

    getCoords () {

        return new Vector3( this.x, this.y, this.getHeight() )

    }

    getHeight () {

        return this.Parent.attributes.position.array[ ( this.indexes[ 0 ] * 3 ) + 2 ]
        
    }

    lower ( increment ) {

        const height = this.getHeight()

        this.setHeight( height - increment )

    }

    raise ( increment ) {

        const height = this.getHeight()

        this.setHeight( height + increment )

    }

    setHeight ( height ) {

        for ( let i = 0; i < this.indexes.length; i++ ) {

            this.Parent.attributes.position.array[ ( this.indexes[ i ] * 3 ) + 2 ] = height

        }

    }

}

export function createLinkedPlane ( w = 1, h = 1, divX = 1, divY = 1, mosaic = false ) {
 
    let xList = []
    let yList = []

    const XY = {}
    const Geometry = new PlaneGeometry( w, h, divX, divY, mosaic )
    Geometry.Vertices = { indexed: [], XY: {} }
    
    for ( let v = 0; v < Geometry.attributes.position.count; v++ ) {

        const x = Geometry.attributes.position.array[ v * 3 ]
        const y = Geometry.attributes.position.array[ ( v * 3 ) + 1 ]
        const tx = Number( x.toFixed( 4 ) )
        const ty = Number( y.toFixed( 4 ) )
        const xyString = `${ tx },${ ty }`

        if ( !xList.includes( tx ) ) xList.push( tx )
        if ( !yList.includes( ty ) ) yList.push( ty )

        if ( !XY[ xyString ] ) XY[ xyString ] = []

        XY[ xyString ].push( v )

    }

    xList = Arraytils.sortLowestToHighest( xList )
    yList = Arraytils.sortLowestToHighest( yList )

    for ( let ly = 0; ly < yList.length; ly++ ) {

        for ( let lx = 0; lx < xList.length; lx++ ) {

            const lxyString = `${ xList[ lx ] },${ yList[ ly ] }`
            const n = ( ly * xList.length ) + lx

            const Vertex = new LinkedVertex( Geometry, xList[ lx ], yList[ ly ] )
            Vertex.addIndex( ...XY[ lxyString ] )

            Geometry.Vertices.indexed.push( Vertex )
            Geometry.Vertices.XY[ lxyString ] = n

        }

    }

    Geometry.lowerVertex = function ( x, y, increment ) {

        const index = this.Vertices.XY[ `${ x },${ y }` ]

        this.Vertices.indexed[ index ].lower( increment )
        this.attributes.position.needsUpdate = true
        this.computeVertexNormals()
        this.computeFaceNormals()

    }

    Geometry.raiseVertex = function ( x, y, increment ) {

        const index = this.Vertices.XY[ `${ x },${ y }` ]

        this.Vertices.indexed[ index ].raise( increment )
        this.attributes.position.needsUpdate = true
        this.computeVertexNormals()
        this.computeFaceNormals()

    }

    Geometry.setVertexHeight = function ( x, y, height ) {

        const index = this.Vertices.XY[ `${ x },${ y }` ]

        this.Vertices.indexed[ index ].setHeight( height )
        this.attributes.position.needsUpdate = true
        this.computeVertexNormals()
        this.computeFaceNormals()

    }

    Geometry.setVertexHeightIX = function ( index, height ) {

        this.Vertices.indexed[ index ].setHeight( height )
        this.attributes.position.needsUpdate = true
        this.computeVertexNormals()
        this.computeFaceNormals()

    }

    return Geometry

}