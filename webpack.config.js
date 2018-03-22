const path = require('path');
const webpack = require('webpack');

const PORT = 3344;

const config = {
	mode: process.env.NODE_ENV,	
	entry: {
		app: path.resolve(__dirname, 'index.js'),
        vendor: [
			// e.g. js libs 
			'babel-polyfill', // do I need this? if yes, should this go here?
		]
	},

	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].js',
		publicPath: `http://localhost:${PORT}/build/`,
	},

	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'all'
				}
			}
		}
	},

	resolve: {
		alias: {
			react: path.resolve(__dirname, 'node_modules', 'react'),
			'react-dom': path.resolve(__dirname, 'node_modules', 'react-dom'),
		},
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
				use: 'file-loader',
			},
			{
				test: /\.styl$/,
				use: 'style-loader!css-loader!stylus-loader',
				include: [
					path.join(__dirname, 'js'),
					path.join(__dirname, 'css'),
				]
			},
		]
	},

	devServer: {
		hot: true,
		overlay: true,
		noInfo: false,
		compress: true,
		port: PORT,
		publicPath: `http://localhost:${PORT}/build/`,
		disableHostCheck: true,
		headers: { "Access-Control-Allow-Origin": "*" }
	},

	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
	],
};

module.exports = config;