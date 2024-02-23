import { Article } from "../services/articles/Article";
import { ArticleNYTSearchApi } from "../types/articles/ArticleNYTSearchApi";

const newYorkTimesDTO = (articles: ArticleNYTSearchApi[]) => {
	const NEW_YORK_TIMES_BASE_URL = "https://www.nytimes.com/";
	if (!articles.length) {
		return [];
	}
	return articles.map((article) => {
		let imageURL: string;
		if (article?.multimedia?.length) {
			imageURL =
				NEW_YORK_TIMES_BASE_URL +
				article.multimedia
					.filter((multimedia) => multimedia.type === "image")
					.filter((art) => art.width < 400)
					.sort((a, b) => b.width - a.width)[0].url;
		} else {
			imageURL = "";
		}
		return new Article({
			id: article._id,
			title: article.headline.main,
			abstract: article.abstract,
			date: article.pub_date,
			url: article.web_url,
			author: article.byline.original,
			source: article.source,
			image: imageURL,
		}).toJSON();
	});
};

export default newYorkTimesDTO;
