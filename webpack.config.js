const path = require('path');

module.exports = [
  {
    entry: './src/ts/App.ts',
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
        path: path.resolve(__dirname, 'dist'),
        filename: 'App.js',
    },
}];