import { useState, ChangeEvent, useEffect, useCallback, Dispatch } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { SOURCES } from "../../../constants";
import { useSearchParams } from "react-router-dom";
import useOutsideClick from "../../../hooks/useOutsideClick";
import updateSearchParamsField from "../../../utils/updateSearchParamsField";
import { Source } from "../../../types/Source";
import datesError from "../../../utils/validateDates.ts";

const START_DATE = "startDate";
const END_DATE = "endDate";

const updateDatesInSearchParams = (startDateField: string | null, endDateField: string | null, previousParams: URLSearchParams) => {
	if (startDateField && !endDateField) {
		return updateSearchParamsField(START_DATE, startDateField, previousParams);
	}

	if (endDateField && !startDateField) {
		return updateSearchParamsField(END_DATE, endDateField, previousParams);
	}

	const paramsWithEndDate = updateSearchParamsField(END_DATE, endDateField, previousParams);
	return updateSearchParamsField(START_DATE, startDateField, paramsWithEndDate);
};

const SearchFilter = ({ setShowFilter }: { setShowFilter: Dispatch<boolean> }) => {
	const [dateError, setDateError] = useState<string | null>();
	const [searchParams, setSearchParams] = useSearchParams();
	const source = (searchParams.get("source") ?? "News API") as Source;
	const section = searchParams.get("section")?.split("|") ?? [];
	const [startDate, setStartDate] = useState(() => searchParams.get("startDate") ?? null);
	const [endDate, setEndDate] = useState(() => searchParams.get("endDate") ?? null);
	const filterRes = useOutsideClick<HTMLDivElement>(() => setShowFilter(false));

	const handleDateChange = useCallback(() => {
		setDateError(() => datesError({ startDate, endDate }));
	}, [endDate, startDate]);

	useEffect(() => {
		handleDateChange();
	}, [handleDateChange]);

	useEffect(() => {
		if (!searchParams.get("source")) {
			setSearchParams((prevParams) => updateSearchParamsField("source", Object.keys(SOURCES)[0], prevParams));
		}
	}, [searchParams, setSearchParams]);

	function updateParamsOnChecked(prevParams: URLSearchParams, field: string, type: string, value: string) {
		const prevValue = prevParams.get(field);
		const newParamsValue = prevValue ? `${prevValue}|${value}` : value;
		return updateSearchParamsField(field, type === "radio" ? value : newParamsValue, prevParams);
	}

	function updateParamsOnUnchecked(prevParams: URLSearchParams, field: string, value: string) {
		const currentFieldValue = prevParams.get(field) ?? "";
		const newFieldValue = currentFieldValue
			.split("|")
			.filter((fieldItem) => fieldItem !== value)
			.join("|");
		return updateSearchParamsField(field, newFieldValue || null, prevParams);
	}

	const handleFilterChange = (field: string, { target: { type, value, checked } }: ChangeEvent<HTMLInputElement>) => {
		setSearchParams((prevParams) => {
			if (field === "source") {
				const queryValue = prevParams.get("query");
				prevParams = new URLSearchParams();
				if (queryValue) {
					prevParams.set("query", queryValue);
				}
			}
			return checked ? updateParamsOnChecked(prevParams, field, type, value) : updateParamsOnUnchecked(prevParams, field, value);
		});
	};

	const handleDateFilter = () => {
		setSearchParams((previousParams) => updateDatesInSearchParams(startDate, endDate, previousParams));
	};

	return (
		<div ref={filterRes} className="bg-gray-100 lg:rounded-md lg:border lg:border-charcoal/30 lg:px-4 lg:py-6 lg:shadow-lg">
			<div className="flex items-center justify-between">
				<h3 className="mx-auto mb-5 text-lg font-bold tracking-widest text-brand-500">Search Filter</h3>
				<button
					className="aspect-square rounded bg-red-200 px-2 py-1 text-xl font-bold text-red-900 transition-all duration-300 hover:bg-red-500
					hover:text-white lg:hidden"
					onClick={() => setShowFilter(false)}
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
						<span className="relative z-[1] bg-gray-100 pr-2 font-medium tracking-widest text-charcoal">sources</span>
					</p>
					<div className="flex flex-col gap-4">
						{Object.keys(SOURCES).map((sourceEl) => (
							<div key={sourceEl} className="flex flex-row items-center justify-between gap-2">
								<label htmlFor={sourceEl}>{sourceEl}</label>
								<input
									defaultChecked={sourceEl === source}
									type="radio"
									id={sourceEl}
									name="source"
									value={sourceEl}
									className="border-brand-300 bg-brand-100 text-brand-500 focus:ring-brand-200 disabled:bg-brand-50
									hover:disabled:bg-brand-50"
									onChange={(e) => handleFilterChange("source", e)}
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
						{SOURCES[source].map((category) => (
							<div key={category} className="flex flex-row items-center justify-between gap-2">
								<label htmlFor={category}>{category}</label>
								<input
									checked={Boolean(section.find((stgCategory: string) => stgCategory === category))}
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
										onChange={(e) => {
											if (!e.target.value) {
												searchParams.delete("startDate");
												setSearchParams(searchParams);
											}
											setStartDate(e.target.value);
										}}
										defaultValue={startDate ?? undefined}
									/>
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
										onChange={(e) => {
											if (!e.target.value) {
												searchParams.delete("endDate");
												setSearchParams(searchParams);
											}
											setEndDate(e.target.value);
										}}
										defaultValue={endDate ?? undefined}
									/>
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
