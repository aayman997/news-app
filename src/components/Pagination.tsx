import PaginationType from "../types/Pagination.ts";
import ReactJSPagination from "react-js-pagination";
import { useSearchParams } from "react-router-dom";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

interface PaginationProps {
	pagination: PaginationType;
}

const Pagination = ({ pagination }: PaginationProps) => {
	const { currentPage, pageSize, totalResults } = pagination;
	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get("page") ?? "1";
	const handlePageChange = (pageNumber: number) => {
		const params = { ...Object.fromEntries([...searchParams]) };
		if (page) {
			params.page = pageNumber.toString();
		} else {
			delete params.page;
		}
		setSearchParams(params);
	};
	return (
		<div className="flex items-center justify-center gap-2 bg-white px-4 py-2 shadow-2xl">
			<ReactJSPagination
				activePage={currentPage}
				itemsCountPerPage={pageSize}
				totalItemsCount={totalResults}
				pageRangeDisplayed={5}
				onChange={handlePageChange}
				nextPageText={<AiOutlineRight />}
				prevPageText={<AiOutlineLeft />}
				firstPageText={<AiOutlineDoubleLeft />}
				lastPageText={<AiOutlineDoubleRight />}
			/>
		</div>
	);
};
export default Pagination;
