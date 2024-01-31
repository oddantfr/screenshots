import {
	QuantizerWsmeans,
	hexFromArgb,
} from '@material/material-color-utilities';
import {withController} from '@snar/lit';
import {customElement} from 'custom-element-decorator';
import {LitElement, html} from 'lit';
import {withStyles} from 'lit-with-styles';
import {query, state} from 'lit/decorators.js';
import {deleted} from '../deleted.js';
import {images} from '../images.js';
import {settings, settingsDialog} from '../settings-dialog.js';
import {themeStore} from '../styles/styles.js';
import {getArgbValuesFromImage} from '../utils.js';

@customElement({name: 'app-shell', inject: true})
@withStyles(/* styles */)
@withController(deleted)
export class AppShell extends LitElement {
	@state() imgIndex: number = 0;

	@query('img') imgElement!: HTMLImageElement;

	render() {
		const imgSrc = images[this.imgIndex];
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
						@click=${this.#delete}
						style="--md-sys-color-secondary-container:var(--md-sys-color-error);--md-sys-color-on-secondary-container:var(--md-sys-color-on-error);"
					>
						${deleted.exists(images[this.imgIndex])
							? html`<md-icon>delete_forever</md-icon>`
							: html`<md-icon>delete</md-icon>`}
					</md-filled-tonal-icon-button>
					<md-filled-tonal-icon-button @click=${() => settingsDialog.show()}>
						<md-icon>settings</md-icon>
					</md-filled-tonal-icon-button>
					<div class="flex items-center">
						<md-filled-tonal-icon-button @click=${this.backward}>
							<md-icon>arrow_back</md-icon>
						</md-filled-tonal-icon-button>
						<div style="min-width:100px;" class="text-center">
							${this.imgIndex}
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

		this.imgIndex =
			Math.floor(Math.random() * (endIndex - startIndex)) + startIndex;
	}

	backward() {
		if (this.imgIndex == 0) {
			return (this.imgIndex = images.length - 1);
		}
		return --this.imgIndex;
	}

	forward() {
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

declare global {
	interface Window {
		app: AppShell;
	}
}

export const app = (window.app = new AppShell());
