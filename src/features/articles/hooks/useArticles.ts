import { useQuery } from "@tanstack/react-query";
import usePersonalizeFeed from "../../personalization/hooks/usePersonalizeFeed.ts";
import handleGetNews from "../../../services/articles/handleGetNews.ts";
import { Source } from "../../../types/Source";
import { ArticlesRes } from "../../../services/articles/apiNewYorkTimes.ts";
import { ArticlesResType } from "../../../types/ArticlesRes";

const useArticles = () => {
	const { personalizedFeed } = usePersonalizeFeed();
	const preferredSource: Source = personalizedFeed?.source ?? "News API";

	const { isLoading, data, isError } = useQuery<ArticlesResType | ArticlesRes>({
		queryKey: ["articles", preferredSource],
		queryFn: () => handleGetNews(preferredSource, { q: "asd" }),
	});

	return { isLoading, data, isError };
};
export default useArticles;
