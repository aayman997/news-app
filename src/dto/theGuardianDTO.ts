import { Article } from "../services/articles/Article";
import { ArticleTheGuardianApi } from "../types/articles/ArticleTheGuardianApi";

const theGuardianDTO = (articles: ArticleTheGuardianApi[]) => {
	if (!articles.length) {
		return [];
	}
	return articles.map((article) => {
		return new Article({
			id: crypto.randomUUID(),
			title: article.webTitle,
			abstract: article.fields.body.replace(/<\/?[^>]+(>|$)/g, ""),
			date: article.webPublicationDate,
			url: article.webUrl,
			author: article.fields.byline,
			source: "theguardian.com",
			image: article.fields.thumbnail,
		}).toJSON();
	});
};

export default theGuardianDTO;
