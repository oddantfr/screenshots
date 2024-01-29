import {LitElement, html} from 'lit';
import {query} from 'lit/decorators.js';
import '@material/web/dialog/dialog.js';
import '@material/web/button/text-button.js';
import '@material/web/slider/slider.js';
import {MdDialog} from '@material/web/dialog/dialog.js';
import {customElement} from 'custom-element-decorator';
import {withStyles} from 'lit-with-styles';
import {ReactiveController, withController} from '@snar/lit';
import {state} from 'snar';
import {MdSlider} from '@material/web/slider/slider.js';
import { saveToLocalStorage } from 'snar-save-to-local-storage';

@saveToLocalStorage('screenshots:settings')
class Settings extends ReactiveController {
	@state() rangeStart = 0;
	@state() rangeEnd = 100;
}
export const settings = new Settings();

@customElement({name: 'settings-dialog', inject: true})
@withStyles()
@withController(settings)
export class SettingsDialog extends LitElement {
	@query('md-dialog') dialog!: MdDialog;

	render() {
		return html`
			<md-dialog>
				<div slot="headline">Settings</div>

				<form slot="content" method="dialog" id="form">
					<h3>Picking range</h3>
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
