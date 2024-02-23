import Article from "./Article.tsx";
import { ArticlesResType } from "../../../types/ArticlesRes";
import { BiLoaderCircle } from "react-icons/bi";
import { HiExclamation } from "react-icons/hi";
import Pagination from "../../../components/Pagination.tsx";

interface ArticlesListProps {
	articles: ArticlesResType["articles"] | undefined;
	pagination?: ArticlesResType["pagination"];
	isLoading?: boolean;
	isError?: boolean;
}

const ArticlesList = ({ articles, pagination, isLoading, isError }: ArticlesListProps) => {
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
				<p>Error loading articles</p>
			</div>
		);
	}

	return (
		<div className="w-full">
			<div className="grid grid-cols-12 flex-col gap-6 @container">
				{articles.length > 0 ? (
					articles.map((article) => <Article key={article.id} article={article} />)
				) : (
					<p className="col-span-2 col-start-6 text-center">No articles to show 🥲</p>
				)}
			</div>
			{pagination && pagination?.totalPages > 1 && (
				<div className="mt-8 flex items-center justify-center">
					<Pagination pagination={pagination} />
				</div>
			)}
		</div>
	);
};
export default ArticlesList;
