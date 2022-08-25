import { AudioBank } from '../banks/AudioBank.js'

class AudioManager {

    constructor ( path = '' ) {

        this.instancesCreated = 0
        this.instancesPlaying = []

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

        this.Instances[ `${ name }-${ this.instancesCreated }` ] = new Audio( this.Bank.get( name ) )

        // add attributes to instance from <options>

        for ( const o in options ) this.Instances[ `${ name }-${ this.instancesCreated }` ][ o ] = options[ o ]

        // play audio

        this.Instances[ `${ name }-${ this.instancesCreated }` ].play()

        // create and store instance timeout

        if ( !options.keep ) {

            this.Timeouts[ `${ name }-${ this.instancesCreated }` ] = setTimeout( () => {
            
                this.removeInstance( name )
            
            }, instanceDuration != null ? instanceDuration : this.Instances[ `${ name }-${ this.instancesCreated }` ].duration )

        }

        return `${ name }-${ this.instancesCreated }`

    }

    removeInstance ( name ) {

        // pause audio

        this.Instances[ name ].pause()

        // delete instance
            
        delete this.Instances[ name ]

        // clear instance timeout

        clearTimeout( this.Timeouts[ name ] )

    }

}

export { AudioManager }