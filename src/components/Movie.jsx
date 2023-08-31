import React, { useState, useEffect } from "react";
import { MovieCard } from "./MovieCard";
import Transition from "./Transition";
import title_logo from "../src/assets/images/lg_title.svg";

const Movie = () => {
  const current = new Date();
  const date = `${current.getFullYear()}-${
    current.getMonth() < 10 ? `0${current.getMonth()}` : `${current.getMonth()}`
  }-${
    current.getDate() < 10 ? `0${current.getDate()}` : `${current.getDate()}`
  }`;
  const datePrevious = `${current.getFullYear() - 1}-${
    current.getMonth() < 10 ? `0${current.getMonth()}` : `${current.getMonth()}`
  }-${
    current.getDate() < 10 ? `0${current.getDate()}` : `${current.getDate()}`
  }`;

  const POPULAR_MOVIE_API_PAGE1 =
    "https://api.themoviedb.org/3/discover/movie?api_key=77c4dbe7e827bbe92b720b38af14e9d5&primary_release_date.gte=" +
    datePrevious +
    "&primary_release_date.lte" +
    date +
    "&sort_by=popularity.desc&vote_count.gte=500&page=1&adult=false";

  const POPULAR_MOVIE_API_PAGE2 =
    "https://api.themoviedb.org/3/discover/movie?api_key=77c4dbe7e827bbe92b720b38af14e9d5&primary_release_date.gte=" +
    datePrevious +
    "&primary_release_date.lte=" +
    date +
    "&sort_by=popularity.desc&vote_count.gte=500&page=2&adult=false";

  const [moviesPage1, setMoviesPage1] = useState([]);
  const [moviesPage2, setMoviesPage2] = useState([]);

  useEffect(() => {
    fetch(POPULAR_MOVIE_API_PAGE1)
      .then((res) => res.json())
      .then((data) => {
        setMoviesPage1(data.results.slice(0, 20));
      });

    fetch(POPULAR_MOVIE_API_PAGE2)
      .then((res) => res.json())
      .then((data) => {
        setMoviesPage2(data.results.slice(0, 4));
      });
  }, []);

  const moviesAll = [...moviesPage1, ...moviesPage2];

  return (
    <section>
      <header className="flex flex-col pt-48 z-30 lg:pt-45vh">
        <div className="hidden lg:flex justify-between text-xs text-light uppercase pb-2 cursor-default">
          <div className="flex items-center">
            <span className="pr-2 pb-0.5">▶</span>
            <p>Recent Films</p>
          </div>
          <p>Scroll</p>
        </div>
        <img src={title_logo} />
      </header>
      <div className="grid grid-cols-1 gap-y-20 gap-x-6 pt-4 pb-48 sm:grid-cols-2 lg:gap-y-32 lg:grid-cols-3 2xl:grid-cols-4">
        {moviesAll.length > 0 &&
          moviesAll.map((movie) => <MovieCard key={movie.id} {...movie} />)}
      </div>
    </section>
  );
};

export default Transition(Movie);
