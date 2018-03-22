const CleanWebpackPlugin = require('clean-webpack-plugin'); 
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const config = require('./webpack.config');

Reflect.deleteProperty(config, 'devServer');
Reflect.deleteProperty(config, 'plugins');

const uglifyOptions = {
	arrows: false,
	booleans: false,
	cascade: false,
	collapse_vars: false,
	comparisons: false,
	computed_props: false,
	hoist_funs: false,
	hoist_props: false,
	hoist_vars: false,
	if_return: false,
	inline: false,
	join_vars: false,
	keep_infinity: true,
	loops: false,
	negate_iife: false,
	properties: false,
	reduce_funcs: false,
	reduce_vars: false,
	sequences: false,
	side_effects: false,
	switches: false,
	top_retain: false,
	toplevel: false,
	typeofs: false,
	unused: false,
	conditionals: true,
	dead_code: true,
	evaluate: true,
};

config.output = {
	filename: '[name].[chunkhash].js',
	chunkFilename: '[name].[chunkhash].js',
	path: path.resolve(__dirname, 'dist'),
};

Object.assign(config.output, {
	path: path.resolve(__dirname, 'dist'),
	publicPath: `/dist/`,
});

config.plugins = [
	new CleanWebpackPlugin(['dist']),
	new UglifyJsPlugin({
		cache: true,
		parallel: true,
		sourceMap: false,
		uglifyOptions,
	}),
];

module.exports = config;