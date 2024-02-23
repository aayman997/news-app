import { useQuery, useQueryClient } from "@tanstack/react-query";
import apiTheGuardian, { ParamsData } from "../../../services/articles/apiTheGuardian.ts";
import { useSearchParams } from "react-router-dom";

const useFilterArticles = () => {
	const queryClient = useQueryClient();
	const [searchParams] = useSearchParams();
	const page = Number(searchParams.get("page") ?? "1");
	const params = { ...Object.fromEntries([...searchParams]) };
	const newParams: ParamsData & { authors?: string[] } = { ...params };

	const { data, isLoading, isError } = useQuery({
		queryFn: () => apiTheGuardian({ ...newParams, page: page.toString() }),
		queryKey: ["articles", newParams],
	});

	if (data) {
		if (page < data.pagination.totalPages) {
			const nextPage = (page + 1).toString();
			queryClient.prefetchQuery({
				queryFn: () => apiTheGuardian({ ...newParams, page: nextPage }),
				queryKey: ["articles", { ...newParams, page: nextPage }],
			});
		}
		if (page > 1) {
			const prevPage = (page + 1).toString();
			queryClient.prefetchQuery({
				queryFn: () => apiTheGuardian({ ...newParams, page: prevPage }),
				queryKey: ["articles", { ...newParams, page: prevPage }],
			});
		}
	}

	return { data, isLoading, isError };
};

export default useFilterArticles;
