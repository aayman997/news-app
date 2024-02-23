import dateFormatter from "../../../utils/dateFormatter";

interface ArticleProps {
	article: ProcessedArticle;
}

const Article = ({ article }: ArticleProps) => {
	const { title, abstract, date, image, source } = article;
	let { author: authorName } = article;

	if (authorName.length > 20) {
		authorName = `${authorName.slice(0, 20)}...`;
	}

	return (
		<div
			className="col-span-12 flex flex-col overflow-hidden rounded border p-4 shadow-md transition-all duration-300 hover:-translate-y-1
			hover:shadow-2xl @[500px]:col-span-6 @[768px]:col-span-4 @[960px]:col-span-3"
		>
			<img className="h-48 w-full object-cover" src={image} alt={title} />
			<div className="py-2">
				<div className="mb-1 line-clamp-2 h-12 text-lg font-bold leading-6">{title}</div>
				<p className="line-clamp-4 text-sm text-gray-600">{abstract}</p>
			</div>
			<div className="mt-auto pb-1 pt-2 text-xs font-medium text-gray-500">
				<span>{authorName} - </span>
				<span>{dateFormatter(date)} - </span>
				<span>{source}</span>
			</div>
		</div>
	);
};
export default Article;
