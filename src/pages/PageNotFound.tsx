import { useNavigate } from "react-router-dom";
import { HiArrowLongLeft } from "react-icons/hi2";

const PageNotFound = () => {
	const navigate = useNavigate();
	return (
		<div className="flex h-dvh flex-col items-center justify-center gap-10 font-bold">
			<h1 className="text-xl text-brand-500 md:text-4xl">Page not found 😢</h1>
			<button
				className="flex items-center gap-3 rounded border border-brand-500 px-12 py-4 text-xl capitalize leading-none text-brand-500 transition-all
				duration-300 hover:bg-brand-500 hover:text-white"
				onClick={() => navigate("/")}
			>
				<HiArrowLongLeft size={24} />
				back to home
			</button>
		</div>
	);
};
export default PageNotFound;
