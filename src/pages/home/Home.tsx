import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "../../redux/actions";
import MovieCard from "./componenets/movieCard";
import SingleViewModal from "./componenets/singleViewModal";


const Home = () => {

  interface MovieData {
    adult: boolean;
    id: number;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    vote_average: number;
    vote_count: number;
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovieData, setSelectedMovieData] = useState({});
  const dispatch = useDispatch();

  const { moviesList } = useSelector((state: any) => state.reducer);

  useEffect(() => {
    dispatch(getAllMovies());
  }, []);

  //console.log("list", moviesList);

  const selectedCardHandler = (data: any) => {
    setSelectedMovieData(data);
    setIsModalOpen(!isModalOpen);
  };
  console.log("data", selectedMovieData);
  return (
    <>
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
    </>
  );
};

export default Home;
