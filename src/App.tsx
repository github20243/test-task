import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoutesComponent from "./routes/RoutesComponent";

const App: React.FC = () => {
	return (
		<div>
			<ToastContainer />
			<RoutesComponent />
		</div>
	);
};

export default App;
