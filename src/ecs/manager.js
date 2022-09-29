import { ECSEntity } from './entity.js'

class ECSManager {
    
    constructor () {

        this.Assemblies = {}

        this.Entities = {
            array: [],
            namesToIndex: [],
        }

        this._Time = {
            delta: 0,
            elapsed: 0,
        }

    }

    onAfterUpdate () { /** stuff goes here */ }
    onBeforeUpdate () { /** stuff goes here */ }
    onCompile () { /** stuff goes here */ }
    onRemoval () { /** stuff goes here */ }

    async addEntity ( entity ) {

        if ( entity.isECSEntity ) {

            this.Entities.array.push( entity )
            this.Entities.namesToIndex.push( this.Entities.array[ this.Entities.array.length - 1 ]._id )

        } else {

            console.error( `<Dimensional.ECS.Manager.addEntity()>: The entity is not compatible with this version of the engine's ECS Manager.` )

        }

    }

    async assemble ( name, ...args ) {

        const Entity = new ECSEntity()

        await this.Assemblies[ name ]( Entity, ...args )
        await this.addEntity( Entity )

        return Entity

    }

    createAssembly ( name, method ) {

        this.Assemblies[ name ] = method

        return

    }

    getEntity ( id ) {

        if ( this.Entities.namesToIndex.includes( id ) ) {

            const index = this.Entities.namesToIndex.indexOf( id )

            return this.Entities.array[ index ]

        } else {

            console.error( `<Dimensional.ECS.Manager.getEntity()>: Couldnt find the entity (id:${ id }) in this manager.` )

            return

        }

    }

    removeEntity ( id ) {

        if ( this.Entities.namesToIndex.includes( id ) ) {

            const index = this.Entities.namesToIndex.indexOf( id )

            this.Entities.array[ index ].onRemoval()
            this.Entities.array.splice( index, 1 )
            this.Entities.namesToIndex.splice( index, 1 )

        } else {

            console.error( `<Dimensional.ECS.Manager.removeEntity()>: Couldnt find the entity (id:${ id }) in this manager.` )

        }

    }

    update ( deltaTime, elapsedTime ) {

        this.onBeforeUpdate()

        this._Time.delta = deltaTime
        this._Time.elapsed = elapsedTime

        for ( let i = 0; i < this.Entities.array.length; i++ ) {

            this.Entities.array[ i ].update( this._Time.delta, this._Time.elapsed )

        }

        this.onAfterUpdate()

    }

}

ECSManager.isECSManager = true

export { ECSManager }