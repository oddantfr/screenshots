import {PropertyValues} from 'lit';
import {ThemeManager, setBaseStyles} from 'lit-with-styles';
import {state} from 'snar';
import {ReactiveController} from '@snar/lit';
import {saveToLocalStorage} from 'snar-save-to-local-storage';
import sharedStyles from './stylesheets/shared.css?inline';

declare global {
	interface Window {
		themeStore: ThemeStore;
	}
}

setBaseStyles(sharedStyles);

export type ColorMode =
	(typeof ThemeManager.Mode)[keyof typeof ThemeManager.Mode];

@saveToLocalStorage('cmg:theme')
class ThemeStore extends ReactiveController {
	@state() colorMode: ColorMode = 'system';
	// When changing this default value, make sure to also modify the default
	// in `styles/stylesheets/material.css` and also in html themeColor
	@state() themeColor = '#6750A4';

	async updated(changed: PropertyValues) {
		if (changed.has('colorMode')) {
			ThemeManager.mode = this.colorMode;
		}
		const {themeFromSourceColor, applyTheme} = await import(
			'@vdegenne/material-color-helpers'
		);
		const theme = themeFromSourceColor(
			this.themeColor,
			ThemeManager.appliedTheme === 'dark',
			'vibrant',
			0
		);
		applyTheme(document, theme!);
	}

	toggleMode() {
		const currentTheme = ThemeManager.appliedTheme!;
		const oppositeTheme = currentTheme === 'dark' ? 'light' : 'dark';
		const preferredTheme = ThemeManager.prefersColorScheme;
		this.colorMode =
			preferredTheme !== undefined
				? preferredTheme === oppositeTheme
					? 'system'
					: oppositeTheme
				: oppositeTheme;
	}
}

export const themeStore = (window.themeStore = new ThemeStore());

ThemeManager.init();
window
	.matchMedia('(prefers-color-scheme: dark)')
	.addEventListener('change', () => {
		themeStore.requestUpdate();
	});
