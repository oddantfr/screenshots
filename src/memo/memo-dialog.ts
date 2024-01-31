import type {MdDialog} from '@material/web/all.js';
import {customElement} from 'custom-element-decorator';
import {LitElement, html} from 'lit';
import {withStyles} from 'lit-with-styles';
import {state, query} from 'lit/decorators.js';
import styles from './memo-dialog.css?inline';
import {memoCtrl} from './memo-controller.js';
import '@material/web/textfield/filled-text-field.js';
import '@material/web/button/text-button.js';
import '@material/web/button/filled-button.js';
import {copyToClipboard} from '../utils.js';

@customElement({name: 'memo-dialog', inject: true})
@withStyles(styles)
class MemoDialog extends LitElement {
	@state() open = false;

	@query('md-dialog') dialog!: MdDialog;

	firstUpdated() {
		memoCtrl.bind(this);
	}

	render() {
		return html`
			<md-dialog ?open=${this.open} @close=${() => (this.open = false)}>
				<header slot="headline">Memo</header>

				<form slot="content" method="dialog" id="form">
					<md-chip-set>
						${memoCtrl.items.map(
							(item) => html`
								<md-input-chip
									label=${item}
									selected
									data-item=${item}
									@click=${() => copyToClipboard(item)}
									@remove=${this.removeItem}
								></md-input-chip>
							`,
						)}
						<md-suggestion-chip
							label="Add item"
							@click=${this.addItem}
							elevated
						>
							<md-icon slot="icon">add</md-icon>
						</md-suggestion-chip>
					</md-chip-set>
				</form>

				<div slot="actions">
					<md-text-button form="form">Close</md-text-button>
				</div>
			</md-dialog>
		`;
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
