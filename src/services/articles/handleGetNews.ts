import { Source } from "../../types/Source";
import apiNewsAPI from "./apiNewsAPI";
import apiNewYorkTimes, { ArticlesRes } from "./apiNewYorkTimes";
import apiTheGuardian from "./apiTheGuardian";

interface ParamsDataType {
	category: string[] | string;
}

interface SourcePayload {
	[key: string]: (paramData: ParamsDataType) => Promise<ArticlesRes>;
}

const sourcePayloads: SourcePayload = {
	"New York Times": (paramData: ParamsDataType) =>
		apiNewYorkTimes({
			...paramData,
			category: `(${(paramData.category as string[]).join(" OR ")})`,
		}),
	"The Guardian": (paramData: ParamsDataType) =>
		apiTheGuardian({
			...paramData,
			section: (paramData.category as string[]).join("|"),
		}),
	Default: (paramData: ParamsDataType) =>
		apiNewsAPI({
			...paramData,
			category: paramData.category as string,
		}),
};

const handleGetNews = (source: Source, paramData: ParamsDataType) => {
	const payloadBuilder = sourcePayloads[source] || sourcePayloads["Default"];
	return payloadBuilder(paramData);
};

export default handleGetNews;
