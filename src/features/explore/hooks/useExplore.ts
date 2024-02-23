import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import apiNewsAPI from "../../../services/articles/apiNewsAPI";

const useExplore = () => {
	const { category: categoryParam } = useParams();
	const category = categoryParam!;
	const queryClient = useQueryClient();
	const [searchParams] = useSearchParams();
	const page = searchParams.get("page") ?? "1";

	const { data, isLoading, isError } = useQuery({
		queryKey: ["explore", category, page],
		queryFn: () => apiNewsAPI({ category, page: page.toString() }),
	});

	if (data) {
		if (+page < data.pagination.totalPages) {
			const nextPage = (+page + 1).toString();
			queryClient.prefetchQuery({
				queryKey: ["explore", nextPage, category],
				queryFn: () => apiNewsAPI({ category, page: nextPage }),
			});
		}
		if (+page > 1) {
			const prevPage = (+page - 1).toString();
			queryClient.prefetchQuery({
				queryKey: ["explore", category, prevPage],
				queryFn: () => apiNewsAPI({ category, page: prevPage }),
			});
		}
	}

	return { data, isLoading, isError };
};

export default useExplore;
