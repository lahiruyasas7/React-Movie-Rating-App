import { render, screen } from "@testing-library/react";
import MovieCard from "./componenets/movieCard";

const mockMovie = {
  title: "Inception",
  release_date: "2010-07-16",
  vote_average: 8.8,
  vote_count: 12345,
  poster_path: "/testposter.jpg",
};

describe("MovieCard", () => {
  it("renders movie details correctly", () => {
    render(<MovieCard movieData={mockMovie} />);

    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText(/Release data 2010-07-16/i)).toBeInTheDocument();
    expect(screen.getByText(/Ratings 8.8/i)).toBeInTheDocument();
    expect(screen.getByText(/Vote Count 12345/i)).toBeInTheDocument();

    const image = screen.getByAltText("Sample") as HTMLImageElement;
    expect(image.src).toContain(mockMovie.poster_path);
  });
});
