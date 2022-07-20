import { Clock } from '../three/src/pack.js'

class BasicApp {

    constructor () {

        this.Clock = new Clock()
        this.Time = { delta: 0, elapsed: 0 }

    }

    async build () {

        this.render()

    }

    onRender () { /** add your render code here */ }

    render () {

        requestAnimationFrame( ( t ) => {

            this.Time.delta = this.Clock.getDelta()
            this.Time.elapsed = this.Clock.getElapsedTime()

            this.render()
            this.onRender( t )

        } )

    }

}

export { BasicApp }