import {ReactiveController} from '@snar/lit';
import {state} from 'snar';
import {saveToLocalStorage} from 'snar-save-to-local-storage';

@saveToLocalStorage('screenshots:deleted')
export class Deleted extends ReactiveController {
	@state() private _deleted: Array<string> = [];

	exists(item: string) {
		return this._deleted.includes(item);
	}

	add(item: string) {
		this._deleted = [...new Set([...this._deleted, item])];
	}

	remove(item: string) {
		 this._deleted.splice(this._deleted.indexOf(item) >>> 0, 1)
		 this.requestUpdate()
	}
}

export const deleted = new Deleted();
