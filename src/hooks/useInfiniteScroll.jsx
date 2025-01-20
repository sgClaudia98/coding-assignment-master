import { useState, useEffect, useRef } from "react";

const useInfiniteScroll = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const debounceTimeout = useRef(null);

  const handleScroll = () => {
    const scrollPosition =
      window.innerHeight + document.documentElement.scrollTop;
    const bottom = document.documentElement.scrollHeight;

    if (scrollPosition >= bottom - 300 && !loading) {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(() => {
        setLoading(true);
        setPage((prev) => prev + 1);
      }, 100);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    page,
    setPage,
    loading,
    setLoading,
  };
};

export default useInfiniteScroll;
