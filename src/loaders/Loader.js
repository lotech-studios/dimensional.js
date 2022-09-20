class Loader {

    constructor () {}

    async load ( url, cb = function () {} ) {

        const response = await fetch( url )
        const json = await response.json()

        cb( json )

    }

    async loadJSON ( url ) {

        const response = await fetch( url )
        return await response.json()

    }

}

export { Loader }