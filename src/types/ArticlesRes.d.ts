import PaginationType from "./Pagination.d.ts";
import { Article } from "../services/articles/Article.ts";

export interface ArticlesResType {
	articles: Article[];
	pagination: PaginationType;
}
