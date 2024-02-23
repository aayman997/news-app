import Modal from "../../../components/Modal";
import FeedForm from "./FeedForm";

export default function PersonalizedFeed() {
	return (
		<Modal>
			<Modal.Open opens="create">
				<button
					className="shrink-0 rounded bg-brand-400 px-3 py-1 font-medium uppercase text-brand-50 shadow-lg transition-all
					duration-300 hover:shadow-2xl md:font-bold lg:px-5 lg:py-3"
				>
					feed customization
				</button>
			</Modal.Open>
			<Modal.Window name="create">
				<FeedForm />
			</Modal.Window>
		</Modal>
	);
}
