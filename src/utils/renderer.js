export function build ( rClass, params, props, parentEl ) {

    const Renderer = new rClass( params )
    Renderer.cameraToRender = null
    Renderer.sceneToRender = null

    Renderer.setCameraToRender = function ( camera ) {

        this.cameraToRender = camera

    }

    Renderer.setSceneToRender = function ( scene ) {

        this.sceneToRender = scene

    }

    for ( const p in props ) {

        Renderer[ p ] = props[ p ]

    }

    if ( parentEl != null ) parentEl.appendChild( Renderer.domElement )

    return Renderer

}

export function setSizeFromElement ( renderer, element, useOffsetDimensions = false ) {

    if ( useOffsetDimensions ) {

        renderer.setSize( element.offsetWidth, element.offsetHeight )

    } else {

        renderer.setSize( element.clientWidth, element.clientHeight )

    }

}

export function setSizeFromWindow ( renderer ) {

    renderer.setSize( window.innerWidth, window.innerHeight )

}

export function render ( renderer ) {

    renderer.render( renderer.sceneToRender, renderer.cameraToRender )

}