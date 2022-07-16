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

    parentEl.appendChild( Renderer.domElement )

    return Renderer

}

export function setSizeFromWindow ( renderer ) {

    renderer.setSize( window.innerWidth, window.innerHeight )

    return

}

export function render ( renderer ) {

    renderer.render( renderer.sceneToRender, renderer.cameraToRender )

}