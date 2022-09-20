import * as Engine from '../pack.js'

class PostProcessingManager {

    constructor ( renderer ) {

        this.enabled = true
        this.meshes = []
        
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

    async addMesh ( mesh ) {

        this.meshes.push( mesh )

    }

    render1 ( renderer, mainScene, mainCamera ) {

        for ( let i of this.meshes ) i.visible = false

        renderer.render( mainScene, mainCamera )

        // render buffer scene for water depth texture

        mainScene.overrideMaterial = this.Materials.Depth

        renderer.setRenderTarget( this.Targets.Depth )
        renderer.render( mainScene, mainCamera )
        renderer.setRenderTarget( null )

        mainScene.overrideMaterial = null

        for ( let i of this.meshes ) i.visible = true

        renderer.render( mainScene, mainCamera )

    }

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

    update () {

    }

}

export { PostProcessingManager }