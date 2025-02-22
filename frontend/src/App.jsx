import HistoryGraph from "./components/history_graph/History_Graph";
import Map from "./components/map/Map";

const App = () => {
	return (
		<div className="py-4 px-2 lg:px-0 mx-auto w-full max-w-[1000px]">
			<Map />
			<HistoryGraph />
		</div>
	);
};

export default App;
