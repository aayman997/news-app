import PersonalizedFeed from "../features/personalization/components/PersonalizedFeed.tsx";

export default function Home() {
	return (
		<section className="container my-10">
			<h1>Welcome to news app</h1>
			<PersonalizedFeed />
		</section>
	);
}
