import newYorkTimesDTO from "../../dto/newYorkTimesDTO.ts";
import newYorkTimesMostViewedDTO from "../../dto/newYorkTimesMostViewedDTO.ts";
import { ArticlesResType } from "../../types/ArticlesRes";

export interface ArticlesRes extends Partial<ArticlesResType> {
	orderBy?: string;
}

const createUrl = (mostViewed: boolean, query?: string, page?: string, sort?: string, beginDate?: string, endDate?: string): URL => {
	const BASE_URL = import.meta.env.VITE_NYTIMES_URL;
	const params = {
		"api-key": import.meta.env.VITE_NYTIMES_API_KEY,
		...(beginDate && { begin_date: beginDate }),
		...(endDate && { end_date: endDate }),
		...(query && { q: query }),
		...(page && { page: (+page - 1).toString() }),
		...(sort && { sort }),
	};
	const searchParams = new URLSearchParams(params);
	let endpoint;
	if (mostViewed) {
		endpoint = BASE_URL + "svc/mostpopular/v2/viewed/7.json?" + searchParams.toString();
	} else {
		endpoint = BASE_URL + "svc/search/v2/articlesearch.json?" + searchParams.toString();
	}
	return new URL(endpoint);
};

interface ParamsData {
	mostViewed: boolean;
	query?: string;
	page?: string;
	sort?: string;
	beginDate?: string;
	endDate?: string;
	category?: string;
}

const apiNewYorkTimes = async ({ mostViewed, query, page, sort, beginDate, endDate }: ParamsData): Promise<ArticlesRes> => {
	const url = createUrl(mostViewed, query, page, sort, beginDate, endDate);
	const res = await fetch(url.toString());
	const data = await res.json();
	if (!res.ok) {
		throw new Error(JSON.stringify(data));
	}
	if (mostViewed) {
		return { articles: newYorkTimesMostViewedDTO(data.results.slice(0, 5)) };
	}
	return {
		articles: newYorkTimesDTO(data.response.docs),
		pagination: {
			currentPage: Number(data.response.meta.offset),
			totalResults: Number(data.response.meta.hits),
			pageSize: 10,
			totalPages: Math.ceil(data.response.meta.hits / 10),
		},
	};
};

export default apiNewYorkTimes;
