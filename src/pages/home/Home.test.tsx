import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Home from "./Home";
import * as actions from "../../redux/actions";

const mockStore = configureStore([]);
const mockMovies = {
  results: [
    {
      id: 1,
      title: "Interstellar",
      release_date: "2014-11-07",
      vote_average: 8.6,
      vote_count: 89000,
      poster_path: "/interstellar.jpg",
    },
  ],
};

jest.mock("./componenets/movieCard", () => (props: any) => (
  <div
    data-testid="movie-card"
    onClick={() => props.onClick?.(props.movieData)}
  >
    {props.movieData.title}
  </div>
));

jest.mock(
  "./componenets/singleViewModal",
  () => (props: any) =>
    props.modal ? (
      <div data-testid="modal">{props.selectedMovieData.title}</div>
    ) : null
);

describe("Home component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      reducer: {
        moviesList: mockMovies,
      },
    });

    jest
      .spyOn(actions, "getAllMovies")
      .mockReturnValue({ type: "MOCK_GET_MOVIES" });
  });

  it("dispatches getAllMovies on mount and displays movies", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(actions.getAllMovies).toHaveBeenCalled();

    // MovieCard renders movie title
    expect(screen.getByText("Interstellar")).toBeInTheDocument();
  });

  it("opens modal with selected movie on click", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    fireEvent.click(screen.getByText("Interstellar"));

    // Modal should appear
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Interstellar")).toBeInTheDocument();
  });
});
