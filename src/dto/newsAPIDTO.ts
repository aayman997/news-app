import ArticleType from "../types/Article.ts";
import { Article } from "../services/articles/Article.ts";

const newsAPIDTO = (articles: ArticleType[]) => {
	if (!articles.length) {
		return [];
	}
	return articles
		.filter((article) => article.title !== "[Removed]")
		.map((article) => {
			const curTimeStamp = Date.now();
			const timestamp = new Date(article.publishedAt).getTime();
			const id = curTimeStamp + timestamp;
			return new Article({
				id: id.toString(),
				title: article.title,
				abstract: article.description,
				date: article.publishedAt,
				url: article.url,
				author: article.author,
				source: typeof article?.source === "object" ? article?.source?.name : article?.source,
				image: article.urlToImage,
			});
		});
};

export default newsAPIDTO;
