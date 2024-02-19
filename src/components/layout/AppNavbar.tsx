import { Link } from "react-router-dom";
import logo from "/new-app-logo.svg";

export default function AppNavbar() {
	return (
		<nav className="flex items-center bg-brand-500 py-2">
			<div className="container">
				<Link className="inline-block" to="/">
					<img className="inline-block h-full max-h-10" src={logo} alt="app logo" />
				</Link>
			</div>
		</nav>
	);
}
