const cloneSearchParams = (prevParams: URLSearchParams): URLSearchParams => {
	return new URLSearchParams({
		...Object.fromEntries(prevParams.entries()),
	});
};
const updateSearchParamsField = (field: string, value: string | null, prevParams: URLSearchParams) => {
	const newParams = cloneSearchParams(prevParams);
	if (value !== null) {
		newParams.set(field, value);
	} else {
		newParams.delete(field);
	}
	return newParams;
};

export default updateSearchParamsField;
