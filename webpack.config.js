const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: {
            sidepanel: './src/sidepanel/sidepanel.js',
            background: './src/worker/service-worker.js',
            content: './src/content/content-scripts.js',
        },

        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js',
            clean: true
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', {
                                    targets: {
                                        chrome: '88'
                                    },
                                    modules: false
                                }]
                            ]
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader'
                    ]
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'icons/[name][ext]'
                    }
                }
            ]
        },

        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'src/manifest.json',
                        to: 'manifest.json'
                    },
                    {
                        from: 'src/sidepanel/sidepanel.html',
                        to: 'sidepanel.html'
                    },
                    {
                        form: 'src/worker/service-worker.js',
                        to: 'service-worker.js'
                    },
                    {
                        from: 'src/images',
                        to: 'images',
                        noErrorOnMissing: true
                    }
                ]
            }),

            ...(isProduction ? [
                new MiniCssExtractPlugin({
                    filename: '[name].css'
                })
            ] : [])
        ],

        optimization: {
            minimize: isProduction,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            drop_console: isProduction
                        },
                        mangle: {
                            reserved: ['chrome']
                        }
                    }
                })
            ],
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    firebase: {
                        test: /[\\/]node_modules[\\/]firebase[\\/]/,
                        name: 'firebase',
                        chunks: 'all',
                        priority: 10
                    },
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        chunks: 'all',
                        priority: 5
                    }
                }
            }
        },

        resolve: {
            extensions: ['.js', '.json'],
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '@utils': path.resolve(__dirname, 'src/utils'),
                '@firebase': path.resolve(__dirname, 'src/firebase')
            }
        },

        devtool: isProduction ? false : 'cheap-module-source-map',

        stats: {
            errors: true,
            warnings: true,
            assets: false,
            modules: false
        }
    };
};