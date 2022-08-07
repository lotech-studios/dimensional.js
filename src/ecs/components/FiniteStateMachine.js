import { ECSComponent } from '../component.js'

class FiniteStateMachineComponent extends ECSComponent {

    constructor ( proxy ) {

        super( proxy )

        this.CurrentState = null
        this.States = {}

    }

    addState ( name, type ) {

        this.States[ name ] = type

    }

    setState ( name ) {

        const PreviousState = this.CurrentState

        if ( PreviousState ) {

            if ( PreviousState.name == name ) return

            PreviousState.exit()

        }

        const State = new this.States[ name ]( this )

        this.CurrentState = State

        State.enter( PreviousState )

    }

    update ( dT, eT ) {

        if ( this.CurrentState ) {

            this.CurrentState.update( eT )

        }

    }

}

FiniteStateMachineComponent.prototype._name = 'FiniteStateMachine'
FiniteStateMachineComponent.prototype._requires = []

export { FiniteStateMachineComponent }