import { useEffect, useState } from "react";

function getRandomPastelColor() {
	const r = Math.floor(Math.random() * 156) + 100; // 100-255
	const g = Math.floor(Math.random() * 156) + 100;
	const b = Math.floor(Math.random() * 156) + 100;
	return `rgb(${r}, ${g}, ${b})`;
}

const Map = () => {
	const [mapData, setMapData] = useState();

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
			<svg id="mapSvg" viewBox="293 -230 1650 1600">
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
												fill={getRandomPastelColor()}
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
