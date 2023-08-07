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
import { withController } from '@snar/lit';
// import styles from './app-shell.css?inline';

@customElement('app-shell')
@withStyles(/* styles */)
@withController(deleted)
export class AppShell extends LitElement {
	@state() imgIndex!: number;

	@query('img') imgElement!: HTMLImageElement;

	constructor() {
		super();
		this.#random();
	}

	render() {
		const imgSrc = images[this.imgIndex];
		return html`
			<div class="flex justify-between items-center p-2">
				<md-filled-icon-button @click=${this.#backward}>
					<md-icon>arrow_backward</md-icon>
				</md-filled-icon-button>
				<md-filled-icon-button @click=${this.#random}>
					<md-icon>casino</md-icon>
				</md-filled-icon-button>
				<span>index: ${this.imgIndex}</span>
				<md-filled-icon-button @click=${this.#delete}>
					<md-icon>${deleted.exists(images[this.imgIndex]) ? 'delete_forever' : 'delete'}</md-icon>
				</md-filled-icon-button>
				<md-filled-icon-button @click=${this.#forward}>
					<md-icon>arrow_forward</md-icon>
				</md-filled-icon-button>
			</div>
			<img src="images/${imgSrc}" width="100%" />

			<div class="flex items-center p-2">
				<color-picker
					@input=${(e: Event) => {
						themeStore.themeColor = (e.target as ColorPicker).value;
					}}
				></color-picker>
				<color-mode-picker
					class="flex-1"
					@select=${(evt: Event) => {
						themeStore.colorMode = (evt.target as ColorModePicker).value;
					}}
				></color-mode-picker>
			</div>
		`;
	}

	updated() {
		getArgbValuesFromImage(this.imgElement).then((pixels) => {
			const colorCounts = QuantizerWsmeans.quantize(pixels, [], 2);

			const t = hexFromArgb([...colorCounts.keys()][0]);
			themeStore.themeColor = t;
		});
	}

	#random() {
		this.imgIndex = Math.floor(Math.random() * images.length);
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
