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
        }
    ]
}