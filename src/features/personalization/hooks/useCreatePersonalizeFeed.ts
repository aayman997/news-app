import { useQueryClient, useMutation } from "@tanstack/react-query";
import createPersonalizeFeed from "../../../services/personalizeFeed/createPersonalizeFeed.ts";
import { Source } from "../../../types/Source";
import { Category } from "../../../types/Categories";
import toast from "react-hot-toast";

const useCreatePersonalizeFeed = () => {
	const queryClient = useQueryClient();
	const { mutate: personalizeFeed } = useMutation({
		mutationFn: ({ username, source, categories }: { username: string; source: Source; categories: Category[] }) =>
			createPersonalizeFeed({
				username,
				source,
				categories,
			}),
		onSuccess: (data) => {
			queryClient.setQueryData(["personalizedFeed"], data);
			toast.success("Preferences updated successfully");
		},

		onError: (error: Error) => {
			toast.error(error.message);
		},
	});

	return { personalizeFeed };
};

export default useCreatePersonalizeFeed;