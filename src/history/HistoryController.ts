import {ReactiveController, state} from '@snar/lit';
import {saveToLocalStorage} from 'snar-save-to-local-storage';

@saveToLocalStorage('screenshots:history')
class HistoryController extends ReactiveController {
	@state() historyLimit = 20;
	@state() history: number[] = [];
	@state() currentIndex = 0;

	get last() {
		return this.history[0];
	}

	addIndex(index: number) {
		this.history.unshift(index);
		this.history = this.history.slice(0, this.historyLimit);
	}

	removeIndex(index: number) {
		const indexOfIndex = this.history.indexOf(index);
		if (indexOfIndex >= 0) {
			this.history.splice(indexOfIndex, 1);
			this.history = [...this.history];
		}
	}
}

export const historyCtrl = (window.historyCtrl = new HistoryController());

declare global {
	interface Window {
		historyCtrl: HistoryController;
	}
}
