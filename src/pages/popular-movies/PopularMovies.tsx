import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopularMovies } from "../../redux/actions";
import { MovieData } from "../../types/types";
import MovieCard from "../home/componenets/movieCard";
import SingleViewModal from "../home/componenets/singleViewModal";

function PopularMovies() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovieData, setSelectedMovieData] = useState({});
  const { popularMovies } = useSelector((state: any) => state.reducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularMovies(1));
  }, []);
  console.log("popularMovies", popularMovies);

  const selectedCardHandler = (data: any) => {
    setSelectedMovieData(data);
    setIsModalOpen(!isModalOpen);
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
      <SingleViewModal
        modal={isModalOpen}
        toggle={selectedCardHandler}
        selectedMovieData={selectedMovieData}
      />
    </div>
  );
}

export default PopularMovies;
