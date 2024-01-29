import {defineConfig} from 'vite';
// import {viteSingleFile} from 'vite-plugin-singlefile';
// import {minify as minifyHtml} from 'html-minifier-terser';
// import minifyLiterals from 'rollup-plugin-minify-template-literals';
import {mdicon2svg} from 'vite-plugin-mdicon2svg';
import {VitePWA} from 'vite-plugin-pwa';

const plugins = [];

export default defineConfig({
	base: './',
	build: {
		outDir: 'dist',
		assetsInlineLimit: 6000,
		emptyOutDir: false,
	},
	esbuild: {
		legalComments: 'none',
	},
	plugins: [
		...plugins,
		mdicon2svg({
			variant: 'rounded',
			include: [
				'src/**/*.ts',
				'node_modules/@vdegenne/material-color-helpers/lib/elements/**/*.js',
			],
			devMode: true,
		}),

		// 	registerType: 'autoUpdate',
		// 	includeAssets: ['*.(png|ico)'],
		// 	manifest: {
		// 		icons: [
		// 			{
		// 				src: 'pwa-64x64.png',
		// 				sizes: '64x64',
		// 				type: 'image/png',
		// 			},
		// 			{
		// 				src: 'pwa-192x192.png',
		// 				sizes: '192x192',
		// 				type: 'image/png',
		// 			},
		// 			{
		// 				src: 'pwa-512x512.png',
		// 				sizes: '512x512',
		// 				type: 'image/png',
		// 				purpose: 'any',
		// 			},
		// 			{
		// 				src: 'maskable-icon-512x512.png',
		// 				sizes: '512x512',
		// 				type: 'image/png',
		// 				purpose: 'maskable',
		// 			},
		// 		],
		// 	},
		// }),
	],
});
