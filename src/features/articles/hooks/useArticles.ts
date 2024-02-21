import { useQuery, useQueryClient } from "@tanstack/react-query";
import handleGetNews from "../../../services/articles/handleGetNews.ts";
import { ArticlesRes } from "../../../services/articles/apiNewYorkTimes.ts";
import { ArticlesResType } from "../../../types/ArticlesRes";
import UserPreferences from "../../../types/UserPreferences";

const useArticles = () => {
	const queryClient = useQueryClient();
	const personalizedFeed = queryClient.getQueryData(["authUser"]) as UserPreferences;

	const { isLoading, data, isError } = useQuery<ArticlesResType | ArticlesRes>({
		queryKey: ["articles", personalizedFeed],
		queryFn: () =>
			handleGetNews(personalizedFeed.source, {
				categories: personalizedFeed.categories,
			}),
		enabled: !!personalizedFeed,
	});

	return { isLoading, data, isError };
};
export default useArticles;
