1. vite手动分包
```javaScript
// vite.config.js
build: {
			outDir: 'dist',
			sourcemap: false,
			chunkSizeWarningLimit: 1500,
			rollupOptions: {
				output: {
          //手动指定包名称
					chunkFileNames: (chunkInfo) => {
						if (chunkInfo.name && chunkInfo.name.startsWith('stimulsoft-reports-js-')) {
							return `assets/lmzJs/${chunkInfo.name}.js`
						}
						return 'assets/js/[name]-[hash].js'
					},
					entryFileNames: 'assets/js/[name]-[hash].js',
					assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
					manualChunks(id) {
						if (id.includes('node_modules')) {
							//如果是stimulsoft-reports-js,单独打包,不加hash,单独一个一个分包
							if (id.includes('stimulsoft-reports-js')) {
								if (id.includes('designer')) {
									return 'stimulsoft-reports-js-designer';
								}
								if (id.includes('viewer')) {
									return 'stimulsoft-reports-js-viewer';
								}
								if (id.includes('reports')) {
									return 'stimulsoft-reports-js-reports';
								}
								if (id.includes('dashboards')) {
									return 'stimulsoft-reports-js-dashboards';
								}
							} else {
								return id.toString().match(/\/node_modules\/(?!.pnpm)(?<moduleName>[^\/]*)\//)?.groups!.moduleName ?? 'vender';
							}
						}
					},
				},
				...(JSON.parse(env.VITE_OPEN_CDN) ? { external: buildConfig.external } : {}),
			},
		},
```