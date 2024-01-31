import {
	QuantizerWsmeans,
	hexFromArgb,
} from '@material/material-color-utilities';
import {customElement} from 'custom-element-decorator';
import {LitElement, html} from 'lit';
import {withStyles} from 'lit-with-styles';
import {query} from 'lit/decorators.js';
import {deleted} from '../deleted.js';
import {images} from '../images.js';
import {settings} from '../settings-dialog.js';
import {themeStore} from '../styles/styles.js';
import {getArgbValuesFromImage} from '../utils.js';
import {appState} from './app-state.js';
import styles from './app-shell.css?inline';
import {materialShellLoadingOff} from 'material-shell';

@customElement({name: 'app-shell', inject: true})
@withStyles(styles)
export class AppShell extends LitElement {
	@query('img') imgElement!: HTMLImageElement;

	firstUpdated() {
		materialShellLoadingOff.call(this);
		deleted.bind(this);
		appState.bind(this);
	}

	render() {
		const imgSrc = images[appState.index];
		return html`
			<div
				class="flex flex-col absolute inset-0"
				style="background-color:var(--md-sys-color-surface)"
			>
				<div class="flex-1 overflow-auto rounded-xl">
					<img src="images/${imgSrc}" width="100%" class="rounded-xl" />
				</div>
				<div
					class="flex justify-between items-center p-3"
					style="background-color:var(--md-sys-color-surface-container)"
				>
					<md-filled-tonal-icon-button @click=${this.random}>
						<md-icon>casino</md-icon>
					</md-filled-tonal-icon-button>
					<md-filled-tonal-icon-button
						@click=${async () => {
							const {settingsDialog} = await import('../settings-dialog.js');
							settingsDialog.show();
						}}
					>
						<md-icon>settings</md-icon>
					</md-filled-tonal-icon-button>
					<md-filled-tonal-icon-button
						@click=${this.#delete}
						style="--md-sys-color-secondary-container:var(--md-sys-color-error);--md-sys-color-on-secondary-container:var(--md-sys-color-on-error);"
					>
						${deleted.exists(images[appState.index])
							? html`<md-icon>delete_forever</md-icon>`
							: html`<md-icon>delete</md-icon>`}
					</md-filled-tonal-icon-button>
					<md-filled-tonal-icon-button
						@click=${async () => {
							const {memoDialog} = await import('../memo/memo-dialog.js');
							memoDialog.show();
						}}
					>
						<md-icon>memory</md-icon>
					</md-filled-tonal-icon-button>
					<div class="flex items-center">
						<md-filled-tonal-icon-button @click=${this.backward}>
							<md-icon>arrow_back</md-icon>
						</md-filled-tonal-icon-button>
						<div style="min-width:60px;" class="text-center">
							${appState.index}
						</div>
						<md-filled-tonal-icon-button @click=${this.forward}>
							<md-icon>arrow_forward</md-icon>
						</md-filled-tonal-icon-button>
					</div>
				</div>
			</div>
		`;
	}

	updated() {
		return;
		getArgbValuesFromImage(this.imgElement).then((pixels) => {
			const colorCounts = QuantizerWsmeans.quantize(pixels, [], 2);

			const t = hexFromArgb([...colorCounts.keys()][0]);
			themeStore.themeColor = t;
		});
	}

	random() {
		const total = images.length - 1;
		const startIndex = Math.floor((total * settings.rangeStart) / 100);
		const endIndex = Math.ceil((total * settings.rangeEnd) / 100);

		const candidates = images.slice(startIndex, endIndex);
		if (candidates.length === 0) {
			candidates.push(images[startIndex]);
		}

		appState.index =
			Math.floor(Math.random() * (endIndex - startIndex)) + startIndex;
	}

	backward() {
		if (appState.index == 0) {
			return (appState.index = images.length - 1);
		}
		return --appState.index;
	}

	forward() {
		if (appState.index == images.length - 1) {
			return (appState.index = 0);
		}
		return appState.index++;
	}

	#delete() {
		const item = images[appState.index];
		if (deleted.exists(item)) {
			deleted.remove(item);
		} else {
			deleted.add(item);
		}
	}
}

declare global {
	interface Window {
		app: AppShell;
	}
}

export const app = (window.app = new AppShell());
document.querySelector('material-shell')?.appendChild(app);
