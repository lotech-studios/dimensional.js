export function addCommasToNumber ( number ) {

    return number.toString().replace( /\B(?=(\d{3})+(?!\d))/g, ',' )

}

export function capitalizeFirstLetter ( string ) {
    
    return string.charAt( 0 ).toUpperCase() + string.slice( 1 )

}