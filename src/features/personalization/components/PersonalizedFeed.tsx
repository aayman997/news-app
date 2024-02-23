import Modal from "../../../components/Modal.tsx";
import FeedForm from "./FeedForm.tsx";

export default function PersonalizedFeed() {
	return (
		<Modal>
			<Modal.Open opens="create">
				<button
					className="duration-300hover:shadow-2xl rounded bg-brand-400 px-3 py-1 font-medium uppercase text-brand-50 shadow-lg transition-all
					md:font-bold lg:px-5 lg:py-3"
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
