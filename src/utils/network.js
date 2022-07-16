export function validateURL ( url ) {

    let request = new XMLHttpRequest()

    request.open( 'GET', url, true )
    request.send()

    request.onload = function () {

        if ( request.status == 200 ) {

            return true

        } else {
        
            return false

        }
    }

}