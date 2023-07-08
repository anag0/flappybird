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
            {
                test: /\.(png|jpg|gif|mp3|wav)$/i,
                type: "asset/inline",
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        library: {
            name: 'FlappyBird',
            type: 'umd',
            export: 'default'
        },
        path: path.resolve(__dirname, 'dist'),
        filename: 'flappybird.js',
    },
}];