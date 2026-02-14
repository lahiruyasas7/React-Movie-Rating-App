import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopRatedMovies } from "../../redux/actions";

function TopRatedMovies() {
  const { topRatedMovies } = useSelector((state: any) => state.reducer);

  const dispatch = useDispatch();

  useEffect(() => {
    //if (currentPage) {
    dispatch(getTopRatedMovies(1));
    // }
  }, []);
  console.log("topRatedMovies", topRatedMovies);
  return <div>TopRatedMovies</div>;
}

export default TopRatedMovies;
