import { Source } from "../../types/Source";
import apiNewsAPI from "./apiNewsAPI";
import apiNewYorkTimes from "./apiNewYorkTimes";
import apiTheGuardian from "./apiTheGuardian";

interface ParamsDataType {
	category: string[];
}

const handleGetNews = (source: Source, paramData: ParamsDataType) => {
	if (source === "New York Times") {
		return apiNewYorkTimes({ mostViewed: false, query: paramData.category.join("+") });
	}
	if (source === "The Guardian") {
		return apiTheGuardian({ ...paramData, section: paramData.category.join("|") });
	}

	return apiNewsAPI({ ...paramData, category: paramData.category.join("") });
};

export default handleGetNews;
