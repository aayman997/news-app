import newsAPIDTO from "../../dto/newsAPIDTO";
import PaginationType from "../../types/Pagination";
import { ArticlesResType } from "../../types/ArticlesRes";
import { ArticleNewApi } from "../../types/articles/ArticleNewApi";

interface ApiNewsAPIData {
	status: string;
	totalResults: number;
	articles: ArticleNewApi[];
}

interface ApiNewsAPIError {
	code: string;
	message: string;
	status: string;
}

type ApiNewsAPIParamsType = {
	category: string;
	page?: string;
};

const PAGE_SIZE = 10;
const LAST_AVAILABLE_PAGES = 10;
const MAX_TOTAL_PAGES = PAGE_SIZE * LAST_AVAILABLE_PAGES;
const BASE_URL = import.meta.env.VITE_NEWSAPI_URL;
const API_KEY = import.meta.env.VITE_NEWSAPI_API_KEY;

const buildURL = (paramsData: ApiNewsAPIParamsType): string => {
	let url;
	const commonParams: { apiKey: string; pageSize: string; language: string } = {
		apiKey: API_KEY,
		pageSize: PAGE_SIZE.toString(),
		language: "en",
	};
	let finalParams: typeof commonParams & Partial<ApiNewsAPIParamsType>;

	if (paramsData.category) {
		url = BASE_URL + "top-headlines?";
		finalParams = { ...commonParams, ...paramsData };
	} else {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { category, ...restParamsData } = paramsData;
		url = BASE_URL + "everything?";
		finalParams = { ...commonParams, ...restParamsData };
	}
	const searchParams = new URLSearchParams(finalParams);
	url = url + searchParams;
	return url;
};

const apiNewsAPI = async (paramsData: ApiNewsAPIParamsType): Promise<ArticlesResType> => {
	const url = buildURL(paramsData);
	const res = await fetch(url);
	if (!res.ok) {
		const errData: ApiNewsAPIError = await res.json();
		if (errData.code === "parameterInvalid") {
			return {
				articles: [],
				pagination: {} as PaginationType,
			};
		}
		throw new Error(errData.message || "Error Loading data");
	}
	const data: ApiNewsAPIData = await res.json();
	return {
		articles: newsAPIDTO(data.articles),
		pagination: {
			currentPage: Number(paramsData.page ?? 1),
			pageSize: PAGE_SIZE,
			totalPages: data.totalResults > 100 ? LAST_AVAILABLE_PAGES : Math.ceil(data.totalResults / PAGE_SIZE),
			totalResults: data.totalResults > 100 ? MAX_TOTAL_PAGES : data.totalResults,
		},
	};
};

export default apiNewsAPI;
