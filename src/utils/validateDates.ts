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

export default datesError;
