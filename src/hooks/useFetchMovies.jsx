import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../data/moviesSlice";
import useInfiniteScroll from "./useInfiniteScroll";
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER, API_KEY } from "../constants";

const useFetchMovies = (searchQuery) => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const [data, setMovies] = useState([]);
  const { loading, setLoading, page, setPage } = useInfiniteScroll();

  useEffect(() => {
    setMovies([]); // reset movies on search change
    console.debug(page, "set", 1);
    setPage(1);
  }, [searchQuery]);

  useEffect(() => {
    console.debug(page);
    loadMovies();
  }, [page]);

  const loadMovies = () => {
    const endpoint = searchQuery
      ? `${ENDPOINT_SEARCH}&query=${searchQuery}&page=${page}`
      : `${ENDPOINT_DISCOVER}&page=${page}`;
    dispatch(fetchMovies(endpoint));
  };

  useEffect(() => {
    if (movies.fetchStatus == "success") {
      if (movies.movies.results) {
        setMovies((prevMovies) => [...prevMovies, ...movies.movies.results]);
      }
    }
    setLoading(movies.fetchStatus != "loading");
  }, [movies.fetchStatus]);

  return {
    movies: data,
    loading,
  };
};

export default useFetchMovies;
