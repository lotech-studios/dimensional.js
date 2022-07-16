import * as Database from '../data/pack.js'

class ECSComponent {

    constructor ( proxy ) {

        this._id = this._genId()

        this._Proxy = proxy

        // increase prototype count

        ECSComponent.prototype._compNum++

        // do stuff on compile

        this.onCompile()

    }

    _addReqComps () {

        for ( let i = 0; i < arguments.length; i++ ) {

            this._requires.push( arguments[ i ] )

        }

        return

    }

    _genId () {

        let result = ''

        for ( let i = 0; i < Database.ID.length; i++ ) {

            result += Database.Chars.string.charAt( 
                Math.floor( Math.random() * Database.Chars.string.length ) )

        }

        result += Database.ID.numChar + ECSComponent.prototype._compNum

        return result

    }

    onRemoval () { /** stuff goes here */ }
    onCompile () { /** stuff goes here */ }
    update ( deltaTime, elapsedTime ) { /** stuff goes here */ }

}

ECSComponent.prototype._compNum = 0
ECSComponent.prototype._name = 'ecs-component'
ECSComponent.prototype._requires = []
ECSComponent.prototype.isECSComponent = true

export { ECSComponent }