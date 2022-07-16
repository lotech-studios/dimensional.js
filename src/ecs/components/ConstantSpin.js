import { Vector3 } from '../../three/src/pack.js'
import { ECSComponent } from '../component.js'

class ConstantSpinComponent extends ECSComponent {

    constructor ( proxy, factor ) {

        super( proxy )

        this._Factor = factor

    }

    update ( deltaTime ) {

        const Mesh = this._Proxy.getComponent( 'Mesh' ).Mesh

        Mesh.rotation.x += this._Factor.x * deltaTime
        Mesh.rotation.y += this._Factor.y * deltaTime
        Mesh.rotation.z += this._Factor.z * deltaTime
        
    }

}

ConstantSpinComponent.prototype._name = 'ConstantSpin'
ConstantSpinComponent.prototype._requires = [ 'Mesh' ]

export { ConstantSpinComponent }