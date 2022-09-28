import * as Engine from '../pack.js'

class PostProcessingManager {

    constructor ( renderer ) {

        this.enabled = true
        
        this.Camera = new Engine.Three.Camera()
        this.Composer = new Engine.ThreeX.EffectComposer( renderer )
        this.Scene = new Engine.Three.Scene()

        // build materials

        this.Materials = {
            Depth: new Engine.Three.MeshDepthMaterial()
        }

        this.Materials.Depth.depthPacking = Engine.Three.RGBADepthPacking
        this.Materials.Depth.blending = Engine.Three.NoBlending 

        this.Supports = {
            depthTextureExtension: !renderer.extensions.get( 'WEBGL_depth_texture' )
        }

        // build targets

        this.Targets = {
            Color: new Engine.Three.WebGLRenderTarget( 
                window.innerWidth * renderer.getPixelRatio(), 
                window.innerHeight * renderer.getPixelRatio() 
            ),
            Depth: new Engine.Three.WebGLRenderTarget( 
                window.innerWidth * renderer.getPixelRatio(), 
                window.innerHeight * renderer.getPixelRatio(),
                {
                    minFilter: Engine.Three.NearestFilter,
                    magFilter: Engine.Three.NearestFilter
                }
            ),
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

    render ( dT ) {

        this.Composer.render( dT )

    }

    resizeShaders ( renderer ) {

        const pixelRatio = renderer.getPixelRatio()

        this.Targets.Color.setSize( 
            window.innerWidth * pixelRatio, 
            window.innerHeight * pixelRatio 
        )
        this.Targets.Depth.setSize( 
            window.innerWidth * pixelRatio, 
            window.innerHeight * pixelRatio 
        )

    }

    setCamera ( camera ) {

        this.Camera = camera

    }

    setScene ( scene ) {

        this.Scene = scene

    }

}

export { PostProcessingManager }