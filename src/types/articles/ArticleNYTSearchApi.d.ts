export interface ArticleNYTSearchApi {
	abstract: string;
	web_url: string;
	snippet: string;
	lead_paragraph: string;
	source: string;
	multimedia: Multimedia[];
	headline: {
		main: string;
		kicker: null;
		content_kicker: null;
		print_headline: string | null;
		name: null;
		seo: null;
		sub: null;
	};
	keywords: Keyword[];
	pub_date: string;
	document_type: string;
	news_desk: string;
	section_name: string;
	byline: Byline;
	type_of_material: string;
	_id: string;
	word_count: number;
	uri: string;
}

type Multimedia = {
	rank: number;
	subtype: string;
	caption: null;
	credit: null;
	type: string;
	url: string;
	height: number;
	width: number;
	legacy: Legacy;
	subType: string;
	crop_name: string;
};
type Legacy = { xlarge: string; xlargewidth: number; xlargeheight: number } | object;
type Keyword = { name: string; value: string; rank: number; major: string };
type Byline = {
	original: string;
	person: Person;
	organization: null;
};

type Person = {
	firstname: string;
	middlename: null;
	lastname: string;
	qualifier: null;
	title: null;
	role: string;
	organization: string;
	rank: number;
};
