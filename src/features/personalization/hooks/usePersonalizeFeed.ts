import { useQuery } from "@tanstack/react-query";
import getPersonalizeFeed from "../../../services/personalizeFeed/getPersonalizeFeed";
import UserPreferences from "../../../types/UserPreferences";

const usePersonalizeFeed = () => {
	const {
		isLoading,
		data: personalizedFeed,
		error,
	} = useQuery<UserPreferences>({
		queryKey: ["personalizedFeed"],
		queryFn: () => getPersonalizeFeed(),
		retry: false,
	});

	return { isLoading, personalizedFeed, error };
};

export default usePersonalizeFeed;
