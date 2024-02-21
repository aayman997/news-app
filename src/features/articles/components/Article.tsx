import dateFormatter from "../../../utils/dateFormatter.ts";
import { ArticlesResType } from "../../../types/ArticlesRes";

interface ArticleProps {
	article: ArticlesResType["articles"][0];
}

const Article = ({ article }: ArticleProps) => {
	const { title, abstract, author, date, image, source } = article;
	let authorName = "unknown";

	if (author) {
		if (author.length > 20) {
			authorName = `${author.slice(0, 20)}...`;
		} else {
			authorName = author;
		}
	}

	return (
		<article
			className="@xl:flex-row @xl:gap-y-0 @xl:gap-x-4 @xl:h-50 @xl:col-span-6 col-span-12 flex basis-full flex-col gap-y-4 rounded-md border
			border-brand-500 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
		>
			<div className="@xl:h-40 @xl:aspect-video">
				<img src={image} alt="" className="@xl:rounded-none @xl:rounded-l-md @xl:object-cover h-full w-full rounded-t-md" />
			</div>
			<div className="@xl:px-0 @xl:pr-4 @xl:py-4 @xl:justify-between flex w-full flex-col gap-y-2 px-2 pb-2">
				<h2 className="@xl:min-h-0 line-clamp-2 min-h-[48px] font-medium text-brand-700">{title}</h2>
				<p className="@xl:h-auto line-clamp-3 h-16 text-sm text-zinc-600">{abstract}</p>
				<div className="@xl:flex-row @xl:gap-x-4 @xl:justify-between @xl:items-center flex flex-col gap-y-1 text-zinc-500">
					<p className="text-xs">{authorName}</p>
					{date && <p className="text-xs">{dateFormatter(date)}</p>}
					{source && typeof source === "string" && <p className="text-xs">{source}</p>}
				</div>
			</div>
		</article>
	);
};
export default Article;
