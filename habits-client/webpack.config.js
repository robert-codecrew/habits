const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    
    //adding babel
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'],
                        plugins:['@babel/plugin-transform-runtime'],
                    }
                }
            },
            {
                test: [/\.scss$/, /\.css$/],
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            },
        ]
    },
  
    // adding server and port-number
    devServer: {
        port:3024,
    },
    plugins: [
        new htmlWebpackPlugin({
            template:'./public/index.html',
        }),
    ]
};