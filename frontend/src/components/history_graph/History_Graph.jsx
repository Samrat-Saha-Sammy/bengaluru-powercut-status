import { useMemo } from "react";
import YearHistoryGraph from "./yearly_graph/Year_History_Graph.jsx";
import utils from "../../utils/index";
import historyData from "./dummy_data.json";

const HistoryGraph = () => {
	const _BASE_COLOR_SHADE = "#6366F1";
	const _NO_OF_SHADE = 5;
	const _YEAR_BLOCK_COUNT = 371;

	const colorRange = useMemo(() => {
		return utils.color.generateShades(_BASE_COLOR_SHADE, _NO_OF_SHADE);
	}, [_BASE_COLOR_SHADE, _NO_OF_SHADE]);

	return (
		<div className="py-4 px-3 md:p-8 bg-white dark:bg-slate-900 dark:notion:bg-notion-dark rounded-md w-full ring-1 ring-slate-200 dark:ring-slate-800 dark:notion:ring-zinc-700 dark:notion:text-zinc-200">
			<div className="flex flex-nowrap items-center space-x-1 justify-between mb-4">
				<h2 className="text-lg sm:text-2xl font-semibold sm:font-bold flex-grow truncate text-slate-700 dark:text-slate-200 dark:notion:text-zinc-200">
					Daily Power Cuts Graph
				</h2>
				<div className="relative flex-shrink-0">
					<span className="text-xs italic mr-1 text-slate-400 font-semibold"></span>
				</div>
			</div>

			{historyData && (
				<YearHistoryGraph
					payload={historyData.data}
					colorRange={colorRange}
					unit="no_of_cut"
					yearBlocks={_YEAR_BLOCK_COUNT}
				/>
			)}

			<div className="mt-4 flex flex-col sm:flex-row items-stretch justify-between space-y-4 sm:space-x-4 sm:space-y-0">
				<div className="flex flex-col space-y-1 text-sm">
					<div className="text-slate-400 dark:notion:text-zinc-400">
						No power cut days :{" "}
						<span className="font-semibold text-slate-700 dark:text-slate-200 dark:notion:text-zinc-200">
							5 days
						</span>
					</div>
					<div className="text-slate-400 dark:notion:text-zinc-400">
						Average daily power cut:{" "}
						<span className="font-semibold text-slate-700 dark:text-slate-200 dark:notion:text-zinc-200">
							2 times
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HistoryGraph;
