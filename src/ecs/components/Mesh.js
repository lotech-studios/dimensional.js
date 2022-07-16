import { ECSComponent } from '../component.js'
import { Mesh } from '../../three/src/pack.js'

class MeshComponent extends ECSComponent {

    constructor ( proxy, geometry, material ) {

        super( proxy )

        this._MeshGeometry = geometry
        this._MeshMaterial = material

        this.Mesh = new Mesh( this._MeshGeometry, this._MeshMaterial )

    }

    // private

    _eulerSet ( property, x, y, z ) {

        this.Mesh[ property ].set( x, y, z )

        return

    }

    _eulerSetScalar ( property, value ) {

        this.Mesh[ property ].set( value, value, value )

        return

    }

    _vec3Set ( property, x, y, z ) {

        this.Mesh[ property ].set( x, y, z )

        return

    }

    _vec3SetScalar ( property, value ) {

        this.Mesh[ property ].setScalar( value )

        return

    }

    // public

    setGeometry ( geometry ) {

        if ( geometry.isBufferGeometry ) {

            this._MeshGeometry = geometry

            this.Mesh.geometry = this._MeshGeometry

        } else {

            console.error( '<Altantis.ECS.Components.Mesh.setGeometry()>: This geometry class is not compatible with this version of the engine.' )

        }

        return

    }

    setMaterial ( material ) {

        if ( material.isMaterial ) {

            this._MeshMaterial = material

            this.Mesh.material = this._MeshMaterial

        } else {

            console.error( '<Altantis.ECS.Components.Mesh.setMaterial()>: This material class is not compatible with this version of the engine.' )

        }

        return

    }

    setPosition ( x, y, z ) {

        this._vec3Set( 'position', x, y, z )

        return

    }

    setPositionScalar ( value ) {

        this._vec3SetScalar( 'position', value )

        return

    }

    setRotation ( x, y, z ) {

        this._eulerSet( 'rotation', x, y, z )

        return

    }

    setRotationScalar ( value ) {

        this._eulerSetScalar( 'rotation', value )

        return

    }

    setScale ( x, y, z ) {

        this._vec3Set( 'scale', x, y, z )

        return

    }

    setScaleScalar ( value ) {

        this._vec3SetScalar( 'scale', value )

        return

    }

}

MeshComponent.prototype._name = 'Mesh'
MeshComponent.prototype._requires = []

export { MeshComponent }