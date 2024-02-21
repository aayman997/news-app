import PersonalizedFeed from "../features/personalization/components/PersonalizedFeed.tsx";
import ArticlesList from "../features/articles/components/ArticlesList.tsx";
import MostViewedArticles from "../features/articles/components/MostViewedArticles.tsx";
import useArticles from "../features/articles/hooks/useArticles.ts";
import usePersonalizeFeed from "../features/personalization/hooks/usePersonalizeFeed.ts";

export default function Home() {
	const { data: articlesFeed, isLoading, isError } = useArticles();
	const { personalizedFeed } = usePersonalizeFeed();
	console.log("articlesFeed", articlesFeed);
	return (
		<section className="container my-10">
			{!personalizedFeed ? (
				<>
					<h1 className="mb-10 text-center text-3xl font-bold text-brand-500">Welcome to news app</h1>
					<div className="flex justify-between gap-x-8">
						<div className="flex w-full items-start justify-between">
							<p>
								Please use <code className="rounded-md bg-zinc-200 px-2 py-1 font-bold">feed customization</code> to set your name, preferred
								source, and categories
							</p>
							<PersonalizedFeed />
						</div>
						<aside className="basis-1/5">
							<MostViewedArticles />
						</aside>
					</div>
				</>
			) : (
				<>
					<h1 className="mb-10 text-center text-3xl font-bold text-brand-500">{`Hello ${personalizedFeed.username} 👋  Welcome to news app`}</h1>
					<div className="flex justify-between gap-x-8">
						<div className="w-full">
							<div className="flex basis-4/5 items-center justify-between gap-x-4">
								<h3 className="text-center text-xl font-bold text-brand-500">My Feed</h3>
								<PersonalizedFeed />
							</div>
							<div className="mt-8 flex flex-col gap-y-8">
								<ArticlesList articles={articlesFeed?.articles} pagination={articlesFeed?.pagination} isLoading={isLoading} isError={isError} />
							</div>
						</div>
						<aside className="basis-1/5">
							<MostViewedArticles />
						</aside>
					</div>
				</>
			)}
		</section>
	);
}
