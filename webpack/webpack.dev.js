const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const {
	prod_Path,
	src_Path
} = require('./path');
const {
	selectedPreprocessor
} = require('./loader');

module.exports = {
	entry: {
		main: './' + src_Path + '/index.ts'
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	output: {
		path: path.resolve(__dirname, prod_Path),
		filename: '[name].[chunkhash:8].js'
	},
	devtool: 'source-map',
	devServer: {
		open: true,
		contentBase: path.join(__dirname, '../public'),
	},
	module: {
		rules: [
			{
				test: /\.ts?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: selectedPreprocessor.fileRegexp,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader',
						options: {
							modules: false,
							sourceMap: true
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: selectedPreprocessor.loaderName,
						options: {
							sourceMap: true
						}
					},
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
		new MiniCssExtractPlugin({
			filename: 'style.[contenthash:8].css'
		}),
		new HtmlWebpackPlugin({
			inject: false,
			hash: false,
			template: './' + src_Path + '/assets/index.html',
			filename: 'index.html'
		}),
		new webpack.DefinePlugin({
			"typeof FEATURE_SOUND": JSON.stringify(true),
			"typeof CANVAS_RENDERER": JSON.stringify(true),
			"typeof WEBGL_RENDERER": JSON.stringify(true),
			"typeof EXPERIMENTAL": JSON.stringify(false),
			"typeof PLUGIN_CAMERA3D": JSON.stringify(false),
			"typeof PLUGIN_FBINSTANT": JSON.stringify(false),
		}),
	],
	optimization: {
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