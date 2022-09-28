import {
	MeshDepthMaterial,
	NoBlending,
	RGBADepthPacking,
} from '../three/src/pack.js'
import { Pass } from '../three/examples/postprocessing/Pass.js'

/**
 * Depth-of-field post-process with bokeh shader
 */

class SceneDepthPass extends Pass {

	constructor ( manager ) {

		super()

		this.meshes = []
        this.passes = []

        this.Manager = manager

		// depth material

		this.DepthMaterial = new MeshDepthMaterial()
		this.DepthMaterial.depthPacking = RGBADepthPacking
		this.DepthMaterial.blending = NoBlending

	}

	/**
	 * Add mesh to be hidden in depth calculation
	 * 
	 * @param { THREE.Object3D } mesh mesh to add
	 */

	async addDBM ( mesh ) {

        this.meshes.push( mesh )

    }

	/**
	 * Add pass that requires depth to be set first
	 * 
	 * @param { THREE.Pass } pass pass to add
	 */

    async addDepthPass ( pass ) {

        this.passes.push( pass )

    }

	render ( renderer, writeBuffer, readBuffer/*, deltaTime, maskActive*/ ) {

        for ( let i of this.meshes ) i.visible = false

		// Render depth into texture

		this.Manager.Scene.overrideMaterial = this.DepthMaterial

		renderer.setClearColor( 0xffffff )
		renderer.setClearAlpha( 1.0 )
		renderer.setRenderTarget( this.Manager.Targets.Depth )
		renderer.clear()
		renderer.render( this.Manager.Scene, this.Manager.Camera )

		renderer.setRenderTarget( null )

        for ( let i of this.passes ) i.render( renderer, readBuffer )
		for ( let i of this.meshes ) i.visible = true

		this.Manager.Scene.overrideMaterial = null

	}

}

export { SceneDepthPass }