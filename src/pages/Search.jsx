import React, { useState } from "react";
import Transition from "../components/Transition";
import { MovieCard } from "../components/MovieCard";
import { motion } from "framer-motion";
import search from "../assets/images/search_icon.svg";

const Search = () => {
  const SEARCH_API =
    "https://api.themoviedb.org/3/search/movie?api_key=77c4dbe7e827bbe92b720b38af14e9d5&include_adult=false&language=en-US&page=1&&sort_by=popularity.desc&query=";

  const [query, setQuery] = useState("");
  const [searchedMovie, setSearchedMovie] = useState([]);
  const [show, setShow] = useState(false);

  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(SEARCH_API + query)
      .then((res) => res.json())
      .then((data) => {
        setSearchedMovie(data.results);
      });

    query ? setShow(true) : setShow(false);
  };

  return (
    <div className="text-lg text-light pt-20vh">
      <form
        className="bg-neon flex items-center justify-start gap-8 text-dark py-6 px-6 rounded-xl"
        onSubmit={handleSubmit}
      >
        <input type="image" src={search} className="h-8" />
        <input
          type="text"
          className="h-8 w-full outline-none bg-neon uppercase text-3xl"
          onChange={handleQuery}
          value={query}
        />
      </form>
      {show ? (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="mt-52 flex justify-between text-xs text-light uppercase cursor-default lg:mt-70">
            <div className="flex items-center">
              <span className="pr-2 pb-0.5">▶</span>
              <p>Search Results</p>
            </div>
            <p>Scroll</p>
          </div>
          <div className="grid grid-cols-1 gap-y-20 gap-x-6 pt-4 pb-48 sm:grid-cols-2 lg:gap-y-32 lg:grid-cols-3 2xl:grid-cols-4">
            {searchedMovie.length > 0 &&
              searchedMovie.map((movie) => (
                <MovieCard key={movie.id} {...movie} />
              ))}
          </div>
        </motion.section>
      ) : (
        ""
      )}
    </div>
  );
};

export default Transition(Search);
