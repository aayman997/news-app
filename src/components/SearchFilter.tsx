import { useState, ChangeEvent, useEffect, useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineClock } from "react-icons/hi2";
import { AUTHORS } from "../constants";
import { useSearchParams } from "react-router-dom";

const datesError = ({ startDate, endDate }: { startDate: string | null; endDate: string | null }): string | null => {
	const now = new Date();
	const start = new Date(startDate ?? "");
	const end = new Date(endDate ?? "");
	if (start > now || end > now) {
		return "The dates must not be in the future.";
	}
	if (start > end) {
		return "The start date must be before the end date.";
	}
	return null;
};

const SearchFilter = () => {
	const [dateError, setDateError] = useState<string | null>();
	const [searchParams, setSearchParams] = useSearchParams();
	const authors = searchParams?.get("authors")?.split("|") ?? [];
	const section = searchParams?.get("section")?.split("|") ?? [];
	const [startDate, setStartDate] = useState(() => searchParams.get("startDate"));
	const [endDate, setEndDate] = useState(() => searchParams.get("endDate"));

	const handleDateChange = useCallback(() => {
		setDateError(() => datesError({ startDate, endDate }));
	}, [endDate, startDate]);

	useEffect(() => {
		handleDateChange();
	}, [handleDateChange]);

	const handleFilterChange = (field: string, e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const checked = e.target.checked;

		setSearchParams((prevParams) => {
			const currentFieldValue = prevParams.get(field) ?? "";
			const newParams = new URLSearchParams({
				...Object.fromEntries(prevParams.entries()),
			});

			if (checked) {
				newParams.set(field, currentFieldValue ? `${currentFieldValue}|${value}` : value);
			} else {
				const newFieldValue = currentFieldValue
					.split("|")
					.filter((fieldItem) => fieldItem !== value && fieldItem !== "")
					.join("|");

				if (newFieldValue !== "") {
					newParams.set(field, newFieldValue);
				} else {
					newParams.delete(field);
				}
			}

			return newParams;
		});
	};

	const handleDateFilter = () => {
		setSearchParams((prevParams) => {
			const newParams = new URLSearchParams({
				...Object.fromEntries(prevParams.entries()),
			});
			if (startDate) {
				newParams.set("startDate", startDate);
			}
			if (endDate) {
				newParams.set("endDate", endDate);
			}
			return newParams;
		});
	};

	return (
		<div className="rounded-md border border-charcoal/30 bg-gray-100 px-4 py-6 shadow-lg">
			<div className="flex items-center justify-between">
				<h3 className="mx-auto mb-5 text-lg font-bold tracking-widest text-brand-500">Search Filter</h3>
				<button
					className="aspect-square rounded bg-red-200 px-2 py-1 text-xl font-bold text-red-900 transition-all duration-300 hover:bg-red-500
					hover:text-white lg:hidden"
					// onClick={() => setShowFilter(false)}
				>
					<AiOutlineClose />
				</button>
			</div>
			<div className="flex flex-col gap-8">
				<div>
					<p
						className="relative mb-2 flex items-center justify-between uppercase text-zinc-500 after:absolute after:left-0 after:top-[50%]
						after:z-[0] after:h-[1px] after:w-full after:bg-brand-500 after:content-['']"
					>
						<span className="relative z-[1] bg-gray-100 pr-2 font-medium tracking-widest text-charcoal">authors</span>
					</p>
					<div className="flex flex-col gap-4">
						{AUTHORS.map((author) => (
							<div key={author} className="flex flex-row items-center justify-between gap-2">
								<label htmlFor={author}>{author}</label>
								<input
									defaultChecked={Boolean(authors.find((stgAuthor: string) => stgAuthor === author))}
									type="checkbox"
									id={author}
									name="authors"
									value={author}
									className="border-brand-300 bg-brand-100 text-brand-500 focus:ring-brand-200 disabled:bg-brand-50
									hover:disabled:bg-brand-50"
									onChange={(e) => handleFilterChange("authors", e)}
								/>
							</div>
						))}
					</div>
				</div>
				<div>
					<p
						className="relative mb-2 flex items-center justify-between uppercase text-zinc-500 after:absolute after:left-0 after:top-[50%]
						after:z-[0] after:h-[1px] after:w-full after:bg-brand-500 after:content-['']"
					>
						<span className="relative z-[1] bg-gray-100 pr-2 font-medium tracking-widest text-charcoal">Categories</span>
					</p>
					<div className="flex flex-col gap-4">
						{["sport", "money", "science", "technology", "games", "food", "weather"].map((category) => (
							<div key={category} className="flex flex-row items-center justify-between gap-2">
								<label htmlFor={category}>{category}</label>
								<input
									defaultChecked={Boolean(section.find((stgCategory: string) => stgCategory === category))}
									type="checkbox"
									id={category}
									name="category"
									value={category}
									className="border-brand-300 bg-brand-100 text-brand-500 focus:ring-brand-200 disabled:bg-brand-50
									hover:disabled:bg-brand-50"
									onChange={(e) => handleFilterChange("section", e)}
								/>
							</div>
						))}
					</div>
				</div>
				<div>
					<p
						className="relative mb-2 uppercase text-zinc-500 after:absolute after:left-0 after:top-[50%] after:z-[0] after:h-[1px] after:w-full
						after:bg-brand-500 after:content-['']"
					>
						<span className="relative z-[1] bg-gray-100 pr-2 font-medium tracking-widest text-charcoal">date</span>
					</p>
					<div>
						<div className="flex gap-4">
							<div className="basis-1/2">
								<label className="mb-2 inline-block text-sm font-medium" htmlFor="startDate">
									start date
								</label>
								<div className="relative h-[35px] w-[150px]">
									<input
										type="date"
										name="start-date"
										id="startDate"
										className="block h-[35px] rounded border-none bg-brand-50 px-1.5 shadow-md"
										onChange={(e) => setStartDate(e.target.value)}
									/>
									<span className="absolute right-2 top-1/2 -translate-y-1/2 select-none lg:hidden">
										<HiOutlineClock />
									</span>
								</div>
							</div>
							<div className="basis-1/2">
								<label className="mb-2 inline-block text-sm font-medium" htmlFor="endDate">
									end date
								</label>
								<div className="relative h-[35px] w-[150px]">
									<input
										type="date"
										name="end-date"
										id="endDate"
										className="absolute inset-0 block h-[35px] rounded border-none bg-brand-50 px-1.5 shadow-md"
										onChange={(e) => setEndDate(e.target.value)}
										// defaultValue={endDate ? new Date(endDate).toISOString().split("T")[0] : undefined}
									/>
									<span className="absolute right-2 top-1/2 -translate-y-1/2 select-none lg:hidden">
										<HiOutlineClock />
									</span>
								</div>
							</div>
						</div>
						{dateError && <p className="mt-2 text-xs text-red-500">{dateError}</p>}
					</div>
					{(startDate || endDate) && !dateError && (
						<div className="mt-3 text-right">
							<button
								className="rounded bg-brand-500 px-5 py-2 text-sm font-medium capitalize text-white transition-all duration-300
								hover:bg-brand-700"
								onClick={handleDateFilter}
							>
								apply
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
export default SearchFilter;
