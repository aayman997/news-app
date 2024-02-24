import { Source } from "../../types/Source";
import apiNewsAPI from "./apiNewsAPI";
import apiNewYorkTimes, { ArticlesRes } from "./apiNewYorkTimes";
import apiTheGuardian from "./apiTheGuardian";

export interface ParamsDataType {
	category: string[] | string;
	query?: string;
	source?: Source;
	section?: string;
	startDate?: string;
	endDate?: string;
	orderBy?: string;
	page?: string;
}

interface SourcePayload {
	[key: string]: (paramData: ParamsDataType) => Promise<ArticlesRes>;
}

const sourcePayloads: SourcePayload = {
	"New York Times": (paramData: ParamsDataType) => {
		const { section, query, orderBy, startDate, endDate, category, page } = paramData;
		return apiNewYorkTimes({
			...(startDate && { begin_date: startDate }),
			...(endDate && { end_date: endDate }),
			...(query && { q: query }),
			...(category && {
				category: `(${(category as string[]).join(" OR ")})`,
				fq: category,
			}),
			...(section && {
				category: `(${section.split("|").join(" OR ")})`,
				fq: section,
			}),
			...((section || category) && { facet_fields: "section_name" }),
			...(page && { page: (+page - 1).toString() }),
			sort: orderBy ?? "newest",
		});
	},
	"The Guardian": (paramData: ParamsDataType) => {
		const { section, query, orderBy, startDate, endDate, category, page } = paramData;
		return apiTheGuardian({
			...(query && { q: query }),
			...(startDate && { "from-date": startDate }),
			...(endDate && { "to-date": endDate }),
			...(orderBy && { "order-by": orderBy }),
			...(section && { section: section }),
			...(category && { section: (category as string[]).join("|") }),
			page: page ?? "1",
		});
	},
	Default: (paramData: ParamsDataType) => {
		const { section: _section, query: _query, source: _source, orderBy, ...others } = paramData;
		return apiNewsAPI({
			...others,
			...(paramData.query && { q: paramData.query }),
			...(paramData.startDate && { from: paramData.startDate }),
			...(paramData.endDate && { to: paramData.endDate }),
			sortBy: orderBy == "newest" ? "publishedAt" : "relevancy",
			category: paramData.section ?? (paramData.category as string),
		});
	},
};

const handleGetNews = (source: Source, paramData: ParamsDataType) => {
	const payloadBuilder = sourcePayloads[source] || sourcePayloads["Default"];
	return payloadBuilder(paramData);
};

export default handleGetNews;
