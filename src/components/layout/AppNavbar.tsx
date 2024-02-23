import { Link, useLocation } from "react-router-dom";
import logo from "/new-app-logo.svg";
import { CATEGORIES } from "../../constants";
import SearchInput from "../../features/filters/components/SearchInput";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { HiBars3 } from "react-icons/hi2";
import useOutsideClick from "../../hooks/useOutsideClick";

export default function AppNavbar() {
	const [showMenu, setShowMenu] = useState(false);
	const menuRef = useOutsideClick<HTMLDivElement>(() => setShowMenu(false));
	const { pathname } = useLocation();

	useEffect(() => {
		setShowMenu(false);
	}, [pathname]);

	return (
		<nav className="flex items-center bg-brand-500 py-2">
			<div className="container flex items-center justify-between">
				<Link className="inline-block" to="/">
					<img className="inline-block h-full max-h-10" src={logo} alt="news app" />
				</Link>
				<div className="flex items-center justify-center md:hidden">
					<button className="text-white" onClick={() => setShowMenu(true)}>
						<HiBars3 size={24} />
					</button>
				</div>
				{showMenu && <div className={"fixed inset-0 z-10 h-full w-full backdrop-blur transition-all duration-300"} />}
				<div
					ref={menuRef}
					className={clsx(
						"fixed inset-0 z-10 w-[260px] bg-brand-700 px-4 py-8 transition-all duration-300 md:static md:w-auto md:bg-transparent md:px-0 md:py-0",
						showMenu ? "translate-x-0 md:block" : "-translate-x-full md:translate-x-0",
					)}
				>
					<Link className="mb-10 inline-block md:hidden" to="/">
						<img className="inline-block h-full max-h-10" src={logo} alt="news app" />
					</Link>
					<ul className={clsx(`flex flex-col flex-nowrap gap-4 font-medium capitalize text-brand-50 md:flex-row md:items-center xl:gap-8`)}>
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
			</div>
		</nav>
	);
}
