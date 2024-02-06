import {customElement} from 'custom-element-decorator';
import {LitElement, html} from 'lit';
import {withStyles} from 'lit-with-styles';
import {query} from 'lit/decorators.js';
import {materialShellLoadingOff} from 'material-shell';
import {deleted} from '../deleted.js';
import {images} from '../images.js';
import {settings} from '../settings/SettingsController.js';
import styles from './app-shell.css?inline';
import {historyCtrl} from '../history/HistoryController.js';
import {memoCtrl} from '../memo/memo-controller.js';

@customElement({name: 'app-shell', inject: true})
@withStyles(styles)
export class AppShell extends LitElement {
	@query('img') imgElement!: HTMLImageElement;

	firstUpdated() {
		materialShellLoadingOff.call(this);
		deleted.bind(this);
		historyCtrl.bind(this);
		settings.bind(this);
		memoCtrl.bind(this);
	}

	render() {
		const imgSrc = images[historyCtrl.currentIndex];

		return html`
			<div class="flex flex-col absolute inset-0">
				<div
					class="flex-1 overflow-scroll rounded-xl flex justify-center"
					style="background-color:var(--md-sys-color-surface);align-items: safe end;"
				>
					<img src="images/${imgSrc}" class="rounded-xl w-full" />
				</div>
				<div
					class="flex justify-between items-center p-5"
					style="background-color:var(--md-sys-color-surface-container)"
				>
					<md-filled-icon-button
						@click=${this.random}
						?disabled=${settings.pickFromSavedIndexes &&
						memoCtrl.savedIndexes.length === 0}
					>
						<md-icon>casino</md-icon>
					</md-filled-icon-button>

					<md-filled-tonal-icon-button
						@click=${async () => {
							const {memoDialog} = await import('../memo/memo-dialog.js');
							memoDialog.show();
						}}
					>
						<md-icon>memory</md-icon>
					</md-filled-tonal-icon-button>

					<md-filled-tonal-icon-button
						@click=${this.#delete}
						style="--md-sys-color-secondary-container:var(--md-sys-color-error);--md-sys-color-on-secondary-container:var(--md-sys-color-on-error);"
					>
						${deleted.exists(images[historyCtrl.currentIndex])
							? html`<md-icon>delete_forever</md-icon>`
							: html`<md-icon>delete</md-icon>`}
					</md-filled-tonal-icon-button>

					<md-filled-tonal-icon-button
						@click=${async () => {
							const {settingsDialog} = await import(
								'../settings/settings-dialog.js'
							);
							settingsDialog.show();
						}}
					>
						<md-icon>settings</md-icon>
					</md-filled-tonal-icon-button>

					<div class="flex items-center">
						<md-filled-icon-button @click=${this.backward}>
							<md-icon>arrow_back</md-icon>
						</md-filled-icon-button>
						<md-text-button
							@click=${async () => {
								const {historyDialog} = await import(
									'../history/history-dialog.js'
								);
								historyDialog.show();
							}}
							>${historyCtrl.currentIndex}</md-text-button
						>
						<md-filled-icon-button @click=${this.forward}>
							<md-icon>arrow_forward</md-icon>
						</md-filled-icon-button>
					</div>
				</div>
			</div>
		`;
	}

	random() {
		let picked: number;
		if (settings.pickFromSavedIndexes) {
			do {
				picked =
					memoCtrl.savedIndexes[
						Math.floor(Math.random() * memoCtrl.savedIndexes.length)
					];
			} while (
				memoCtrl.savedIndexes.length > 1 &&
				picked === historyCtrl.currentIndex
			);
		} else {
			const total = images.length - 1;
			const startIndex = Math.floor((total * settings.rangeStart) / 100);
			const endIndex = Math.ceil((total * settings.rangeEnd) / 100);
			const range = endIndex - startIndex;
			do {
				picked = Math.floor(Math.random() * range) + startIndex;
			} while (range > 1 && picked === historyCtrl.currentIndex);
			historyCtrl.addIndex(picked);
		}

		historyCtrl.currentIndex = picked;
	}

	backward() {
		if (historyCtrl.currentIndex == 0) {
			historyCtrl.currentIndex = images.length - 1;
		} else {
			historyCtrl.currentIndex = historyCtrl.currentIndex - 1;
		}
	}

	forward() {
		if (historyCtrl.currentIndex == images.length - 1) {
			historyCtrl.currentIndex = 0;
		} else {
			historyCtrl.currentIndex = historyCtrl.currentIndex + 1;
		}
	}

	#delete() {
		const item = images[historyCtrl.currentIndex];
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
