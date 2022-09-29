export async function addElement ( parent, html ) {

    const Elements = new DOMParser().parseFromString( html, 'text/xml' )

    parent.appendChild( Elements.childNodes[ 0 ] )

}