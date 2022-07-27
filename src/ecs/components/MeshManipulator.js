import { ECSComponent } from '../component.js'
import { Points, PointsMaterial } from '../../three/src/pack.js'

class MeshManipulatorComponent extends ECSComponent {

    constructor ( proxy, scene, options = {} ) {

        super( proxy )

        this.Mesh = this._Proxy.getComponent( 'Mesh' ).Mesh
        this.Points = new Points( this.Mesh.geometry, new PointsMaterial( {
            size: options.pointSize ? options.pointSize: 0.1,
            color: 'yellow',
        } ) )

        scene.add( this.Points )

    }

}

MeshManipulatorComponent.prototype._name = 'MeshManipulator'
MeshManipulatorComponent.prototype._requires = [ 'Mesh' ]

export { MeshManipulatorComponent }