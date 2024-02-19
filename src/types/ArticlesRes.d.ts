import ArticleType from "./Article.d.ts";
import PaginationType from "./Pagination.d.ts";

export default interface ArticlesResType {
	articles: Partial<ArticleType>[];
	pagination: PaginationType;
}
