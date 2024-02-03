import {ReactiveController, state} from '@snar/lit';
import {saveToLocalStorage} from 'snar-save-to-local-storage';

@saveToLocalStorage('screenshots:settings')
class Settings extends ReactiveController {
	@state() rangeStart = 0;
	@state() rangeEnd = 100;
	@state() pickFromSavedIndexes = false;

	togglePickFromSavedIndexes = () =>
		(this.pickFromSavedIndexes = !this.pickFromSavedIndexes);
}

export const settings = new Settings();
