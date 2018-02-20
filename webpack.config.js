
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const min = (process.env.WEBPACK_PRODUCTION !== undefined ? '.min' : '');

if (min) {
    console.log('Building .min');
}

module.exports = {
    entry: './src/index.browser.js',
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true,
            include: [/\.min\.js$/gi]
        })
    ],
    output: {
        filename: 'emoji-category' + min + '.js',
        path: path.resolve(__dirname, 'dist')
    }
};
