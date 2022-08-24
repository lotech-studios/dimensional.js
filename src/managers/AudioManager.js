import { AudioBank } from '../banks/AudioBank.js'

class AudioManager {

    constructor ( path = '' ) {

        this.instancesCreated = 0

        this.Bank = new AudioBank( path )
        this.Instances = {}
        this.Timeouts = {}

    }

    /**
     * 
     * @param { string } name Name of the stored audio.
     * @param { number } instanceDuration How long before instance is deleted. Default is the duration of the audio.
     * @param { object } options Attribute to add to the <HTMLAudioElement> object.
     */

    playInstance ( name, instanceDuration = null, options = {} ) {

        // update instance count

        this.instancesCreated++

        // create and store instance

        this.Instances[ `audio-${ this.instancesCreated }` ] = new Audio( this.Bank.get( name ) )

        // add attributes to instance from <options>

        for ( const o in options ) Sound[ o ] = options[ o ]

        // create and store instance timeout

        this.Timeouts[ `timeout-${ this.instancesCreated }` ] = setTimeout( () => {
            
            // delete instance
            
            delete this.Instances[ `audio-${ this.instancesCreated }` ]

            // clear instance timeout

            clearTimeout( this.Timeouts[ `timeout-${ this.instancesCreated }` ] )
        
        }, instanceDuration != null ? instanceDuration : this.Instances[ `audio-${ this.instancesCreated }` ].duration )

    }

}

export { AudioManager }