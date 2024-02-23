import SearchInput from "./SearchInput.tsx";

const SearchHeader = () => {
	return (
		<header
			className="relative left-0 right-0 flex h-[30dvh] w-full items-center justify-center bg-[url('/bannerImage.jpg')] bg-fixed bg-repeat
			before:absolute before:inset-0 before:backdrop-blur-[4px] before:backdrop-brightness-50 before:content-['']"
		>
			<div className="relative z-[1] text-center">
				<h3 className="mb-5 text-3xl font-bold text-white">search for article</h3>
				<SearchInput />
			</div>
		</header>
	);
};
export default SearchHeader;
