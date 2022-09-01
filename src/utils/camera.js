export function getWindowAspect () {

    return window.innerWidth / window.innerHeight

}

export function setAspectFromWindow ( camera ) {

    camera.aspect = window.innerWidth / window.innerHeight

}