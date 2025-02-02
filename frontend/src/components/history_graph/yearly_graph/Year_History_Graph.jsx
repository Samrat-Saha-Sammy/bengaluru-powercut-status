import Block from "../block/Block.jsx";

const YearHistoryGraph = ({ payload, colorRange, unit, yearBlocks }) => {
	let mapDataLag = null;

	return (
		<div className="w-full overflow-x-auto no-scrollbar">
			{/* Contributions Grid */}
			<div className="flex items-start">
				<div className="grid grid-rows-7 grid-flow-col gap-[3px]">
					{payload.length > 1 &&
						Array.from({ length: yearBlocks }, (_, index) => {
							if (mapDataLag !== null) {
								const d = payload[index - mapDataLag];
								return (
									<Block key={index} data={d} color={colorRange[d[unit]]} />
								);
							} else {
								mapDataLag =
									index + 1 === payload[0].day_of_week ? index + 1 : null;
								return (
									<div
										key={index}
										className="w-[12px] h-[12px] rounded-full bg-transparent"
									/>
								);
							}
						})}
				</div>
			</div>
		</div>
	);
};

export default YearHistoryGraph;
