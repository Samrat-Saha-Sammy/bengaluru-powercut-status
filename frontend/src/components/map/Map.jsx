import { useEffect, useState } from "react";

function getRandomPastelColor() {
	const r = Math.floor(Math.random() * 156) + 100; // 100-255
	const g = Math.floor(Math.random() * 156) + 100;
	const b = Math.floor(Math.random() * 156) + 100;
	return `rgb(${r}, ${g}, ${b})`;
}

function createGrayShadeGenerator(
	count = 5,
	minBrightness = 50,
	maxBrightness = 200
) {
	// Generate 5 random shades of gray
	const shades = Array.from({ length: count }, () => {
		const shade =
			Math.floor(Math.random() * (maxBrightness - minBrightness)) +
			minBrightness;
		return `rgb(${shade}, ${shade}, ${shade})`;
	});

	// Return a function that picks a random shade on each call
	return function getRandomGrayShade() {
		return shades[Math.floor(Math.random() * shades.length)];
	};
}

const Map = () => {
	const [mapData, setMapData] = useState();

	const getRandomGray = createGrayShadeGenerator(5, 30, 50);

	// Define a basic projection function (GeoJSON coords -> SVG space)
	const project = (lon, lat) => {
		const scale = 5000; // Adjust based on map size
		const x = (lon - 77.5) * scale + 500; // Center on Bangalore (77.5°E)
		const y = (13.0 - lat) * scale + 500; // Center on Bangalore (13.0°N)
		return [x, y];
	};

	async function loadGeoJSON() {
		const response = await fetch("src/assets/BBMP.json");
		const geojson = await response.json();
		setMapData(geojson);
	}

	useEffect(() => {
		loadGeoJSON();
	}, []);

	return (
		<div>
			<svg id="mapSvg" viewBox="293 -230 1650 1600" fill="#343434">
				{mapData &&
					mapData.features.map((feature) => {
						if (feature.geometry.type === "Polygon") {
							return (
								<g key={feature.properties.KGISWardNo} stroke="grey">
									{feature.geometry.coordinates.map((polygon, index) => {
										let pathData =
											"M " +
											polygon
												.map(([lon, lat]) => {
													const [x, y] = project(lon, lat);
													return `${x},${y}`;
												})
												.join(" L ") +
											" Z";

										return (
											<path
												key={feature.properties.KGISWardNo + index}
												d={pathData}
												className="area"
												data-name={feature.properties.name || "Unknown"}
												fill={getRandomGray()}
												strokeWidth="1"
											/>
										);
									})}
									{/* Hidden text
									<text
										x="100"
										y="120"
										textAnchor="middle"
										className="hover-text"
									>
										{feature.properties.KGISWardName}
									</text> */}
								</g>
							);
						}
					})}
			</svg>
		</div>
	);
};

export default Map;
