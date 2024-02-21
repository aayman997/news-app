import useMostViewedArticles from "../hooks/useMostViewedArticles.ts";
import ArticlesList from "./ArticlesList.tsx";

export default function MostViewedArticles() {
	const { data, isLoading, isError } = useMostViewedArticles();

	return (
		<div className="flex flex-col items-center">
			<h3 className="mb-4 text-center text-xl font-bold text-brandPink">Most Viewed Articles</h3>
			<ArticlesList articles={data?.articles} isLoading={isLoading} isError={isError} />
		</div>
	);
}
