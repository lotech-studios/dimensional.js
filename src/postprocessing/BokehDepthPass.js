import {
	Color,
	MeshDepthMaterial,
	NearestFilter,
	NoBlending,
	RGBADepthPacking,
	ShaderMaterial,
	UniformsUtils,
	WebGLRenderTarget
} from '../three/src/pack.js'
import { Pass, FullScreenQuad } from '../three/examples/postprocessing/Pass.js'
import { BokehShader } from '../three/examples/shaders/BokehShader.js'

/**
 * Depth-of-field post-process with bokeh shader
 */

class BokehDepthPass extends Pass {

	constructor ( manager, params ) {

		super()

        this.Manager = manager

		const focus = ( params.focus !== undefined ) ? params.focus : 1.0
		const aspect = ( params.aspect !== undefined ) ? params.aspect : this.Manager.Camera.aspect
		const aperture = ( params.aperture !== undefined ) ? params.aperture : 0.025
		const maxblur = ( params.maxblur !== undefined ) ? params.maxblur : 1.0

		// depth material

		this.materialDepth = new MeshDepthMaterial()
		this.materialDepth.depthPacking = RGBADepthPacking
		this.materialDepth.blending = NoBlending

		// bokeh material

		if ( BokehShader === undefined ) {

			console.error( 'THREE.BokehPass relies on BokehShader' )

		}

		const bokehShader = BokehShader
		const bokehUniforms = UniformsUtils.clone( bokehShader.uniforms )

		bokehUniforms[ 'tDepth' ].value = this.Manager.Targets.Depth.texture

		bokehUniforms[ 'focus' ].value = focus
		bokehUniforms[ 'aspect' ].value = aspect
		bokehUniforms[ 'aperture' ].value = aperture
		bokehUniforms[ 'maxblur' ].value = maxblur
		bokehUniforms[ 'nearClip' ].value = this.Manager.Camera.near
		bokehUniforms[ 'farClip' ].value = this.Manager.Camera.far

		this.materialBokeh = new ShaderMaterial( {
			defines: Object.assign( {}, bokehShader.defines ),
			uniforms: bokehUniforms,
			vertexShader: bokehShader.vertexShader,
			fragmentShader: bokehShader.fragmentShader
		} )

		this.uniforms = bokehUniforms
		this.needsSwap = false

		this.fsQuad = new FullScreenQuad( this.materialBokeh )

		this._oldClearColor = new Color()

	}

	render ( renderer, readBuffer/*, deltaTime, maskActive*/ ) {

		// Render bokeh composite

		this.uniforms[ 'tColor' ].value = readBuffer.texture
		
		this.fsQuad.render( renderer )

	}

}

export { BokehDepthPass }