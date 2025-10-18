import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopularMovies } from "../../redux/actions";
import { MovieData } from "../../types/types";
import MovieCard from "../home/componenets/movieCard";
import SingleViewModal from "../home/componenets/singleViewModal";
import ReactPaginate from "react-paginate";

function PopularMovies() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovieData, setSelectedMovieData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const { popularMovies } = useSelector((state: any) => state.reducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentPage) {
      dispatch(getPopularMovies(currentPage));
    }
  }, [dispatch, currentPage]);
  console.log("popularMovies", popularMovies);

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
        {popularMovies &&
          popularMovies.results.map((data: MovieData) => (
            <div key={data.id} onClick={() => selectedCardHandler(data)}>
              {" "}
              <MovieCard key={data.id} movieData={data} />
            </div>
          ))}
      </div>
      {popularMovies?.total_pages > 1 && (
        <div className="flex justify-center my-6">
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            breakLabel={"..."}
            pageCount={popularMovies.total_pages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageChange}
            containerClassName={"pagination flex gap-2"}
            activeClassName={"active text-blue-500 font-semibold"}
            forcePage={currentPage - 1} // keeps pagination in sync with state
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

export default PopularMovies;
