import { Source } from "./Source";
import { Category } from "./Categories";

export default interface UserPreferences {
	username: string;
	source: Source;
	categories: Category[] | string;
}
