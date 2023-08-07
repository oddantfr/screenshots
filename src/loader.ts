import './styles.js'; // this should be at the top
import './global-events.js';
import {ThemeManager} from 'lit-with-styles';
import {GlobalState} from './globals.js';
import {AppShell} from './app-shell/app-shell.js';

export const globals = new GlobalState();
export const app = new AppShell();

document.body.prepend(app);

app.updateComplete.then(() => {
	ThemeManager.init();
});
