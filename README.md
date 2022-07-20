![One of the logos](https://github.com/lotech-studios/dimensional.js/blob/main/res/images/logos/dimensional-full-80.png?raw=true)

* Developed by [Nikolas Karinja](http://nikolaskarinja.com)
* Website is [here](http://dimensional.nikolaskarinja.com)

#### Module-based Javascript 3D game engine

An easy to understand JavaScript ECS game engine. The 3D rendering and is based on [Three.js](https://github.com/mrdoob/three.js). Super easy to use and understand if you have worked with frameworks like [Three.js](https://github.com/mrdoob/three.js) before. Since this is uses the Entity Component System (ECS) architecture, it makes creating and handling entities super easy.

### Usage
The code below does the same thing as the [Three.js example program](https://github.com/mrdoob/three.js#usage) on their github page except it utilizes the built-in ECS to create and modify the mesh.

> This code creates a scene, a camera, and a geometric cube, and it adds the cube to the scene. It then creates a `WebGL` renderer for the scene and camera, and it adds that viewport to the `document.body` element. Finally, it animates the cube within the scene for the camera.

```javascript
import * as D from './libs/dimensional.js' // or wherever the library is located

D.Utils.App.create( class App extends D.Apps.Basic { // use the basic app class

    constructor () {

        super()

    }

    async _buildECS () {
    
        // build ECS manager

        D.C.ECS.Manager = new D.ECS.Manager()
        
        // create mesh assembly

        D.C.ECS.Manager.createAssembly( 'Mesh', async () => {

            const Entity = new D.ECS.Entity()

            const Geometry = new D.Three.BoxGeometry( 0.2, 0.2, 0.2 )
            const Material = new D.Three.MeshNormalMaterial()
            const SpinVector = new D.Three.Vector3( 1, 0, 1 )

            Entity.addComponent( D.ECS.Components.Mesh, Geometry, Material )
            Entity.addComponent( D.ECS.Components.ConstantSpin, SpinVector )

            Entity.getComponent( 'Mesh' ).addTo( D.C.Scenes.Main )

            D.C.ECS.Manager.addEntity( Entity )

        } )
        
        // assemble mesh asyncronously

        await D.C.ECS.Manager.assembleAsync( 'Mesh' )

        return

    }

    async _buildEssentials () {

        // create scene

        D.C.Scenes.Main = new D.Three.Scene()
        D.C.Scenes.Main.background = new D.Three.Color( 0x212121 )

        // create camera

        D.C.Cameras.Main = new D.Three.PerspectiveCamera( 70, 1, 0.01, 2000 )
        D.C.Cameras.Main.position.z = 1
        D.C.Cameras.Main.setAspectFromElement( document.body )

        // create renderer

        D.C.Renderers.Main = D.Utils.Renderer.build(
            D.Three.WebGLRenderer,
            {
                antialias: true,
            },
            {
                outputEncoding: D.Three.sRGBEncoding,
                physicallyCorrectLights: true,
            },
            document.body
        )

        D.C.Renderers.Main.setPixelRatio( window.devicePixelRatio )
        D.C.Renderers.Main.setSceneToRender( D.C.Scenes.Main )
        D.C.Renderers.Main.setCameraToRender( D.C.Cameras.Main )

        D.Utils.Renderer.setSizeFromElement( D.C.Renderers.Main, document.body )

        return

    }
    
    // init

    async build () {

        await this._buildEssentials()
        await this._buildECS()
        
        // begin rendering

        this.render()

    }
    
    // what to do every frame

    onRender () {

        D.Utils.Renderer.render( D.C.Renderers.Main )
        D.C.ECS.Manager.update( this.Time.delta, this.Time.elapsed )

    }

} )
```

### Screenshots
Below are some screenshots of what I have made with this engine _(as of 7/20/22)_

![Victorum](https://github.com/lotech-studios/dimensional.js/blob/main/res/images/logos/dimensional-full-80.png?raw=true)
