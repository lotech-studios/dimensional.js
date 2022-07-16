import { ShaderMaterial } from '../../three/src/pack.js'
import { ECSComponent } from '../component.js'

class RainbowShaderComponent extends ECSComponent {

    constructor ( proxy ) {

        super( proxy )

        this.Material = new ShaderMaterial( {
            uniforms: { time: { value: 0.0 } },
            fragmentShader: `
                uniform float time;

			    varying vec2 vUv;

			    void main( void ) {

				    vec2 position = - 1.0 + 2.0 * vUv;

				    float red = abs( sin( position.x * position.y + time / 5.0 ) );
				    float green = abs( sin( position.x * position.y + time / 4.0 ) );
				    float blue = abs( sin( position.x * position.y + time / 3.0 ) );
				    gl_FragColor = vec4( red, green, blue, 1.0 );

			    }
            `,
            vertexShader: `
                varying vec2 vUv;

			    void main() {

				    vUv = uv;
				    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
				    gl_Position = projectionMatrix * mvPosition;
                    
			    }
            `
        } )

        this._Proxy.getComponent( 'Mesh' ).setMaterial( this.Material )

    }

    update ( deltaTime ) {

        this.Material.uniforms[ 'time' ].value += deltaTime * 5
        
    }

}

RainbowShaderComponent.prototype._name = 'RainbowShader'
RainbowShaderComponent.prototype._requires = [ 'Mesh' ]

export { RainbowShaderComponent }