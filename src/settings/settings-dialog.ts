import type {MdDialog, MdSlider} from '@material/web/all.js';
import '@vdegenne/material-color-helpers/elements.js';
import type {
	ColorModePicker,
	ColorPicker,
} from '@vdegenne/material-color-helpers/elements.js';
import {customElement} from 'custom-element-decorator';
import {LitElement, html} from 'lit';
import {withStyles} from 'lit-with-styles';
import {query} from 'lit/decorators.js';
import {themeStore} from '../styles/styles.js';
import {settings} from './SettingsController.js';
import styles from './settings-dialog.css?inline';

@customElement({name: 'settings-dialog', inject: true})
@withStyles(styles)
export class SettingsDialog extends LitElement {
	@query('md-dialog') dialog!: MdDialog;

	firstUpdated() {
		settings.bind(this);
	}

	render() {
		return html`
			<md-dialog>
				<div slot="headline">Settings</div>

				<form slot="content" method="dialog" id="form">
					<h4>Picking range</h4>
					<md-slider
						class="w-full mt-4"
						labeled
						range
						.valueStart=${settings.rangeStart}
						.valueEnd=${settings.rangeEnd}
						.valueLabelStart="${`${settings.rangeStart}%`}"
						.valueLabelEnd="${`${settings.rangeEnd}%`}"
						@input=${(event: PointerEvent) => {
							const target = event.target as MdSlider;
							settings.rangeStart = target.valueStart!;
							settings.rangeEnd = target.valueEnd!;
						}}
					>
					</md-slider>
					<md-list-item
						class="my-9 cursor-pointer"
						@click=${settings.togglePickFromSavedIndexes}
					>
						<div slot="headline">Random from saved indexes</div>
						<div slot="supporting-text">Not fully implemented yet</div>
						<md-switch
							slot="end"
							.selected=${settings.pickFromSavedIndexes}
							@click=${(event: Event) => event.preventDefault()}
						></md-switch>
					</md-list-item>
					<div class="flex items-center p-2 mt-10">
						<color-picker
							class="mr-3"
							@input=${(e: Event) => {
								themeStore.themeColor = (e.target as ColorPicker).value;
							}}
							.value=${themeStore.themeColor}
						></color-picker>
						<color-mode-picker
							icons-only
							class="flex-1"
							@select=${(event: Event) => {
								themeStore.colorMode = (event.target as ColorModePicker).value;
							}}
							.value=${themeStore.colorMode}
						></color-mode-picker>
					</div>
				</form>

				<div slot="actions">
					<md-text-button slot="footer" form="form" value="close"
						>Close</md-text-button
					>
				</div>
			</md-dialog>
		`;
	}

	async getUpdateComplete() {
		const result = await super.getUpdateComplete();
		await this.dialog.updateComplete;
		return result;
	}

	async show() {
		await this.updateComplete;
		this.dialog.show();
	}
}

export const settingsDialog = new SettingsDialog();
