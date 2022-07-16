import * as Database from '../data/pack.js'
import * as Three from '../three/src/pack.js'

export function generateId () {

    let result = ''

    for ( let i = 0; i < Database.ID.length; i++ ) {

        result += Database.Chars.string.charAt( 
            Math.floor( Math.random() * Database.Chars.string.length ) )

    }

    result += Database.ID.numChar + 0

    return result

}

export function randomHexRotation ( radians = false ) {

    const rot = Math.floor( Math.random() * 6 ) * 60

    if ( radians ) {

        return Three.MathUtils.degToRad( rot )

    } else {

        return rot

    }

}

export function randomInRange ( min, max ) {  

    return Math.random() * ( max - min ) + min

}

export function randomPercentAbove ( percent ) {

    return Math.random() > percent * 0.01

}

export function randomPercentBelow ( percent ) {

    return Math.random() < percent * 0.01

}