const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const config = require('./webpack.config');

Reflect.deleteProperty(config, 'devServer');
Reflect.deleteProperty(config, 'plugins');

// https://slack.engineering/keep-webpack-fast-a-field-guide-for-better-build-performance-f56a5995e8f1
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

	// Switch off all types of compression except those needed to convince
	// react-devtools that we're using a production build
	conditionals: true,
	dead_code: true,
	evaluate: true,
};

config.output = {
	filename: '[name].bundle.js',
	chunkFilename: '[name].bundle.js',
	path: path.resolve(__dirname, 'dist'),
};

Object.assign(config.output, {
	path: path.resolve(__dirname, 'dist'),
	publicPath: `/dist/`,
});

config.plugins = [
	new UglifyJsPlugin({
		cache: true,
		parallel: true,
		sourceMap: false,
		uglifyOptions,
	}),
];

module.exports = config;