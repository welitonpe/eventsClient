import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateLayout from "./components/PrivateLayout";
import Home from "./pages/home";
import GuestLayout from "./components/GuestLayout";
import GuestOutlet from "./components/Outlets/GuestOutlet";

const AppRouter = () => (
	<BrowserRouter>
		<Routes>
			<Route element={<GuestOutlet />} path="/">
				<Route element={<GuestLayout />} path="/">
					<Route element={<Home />} index />
				</Route>
			</Route>
			<Route element={<PrivateLayout />} path="dashboard">
				<Route element={<Home />} path="home" />
			</Route>
		</Routes>
	</BrowserRouter>
);
export default AppRouter;
