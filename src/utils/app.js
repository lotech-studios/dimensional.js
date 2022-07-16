export function create ( appClass ) {

    window.App = new appClass()
    window.App.build()

    return

}