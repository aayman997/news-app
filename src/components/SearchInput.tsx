import { FormEvent } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";
import clsx from "clsx";

const SearchInput = ({ headerSearch = false }: { headerSearch?: boolean }) => {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const query = searchParams.get("query") ?? "";
	const handleSearch = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const searchElement = e.currentTarget.elements.namedItem("search");
		if (searchElement) {
			const input = searchElement as HTMLInputElement;
			const query = input.value;
			if (headerSearch && !query) {
				return;
			}

			if (query === searchParams.get("query")) {
				return;
			}

			if (headerSearch) {
				navigate(`/search?query=${query}`);
				input.value = "";
				return;
			}

			setSearchParams({ query: query });
		}
	};

	return (
		<form
			className={clsx(
				"relative overflow-hidden rounded-md border-2",
				headerSearch ? "h-[35px] w-48 border-brandYellow" : "h-12 border-brandPink md:w-80",
			)}
			onSubmit={handleSearch}
		>
			<input
				className={clsx(
					`absolute inset-0 border-none font-normal placeholder:text-sm placeholder:capitalize placeholder:text-gray-400
					placeholder:text-gray-500/50 focus:border-none focus:outline focus:outline-white`,
					headerSearch ? "right-[31px] bg-white px-2 text-richBlack" : "right-[44px] bg-brandYellow px-4",
				)}
				type="search"
				name="search"
				placeholder="type keyword"
				defaultValue={query}
			/>
			<button
				className={clsx(
					`absolute bottom-0 right-0 top-0 z-[1] flex aspect-square items-center justify-center border-none bg-brandPink text-xl text-white
					transition-all duration-300 hover:bg-brandPink/50 hover:text-white hover:shadow-md`,
					headerSearch && "bg-brandYellow text-richBlack",
				)}
				aria-label="search"
			>
				<HiOutlineSearch size={headerSearch ? 18 : 24} />
			</button>
		</form>
	);
};
export default SearchInput;
