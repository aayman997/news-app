import { useParams, useNavigate } from "react-router-dom";
import useExplore from "../features/explore/hooks/useExplore";
import ArticlesList from "../features/articles/components/ArticlesList";

export default function Explore() {
	const { category } = useParams();
	const { data, isLoading, isError } = useExplore();
	const navigate = useNavigate();

	if (!category) {
		navigate("/not-found");
		return;
	}

	return (
		<div className="container my-10 flex flex-col items-center gap-y-8">
			<h1 className="text-center text-xl font-bold text-brand-500 md:text-4xl">
				Explore articles in <span className="capitalize text-brandPink">{category}</span>
			</h1>
			<ArticlesList articles={data?.articles} pagination={data?.pagination} isLoading={isLoading} isError={isError} />
		</div>
	);
}
