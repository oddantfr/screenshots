import type {MdDialog} from '@material/web/all.js';
import {customElement} from 'custom-element-decorator';
import {LitElement, html} from 'lit';
import {withStyles} from 'lit-with-styles';
import {state, query} from 'lit/decorators.js';
import styles from './history-dialog.css?inline';
import {historyCtrl} from './HistoryController.js';
import {images} from '../images.js';

@customElement({name: 'history-dialog', inject: true})
@withStyles(styles)
class HistoryDialog extends LitElement {
	@state() open = false;

	@query('md-dialog') dialog!: MdDialog;

	firstUpdated() {
		historyCtrl.bind(this);
	}

	render() {
		return html`
			<md-dialog ?open=${this.open} @close=${() => (this.open = false)}>
				<header slot="headline"><md-icon>history</md-icon> History</header>

				<form slot="content" method="dialog" id="form">
					${historyCtrl.history.length > 0
						? html`
								${historyCtrl.history.map(
									(index) => html`
										<md-elevated-card
											class="my-10"
											@click=${() => {
												historyCtrl.currentIndex = index;
												this.dialog.close();
											}}
										>
											<md-filled-tonal-icon-button
												form
												@click=${async (event: PointerEvent) => {
													event.stopPropagation();
													try {
														const {materialConfirm} = await import(
															'material-3-prompt-dialog'
														);
														await materialConfirm();
														historyCtrl.removeIndex(index);
													} catch {}
												}}
												class="absolute -top-1 right-0"
												><md-icon>close</md-icon></md-filled-tonal-icon-button
											>
											<img
												src="./images/${images[index]}"
												class="w-full rounded-xl"
											/>
										</md-elevated-card>
									`,
								)}
							`
						: html` <p class="text-center">Empty history</p> `}
				</form>

				<div slot="actions">
					<md-text-button form="form">Close</md-text-button>
				</div>
			</md-dialog>
		`;
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
		historyDialog: HistoryDialog;
	}
	interface HTMLElementTagNameMap {
		'history-dialog': HistoryDialog;
	}
}

export const historyDialog = (window.historyDialog = new HistoryDialog());
