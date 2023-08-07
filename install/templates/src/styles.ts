import {PropertyValues} from 'lit';
import {ThemeManager, setBaseStyles} from 'lit-with-styles';
import globalStyles from './global-styles.css?inline';
import {state} from 'snar';
import {ReactiveController} from '@snar/lit';
import {saveToLocalStorage} from 'snar-save-to-local-storage';
import {
	applyTheme,
	themeFromSourceColor,
} from '@vdegenne/material-color-helpers';

setBaseStyles(globalStyles);

export type ColorMode =
	(typeof ThemeManager.Mode)[keyof typeof ThemeManager.Mode];

@saveToLocalStorage('cmg:theme')
class ThemeStore extends ReactiveController {
	@state() colorMode: ColorMode = 'system';
	@state() themeColor = '#127349';

	updated(changed: PropertyValues) {
		if (changed.has('colorMode')) {
			ThemeManager.mode = this.colorMode;
		}
		const theme = themeFromSourceColor(
			this.themeColor,
			ThemeManager.appliedTheme === 'dark',
			'vibrant',
			0
		);
		applyTheme(document, theme!);
	}

	toggleMode() {
		this.colorMode = ThemeManager.appliedTheme === 'dark' ? 'light' : 'dark';
	}
}

export const themeStore = new ThemeStore();
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
	themeStore.requestUpdate()
})

export {globalStyles};
