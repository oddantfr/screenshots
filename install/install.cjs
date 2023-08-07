const {Select} = require('enquirer');
const chalk = require('chalk');
const {spawn} = require('child_process');
const {existsSync, writeFileSync, copyFileSync, mkdirSync} = require('fs');
const pathlib = require('path');

async function getPackageJson() {
	return (await import('../package.json', {assert: {type: 'json'}})).default;
}

const bundles = {
	typescript: {
		dependencies: ['typescript'],
		files: [{template: 'tsconfig.json'}],
	},
	vite: {
		dependencies: ['vite', 'terser'],
		commands: [
			'npm pkg set scripts.dev="rm -rf node_modules/.vite && vite --host"',
			'npm pkg set scripts.build="vite build"',
		],
		files: [{template: 'vite.config.js'}],
	},
	'vite-pwa': {
		dependencies: ['vite-plugin-pwa', '@vite-pwa/assets-generator'],
		files: [{template: 'pwa-assets.config.js'}],
		information:
			'	- add logo.png (or logo.svg) in public directory\n' +
			'	- [optional] modify path in pwa-assets.config.js\n' +
			"	- run 'npx pwa-assets-generator' to generate the icons in public\n" +
			'	- uncomment VitePWA in vite.config.js',
	},
	lit: {dependencies: ['lit', 'lit-with-styles']},
	'custom-element-decorator': {dependencies: ['custom-element-decorator']},
	// 'lit-with-styles': {dependencies: ['lit-with-styles']},
	'@material/web': {dependencies: ['@material/web']},
	'material-3-prompt-dialog': {
		dependencies: ['material-3-prompt-dialog', 'toastit'],
	},
	'@vdegenne/about-dialog': {dependencies: ['@vdegenne/about-dialog']},
	'theme-tools': {
		dependencies: ['lit-with-styles', '@vdegenne/material-color-helpers'],
		files: [{template: 'src/styles.ts'}],
		information: '	- Uncomment first line and ThemeManager.init() in loader.ts',
	},
	snar: {
		dependencies: [
			'snar',
			'@snar/lit',
			'snar-save-to-local-storage',
			'@material/mwc-base',
		],
	},
	relit: {dependencies: ['relit']},
	wireit: {dependencies: ['wireit']},
	tailwindcss: {
		dependencies: ['tailwindcss'],
		files: [{template: 'postcss.config.js'}, {template: 'tailwind.config.js'}],
		information:
			'	vite already installed postcss.\n' +
			'	Uncomment tailwind directives in shared-styles.css',
	},
	'vite-minify': {
		dependencies: [
			'vite-plugin-singlefile',
			'rollup-plugin-minify-template-literals',
			// 'rollup-plugin-minify-html-literals-v3',
			'html-minifier-terser',
			// '@rollup/plugin-terser',
		],
		information: '	Uncomment imports in vite.config.js',
	},
	firebase: {
		dependencies: ['firebase', 'firebase-admin'],
		information:
			'	- Add your firebase config in "src/firebase/firebase.ts".\n' +
			'	- Install firebase-tools on your system.\n' +
			'	- Run "firebase init".',
	},
	prettier: {
		dependencies: ['prettier'],
		files: [{template: '.prettierrc'}],
	},
	'lint-staged': {
		dependencies: ['lint-staged', 'husky'],
		commands: [
			async () => {
				const packageJson = await getPackageJson();
				if (packageJson['lint-staged'] === undefined) {
					packageJson['lint-staged'] = {};
				}
				packageJson['lint-staged']['**/*.{cjs,html,js,json,md,ts}'] =
					'prettier --single-quote --no-bracket-spacing --use-tabs --write';
				packageJson['lint-staged']['{*.{js,ts},!(examples)/**/*.{js,ts}}'] =
					'eslint --fix';

				writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
			},
			'git init',
			'npm pkg set scripts.prepare="husky install"',
			'npm run prepare',
			'npx husky add .husky/pre-commit "npm exec lint-staged"',
		],
		information:
			'	- See "lint-staged" in package.json\n' +
			'	- Remove prettier file if you prefer the command line config.',
	},
	eslint: {
		dependencies: [
			'eslint',
			'eslint-plugin-import',
			// 'eslint-plugin-unused-imports',
			'@typescript-eslint/eslint-plugin',
		],
		files: [
			{
				template: '.eslintrc.json',
			},
		],
	},
	'@web/test-runner': {
		dependencies: ['@web/test-runner', '@web/test-runner-playwright'],
		files: [
			{
				template: 'web-test-runner.config.js',
			},
		],
	},
	'Github Page Action': {
		files: [
			{
				template: pathlib.join('.github', 'workflows', 'node.js.yml'),
			},
		],
	},
};

const log = function (text) {
	console.log(chalk.magenta(text));
};
log.info = function (text) {
	console.log(chalk.bold(chalk.yellow(text)));
};
log.success = function (text) {
	console.log(chalk.green(text));
};

async function runShellCommand(command, printOutput = false) {
	return new Promise((resolve, reject) => {
		const parts = splitStringWithQuotes(command);
		const cmd = parts.shift();
		const args = parts;

		const childProcess = spawn(cmd, args);

		let output = '';

		if (printOutput) {
			childProcess.stdout.on('data', (data) => {
				output += data.toString();
				process.stdout.write(data);
			});
		}

		childProcess.stderr.on('data', (data) => {
			output += data.toString();
			process.stderr.write(data);
		});

		childProcess.on('error', (error) => {
			reject(error);
		});

		childProcess.on('close', (code) => {
			if (code === 0) {
				resolve(output);
			} else {
				reject(new Error(`Command '${command}' failed with code ${code}`));
			}
		});
	});
}

async function installDependencies(dependencies) {
	const formattedDeps = dependencies.map((dep) => chalk.bold(dep)).join(' + ');
	log(`Installing ${formattedDeps}...`);
	await runShellCommand(`npm add -D ${dependencies.join(' ')}`);
	log.success(`${formattedDeps} installed successfully!`);
}

async function main() {
	const choices = await getNonInstalledBundlesList();

	const prompt = new Select({
		name: 'bundles',
		message: 'Select bundles to install:',
		choices,
		multiple: true,
	});

	const selectedBundles = await prompt.run();

	if (selectedBundles.length) {
		// for each selected bundle
		for (const bundleName of selectedBundles) {
			const bundle = bundles[bundleName];

			// npm install
			if (bundle.dependencies && bundle.dependencies.length > 0) {
				await installDependencies(bundle.dependencies);
			}

			// files to create
			if (bundle.files) {
				for (const file of bundle.files) {
					const destinationPath = pathlib.join(
						file.path ?? '.',
						file.template ?? file.name
					);
					if (!existsSync(destinationPath)) {
						// make sure the base path exists
						createBasePath(destinationPath);
						if (file.template) {
							copyFileSync(
								pathlib.join(__dirname, 'templates', file.template),
								destinationPath
							);
						} else {
							writeFileSync(destinationPath, file.content);
						}
						log.success(`File ${chalk.bold(destinationPath)} created.`);
					}
				}
			}

			// after shell commands
			if (bundle.commands !== undefined) {
				for (const command of bundle.commands) {
					if (typeof command == 'function') {
						await command();
					} else if (typeof command == 'string') {
						log.info(`[Running] ${command}`);
						await runShellCommand(command, true);
					}
				}
			}

			// information about the installation
			if (bundle.information) {
				log.info('\n\n' + bundle.information + '\n');
			}
		}
	}
}

async function getNonInstalledBundlesList() {
	const packageJson = await getPackageJson();
	const deps = [
		...Object.keys(packageJson.dependencies ?? {}),
		...Object.keys(packageJson.devDependencies ?? {}),
	];
	const nonInstalled = [];
	for (const [bundleName, bundleInfo] of Object.entries(bundles)) {
		// Not installed if some dependencies are missing.
		if (
			bundleInfo.dependencies &&
			bundleInfo.dependencies.length > 0 &&
			!bundleInfo.dependencies.every((dep) => deps.includes(dep))
		) {
			nonInstalled.push(bundleName);
			continue;
		}

		// Not installed if some templates are not present.
		if (
			bundleInfo.files &&
			bundleInfo.files.length > 0 &&
			bundleInfo.files.some((fileInfo) => {
				const destinationPath = pathlib.join(
					fileInfo.path ?? '.',
					fileInfo.template ?? fileInfo.name
				);
				return !existsSync(destinationPath);
			})
		) {
			nonInstalled.push(bundleName);
			continue;
		}
	}
	return nonInstalled;
}

function splitStringWithQuotes(str) {
	const arr = [];
	let insideQuotes = false;
	let currentWord = '';

	for (let i = 0; i < str.length; i++) {
		const char = str[i];

		if (char === ' ' && !insideQuotes) {
			if (currentWord.length > 0) {
				arr.push(currentWord);
				currentWord = '';
			}
		} else if (char === '"' || char === "'") {
			if (insideQuotes && str[i - 1] !== '\\') {
				insideQuotes = false;
			} else if (!insideQuotes) {
				insideQuotes = true;
			}
		} else {
			currentWord += char;
		}
	}

	if (currentWord.length > 0) {
		arr.push(currentWord);
	}

	return arr;
}

function createBasePath(filePath) {
	const basePath = pathlib.dirname(filePath);

	if (!existsSync(basePath)) {
		mkdirSync(basePath, {recursive: true});
		// console.log(`Base path created: ${basePath}`);
	} else {
		// console.log(`Base path already exists: ${basePath}`);
	}
}

main().catch((e) => console.error(e));
