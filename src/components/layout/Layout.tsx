import { Outlet } from "react-router-dom";
import AppNavbar from "./AppNavbar.tsx";
import AppFooter from "./AppFooter.tsx";

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
