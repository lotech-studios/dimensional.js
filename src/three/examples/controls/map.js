import { 
	MOUSE, 
	TOUCH 
} from '../../src/pack.js'
import { OrbitControls } from './orbit.js'

class MapControls extends OrbitControls {

	constructor ( object, domElement ) {

		super( object, domElement )

		this.screenSpacePanning = false // pan orthogonal to world-space direction camera.up

		this.mouseButtons.LEFT = MOUSE.PAN
		this.mouseButtons.RIGHT = MOUSE.ROTATE

		this.touches.ONE = TOUCH.PAN
		this.touches.TWO = TOUCH.DOLLY_ROTATE

	}

}

export { MapControls }