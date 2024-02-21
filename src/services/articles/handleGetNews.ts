import { Source } from "../../types/Source";
import apiNewsAPI from "./apiNewsAPI.ts";
import apiNewYorkTimes, { ArticlesRes } from "./apiNewYorkTimes.ts";
import apiTheGuardian from "./apiTheGuardian.ts";
import { ArticlesResType } from "../../types/ArticlesRes";

type ApiFunction = (data: any) => Promise<ArticlesResType | ArticlesRes>;

const apiSources: Record<Source, ApiFunction> = {
	"News API": apiNewsAPI,
	"New York Times": apiNewYorkTimes,
	"The Guardian": apiTheGuardian,
};

const handleGetNews = (source: Source, data: any) => {
	if (source === "New York Times") {
		return apiNewYorkTimes({ ...data, query: data.category.join("+") });
	}
	const apiFunction = apiSources[source] || apiNewsAPI;
	return apiFunction(data);
};

export default handleGetNews;
