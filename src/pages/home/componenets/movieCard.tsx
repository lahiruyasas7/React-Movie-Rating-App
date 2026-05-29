import { Label, Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import "../../../assests/css/home.css";
import { Star } from "react-feather";

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  softcore: boolean;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const PLACEHOLDER_IMG = "/placeholder-image.png";

const MovieCard = ({ movieData }: { movieData: Movie }) => {

   const posterSrc = movieData?.poster_path
    ? `https://image.tmdb.org/t/p/w500${encodeURIComponent(movieData.poster_path)}`
    : PLACEHOLDER_IMG;

  // Early return for missing data — renders nothing rather than broken UI
  if (!movieData) return null;
  return (
    <div className="transition-transform transform hover:scale-105 duration-300 ease-in-out">
      <Card
        className="movie-card bg-gradient-to-br from-gray-800 via-zinc-900 to-black 
             hover:from-gray-700 hover:via-gray-800 hover:to-black 
              backdrop-blur-md 
             text-white shadow-xl rounded-2xl transition-transform 
             transform hover:scale-105 duration-300 ease-in-out"
        style={{ width: "300px", height: "380px", cursor: "pointer" }}
      >
        <img
          className="w-full h-[250px] object-fill rounded-t-2xl"
          alt={movieData?.title}
          src={posterSrc}
           //onError fallback prevents broken image icon when URL fails
          onError={(e) => {
            e.currentTarget.src = PLACEHOLDER_IMG;
            e.currentTarget.onerror = null; // prevents infinite loop if placeholder also fails
          }}
        />

        <CardBody className="px-4 pt-3 pb-2 text-gray-900">
          <CardTitle
            tag="h5"
            className="font-semibold text-base truncate"
            title={movieData?.title}
          >
            🎬 {movieData?.title}
          </CardTitle>

          <Label className="text-sm text-white block mb-2">
            📅 Release: {movieData?.release_date}
          </Label>

          <Row className="text-sm text-white font-medium">
            <Col className="flex items-center space-x-1">
              <Star className="text-yellow-400 w-4 h-4" />
              <span>{Number(movieData?.vote_average).toFixed(1)}</span>
            </Col>
            <Col className="text-right">
              <span>🗳 {movieData?.vote_count} votes</span>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default MovieCard;
