export default {
    input: 'src/pack.js',
    output: [
        {
            file: 'dist/dimensional.esm.js',
            format: 'es'
        },
        {
            file: 'dist/dimensional.js',
            format: 'cjs'
        },
        {
            file: '../copernicus-portfolio/src/js/libs/dimensional.js',
            format: 'es'
        },
        {
            file: '../victorum/src/js/libs/dimensional.js',
            format: 'es'
        }
    ]
}