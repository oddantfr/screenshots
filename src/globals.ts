import {ReactiveController} from '@snar/lit';
import {state} from 'snar';
import {saveToLocalStorage} from 'snar-save-to-local-storage';

@saveToLocalStorage('globals')
export class GlobalState extends ReactiveController {
	@state() prop = 'foo';
}
