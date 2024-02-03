import {ReactiveController, state} from '@snar/lit';
import {saveToLocalStorage} from 'snar-save-to-local-storage';

@saveToLocalStorage('screenshots:memo')
class MemoController extends ReactiveController {
	@state() items: string[] = [];
	@state() savedIndexes: number[] = [];

	addItem(item: string) {
		this.items = [...this.items, item];
	}

	removeItem(item: string) {
		this.items.splice(this.items.indexOf(item) >>> 0, 1);
		this.items = [...this.items];
	}

	addIndex(index: number) {
		this.savedIndexes = [...this.savedIndexes, index];
	}
	removeIndex(index: number) {
		this.savedIndexes.splice(this.savedIndexes.indexOf(index) >>> 0, 1);
		this.savedIndexes = [...this.savedIndexes];
	}
}

export const memoCtrl = (window.memoController = new MemoController());

declare global {
	interface Window {
		memoController: MemoController;
	}
}
