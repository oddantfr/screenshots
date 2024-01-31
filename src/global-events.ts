import {themeStore} from './styles/styles.js';

const excludedElements = ['textarea', 'input', 'memo-dialog'].map((i) =>
	i.toUpperCase(),
);

window.addEventListener('keydown', (e) => {
	if (e.altKey || e.ctrlKey) {
		return;
	}
	const target = e.target as HTMLElement;
	const composedTarget = e.composedPath()[0] as Element;
	if (
		excludedElements.some(
			(name) => target.tagName === name || composedTarget.tagName === name,
		)
	) {
		return;
	}
	if (e.key === 'd') {
		themeStore.toggleMode();
	}

	if (e.key === 'ArrowLeft') {
		window.app.backward();
	}
	if (e.key === 'ArrowRight') {
		window.app.forward();
	}

	if (e.key === 'r') {
		window.app.random();
	}
});
