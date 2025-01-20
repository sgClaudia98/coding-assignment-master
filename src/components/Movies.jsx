import Movie from "./Movie";
import useFetchMovies from "../hooks/useFetchMovies";
import "../styles/movies.scss";

const Movies = ({ searchQuery, viewTrailer, closeCard }) => {
  const { movies, loading } = useFetchMovies(searchQuery);

  return (
    <div data-testid="movies" className="movie-grid">
      {movies?.map((movie) => {
        return (
          <Movie
            movie={movie}
            key={movie.id}
            viewTrailer={viewTrailer}
            closeCard={closeCard}
          />
        );
      })}
      {loading && "Loading..."}
    </div>
  );
};

export default Movies;
