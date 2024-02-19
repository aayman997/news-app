import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.tsx";
import Home from "./pages/Home.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
				</Route>

				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
