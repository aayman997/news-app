export class Article {
	abstract: string;
	author?: string;
	date: string;
	id: string;
	image: string;
	source: string;
	title: string;
	url: string;

	constructor(article: Article) {
		this.id = article.id;
		this.title = article.title;
		this.abstract = article.abstract;
		this.date = article.date;
		this.url = article.url;
		this.author = article.author ?? "unknown";
		this.source = article.source;
		this.image = article.image || "https://placehold.co/600x400";
	}
}
