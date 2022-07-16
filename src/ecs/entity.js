import * as Database from '../data/pack.js'

class ECSEntity {

    constructor () {

        this._id = this._genId()
        this._name = `ecs-entity#${ ECSEntity.prototype._entNum }`

        this._Components = {
            array: [],
            namesToIndex: [],
        }

        // increase prototype count

        ECSEntity.prototype._entNum++

        // do stuff on compile

        this.onCompile()

    }

    _genId () {

        let result = ''

        for ( let i = 0; i < Database.ID.length; i++ ) {

            result += Database.Chars.string.charAt( 
                Math.floor( Math.random() * Database.Chars.string.length ) )

        }

        result += Database.ID.numChar + ECSEntity.prototype._entNum

        return result

    }

    // empty methods

    onAfterUpdate () { /** stuff goes here */ }
    onBeforeUpdate () { /** stuff goes here */ }
    onCompile () { /** stuff goes here */ }
    onRemoval () { /** stuff goes here */ }

    //

    addComponent ( compClass, ...args ) {

        if ( compClass.prototype.isECSComponent ) {

            this._Components.array.push( new compClass( this, ...args ) )
            this._Components.namesToIndex.push( 
                this._Components.array[ this._Components.array.length - 1 ]._name )

        } else {

            console.error( '<Atlantis.ECS.Entity.addComponent()>: The component class is not compatible with this version of the engine.' )

        }

        return

    }

    getComponent ( name ) {

        const index = this._Components.namesToIndex.indexOf( name )

        return this._Components.array[ index ]

    }

    removeComponent ( name ) {

        if ( this._Components.namesToIndex.includes( name ) ) {

            const index = this._Components.namesToIndex.indexOf( name )

            this._Components.array[ index ].onRemoval()
            this._Components.array.splice( index, 1 )
            this._Components.namesToIndex.splice( index, 1 )

        } else {

            console.error( `<Atlantis.ECS.Entity.removeComponent()>: Couldnt find the component named "${ name }" in this entity.` )

        }

        return

    }

    update ( deltaTime, elapsedTime ) {

        this.onBeforeUpdate()

        for ( let i = 0; i < this._Components.array.length; i++ ) {

            this._Components.array[ i ].update( deltaTime, elapsedTime )

        }

        this.onAfterUpdate()

    }

}

ECSEntity.prototype._entNum = 0
ECSEntity.prototype.isECSEntity = true

export { ECSEntity }