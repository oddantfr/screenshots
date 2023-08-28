import {LitElement, html} from 'lit';
import {customElement, query, state} from 'lit/decorators.js';
import {withStyles} from 'lit-with-styles';
import {images} from '../images.js';
import '@material/web/iconbutton/filled-icon-button.js';
import '@material/web/icon/icon.js';
import '@vdegenne/material-color-helpers/color-picker';
import {ColorPicker} from '@vdegenne/material-color-helpers/color-picker';
import '@vdegenne/material-color-helpers/color-mode-picker';
import {themeStore} from '../styles.js';
import {ColorModePicker} from '@vdegenne/material-color-helpers/color-mode-picker';
import {
	QuantizerMap,
	QuantizerCelebi,
	QuantizerWsmeans,
	QuantizerWu,
	hexFromArgb,
} from '@material/material-color-utilities';
import {getArgbValuesFromImage} from '../utils.js';
import {deleted} from '../deleted.js';
import {withController} from '@snar/lit';
import {settings, settingsDialog} from '../settings-dialog.js';
// import styles from './app-shell.css?inline';

@customElement('app-shell')
@withStyles(/* styles */)
@withController(deleted)
export class AppShell extends LitElement {
	@state() imgIndex: number = 0;

	@query('img') imgElement!: HTMLImageElement;

	constructor() {
		super();
		// this.#random();
	}

	render() {
		const imgSrc = images[this.imgIndex];
		return html`
			<div class="flex justify-between items-center p-2">
				<md-filled-icon-button @click=${this.#random}>
					<md-icon>casino</md-icon>
				</md-filled-icon-button>
				<md-filled-icon-button @click=${this.#delete}
				style="--md-filled-icon-button-container-color:var(--md-sys-color-error)"
				>
					<md-icon
					style="color:var(--md-sys-color-on-error)"
						>${deleted.exists(images[this.imgIndex])
							? 'delete_forever'
							: 'delete'}</md-icon
					>
				</md-filled-icon-button>
				<md-filled-icon-button @click=${() => settingsDialog.show()}>
					<md-icon>settings</md-icon>
				</md-filled-icon-button>
				<div class="flex items-center">
					<md-filled-icon-button @click=${this.#backward}>
						<md-icon>arrow_backward</md-icon>
					</md-filled-icon-button>
					<div style="min-width:100px;" class="text-center">
						index: ${this.imgIndex}
					</div>
					<md-filled-icon-button @click=${this.#forward}>
						<md-icon>arrow_forward</md-icon>
					</md-filled-icon-button>
				</div>
			</div>
			<img src="images/${imgSrc}" width="100%" />

			<div class="flex items-center p-2">
				<color-picker
					class="mr-3"
					@input=${(e: Event) => {
						themeStore.themeColor = (e.target as ColorPicker).value;
					}}
					.value=${themeStore.themeColor}
				></color-picker>
				<color-mode-picker
					class="flex-1"
					@select=${(evt: Event) => {
						themeStore.colorMode = (evt.target as ColorModePicker).value;
					}}
					.value=${themeStore.colorMode}
				></color-mode-picker>
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

	#random() {
		const total = images.length - 1;
		const startIndex = Math.floor((total * settings.rangeStart) / 100);
		const endIndex = Math.ceil((total * settings.rangeEnd) / 100);

		const candidates = images.slice(startIndex, endIndex);
		if (candidates.length === 0) {
			candidates.push(images[startIndex]);
		}

		this.imgIndex =
			Math.floor(Math.random() * (endIndex - startIndex)) + startIndex;
	}

	#backward() {
		if (this.imgIndex == 0) {
			return (this.imgIndex = images.length - 1);
		}
		return --this.imgIndex;
	}

	#forward() {
		if (this.imgIndex == images.length - 1) {
			return (this.imgIndex = 0);
		}
		return this.imgIndex++;
	}

	#delete() {
		const item = images[this.imgIndex];
		if (deleted.exists(item)) {
			deleted.remove(item);
		} else {
			deleted.add(item);
		}
	}
}
