export async function create ( appClass ) {

    window.App = new appClass()
    
    await window.App.build()

    return

}