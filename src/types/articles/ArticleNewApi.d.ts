export interface ArticleNewApi {
	title: string;
	description: string;
	source: {
		id: string;
		name: string;
	};
	author: string;
	url: string;
	urlToImage: string;
	publishedAt: string;
	content: string;
}
