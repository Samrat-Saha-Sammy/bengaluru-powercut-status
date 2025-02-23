import HistoryGraph from "./components/history_graph/History_Graph";
import Map from "./components/map/Map";

const App = () => {
	return (
		<div className="flex min-h-full flex-col">
			<div className="overflow-hidden bg-slate-100 lg:bg-transparent lg:px-5">
				<div className="mx-auto grid max-w-6xl grid-cols-1 grid-rows-[auto_1fr] gap-y-16 pt-16 md:pt-20 lg:grid-cols-12 lg:gap-y-20 lg:px-3 lg:pt-20 lg:pb-26">
					<div className="relative flex items-end lg:col-span-6 lg:row-span-2">
						<div className="h-full w-full">
							<Map />
						</div>
					</div>
					<div className="bg-white pt-16 lg:col-span-6 lg:bg-transparent lg:pt-0 lg:pl-4 xl:pl-6">
						<h1 className="font-display text-5xl font-extrabold text-slate-100 sm:text-6xl">
							B'luru Power Cut Status
						</h1>
						<p className="mt-4 text-3xl text-slate-200">
							A book and video course that teaches you how to design your own
							icons from scratch.
						</p>
					</div>
					<div className="relative px-4 sm:px-6 lg:col-span-7 lg:pr-0 lg:pb-14 lg:pl-16 xl:pl-20"></div>
				</div>
			</div>
			{/* <Map />
			<HistoryGraph /> */}
		</div>
	);
};

export default App;
