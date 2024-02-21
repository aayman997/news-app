import newsAPIDTO from "../../dto/newsAPIDTO.ts";
import ArticleType from "../../types/Article.ts";
import PaginationType from "../../types/Pagination.ts";
import { ArticlesResType } from "../../types/ArticlesRes";

interface ApiNewsAPIData {
	status: string;
	totalResults: number;
	articles: ArticleType[];
}

interface ApiNewsAPIError {
	code: string;
	message: string;
	status: string;
}

type ApiResponse = ApiNewsAPIData | ApiNewsAPIError;
type ApiNewsAPIParamsType = Record<string, string | undefined>;

const PAGE_SIZE = 10;
const LAST_AVAILABLE_PAGES = 10;
const MAX_TOTAL_PAGES = PAGE_SIZE * LAST_AVAILABLE_PAGES;
const BASE_URL = import.meta.env.VITE_NEWSAPI_URL;
const API_KEY = import.meta.env.VITE_NEWSAPI_API_KEY;

const buildURL = (paramsData: ApiNewsAPIParamsType): string => {
	let url;
	const params: Record<string, string> = {
		apiKey: API_KEY,
		pageSize: PAGE_SIZE.toString(),
		...paramsData,
	};
	if (paramsData.category) {
		url = BASE_URL + "top-headlines?";
	} else {
		url = BASE_URL + "everything?";
		delete params.category;
	}
	const searchParams = new URLSearchParams(params);
	url = url + searchParams;
	return url;
};

const isError = (data: ApiResponse): data is ApiNewsAPIError => data && (data as ApiNewsAPIError).code !== undefined;

const apiNewsAPI = async (paramsData: ApiNewsAPIParamsType): Promise<ArticlesResType> => {
	const url = buildURL(paramsData);
	const res = await fetch(url);
	const data: ApiResponse = await res.json();
	if (!res.ok) {
		if (isError(data) && data.code === "parameterInvalid") {
			return {
				articles: [],
				pagination: {} as PaginationType,
			};
		}
		throw new Error(isError(data) ? data.message : "Error Loading data");
	}
	return {
		articles: newsAPIDTO((data as ApiNewsAPIData).articles),
		pagination: {
			currentPage: Number(paramsData.page ?? 1),
			pageSize: PAGE_SIZE,
			totalPages: (data as ApiNewsAPIData).totalResults > 100 ? LAST_AVAILABLE_PAGES : Math.ceil((data as ApiNewsAPIData).totalResults / PAGE_SIZE),
			totalResults: (data as ApiNewsAPIData).totalResults > 100 ? MAX_TOTAL_PAGES : (data as ApiNewsAPIData).totalResults,
		},
	};
};

export default apiNewsAPI;
