class RenderInterfaceTool {

    constructor ( renderManager, sceneList, cameraList ) {

        this.Cameras = cameraList
        this.Manager = renderManager
        this.Scenes = sceneList

        this.Elements = {}
        this.Selected = { Camera: null, Scene: null }

        this.createElements()

    }

    appendTo ( element ) {

        element.appendChild( this.Elements.Main )

    }

    createElements () {

        this.Elements.Main = document.createElement( 'div' )
        this.Elements.Main.style.position = 'absolute'
        this.Elements.Main.style.left = '8px'
        this.Elements.Main.style.top = '8px'
        this.Elements.Main.style.width = '340px'
        this.Elements.Main.style.height = 'calc( 100vh - 16px )'
        this.Elements.Main.style.display = 'inline-block'
        this.Elements.Main.style.backgroundColor = 'rgba( 0, 0, 0, 0.75 )'
        this.Elements.Main.style.borderRadius = '4px'
        this.Elements.Main.style.pointerEvents = 'all' 
        this.Elements.Main.style.fontFamily = 'consolas'
        this.Elements.Main.style.zIndex = '9999999'

        // camera select

        this.Elements.CameraSelectLabel = document.createElement( 'div' )
        this.Elements.CameraSelectLabel.innerHTML = 'Camera selected'
        this.Elements.CameraSelectLabel.style.color = 'white'
        this.Elements.CameraSelectLabel.style.margin = '0px 4px 0px 8px'
        this.Elements.CameraSelectLabel.style.fontSize = '16px'

        this.Elements.CameraSelectMenu = document.createElement( 'select' )
        this.Elements.CameraSelectMenu.style.margin = '0px 4px 0px 4px'
        this.Elements.CameraSelectMenu.style.fontFamily = 'consolas'
        this.Elements.CameraSelectMenu.style.backgroundColor = 'rgba( 0, 0, 0, 0.5 )'
        this.Elements.CameraSelectMenu.style.border = 'none'
        this.Elements.CameraSelectMenu.style.height = '24px'
        this.Elements.CameraSelectMenu.style.color = 'white'
        this.Elements.CameraSelectMenu.style.borderRadius = '4px'
        this.Elements.CameraSelectMenu.style.cursor = 'pointer'

        this.Elements.CameraSelectMenu.addEventListener( 'change', ( e ) => this.selectCamera( e.target.value ) )

        this.Elements.CameraSelectRefresh = document.createElement( 'div' )
        this.Elements.CameraSelectRefresh.innerHTML = '↻'
        this.Elements.CameraSelectRefresh.style.margin = '0px 4px 0px 4px'
        this.Elements.CameraSelectRefresh.style.fontFamily = 'consolas'
        this.Elements.CameraSelectRefresh.style.backgroundColor = 'rgba( 0, 0, 0, 0.5 )'
        this.Elements.CameraSelectRefresh.style.border = 'none'
        this.Elements.CameraSelectRefresh.style.width = '24px'
        this.Elements.CameraSelectRefresh.style.height = '24px'
        this.Elements.CameraSelectRefresh.style.color = 'white'
        this.Elements.CameraSelectRefresh.style.borderRadius = '4px'
        this.Elements.CameraSelectRefresh.style.textAlign = 'center'
        this.Elements.CameraSelectRefresh.style.cursor = 'pointer'

        this.Elements.CameraSelectRefresh.addEventListener( 'pointerup', () => this.refreshSceneObjectList() )

        this.Elements.CameraSelect = document.createElement( 'div' )
        this.Elements.CameraSelect.style.width = '100%'
        this.Elements.CameraSelect.style.height = '32px'
        this.Elements.CameraSelect.style.display = 'flex'
        this.Elements.CameraSelect.style.alignItems = 'center'
        this.Elements.CameraSelect.style.justifyContent = 'flex-start'

        this.Elements.CameraSelect.appendChild( this.Elements.CameraSelectLabel )
        this.Elements.CameraSelect.appendChild( this.Elements.CameraSelectMenu )
        this.Elements.CameraSelect.appendChild( this.Elements.CameraSelectRefresh )

        // scene select

        this.Elements.SceneSelectLabel = document.createElement( 'div' )
        this.Elements.SceneSelectLabel.innerHTML = 'Scene selected'
        this.Elements.SceneSelectLabel.style.color = 'white'
        this.Elements.SceneSelectLabel.style.margin = '0px 4px 0px 8px'
        this.Elements.SceneSelectLabel.style.fontSize = '16px'

        this.Elements.SceneSelectMenu = document.createElement( 'select' )
        this.Elements.SceneSelectMenu.style.margin = '0px 4px 0px 4px'
        this.Elements.SceneSelectMenu.style.fontFamily = 'consolas'
        this.Elements.SceneSelectMenu.style.backgroundColor = 'rgba( 0, 0, 0, 0.5 )'
        this.Elements.SceneSelectMenu.style.border = 'none'
        this.Elements.SceneSelectMenu.style.height = '24px'
        this.Elements.SceneSelectMenu.style.color = 'white'
        this.Elements.SceneSelectMenu.style.borderRadius = '4px'
        this.Elements.SceneSelectMenu.style.cursor = 'pointer'

        this.Elements.SceneSelectMenu.addEventListener( 'change', ( e ) => this.selectScene( e.target.value ) )

        this.Elements.SceneSelectRefresh = document.createElement( 'div' )
        this.Elements.SceneSelectRefresh.innerHTML = '↻'
        this.Elements.SceneSelectRefresh.style.margin = '0px 4px 0px 4px'
        this.Elements.SceneSelectRefresh.style.fontFamily = 'consolas'
        this.Elements.SceneSelectRefresh.style.backgroundColor = 'rgba( 0, 0, 0, 0.5 )'
        this.Elements.SceneSelectRefresh.style.border = 'none'
        this.Elements.SceneSelectRefresh.style.width = '24px'
        this.Elements.SceneSelectRefresh.style.height = '24px'
        this.Elements.SceneSelectRefresh.style.color = 'white'
        this.Elements.SceneSelectRefresh.style.borderRadius = '4px'
        this.Elements.SceneSelectRefresh.style.textAlign = 'center'
        this.Elements.SceneSelectRefresh.style.cursor = 'pointer'

        this.Elements.SceneSelectRefresh.addEventListener( 'pointerup', () => this.refreshSceneObjectList() )

        this.Elements.SceneSelect = document.createElement( 'div' )
        this.Elements.SceneSelect.style.width = '100%'
        this.Elements.SceneSelect.style.height = '32px'
        this.Elements.SceneSelect.style.display = 'flex'
        this.Elements.SceneSelect.style.alignItems = 'center'
        this.Elements.SceneSelect.style.justifyContent = 'flex-start'

        this.Elements.SceneSelect.appendChild( this.Elements.SceneSelectLabel )
        this.Elements.SceneSelect.appendChild( this.Elements.SceneSelectMenu )
        this.Elements.SceneSelect.appendChild( this.Elements.SceneSelectRefresh )

        // scene objects

        this.Elements.SceneObjectsList = document.createElement( 'div' )
        this.Elements.SceneObjectsList.style.margin = '0px 0px 0px 8px'
        this.Elements.SceneObjectsList.style.width = 'calc( 100% - 16px )'
        this.Elements.SceneObjectsList.style.height = '256px'
        this.Elements.SceneObjectsList.style.display = 'inline-block'
        this.Elements.SceneObjectsList.style.overflowX = 'hidden'
        this.Elements.SceneObjectsList.style.overflowY = 'auto'
        this.Elements.SceneObjectsList.style.borderRadius = '4px'
        this.Elements.SceneObjectsList.style.backgroundColor = 'rgba( 0, 0, 0, 0.25 )'

        // Append all children to main

        this.refreshCameraList()
        this.refreshSceneList()
        this.selectCamera( this.Manager.Camera.name )
        this.selectScene( this.Manager.Scene.name )

        this.Elements.Main.appendChild( this.Elements.CameraSelect )
        this.Elements.Main.appendChild( this.Elements.SceneSelect )
        this.Elements.Main.appendChild( this.Elements.SceneObjectsList )

    }

    getElement () {

        return this.Elements.Main

    }

    refreshCameraList () {

        for ( const c in this.Cameras ) {

            const Element = document.createElement( 'option' )
            Element.innerHTML = c

            this.Elements.CameraSelectMenu.appendChild( Element )

        }

    }

    refreshSceneList () {

        this.Elements.SceneSelectMenu.innerHTML = ''

        for ( const s in this.Scenes ) {

            const Element = document.createElement( 'option' )
            Element.innerHTML = s

            this.Elements.SceneSelectMenu.appendChild( Element )

        }

    }

    refreshSceneObjectList () {

        let count = 0

        this.Elements.SceneObjectsList.innerHTML = ''

        this.Selected.Scene.traverse( ( child ) => {

            if ( child.isMesh || child.isGroup ) {

                const Element = document.createElement( 'div' )
                Element.style.width = '100%'
                Element.style.height = '24px'
                Element.style.display = 'flex'
                Element.style.flexDirection = 'row'
                Element.style.alignItems = 'center'
                Element.style.justifyContent = 'flex-start'
                Element.style.whiteSpace = 'nowrap'
                Element.style.cursor = 'pointer'
                
                if ( count % 2 == 0 ) Element.style.backgroundColor = 'rgba( 0, 0, 0, 0.25 )'
            
                // subs

                const Eye = document.createElement( 'div' )
                Eye.setAttribute( 'uuid', child.uuid )
                Eye.innerHTML = '👁'
                Eye.style.width = '24px'
                Eye.style.height = '24px'
                Eye.style.color = child.visible && child.parent.visible ? 'limegreen' : 'grey'
                Eye.style.fontSize = '16px'
                Eye.style.margin = '0px 0px 0px 8px'

                Eye.addEventListener( 'pointerup', ( e ) => {

                    const uuid = e.target.getAttribute( 'uuid' )

                    this.Selected.Scene.traverse( ( _child ) => {

                        if ( _child.uuid == uuid ) {

                            if ( _child.visible ) _child.visible = false
                            else _child.visible = true

                        }

                    } )

                    this.refreshSceneObjectList()

                } )

                const Name = document.createElement( 'div' )
                Name.innerHTML = child.name.length > 0 ? child.name : 
                    child.isGroup ? 'Unnamed Group' : 'Unnamed Mesh'
                Name.style.color = 'white'
                Name.style.margin = '0px 8px 0px 8px'
                Name.style.fontSize = '14px'

                const Type = document.createElement( 'div' )
                Type.innerHTML = `${ child.isGroup ? 'Group' : 'Mesh' } ${ 
                    child.parent && !child.parent.isScene ? ` (P: ${ child.parent.name.length > 0 ? child.parent.name : 
                    child.parent.isGroup ? 'Unnamed Group' : 'Unnamed Mesh' })` : '' }`
                Type.style.color = 'magenta'
                Type.style.margin = '0px 8px 0px 4px'
                Type.style.fontSize = '12px'

                const UUID = document.createElement( 'div' )
                UUID.innerHTML = child.uuid
                UUID.style.color = 'cyan'
                UUID.style.margin = '0px 8px 0px 8px'
                UUID.style.fontSize = '12px'

                // append subs to main

                Element.appendChild( Eye )
                Element.appendChild( Name )
                Element.appendChild( Type )
                Element.appendChild( UUID )

                // append all to list

                this.Elements.SceneObjectsList.appendChild( Element )

                count++

            }

        } )

    }

    selectCamera ( name ) {

        this.Selected.Camera = this.Cameras[ name ]

        this.Elements.CameraSelectMenu.value = name

        this.Manager.setCamera( this.Cameras[ name ] )

    }

    selectScene ( name ) {

        this.Selected.Scene = this.Scenes[ name ]

        this.Elements.SceneSelectMenu.value = name

        this.Manager.setScene( this.Scenes[ name ] )

        this.refreshSceneObjectList()

    }

    update () {}

}

export { RenderInterfaceTool }