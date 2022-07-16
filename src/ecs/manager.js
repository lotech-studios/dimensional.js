class ECSManager {
    
    constructor () {

        this._Assemblies = {}

        this._Entities = {
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

    addEntity ( entity ) {

        if ( entity.isECSEntity ) {

            this._Entities.array.push( entity )
            this._Entities.namesToIndex.push( 
                this._Entities.array[ this._Entities.array.length - 1 ]._id )

        } else {

            console.error( `<Atlantis.ECS.Manager.addEntity()>: The entity is not compatible with this version of the engine's ECS Manager.` )

        }

        return

    }

    assemble ( name, ...args ) {

        const A = this._Assemblies[ name ]( ...args )

        return A

    }

    assemblePromise ( name, ...args ) {

        return new Promise( ( resolve ) => {

            this._Assemblies[ name ]( ...args )
                .then( () => resolve() )

        } )

    }

    createAssembly ( name, method ) {

        this._Assemblies[ name ] = method

        return

    }

    getEntity ( id ) {

        if ( this._Entities.namesToIndex.includes( id ) ) {

            const index = this._Entities.namesToIndex.indexOf( id )

            return this._Entities.array[ index ]

        } else {

            console.error( `<Atlantis.ECS.Manager.getEntity()>: Couldnt find the entity (id:${ id }) in this manager.` )

            return

        }

    }

    removeEntity ( id ) {

        if ( this._Entities.namesToIndex.includes( id ) ) {

            const index = this._Entities.namesToIndex.indexOf( id )

            this._Entities.array[ index ].onRemoval()
            this._Entities.array.splice( index, 1 )
            this._Entities.namesToIndex.splice( index, 1 )

        } else {

            console.error( `<Atlantis.ECS.Manager.removeEntity()>: Couldnt find the entity (id:${ id }) in this manager.` )

        }

        return

    }

    update ( deltaTime, elapsedTime ) {

        this.onBeforeUpdate()

        this._Time.delta = deltaTime
        this._Time.elapsed = elapsedTime

        for ( let i = 0; i < this._Entities.array.length; i++ ) {

            this._Entities.array[ i ].update( this._Time.delta, this._Time.elapsed )

        }

        this.onAfterUpdate()

    }

}

ECSManager.isECSManager = true

export { ECSManager }