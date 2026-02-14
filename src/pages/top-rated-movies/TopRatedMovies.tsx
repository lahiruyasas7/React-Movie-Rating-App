import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopRatedMovies } from "../../redux/actions";
import SingleViewModal from "../home/componenets/singleViewModal";
import { MovieData } from "../../types/types";
import MovieCard from "../home/componenets/movieCard";
import ReactPaginate from "react-paginate";

function TopRatedMovies() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovieData, setSelectedMovieData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const { topRatedMovies } = useSelector((state: any) => state.reducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentPage) {
      dispatch(getTopRatedMovies(currentPage));
    }
  }, [currentPage]);
  const selectedCardHandler = (data: any) => {
    setSelectedMovieData(data);
    setIsModalOpen(!isModalOpen);
  };

  const handlePageChange = (data: { selected: number }) => {
    const newPage = data.selected + 1; // react-paginate is zero-based
    setCurrentPage(newPage);
  };

  return (
    <div className="min-h-screen">
      <div className="w-full flex flex-wrap gap-12 p-5 justify-center">
        {topRatedMovies &&
          topRatedMovies.results.map((data: MovieData) => (
            <div key={data.id} onClick={() => selectedCardHandler(data)}>
              {" "}
              <MovieCard key={data.id} movieData={data} />
            </div>
          ))}
      </div>
      {topRatedMovies?.total_pages > 1 && (
        <div className="flex justify-center my-6">
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            breakLabel={"..."}
            pageCount={Math.min(topRatedMovies.total_pages, 500)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageChange}
            forcePage={currentPage - 1} // keeps pagination in sync with state
            containerClassName={
              "flex justify-center items-center mt-8 space-x-2"
            } // Flex container for pagination
            pageClassName={
              "block border border-gray-300 rounded px-3 py-2 hover:bg-gray-100"
            } // Individual page number
            pageLinkClassName={"text-gray-700"} // Link within page number
            previousClassName={
              "block border border-gray-300 rounded px-3 py-2 hover:bg-gray-100"
            } // Previous button
            previousLinkClassName={"text-gray-700"} // Link within previous button
            nextClassName={
              "block border border-gray-300 rounded px-3 py-2 hover:bg-gray-100"
            } // Next button
            nextLinkClassName={"text-gray-700"} // Link within next button
            breakClassName={"block px-3 py-2"} // Break label (...)
            breakLinkClassName={"text-gray-700"} // Link within break label
            activeClassName={"bg-blue-500 text-white border-blue-500"} // Active page number
            disabledClassName={"opacity-50 cursor-not-allowed"} // Disabled buttons
          />
        </div>
      )}
      <SingleViewModal
        modal={isModalOpen}
        toggle={selectedCardHandler}
        selectedMovieData={selectedMovieData}
      />
    </div>
  );
}

export default TopRatedMovies;
