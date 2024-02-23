import { useSearchParams } from "react-router-dom";
import { useState, ChangeEvent } from "react";
import SearchHeader from "../components/SearchHeader.tsx";
import SearchFilter from "../components/SearchFilter.tsx";
import ArticlesList from "../features/articles/components/ArticlesList.tsx";
import clsx from "clsx";
import useFilterArticles from "../features/filters/hooks/useFilterArticles.ts";
import updateSearchParamsField from "../utils/updateSearchParamsField.ts";

const Search = () => {
	const { data: articles, isError, isLoading } = useFilterArticles();
	const [searchParams, setSearchParams] = useSearchParams();
	const [showFilter, setShowFilter] = useState(false);
	const orderBy = searchParams.get("order-by") ?? "relevance";

	const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		setSearchParams((prevParams) => updateSearchParamsField("order-by", value, prevParams));
	};

	return (
		<div className="mb-10">
			<style>{`
				body {
					overflow: ${showFilter ? "hidden" : "auto"}
				}
			`}</style>
			<SearchHeader />
			<div className="container mt-10 flex items-start gap-10">
				{showFilter && <div className="fixed inset-0 z-20 h-full w-full backdrop-blur lg:z-0" />}
				<div
					className={clsx(
						`min-w-1/2 fixed bottom-0 left-0 top-0 z-20 h-dvh -translate-x-full overflow-auto bg-gray-100 px-4 py-8 transition-transform
						duration-300 lg:static lg:z-0 lg:block lg:min-w-max lg:basis-1/4 lg:translate-x-0 lg:bg-transparent lg:p-0 lg:transition-none
						lg:duration-0`,
						showFilter ? "translate-x-0" : "lg:translate-x-0",
					)}
				>
					<SearchFilter setShowFilter={setShowFilter} />
				</div>
				<div className="basis-full lg:basis-3/4">
					<div className="mb-5">
						<div className="flex flex-col justify-between gap-y-4 md:flex-row md:items-center md:gap-y-0">
							<h3 className="text-2xl font-bold text-brand-500">Search Results</h3>
							<div className="mr-auto flex items-center justify-center gap-3 md:ml-auto md:mr-0">
								<span>sort by</span>
								<select
									className="h-[35px] w-[135px] rounded border border-brand-300 px-2 leading-none focus:border-2 focus:border-brand-500
									focus:outline-none"
									value={orderBy}
									onChange={(e) => handleSort(e)}
									disabled={articles?.articles?.length === 0}
								>
									<option value="relevance">Relevance</option>
									<option value="newest">Newest</option>
									<option value="oldest">Oldest</option>
								</select>
							</div>
						</div>
						<button
							className="mt-5 block rounded border border-brand-500 px-5 py-2 font-medium leading-none text-brand-500 lg:hidden"
							onClick={() => setShowFilter(true)}
						>
							filter results
						</button>
					</div>
					<ArticlesList articles={articles?.articles} pagination={articles?.pagination} isLoading={isLoading} isError={isError} />
				</div>
			</div>
		</div>
	);
};
export default Search;
