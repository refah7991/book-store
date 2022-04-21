const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    entry: {
        app: "./src/index.js",
    },

    output: {
        path: path.join(__dirname, "/dist"),
        publicPath: 'something',
        filename: "main.js",
    },

    mode: "development",
    devServer: {
        contentBase: path.join(__dirname, '/dist'),
        port: 1239,
        writeToDisk: true,
        open: true,
    },
    module: {
        rules: [{
                test: require.resolve("jquery"),
                loader: "expose-loader",
                options: {
                    exposes: ["$", "jQuery"],
                },
            },

            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false,
                        },
                    },
                    "css-loader",
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'images',
                    }
                }]
            },

            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: {
                        minimize: true,
                    },
                }, ],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
        }),

        new MiniCssExtractPlugin({ filename: "css/style.css" }),
        new OptimizeCSSAssetsPlugin({}),
    ],
};