import { Category } from "../../types/Categories";
import { Source } from "../../types/Source";

interface CreatePersonalizeFeed {
	username: string;
	source: Source;
	categories: Category[];
}

const createPersonalizeFeed = async (data: CreatePersonalizeFeed) => {
	return new Promise((resolve) => {
		localStorage.setItem("userPreferences", JSON.stringify(data));
		resolve(data);
	});
};
export default createPersonalizeFeed;
