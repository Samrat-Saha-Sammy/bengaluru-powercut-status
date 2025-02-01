import { useState } from "react";
import "./App.css";
import YearHistoryGraph from "./components/year_history_graph";

function App() {
	return (
		<>
			{/* <h1>Bangalore Power-Cut Status</h1> */}
			<div>
				<YearHistoryGraph />
			</div>
		</>
	);
}

export default App;
