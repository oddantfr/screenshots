import {ReactiveController, state} from '@snar/lit';
import {saveToLocalStorage} from 'snar-save-to-local-storage';

@saveToLocalStorage('screenshots:state')
class AppState extends ReactiveController {
	@state() index = 0;
}

export const appState = (window.appState = new AppState());

declare global {
	interface Window {
		appState: AppState;
	}
}
