import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../data/moviesSlice";
import useInfiniteScroll from "./useInfiniteScroll";
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER } from "../constants";

const useFetchMovies = (searchQuery) => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const [data, setMovies] = useState([]);
  const { loading, setLoading, page, setPage } = useInfiniteScroll();


  const loadMovies = useCallback(() => {
    const endpoint = searchQuery
      ? `${ENDPOINT_SEARCH}&query=${searchQuery}&page=${page}`
      : `${ENDPOINT_DISCOVER}&page=${page}`;
    dispatch(fetchMovies(endpoint));
  }, [dispatch, searchQuery, page]);

  useEffect(() => {
    if (movies.fetchStatus == "success" && movies.movies.results) {
        setMovies((prevMovies) => [...prevMovies, ...movies.movies.results]);
      }
    
    setLoading(movies.fetchStatus != "loading");
  }, [movies.fetchStatus]);

  useEffect(() => {
    setMovies([]);
    setPage(1);
  }, [searchQuery]);

  useEffect(() => {
    loadMovies();
  }, [page, loadMovies]);

  return {
    movies: data,
    loading,
  };
};

export default useFetchMovies;
