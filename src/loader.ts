// This needs to be before anything else
// because it sets a shared stylesheet used by
// elements' construtor.
import './styles/shared.js';

import '@material/web/all.js';

import './app-shell/app-shell.js';

import './global-events.js';

window.onload = async () => {
	// const {historyDialog} = await import('./history/history-dialog.js');
	// historyDialog.show();
	// const {memoDialog} = await import('./memo/memo-dialog.js');
	// memoDialog.show();
};
