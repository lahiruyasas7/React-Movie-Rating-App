import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllMovies } from "../../redux/actions";
import MovieCard from "./componenets/movieCard";

const Home = () => {

    interface MovieData {
        adult: boolean,
        id: number,
        original_title: string,
        overview: string,
        popularity: number,
        poster_path: string,
        release_date: string,
        title: string,
        vote_average: number,
        vote_count: number,
    }

    const dispatch = useDispatch();

    const { moviesList } = useSelector((state: any) => state.reducer);

    useEffect(()=>{
        dispatch(getAllMovies());
    }, [])

    console.log('list', moviesList);
    
  return (
    <div className="flex flex-wrap justify-start">
        {
            moviesList && moviesList.results.map((data: MovieData) => (
                <MovieCard key={data.id} movieData={data}/>
            ))
        }
        </div>
  )
}

export default Home