import { Source } from "../../types/Source";
import apiNewsAPI from "./apiNewsAPI.ts";
import apiNewYorkTimes from "./apiNewYorkTimes.ts";
import apiTheGuardian from "./apiTheGuardian.ts";

const handleGetNews = (source: Source, data: any) => {
	if (source === "New York Times") {
		return apiNewYorkTimes({ ...data, query: data.category.join("+") });
	}
	if (source === "The Guardian") {
		return apiTheGuardian({ ...data, section: data.category });
	}

	return apiNewsAPI(data);
};

export default handleGetNews;
