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
        publicPath: '',
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
                    exposes: [{ globalName: "$", override: true }, { globalName: "jQuery", override: true }],

                },
            }, {
                test: /\.(sa|sc|c)ss$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    'css-loader',
                    'sass-loader'
                ]
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
                test: /\.(svg|eot|woff|woff2|ttf)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: '[name].[ext]',
                        outputPath: "fonts",
                        esModule: false,
                    }
                }]
            },

            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: {
                        minimize: true,
                    }
                }, ],
            },
            {
                test: require.resolve("jquery"),
                loader: "expose-loader",
                options: {
                    exposes: ["$", "jQuery"],
                },
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
        }),
        new HtmlWebpackPlugin({
            filename: "product.html",
            template: "src/product.html",
        }),
        new HtmlWebpackPlugin({
            filename: "checkout.html",
            template: "src/checkout.html",
        }),
        new HtmlWebpackPlugin({
            filename: "pay.html",
            template: "src/pay.html",
        }),
        new HtmlWebpackPlugin({
            filename: "search.html",
            template: "src/search.html",
        }),
        new HtmlWebpackPlugin({
            filename: "contactus.html",
            template: "src/contactus.html",
        }),

        new MiniCssExtractPlugin({ filename: "css/style.css" }),
        new OptimizeCSSAssetsPlugin({}),
    ],
};