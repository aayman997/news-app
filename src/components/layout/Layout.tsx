import { Outlet } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import AppFooter from "./AppFooter";

export default function Layout() {
	return (
		<div className="flex min-h-dvh flex-col">
			<AppNavbar />
			<main>
				<Outlet />
			</main>
			<AppFooter />
		</div>
	);
}
