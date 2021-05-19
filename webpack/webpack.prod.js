const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const { prod_Path, src_Path } = require("./path");
const { selectedPreprocessor } = require("./loader");
const { copyPluginGlobOptions } = require("./copy");

module.exports = {
	entry: {
		main: "./" + src_Path + "/index.ts"
	},
	resolve: {
		extensions: [".ts", ".js"]
	},
	output: {
		path: path.resolve(__dirname, prod_Path),
		filename: "[name].[chunkhash:8].js"
	},
	//devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.ts?$/,
				use: "ts-loader",
				exclude: /node_modules/
			},
			{
				test: selectedPreprocessor.fileRegexp,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: "css-loader"
					},
					{
						loader: "postcss-loader"
					},
					{
						loader: selectedPreprocessor.loaderName
					}
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[contenthash:8].[ext]',
							outputPath: 'fonts/'
						}
					}
				],
			},
		]
	},
	plugins: [
		new CleanWebpackPlugin(path.resolve(__dirname, prod_Path), {
			root: process.cwd()
		}),
		new MiniCssExtractPlugin({
			filename: "style.[contenthash:8].css"
		}),
		new HtmlWebpackPlugin({
			inject: false,
			hash: false,
			template: "./" + src_Path + "/assets/index.html",
			filename: "index.html",
			minify: {
				collapseWhitespace: true,
				keepClosingSlash: true,
				removeComments: true,
				removeRedundantAttributes: false,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				useShortDoctype: true
			}
		}),
		new WebpackMd5Hash(),
		new CopyPlugin({
			patterns: [
				{
					context: './public/',
        			from: '**/*',
        			to: '.',
        			force: true,
					globOptions: copyPluginGlobOptions,
				},
			],
		}),
		new webpack.DefinePlugin({
			"typeof CANVAS_RENDERER": JSON.stringify(true),
			"typeof WEBGL_RENDERER": JSON.stringify(true),
			"typeof EXPERIMENTAL": JSON.stringify(false),
			"typeof PLUGIN_CAMERA3D": JSON.stringify(false),
			"typeof PLUGIN_FBINSTANT": JSON.stringify(false)
		}),
	],
	performance: {
		maxEntrypointSize: 900000,
		maxAssetSize: 900000
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				extractComments: {
					//condition: "some",
					condition: /^\**!|@preserve|@license|@cc_on/i,
					filename: 'LICENSE.txt',
					banner: (licenseFile) => {
						return `License information can be found in ${licenseFile}`;
					},
				},
			}),
			new CssMinimizerPlugin(),
		],	
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
					filename: '[name].[contenthash:8].js',
				},
			},
		},
	},
};
