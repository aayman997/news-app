import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type PaginationType from "../types/Pagination.d.ts";
import type ArticleType from "../types/Article.d.ts";
import SearchHeader from "../components/SearchHeader.tsx";
import SearchFilter from "../components/SearchFilter.tsx";
import Loader from "../components/Loader.tsx";
import ArticlesList from "../features/articles/components/ArticlesList.tsx";

interface ArticlesType {
	articles: Partial<ArticleType>[];
	pagination: PaginationType;
}

const Search = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [articles, setArticles] = useState<ArticlesType>({} as ArticlesType);
	const [errorLoadingArticles, setErrorLoadingArticles] = useState(false);
	const [isLoadingArticles, setIsLoadingArticles] = useState(false);
	const [showFilter, setShowFilter] = useState(false);
	const [sortBy, setSortBy] = useState(() => {
		return searchParams.get("sortBy") ?? "publishedAt";
	});
	const [categories, setCategories] = useState<string[]>(() => {
		return searchParams?.get("categories")?.split(",") ?? [];
	});
	const [authors, setAuthors] = useState<string[]>(() => {
		return searchParams?.get("authors")?.split(",") ?? [];
	});
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	useEffect(() => {
		const params = { ...Object.fromEntries([...searchParams]) };
		if (Object.entries(categories).length) {
			params.categories = categories.join(",");
		} else {
			delete params.categories;
		}
		setSearchParams(params);
	}, [categories, searchParams, setSearchParams]);

	useEffect(() => {
		const params = { ...Object.fromEntries([...searchParams]) };
		if (Object.entries(authors).length) {
			params.authors = authors.join(",");
		} else {
			delete params.authors;
		}
		setSearchParams(params);
	}, [authors, searchParams, setSearchParams]);

	useEffect(() => {
		setIsLoadingArticles(true);
		const query = searchParams.get("query") ?? undefined;
		const page = searchParams.get("page") ?? "1";
		const categoriesString = categories.join(",");
		const authorsString = authors.join(",");
		const paramsObject = {
			q: query,
			page,
			sortBy,
			sources: authorsString,
			from: startDate,
			to: endDate,
			category: categoriesString,
		};
		return () => {
			setErrorLoadingArticles(false);
			setArticles(() => ({}) as ArticlesType);
		};
	}, [sortBy, searchParams, categories, authors, startDate, endDate]);
	return (
		<>
			<SearchHeader />
			<div className="flex items-start gap-10 pt-[calc(30dvh+25px)]">
				{showFilter && <div className="fixed inset-0 z-20 h-full w-full backdrop-blur lg:z-0" onClick={() => setShowFilter(false)} />}
				<div
					className={`min-w-1/2 fixed bottom-0 left-0 top-0 z-20 -translate-x-full bg-gray-100 px-4 py-8 transition-transform duration-300 lg:static lg:z-0 lg:block lg:min-w-max lg:basis-1/4 lg:translate-x-0 lg:bg-transparent lg:p-0 lg:transition-none lg:duration-0 ${
						showFilter ? "translate-x-0" : "lg:translate-x-0"
					}`}
				>
					<SearchFilter
						setCategories={setCategories}
						setAuthors={setAuthors}
						setStartDate={setStartDate}
						setEndDate={setEndDate}
						startDate={startDate}
						endDate={endDate}
						categories={categories}
						authors={authors}
						setShowFilter={setShowFilter}
					/>
				</div>
				<div className="basis-full lg:basis-3/4">
					{isLoadingArticles && <Loader />}
					<div className="mb-5">
						<div className=" flex items-center justify-between">
							<h3 className="text-2xl font-bold text-teal-500">Search Results</h3>
							<div className="flex items-center justify-center gap-3">
								<span>sort by</span>
								<select
									className="h-[35px] w-[135px] rounded border border-teal-300 px-2 leading-none focus:border-2 focus:border-teal-500 focus:outline-none"
									value={sortBy}
									onChange={(e) => setSortBy(e.target.value)}
									disabled={articles?.articles?.length === 0 || errorLoadingArticles}
								>
									<option value="relevancy">relevancy</option>
									<option value="popularity">popularity</option>
									<option value="publishedAt">published at</option>
								</select>
							</div>
						</div>
						<button
							className="mt-5 block rounded border border-teal-500 px-5 py-2 font-medium leading-none text-teal-500 lg:hidden"
							onClick={() => setShowFilter((cur) => !cur)}
						>
							filter results
						</button>
					</div>
					{errorLoadingArticles && <p>Error happened while loading data 🥲</p>}
					<ArticlesList articles={articles.articles} pagination={articles.pagination} small={false} />
				</div>
			</div>
		</>
	);
};
export default Search;
