export function hexToRgb(hex) {
	hex = hex.replace(/^#/, "");
	if (hex.length === 3) {
		hex = hex
			.split("")
			.map((x) => x + x)
			.join(""); // Convert shorthand #RGB to #RRGGBB
	}
	let bigint = parseInt(hex, 16);
	return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

export function rgbToHex(r, g, b) {
	return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

export function rgbToHsl(r, g, b) {
	(r /= 255), (g /= 255), (b /= 255);
	let max = Math.max(r, g, b),
		min = Math.min(r, g, b);
	let h,
		s,
		l = (max + min) / 2;

	if (max === min) {
		h = s = 0; // Achromatic
	} else {
		let d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h *= 60;
	}
	return [h, s * 100, l * 100];
}

export function hslToRgb(h, s, l) {
	(s /= 100), (l /= 100);
	let c = (1 - Math.abs(2 * l - 1)) * s;
	let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
	let m = l - c / 2;
	let r, g, b;

	if (h < 60) [r, g, b] = [c, x, 0];
	else if (h < 120) [r, g, b] = [x, c, 0];
	else if (h < 180) [r, g, b] = [0, c, x];
	else if (h < 240) [r, g, b] = [0, x, c];
	else if (h < 300) [r, g, b] = [x, 0, c];
	else [r, g, b] = [c, 0, x];

	return [
		Math.round((r + m) * 255),
		Math.round((g + m) * 255),
		Math.round((b + m) * 255),
	];
}

export function adjustLightness(hex, percent) {
	let [h, s, l] = rgbToHsl(...hexToRgb(hex));
	l = Math.max(0, Math.min(100, l + percent)); // Keep within 0-100
	return rgbToHex(...hslToRgb(h, s, l));
}

export function generateShades(color, shadeCount, blankShade = "#E5E7EB") {
	let shades = [blankShade]; // Deafult added for 0 or blank
	let percentageLighter = 5; // Each color shade is ligher by the %

	for (let i = shadeCount - 1; i >= 0; i--) {
		shades.push(adjustLightness(color, i * percentageLighter));
	}
	return shades;
}
