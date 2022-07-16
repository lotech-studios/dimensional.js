import { ShaderMaterial } from '../../three/src/pack.js'
import { ECSComponent } from '../component.js'

class MusicVideoShaderComponent extends ECSComponent {

    constructor ( proxy ) {

        super( proxy )

        this.Material = new ShaderMaterial( {
            uniforms: { time: { value: 0.0 } },
            fragmentShader: `
                uniform float time;

			    varying vec2 vUv;

			    void main( void ) {

                    vec2 position = vUv;
    
                    float color = 0.0;
                    color += sin( position.x * cos( time / 15.0 ) * 80.0 ) + cos( position.y * cos( time / 15.0 ) * 10.0 );
                    color += sin( position.y * sin( time / 10.0 ) * 40.0 ) + cos( position.x * sin( time / 25.0 ) * 40.0 );
                    color += sin( position.x * sin( time / 5.0 ) * 10.0 ) + sin( position.y * sin( time / 35.0 ) * 80.0 );
                    color *= sin( time / 10.0 ) * 0.5;
    
                    gl_FragColor = vec4( vec3( color, color * 0.5, sin( color + time / 3.0 ) * 0.75 ), 1.0 );
    
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

MusicVideoShaderComponent.prototype._name = 'MusicVideoShader'
MusicVideoShaderComponent.prototype._requires = [ 'Mesh' ]

export { MusicVideoShaderComponent }
