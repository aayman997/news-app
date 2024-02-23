export interface ArticleTheGuardianApi {
	id: string;
	type: string;
	sectionId: string;
	sectionName: string;
	webPublicationDate: string;
	webTitle: string;
	webUrl: string;
	apiUrl: string;
	fields: {
		byline?: string;
		body: string;
		thumbnail: string;
	};
	isHosted: boolean;
	pillarId: string;
	pillarName: string;
}
