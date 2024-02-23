import PersonalizedFeed from "../features/personalization/components/PersonalizedFeed.tsx";
import ArticlesList from "../features/articles/components/ArticlesList.tsx";
import MostViewedArticles from "../features/articles/components/MostViewedArticles.tsx";
import useArticles from "../features/articles/hooks/useArticles.ts";
import usePersonalizeFeed from "../features/personalization/hooks/usePersonalizeFeed.ts";

export default function Home() {
	const { data: articlesFeed, isLoading, isError } = useArticles();
	const { personalizedFeed } = usePersonalizeFeed();

	return (
		<section className="container my-6 md:my-10">
			{!personalizedFeed ? (
				<>
					<h1 className="mb-10 text-center text-xl font-bold text-brand-500 md:text-3xl">Welcome to news app</h1>
					<div className="flex flex-col justify-between gap-y-8 md:flex-row md:gap-x-8 md:gap-y-0">
						<div className="flex w-full flex-col items-center justify-between gap-y-4 md:flex-row md:items-start md:gap-y-0">
							<p>
								Please use <code className="rounded-md bg-zinc-200 px-2 py-1 font-bold">feed customization</code> to set your name, preferred
								source, and categories
							</p>
							<PersonalizedFeed />
						</div>
						<aside className="md:basis-1/5">
							<MostViewedArticles />
						</aside>
					</div>
				</>
			) : (
				<>
					<h1 className="mb-10 text-center text-xl font-bold text-brand-500 md:text-3xl">
						{`Hello ${personalizedFeed.username} 👋  Welcome to news app`}
					</h1>
					<div className="flex flex-col justify-between gap-x-8 md:flex-row">
						<div className="w-full">
							<div className="flex basis-full items-center justify-between gap-x-4 md:basis-4/5">
								<h3 className="shrink-0 text-center text-xl font-bold text-brand-500">My Feed</h3>
								<PersonalizedFeed />
							</div>
							<div className="mt-8">
								<ArticlesList articles={articlesFeed?.articles} isLoading={isLoading} isError={isError} />
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
