export function map ( val, smin, smax, emin, emax ) {

    const t =  ( val - smin ) / ( smax - smin )

    return ( emax - emin ) * t + emin

}

export function noise ( simplex, nx, ny ) {

    // Re-map from -1.0:+1.0 to 0.0:1.0
    return map( simplex.noise2D( nx, ny ), -1, 1, 0, 1 )

}

//stack some noisefields together
export function octave ( simplex, nx, ny, octaves ) {

    let val = 0
    let freq = 1
    let max = 0
    let amp = 1

    for( let i = 0; i < octaves; i++ ) {

        val += noise( simplex, nx * freq, ny * freq ) * amp
        max += amp
        amp /= 2
        freq *= 2

    }

    return val / max

}