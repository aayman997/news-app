import { Article } from "../services/articles/Article.ts";
import { ArticleNewApi } from "../types/articles/ArticleNewApi";

const newsAPIDTO = (articles: ArticleNewApi[]) => {
	if (!articles.length) {
		return [];
	}
	return articles
		.filter((article) => article.title !== "[Removed]")
		.map((article) => {
			return new Article({
				id: crypto.randomUUID(),
				title: article.title,
				abstract: article.description,
				date: article.publishedAt,
				url: article.url,
				author: article.author,
				source: article?.source?.name,
				image: article.urlToImage,
			});
		});
};

export default newsAPIDTO;
