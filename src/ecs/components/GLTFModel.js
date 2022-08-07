import { SkeletonUtils } from '../../three/examples/utils/SkeletonUtils.js'
import { AnimationMixer, LoopRepeat } from '../../three/src/pack.js'
import { ECSComponent } from '../component.js'

class GLTFAnimation {

    constructor ( action, clip ) {

        this.Action = action
        this.Clip = clip

    }

}

class GLTFModelComponent extends ECSComponent {

    constructor ( proxy, model, hasSkeleton = false ) {

        super( proxy )

        this.Model = model
        this.ModelGroup = hasSkeleton ? SkeletonUtils.clone( model.scene ) : model.scene.clone()
        this.Mixer = new AnimationMixer( this.ModelGroup )

        this._sortAnimations()

    }

    // private

    _sortAnimations () {

        this.Animations = {
            array: [],
            nameByIndex: [],
        }

        this.Model.animations.forEach( ( a ) => {

            const Anim = new GLTFAnimation( this.Mixer.clipAction( a ), a )

            this.Animations.array.push( Anim )
            this.Animations.nameByIndex.push( a.name )

        } )

    }

    // public

    addTo ( object3D ) {

        object3D.add( this.ModelGroup )

    }

    getAnimation ( name ) {

        const index = this.Animations.nameByIndex.indexOf( name )

        return this.Animations.array[ index ]

    }

    playAllAnimations () {

        this.Model.animations.forEach( ( a ) => {

            this.Mixer.clipAction( a ).play()

        } )

    }

    playAnimation ( name, loop = LoopRepeat, repetitions = Infinity ) {

        const Anim = this.getAnimation( name )

        Anim.Clip.repetitions = repetitions
        Anim.Clip.loop = loop

        Anim.Action.play()

    }

    stopAllAnimations () {

        this.Mixer.stopAllAction()

    }

    stopAnimation ( name ) {
        
        const Anim = this.getAnimation( name )
        Anim.Action.stop()

    }

    update ( dT, eT ) {

        this.Mixer.update( dT )

    }

}

GLTFModelComponent.prototype._name = 'GLTFModel'
GLTFModelComponent.prototype._requires = []

export { GLTFModelComponent }