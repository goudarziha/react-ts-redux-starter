const path = require('path')

const rules = [{
    test: /\.tsx?/,
    exclude: /node_modules/,
    loader: 'babel-loader'

}, {
    test: /\.css$/,
    use: ["style-loader", "css-loader"]
},
{
    test: /\.(png|jpe?g|gif)$/,
    use: [
        {
            loader: "file-loader",
            options: {}
        }
    ]
}];

module.exports = {
    target: 'web',
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: { rules },
    resolve: { extensions: ['.ts', '.tsx', '.js'] },
    devServer: {
        contentBase: './',
        port: 5000
    }
}