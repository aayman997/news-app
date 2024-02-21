import Article from "./Article.tsx";
import Pagination from "react-js-pagination";
import { ArticlesResType } from "../../../types/ArticlesRes";
import { BiLoaderCircle } from "react-icons/bi";
import { HiExclamation } from "react-icons/hi";

interface ArticlesListProps {
	articles: ArticlesResType["articles"] | undefined;
	withPagination?: boolean;
	pagination?: ArticlesResType["pagination"];
	isLoading?: boolean;
	isError?: boolean;
}

const ArticlesList = ({ articles, withPagination, pagination, isLoading, isError }: ArticlesListProps) => {
	if (isLoading) {
		return (
			<div className="flex items-center justify-center">
				<BiLoaderCircle className="animate-spin text-yellow-500" size={36} />
			</div>
		);
	}
	if (isError || !articles) {
		return (
			<div className="flex flex-col items-center text-center">
				<HiExclamation className="text-red-500" size={36} />
				<p>Error loading most viewed articles</p>
			</div>
		);
	}

	return (
		<div className="w-full">
			<div className="@container flex flex-col gap-y-8">
				{articles.length > 0 ? articles.map((article) => <Article key={article.id} article={article} />) : <p>No articles to show 🥲</p>}
			</div>
			{withPagination && pagination && pagination?.totalPages > 1 && (
				<div className="mt-8 flex items-center justify-center">
					<Pagination activePage={pagination.currentPage} totalItemsCount={pagination.totalResults} onChange={(e) => console.log("e", e)} />
				</div>
			)}
		</div>
	);
};
export default ArticlesList;
