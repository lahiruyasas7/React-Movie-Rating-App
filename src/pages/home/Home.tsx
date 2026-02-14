import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "../../redux/actions";
import MovieCard from "./componenets/movieCard";
import SingleViewModal from "./componenets/singleViewModal";
import { MovieData } from "../../types/types";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovieData, setSelectedMovieData] = useState({});
  const dispatch = useDispatch();

  const { moviesList } = useSelector((state: any) => state.reducer);

  useEffect(() => {
    dispatch(getAllMovies());
  }, []);

  const selectedCardHandler = (data: any) => {
    setSelectedMovieData(data);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="min-h-screen">
      <div className="w-full flex flex-wrap gap-12 p-5 justify-center">
        {moviesList &&
          moviesList.results.map((data: MovieData) => (
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
};

export default Home;
