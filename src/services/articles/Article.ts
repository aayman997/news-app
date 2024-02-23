type RawArticle = {
	abstract: string;
	author?: string;
	date: string;
	id: string;
	image?: string;
	source: string;
	title: string;
	url: string;
};

export class Article {
	abstract: string;
	author: string;
	date: string;
	id: string;
	image: string;
	source: string;
	title: string;
	url: string;

	constructor(article: RawArticle) {
		this.id = article.id;
		this.title = article.title;
		this.abstract = article.abstract;
		this.date = article.date;
		this.url = article.url;
		this.author = article.author ?? "unknown";
		this.source = article.source;
		this.image = article.image ?? "https://placehold.co/600x400";
	}

	toJSON(): ProcessedArticle {
		return {
			abstract: this.abstract,
			author: this.author,
			date: this.date,
			id: this.id,
			image: this.image,
			source: this.source,
			title: this.title,
			url: this.url,
		};
	}
}
