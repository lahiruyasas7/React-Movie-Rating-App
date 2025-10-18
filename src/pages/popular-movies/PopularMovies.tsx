import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopularMovies } from "../../redux/actions";

function PopularMovies() {
  const { PopularMovies } = useSelector((state: any) => state.reducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularMovies(1));
  }, []);
  console.log("popularMovies", PopularMovies);
  return <div>PopularMovies</div>;
}

export default PopularMovies;
