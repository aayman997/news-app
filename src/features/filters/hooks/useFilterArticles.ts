import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import handleGetNews, { ParamsDataType } from "../../../services/articles/handleGetNews.ts";

const useFilterArticles = () => {
	const queryClient = useQueryClient();
	const [searchParams] = useSearchParams();
	const page = Number(searchParams.get("page") ?? "1");
	const params = Object.fromEntries(searchParams) as unknown as ParamsDataType;

	const { data, isLoading, isError } = useQuery({
		queryFn: () => handleGetNews(params.source!, { ...params, page: page.toString() }),
		queryKey: ["articles", params],
	});

	if (data?.pagination) {
		if (page < data.pagination.totalPages) {
			const nextPage = (page + 1).toString();
			queryClient.prefetchQuery({
				queryFn: () => handleGetNews(params.source!, { ...params, page: nextPage }),
				queryKey: ["articles", { ...params, page: nextPage }],
				retry: false,
			});
		}
		if (page > 1) {
			const prevPage = (page + 1).toString();
			queryClient.prefetchQuery({
				queryFn: () => handleGetNews(params.source!, { ...params, page: prevPage }),
				queryKey: ["articles", { ...params, page: prevPage }],
				retry: false,
			});
		}
	}

	return { data, isLoading, isError };
};

export default useFilterArticles;
