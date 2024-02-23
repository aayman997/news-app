import { Link } from "react-router-dom";
import logo from "/new-app-logo.svg";
import { CATEGORIES } from "../../constants";
import SearchInput from "../SearchInput.tsx";

export default function AppNavbar() {
	return (
		<nav className="flex items-center bg-brand-500 py-2">
			<div className="container flex items-center justify-between">
				<Link className="inline-block" to="/">
					<img className="inline-block h-full max-h-10" src={logo} alt="app logo" />
				</Link>
				<ul className="flex flex-col flex-nowrap gap-4 font-medium capitalize text-brand-50 md:flex-row md:items-center xl:gap-8">
					<li>
						<SearchInput headerSearch />
					</li>
					{CATEGORIES.slice(0, 3).map((category) => (
						<li key={category}>
							<Link to={`/explore/${category}`}>{category}</Link>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
}
