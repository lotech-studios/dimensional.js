import { AudioBank } from '../banks/AudioBank.js'
import * as ArrayUtils from '../utils/array.js'

class AudioManager {

    constructor ( path = '' ) {

        this.instancesCreated = 0
        this.instancesPlaying = []

        this.Bank = new AudioBank( path )
        this.Instances = {}
        this.Timeouts = {}

        this.Playlist = {
            queue: [],
        }

    }

    /**
     * 
     * @param { string } name Name of the stored audio.
     * @param { number } instanceDuration How long before instance is deleted. Default is the duration of the audio.
     * @param { object } options Attribute to add to the <HTMLAudioElement> object.
     */

    playInstance ( name, instanceDuration = null, options = {} ) {

        let id = `${ name }-${ this.instancesCreated }`

        // update instance count

        this.instancesCreated++

        // create and store instance

        this.Instances[ id ] = new Audio( this.Bank.get( name ) )
        this.Instances[ id ].onRemoval = function () {}

        // add attributes to instance from <options>

        for ( const o in options ) this.Instances[ id ][ o ] = options[ o ]

        // play audio

        this.Instances[ id ].play()

        // create and store instance timeout

        if ( !options.keep ) {

            this.Timeouts[ id ] = setTimeout( () => {
            
                this.removeInstance( name )
            
            }, instanceDuration != null ? instanceDuration : this.Instances[ id ].duration )

        }

        return id

    }

    /**
     * 
     * @param { string } name Name of the stored audio.
     */

    removeInstance ( name ) {

        // pause audio and do last action

        this.Instances[ name ].pause()
        this.Instances[ name ].onRemoval()

        // delete instance
            
        delete this.Instances[ name ]

        // clear instance timeout

        clearTimeout( this.Timeouts[ name ] )

    }

    setPlaylistQueue ( playOnCall, options = {} ) {

        this.Playlist.queue = []

        for ( let i of arguments ) {

            this.Playlist.queue.push( i )

        }

        if ( playOnCall ) this.playFirstInQueue( options )

    }

    playFirstInQueue ( options = {} ) {

        let instance = this.playInstance( this.Playlist.queue[ 0 ], null, options )

        instance.onRemoval = () => {

            ArrayUtils.removeIndex( this.Playlist.queue, 0, 1 )

            this.playFirstInQueue()

        }

    }

}

export { AudioManager }