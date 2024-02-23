import type PaginationType from "../types/Pagination.d.ts";
import ReactJSPagination from "react-js-pagination";
import { useSearchParams } from "react-router-dom";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import updateSearchParamsField from "../utils/updateSearchParamsField.ts";

interface PaginationProps {
	pagination: PaginationType;
}

const Pagination = ({ pagination }: PaginationProps) => {
	const { currentPage, pageSize, totalResults } = pagination;
	const [, setSearchParams] = useSearchParams();

	const handlePageChange = (pageNumber: number) => {
		setSearchParams((prevParams) => {
			return updateSearchParamsField("page", pageNumber ? pageNumber.toString() : null, prevParams);
		});
	};

	return (
		<div className="flex items-center justify-center gap-2 bg-white px-4 py-2 shadow-2xl">
			<ReactJSPagination
				activePage={currentPage}
				itemsCountPerPage={pageSize}
				totalItemsCount={totalResults}
				pageRangeDisplayed={3}
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
