import theGuardianDTO from "../../dto/theGuardianDTO.ts";
import { ArticlesResType } from "../../types/ArticlesRes";

interface ArticlesRes extends ArticlesResType {
	orderBy?: string;
}
export type ParamsData = {
	query?: string;
	page?: string;
	orderBy?: string;
	orderDate?: string;
	section?: string;
	startDate?: string;
	endDate?: string;
};
type ParamsDataForUrl = ParamsData & { section?: string };
const constructURLWithParams = (paramsData: ParamsDataForUrl) => {
	const BASE_URL = import.meta.env.VITE_THEGUARDIAN_URL;
	const API_KEY = import.meta.env.VITE_THEGUARDIAN_API_KEY;
	const RESULTS_PER_PAGE = "15";

	const params = {
		"api-key": API_KEY,
		"show-fields": "body,byline,thumbnail",
		"page-size": RESULTS_PER_PAGE,
		lang: "en",
		...paramsData,
	};
	const searchParams = new URLSearchParams(params);
	return BASE_URL + "search?" + searchParams;
};

const apiTheGuardian = async (paramsData: ParamsData): Promise<ArticlesRes> => {
	const url = constructURLWithParams(paramsData);
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
