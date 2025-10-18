import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopularMovies } from "../../redux/actions";
import { MovieData } from "../../types/types";
import MovieCard from "../home/componenets/movieCard";

function PopularMovies() {
  const { popularMovies } = useSelector((state: any) => state.reducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularMovies(1));
  }, []);
  console.log("popularMovies", popularMovies);
  return (
    <div className="min-h-screen">
      <div className="w-full flex flex-wrap gap-12 p-5 justify-center">
        {popularMovies &&
          popularMovies.results.map((data: MovieData) => (
            <div key={data.id}>
              {" "}
              <MovieCard key={data.id} movieData={data} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default PopularMovies;
