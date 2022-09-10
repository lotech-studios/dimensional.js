export function getRandomValue ( array ) {

    return array[ Math.floor( Math.random() * array.length ) ]

}

export function getIndex ( array, value ) {

    return array.indexOf( value )

}

export function getIndexValue ( array, index ) {

    return array[ index ]

}

export function removeIndex ( array, index, instancesToRemove = 1 ) {

    array.splice( index, instancesToRemove )

}

export function removeValue ( array, value, instancesToRemove = 1 ) {

    const index = array.indexOf( value )

    array.splice( index, instancesToRemove )

}

export function sortHighestToLowest ( array ) {

    return array.sort( ( a, b ) => b - a )

}

export function sortLowestToHighest ( array ) {

    return array.sort( ( a, b ) => a - b )

}