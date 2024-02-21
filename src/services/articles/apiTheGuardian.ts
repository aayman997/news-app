import theGuardianDTO from "../../dto/theGuardianDTO.ts";
import { ArticlesResType } from "../../types/ArticlesRes";

interface ArticlesRes extends ArticlesResType {
	orderBy?: string;
}

const constructURLWithParams = (BASE_URL: string, API_KEY: string, query?: string, page?: string, orderBy?: string, orderDate?: string) => {
	const RESULTS_PER_PAGE = "15";
	const params: Record<string, string> = {
		"api-key": API_KEY,
		"show-fields": "body,byline,thumbnail",
		"page-size": RESULTS_PER_PAGE,
		...(query && { q: query }),
		...(page && { page }),
		...(orderBy && { "order-by": orderBy }),
		...(orderDate && { "order-date": orderDate }),
	};
	const searchParams = new URLSearchParams(params);
	return BASE_URL + "search?" + searchParams;
};

const apiTheGuardian = async (query?: string, page?: string, orderBy?: string, orderDate?: string): Promise<ArticlesRes> => {
	if (query && orderBy === "newest") {
		orderBy = "relevance";
	}
	const BASE_URL = import.meta.env.VITE_THEGUARDIAN_URL;
	const API_KEY = import.meta.env.VITE_THEGUARDIAN_API_KEY;
	const url = constructURLWithParams(BASE_URL, API_KEY, query, page, orderBy, orderDate);
	const res = await fetch(url);
	if (!res.ok) {
		throw new Error("Error Loading data");
	}
	const data = await res.json();
	return {
		articles: theGuardianDTO(data.response.results),
		pagination: {
			currentPage: Number(data.response.currentPage),
			pageSize: Number(data.response.pageSize),
			totalPages: Number(data.response.pages),
			totalResults: Number(data.response.total),
		},
		orderBy: data.response.orderBy,
	};
};

export default apiTheGuardian;
