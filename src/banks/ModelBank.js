import * as C from '../three/src/constants.js'
import { GLTFLoader } from '../three/examples/pack.js'
import { Bank } from './Bank.js'

class ModelBank extends Bank {

    constructor ( path ) {

        super()

        this._Loader = new GLTFLoader().setPath( path )

    }

    add ( name, url, isPack = false ) {

        return new Promise( ( resolve ) => {

            this._Loader.load( url, ( model ) => {

                this._Stored[ name ] = model

                this._Stored[ name ].scene.traverse( ( child ) => {

                    if ( child.isMesh ) {

                        if ( child.material.map ) {

                            child.material.map.magFilter = C.NearestFilter
                            child.material.map.minFilter = C.NearestFilter
                            child.material.map.needsUpdate = true

                        }

                        if ( child.name.includes( '<no-c-shad>' ) ) {

                            child.castShadow = false
                            child.receiveShadow = true

                        } else if ( child.name.includes( '<no-r-shad>' ) ) {

                            child.castShadow = true
                            child.receiveShadow = false

                        } else if ( child.name.includes( '<no-shad>' ) ) {

                            child.castShadow = false
                            child.receiveShadow = false

                        } else {

                            child.castShadow = true
                            child.receiveShadow = true

                        }                    

                    }

                } )

                if ( isPack ) {

                    this._Stored[ name ].items = {}

                    this._Stored[ name ].scene.children.forEach( ( i ) => {

                        if ( i.isMesh ) {

                            this._Stored[ name ].items[ i.name ] = i

                        }

                    } )

                }

                resolve()

            } )

        } )
        
    }

    remove ( name ) {

        if ( this._Stored[ name ] ) {

            delete this._Stored[ name ]

        } else {

            console.log( `<Atlantis.ModelBank.remove()>: Can't find model under the name "${ name }" stored in this bank.` )

        }

        return

    }

}

ModelBank.prototype.isModelBank = true

export { ModelBank }