import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
export default {
	input: 'src/index.js',
	output: [{
		file: 'dist/bundle.js',
		format: 'es'
	},
	{
		file: 'dist/bundle.min.js',
		format: 'iife',//压缩文件
		name: 'version',
		plugins: [terser()]//压缩插件
	}],
	plugins: [json()]
};