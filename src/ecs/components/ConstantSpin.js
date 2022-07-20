import { Vector3 } from '../../three/src/pack.js'
import { ECSComponent } from '../component.js'

class ConstantSpinComponent extends ECSComponent {

    constructor ( proxy, factor ) {

        super( proxy )

        this._Factor = factor
        this._Mesh = this._Proxy.getComponent( 'Mesh' ).Mesh

    }

    update ( deltaTime ) {

        this._Mesh.rotation.x += this._Factor.x * deltaTime
        this._Mesh.rotation.y += this._Factor.y * deltaTime
        this._Mesh.rotation.z += this._Factor.z * deltaTime
        
    }

}

ConstantSpinComponent.prototype._name = 'ConstantSpin'
ConstantSpinComponent.prototype._requires = [ 'Mesh' ]

export { ConstantSpinComponent }