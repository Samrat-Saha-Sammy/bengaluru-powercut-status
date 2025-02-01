import "./history_graph.css";
import payload from "./dummy_data.json";

export default function YearHistoryGraph() {
	const _Total_Cells = 371;
	let mapDataLag = null;
	const CONFIG = {
		color: "#6366F1",
		maxStep: 5,
	};
	const colorRange = generateShades();
	const history = { ...payload };

	function generateShades() {
		return {
			0: "#E5E7EB",
			1: adjustLightness(CONFIG.color, 25),
			2: adjustLightness(CONFIG.color, 20),
			3: adjustLightness(CONFIG.color, 15),
			4: adjustLightness(CONFIG.color, 5),
			5: CONFIG.color,
		};
	}

	return (
		<div className="App">
			<h1>Daily Power Cuts Graph</h1>
			<div className="contribution-container">
				{/* Contributions Grid */}
				<div className="contribution-graph">
					{history.data.length > 1 &&
						Array.from({ length: _Total_Cells }, (_, index) => {
							if (mapDataLag !== null) {
								const payload = history.data[index - mapDataLag];
								return (
									<div
										className="day"
										key={index}
										style={{ backgroundColor: colorRange[payload.no_of_cut] }}
									></div>
								);
							} else {
								mapDataLag =
									index + 1 === history.data[0].day_of_week ? index + 1 : null;
								return (
									<div
										className="day"
										key={index}
										style={{ backgroundColor: "transparent" }}
									></div>
								);
							}
						})}
				</div>
			</div>
		</div>
	);
}

function hexToRgb(hex) {
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

function rgbToHex(r, g, b) {
	return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

function rgbToHsl(r, g, b) {
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

function hslToRgb(h, s, l) {
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

function adjustLightness(hex, percent) {
	let [h, s, l] = rgbToHsl(...hexToRgb(hex));
	l = Math.max(0, Math.min(100, l + percent)); // Keep within 0-100
	return rgbToHex(...hslToRgb(h, s, l));
}
