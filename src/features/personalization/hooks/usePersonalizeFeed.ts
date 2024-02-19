import { useQuery } from "@tanstack/react-query";
import getPersonalizeFeed from "../../../services/personalizeFeed/getPersonalizeFeed.ts";
import UserPreferences from "../../../types/UserPreferences";

const useCreatePersonalizeFeed = () => {
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

export default useCreatePersonalizeFeed;
