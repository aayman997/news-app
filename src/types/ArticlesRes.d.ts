import PaginationType from "./Pagination.d";

export interface ArticlesResType {
	articles: ProcessedArticle[];
	pagination: PaginationType;
}
