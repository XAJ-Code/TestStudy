const esbuild = require('esbuild');

/** @type {import('esbuild').BuildOptions} */
const buildOptions = {
  entryPoints: ['index.js'],
  // outfile: 'out.js',
  outdir: 'dist',
  bundle: true,
  minify: false,
  format:'iife',
  // splitting: true,
  platform:'node'
};

esbuild.build(buildOptions).then(result => {
  if (result.errors.length > 0) {
    console.error(result.errors);
  } else {
    console.log('构建成功!');
  }
});
