import type {MdDialog, MdFilterChip, MdTabs} from '@material/web/all.js';
import {customElement} from 'custom-element-decorator';
import {LitElement, html} from 'lit';
import {withStyles} from 'lit-with-styles';
import {query, state} from 'lit/decorators.js';
import {memoCtrl} from './memo-controller.js';
import styles from './memo-dialog.css?inline';
// The following imports are needed for material-3-prompt-dialog
import '@material/web/button/filled-button.js';
import '@material/web/button/text-button.js';
import '@material/web/textfield/filled-text-field.js';
import {images} from '../images.js';
import {copyToClipboard} from '../utils.js';
import {historyCtrl} from '../history/HistoryController.js';

@customElement({name: 'memo-dialog', inject: true})
@withStyles(styles)
class MemoDialog extends LitElement {
	@state() open = false;
	@state() tabIndex: number = 0;

	@query('md-dialog') dialog!: MdDialog;

	firstUpdated() {
		// appState.bind(this);
		memoCtrl.bind(this);
	}

	render() {
		return html`
			<md-dialog ?open=${this.open} @close=${() => (this.open = false)}>
				<header slot="headline">
					<md-tabs
						class="w-full"
						@change=${(event: Event) => {
							const tabs = event.target as MdTabs;
							this.tabIndex = tabs.activeTabIndex;
						}}
					>
						<md-primary-tab>Indexes</md-primary-tab>
						<md-primary-tab>Words</md-primary-tab>
					</md-tabs>
				</header>

				<form slot="content" method="dialog" id="form">
					<md-chip-set>
						${this.tabIndex === 0
							? html`
									${memoCtrl.savedIndexes.map(
										(index) => html`
											<md-filter-chip
												label="${index}"
												elevated
												removable
												@remove=${this.#onIndexChipRemove}
												@click=${this.#onIndexChipClick}
											>
												<md-icon slot="icon"
													><img src="./images/${images[index]}"
												/></md-icon>
											</md-filter-chip>
										`,
									)}
									<md-assist-chip
										@click=${this.saveCurrentIndex}
										label="Add current index"
										?disabled=${memoCtrl.savedIndexes.includes(
											historyCtrl.currentIndex,
										)}
										elevated
									>
										<md-icon slot="icon">add</md-icon>
									</md-assist-chip>
								`
							: null}
						${this.tabIndex === 1
							? html`
									${memoCtrl.items.map(
										(item) => html`
											<md-filter-chip
												label=${item}
												elevated
												@click=${(event: Event) => {
													event.preventDefault();
													copyToClipboard(item);
												}}
												@remove=${this.removeItem}
												removable
												data-item=${item}
											></md-filter-chip>
										`,
									)}
									<md-suggestion-chip
										label="Add item"
										@click=${this.addItem}
										elevated
									>
										<md-icon slot="icon">add</md-icon>
									</md-suggestion-chip>
								`
							: null}
					</md-chip-set>
				</form>

				<div slot="actions">
					${this.tabIndex === 0 && memoCtrl.savedIndexes.length > 1
						? html`
								<md-filled-tonal-button @click=${this.pickRandomIndex}>
									<md-icon slot="icon">casino</md-icon>
									Pick random
								</md-filled-tonal-button>
							`
						: null}
					<md-text-button form="form">Close</md-text-button>
				</div>
			</md-dialog>
		`;
	}

	pickRandomIndex() {
		const savedIndexes = memoCtrl.savedIndexes;
		if (savedIndexes.length > 0) {
			historyCtrl.currentIndex =
				savedIndexes[Math.floor(Math.random() * savedIndexes.length)];
			this.dialog.close();
		}
	}

	async #onIndexChipClick(event: Event) {
		event.preventDefault();
		const chip = event.target as MdFilterChip;
		historyCtrl.currentIndex = Number(chip.label);
		this.dialog.close();
	}

	async #onIndexChipRemove(event: Event) {
		event.preventDefault();
		const chip = event.target as MdFilterChip;
		try {
			const {materialConfirm} = await import('material-3-prompt-dialog');
			await materialConfirm();
			memoCtrl.removeIndex(Number(chip.label));
		} catch {}
	}

	saveCurrentIndex() {
		memoCtrl.addIndex(historyCtrl.currentIndex);
	}

	async removeItem(event: Event) {
		event.preventDefault();
		const chip = event.target as HTMLElement;
		try {
			const {materialConfirm} = await import('material-3-prompt-dialog');
			await materialConfirm();
			const item = chip.dataset.item!;
			memoCtrl.removeItem(item);
		} catch {}
	}

	async addItem() {
		try {
			const {materialPrompt} = await import('material-3-prompt-dialog');
			const item = await materialPrompt({
				promptText: 'Item value',
			});
			memoCtrl.addItem(item);
		} catch {}
	}

	async show() {
		if (this.dialog.open) {
			const dialogClose = new Promise((resolve) => {
				const resolveCB = () => {
					resolve(null);
					this.dialog.removeEventListener('closed', resolveCB);
				};
				this.dialog.addEventListener('closed', resolveCB);
			});
			this.dialog.close();
			await dialogClose;
		}
		this.open = true;
	}
}

declare global {
	interface Window {
		memoDialog: MemoDialog;
	}
	interface HTMLElementTagNameMap {
		'memo-dialog': MemoDialog;
	}
}

export const memoDialog = (window.memoDialog = new MemoDialog());
