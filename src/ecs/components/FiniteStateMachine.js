import { ECSComponent } from '../component.js'

class FiniteStateMachineComponent extends ECSComponent {

    constructor ( proxy ) {

        super( proxy )

        this.currentState = null

        this.States = {}

    }

    addState ( name, type ) {

        this.States[ name ] = type

    }

    setState ( name ) {

        const previousState = this.currentState

        if ( previousState ) {

            if ( previousState.name == name ) return

            previousState.exit()

        }

        const State = new this.States[ name ]( this )

        this.currentState = State

        State.enter( previousState )

    }

    update ( timeElapsed, input ) {

        if ( this.currentState ) {

            this.currentState.update( timeElapsed, input )

        }

    }

}

FiniteStateMachineComponent.prototype._name = 'FiniteStateMachine'
FiniteStateMachineComponent.prototype._requires = []

export { FiniteStateMachineComponent }