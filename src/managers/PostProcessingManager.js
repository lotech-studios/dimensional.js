import * as Engine from '../pack.js'

class PostProcessingManager {

    constructor () {

        this.enabled = true
        
        this.Scene = new Engine.Three.Scene()

        // build materials

        this.Materials = {
            Depth: new Engine.Three.MeshDepthMaterial()
        }

        this.Materials.Depth.depthPacking = Engine.Three.RGBADepthPacking
        this.Materials.Depth.blending = Engine.Three.NoBlending 

        // build targets

        this.Targets = {
            Color: new Engine.Three.WebGLRenderTarget( window.innerWidth, window.innerHeight ),
            Depth: new Engine.Three.WebGLRenderTarget( window.innerWidth, window.innerHeight ),
        }

    }
    // private

    _linearize ( depth, camera ) {

        const zfar = camera.far
        const znear = camera.near

        return - zfar * znear / ( depth * ( zfar - znear ) - zfar )

    }

    _smoothstep ( near, far, depth ) {

        const x = this._saturate( ( depth - near ) / ( far - near ) )
        
        return x * x * ( 3 - 2 * x )

    }

    _saturate ( x ) {

        return Math.max( 0, Math.min( 1, x ) )

    }

    // public

    render ( renderer, mainScene, mainCamera ) {

        renderer.setRenderTarget( this.Targets.Color )
        renderer.render( mainScene, mainCamera )

        // render buffer scene for water depth texture

        mainScene.overrideMaterial = this.Materials.Depth

        renderer.setRenderTarget( this.Targets.Depth )
        renderer.clear()
        renderer.render( mainScene, mainCamera )

        mainScene.overrideMaterial = null

        renderer.setRenderTarget( null )
        renderer.render( mainScene, mainCamera )
        renderer.render( this.Scene, mainCamera )

    }

    resizeShaders () {

        this.Targets.Color.setSize( window.innerWidth, window.innerHeight )
        this.Targets.Depth.setSize( window.innerWidth, window.innerHeight )

        return

    }

    update () {

    }

}

export { PostProcessingManager }