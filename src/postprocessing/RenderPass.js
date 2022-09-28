import {
	Color
} from '../three/src/pack.js'
import { Pass } from '../three/examples/postprocessing/Pass.js'

class RenderPass extends Pass {

	constructor ( manager ) {

		super()

		this.Manager = manager

		this.clear = true
		this.clearDepth = false
		this.needsSwap = false
		this._oldClearColor = new Color()

	}

	render ( renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */ ) {

		renderer.setRenderTarget( this.renderToScreen ? null : readBuffer )

		// TODO: Avoid using autoClear properties, see https://github.com/mrdoob/three.js/pull/15571#issuecomment-465669600
		renderer.clear( renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil )
		renderer.render( this.Manager.Scene, this.Manager.Camera )

	}

}

export { RenderPass }