import {argbFromRgba} from '@material/material-color-utilities';
import toast from 'toastit';

export function getArgbValuesFromImage(
	image: HTMLImageElement,
): Promise<number[]> {
	return new Promise((resolve, reject) => {
		image.onload = () => {
			const canvas = document.createElement('canvas');
			canvas.width = image.width;
			canvas.height = image.height;
			const ctx = canvas.getContext('2d');

			if (ctx === null) {
				throw new Error("Canvas couldn't be created");
			}

			// Draw the image on the canvas
			ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

			// Get the pixel data from the canvas
			const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
			const pixelData = imageData.data;

			// Convert the pixel data to ARGB format
			const pixels = [];
			for (let i = 0; i < pixelData.length; i += 4) {
				const r = pixelData[i];
				const g = pixelData[i + 1];
				const b = pixelData[i + 2];
				const a = pixelData[i + 3];
				// const argbColor = (alpha << 24) | (r << 16) | (green << 8) | blue;
				pixels.push(argbFromRgba({r, g, b, a}));
			}

			resolve(pixels);
		};

		image.onerror = (error) => {
			reject(error);
		};

		// Start loading the image
		// image.src = image.src;
	});
}

export function copyToClipboard(value: string) {
	navigator.clipboard.writeText(value);
	toast('copied to clipboard');
}
