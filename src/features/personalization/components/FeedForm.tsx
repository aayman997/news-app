import useCreatePersonalizeFeed from "../hooks/useCreatePersonalizeFeed";
import { useForm, SubmitHandler } from "react-hook-form";
import { Source } from "../../../types/Source";
import { SOURCES } from "../../../constants";
import usePersonalizeFeed from "../hooks/usePersonalizeFeed";
import { useState } from "react";

interface FeedFormProps {
	onCloseModal?: () => void;
}

interface CreateUserPreferences {
	username: string;
	source: Source;
	categories: string[];
}

const FeedForm = ({ onCloseModal }: FeedFormProps) => {
	const { personalizeFeed } = useCreatePersonalizeFeed();
	const { personalizedFeed } = usePersonalizeFeed();
	const [source, setSource] = useState<Source>(() => personalizedFeed?.source ?? "News API");

	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue,
	} = useForm<CreateUserPreferences>();

	const handler: SubmitHandler<CreateUserPreferences> = ({ username, source, categories }) => {
		personalizeFeed(
			{ username, categories, source },
			{
				onSuccess: () => {
					onCloseModal?.();
				},
			},
		);
	};

	return (
		<div className="w-[400px] px-8">
			<h1 className="pb-10 text-lg font-medium text-brand-600">my feed preferences</h1>
			<form onSubmit={handleSubmit(handler)} className="flex flex-col gap-6" id="userPreferencesForm">
				<div className="flex flex-col items-start justify-between gap-2">
					<label htmlFor="name" className="capitalize text-zinc-500">
						your name <sup className="font-bold text-red-500">*</sup>
					</label>
					<input
						{...register("username", {
							required: {
								value: true,
								message: "please enter your name",
							},
						})}
						defaultValue={personalizedFeed?.username}
						type="text"
						className="h-[35px] w-full rounded border border-brand-300 px-2 focus:border-2 focus:border-brand-500 focus:outline-none
						disabled:cursor-not-allowed disabled:select-none disabled:border-none disabled:bg-gray-100"
					/>
					{errors?.username && <span className="text-xs text-red-500">{errors?.username.message}</span>}
				</div>
				<div className="flex items-center justify-between gap-3">
					<label className="text-center uppercase text-zinc-500" htmlFor="source">
						preferred source
					</label>
					<select
						id="sources"
						className="h-[35px] w-[160px] rounded border border-brand-300 px-2 leading-none focus:border-2 focus:border-brand-500
						focus:outline-none"
						{...register("source", {
							required: {
								value: true,
								message: "Please select a source",
							},
						})}
						defaultValue={personalizedFeed?.source}
						onChange={(e) => {
							setValue("categories", []);
							setSource(e.target.value as Source);
						}}
					>
						{Object.keys(SOURCES).map((source) => (
							<option value={source} key={source}>
								{source}
							</option>
						))}
					</select>
					{errors?.source && <span className="text-xs text-red-500">{errors?.source.message}</span>}
				</div>
				<div>
					<p className="mb-2 text-center uppercase text-zinc-500">favorite categories</p>
					{SOURCES[source].map((category) => (
						<div key={category} className="flex flex-row items-center justify-between gap-2">
							<label htmlFor={category}>{category}</label>
							<input
								{...register("categories", {
									required: {
										value: true,
										message: source === "News API" ? "Please select a category" : "Please select at least one category",
									},
								})}
								defaultChecked={
									source === "News API"
										? personalizedFeed?.categories === category
										: Boolean((personalizedFeed?.categories as string[])?.find?.((stgCategory: string) => stgCategory === category))
								}
								type={source === "News API" ? "radio" : "checkbox"}
								id={category}
								value={category}
								className="border-brand-300 bg-brand-100 text-brand-500 focus:ring-brand-200"
							/>
						</div>
					))}
					{errors?.categories && <span className="text-xs text-red-500">{errors?.categories.message}</span>}
				</div>
				<div className="text-right">
					<button className="rounded border border-brand-500 px-5 py-2 font-medium leading-none text-brand-500" type="submit">
						Save
					</button>
				</div>
			</form>
		</div>
	);
};
export default FeedForm;
