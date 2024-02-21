import { useQuery } from "@tanstack/react-query";
import apiNewYorkTimes from "../../../services/articles/apiNewYorkTimes.ts";

const useMostViewedArticles = () => {
	const { isLoading, data, isError } = useQuery({
		queryKey: ["mostViewed"],
		queryFn: () => apiNewYorkTimes(true),
	});

	return { isLoading, data, isError };
};
export default useMostViewedArticles;
