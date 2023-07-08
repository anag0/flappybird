const path = require('path');

module.exports = [
  {
    entry: './src/ts/FlappyBird.ts',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        publicPath: 'dist/',
        library: {
            name: 'FlappyBird',
            type: 'umd',
            export: 'default'
        },
        path: path.resolve(__dirname, 'dist'),
        filename: 'flappybird.js',
    },
}];