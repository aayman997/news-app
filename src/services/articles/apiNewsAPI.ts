import newsAPIDTO from "../../dto/newsAPIDTO";
import PaginationType from "../../types/Pagination";
import { ArticlesResType } from "../../types/ArticlesRes";
import { ArticleNewApi } from "../../types/articles/ArticleNewApi";
import { PAGE_SIZE, LAST_AVAILABLE_PAGES, MAX_TOTAL_PAGES } from "../../constants";

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
	q?: string;
	category?: string;
	page?: string;
	from?: string;
	to?: string;
	sortBy?: string;
};

const BASE_URL = import.meta.env.VITE_NEWSAPI_URL;
const API_KEY = import.meta.env.VITE_NEWSAPI_API_KEY;

const buildURL = (paramsData: ApiNewsAPIParamsType): string => {
	const commonParams: { apiKey: string; pageSize: string; language: string } = {
		apiKey: API_KEY,
		pageSize: PAGE_SIZE.toString(),
		language: "en",
	};

	const buildSearchParams = () => {
		const { category, ...restParamsData } = paramsData;
		if (category && !restParamsData.q) {
			return { ...commonParams, ...restParamsData, category };
		} else {
			let q = restParamsData.q ?? "";
			if (category) {
				q = `(${q} AND (${category.split("|").join(" OR ")}))`;
			}
			return {
				...commonParams,
				...restParamsData,
				q,
			};
		}
	};

	const searchParams = new URLSearchParams(buildSearchParams());

	const urlPath = paramsData.category && !paramsData.q ? "top-headlines?" : "everything?";
	return BASE_URL + urlPath + searchParams;
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
