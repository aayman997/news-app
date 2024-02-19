import UserPreferences from "../../types/UserPreferences";

const getPersonalizeFeed = (): Promise<UserPreferences> => {
	return new Promise((resolve, reject) => {
		const userPreferences = localStorage.getItem("userPreferences");
		if (userPreferences) {
			resolve(JSON.parse(userPreferences));
		} else {
			reject(new Error("can't get user preferences"));
		}
	});
};
export default getPersonalizeFeed;
