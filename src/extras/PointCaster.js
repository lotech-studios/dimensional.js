import {
    Raycaster,
    Vector2
} from '../three/src/pack.js'

class PointCaster {

    constructor ( camera ) {

        this._Camera = camera
        this._Intersects = {}
        this._Raycaster = new Raycaster()
        this._RayScreenCoords = new Vector2()

    }

    // public

    getRayScreenCoords () {

        return this._RayScreenCoords

    }

    onPointerMove ( e ) {

        this.updateRay( e )

    }

    updateRay ( e ) {

        this._RayScreenCoords.set(
            ( e.clientX / window.innerWidth ) * 2 - 1,
            -( e.clientY / window.innerHeight ) * 2 + 1
        )

        this._Raycaster.setFromCamera( this.getRayScreenCoords(), this._Camera )

    }
    
}

export { PointCaster }