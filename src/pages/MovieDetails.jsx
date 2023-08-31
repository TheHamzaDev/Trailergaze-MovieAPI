import React, { useEffect, useState, useLayoutEffect } from "react";
import Transition from "../components/Transition";
import { Link, useLocation } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { motion } from "framer-motion";
import arrow from "../assets/images/arrow_br.svg";

const MovieDetails = () => {
  const location = useLocation();
  const { id } = location.state;
  const { title } = location.state;
  const { overview } = location.state;
  const { year } = location.state;

  const MOVIE_TRAILER =
    "http://api.themoviedb.org/3/movie/" +
    id +
    "/videos?api_key=77c4dbe7e827bbe92b720b38af14e9d5";

  const MOVIE_DIRECTOR =
    "http://api.themoviedb.org/3/movie/" +
    id +
    "/credits?api_key=77c4dbe7e827bbe92b720b38af14e9d5";

  const [trailer, setTrailer] = useState([]);
  const [crew, setCrew] = useState([]);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetch(MOVIE_TRAILER)
      .then((res) => res.json())
      .then((data) => {
        setTrailer(data.results);
      });

    fetch(MOVIE_DIRECTOR)
      .then((res) => res.json())
      .then((data) => {
        setCrew(data.crew);
        setCast(data.cast);
      });
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  const filterOfficial = trailer.filter((e) => {
    return e.type === "Trailer" && e.official === true;
  });

  const filterDirectors = crew.filter((e) => {
    return e.job === "Director";
  });

  return (
    <div className="text-lg text-light pt-20 pb-48 lg:text-2xl">
      <motion.div
        className="flex justify-center w-full h-45vh lg:h-50vh"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1 }}
        viewport={{ once: true }}
      >
        {filterOfficial.length === 0 ? (
          <h1 className="flex items-center justify-center uppercase">
            No Trailer Available
          </h1>
        ) : (
          filterOfficial
            .slice(0, 1)
            .map((obj) =>
              obj.site === "YouTube" ? (
                <ReactPlayer
                  width="100%"
                  height="100%"
                  key={obj.id}
                  playing
                  muted={true}
                  controls={true}
                  loop={true}
                  url={`https://www.youtube.com/watch?v=${obj.key}`}
                />
              ) : (
                <h1 className="flex items-center justify-center uppercase">
                  No Trailer Available
                </h1>
              )
            )
        )}
      </motion.div>
      <div className="pt-8 grid grid-cols-2 w-full gap-y-12 gap-x-8 items-start 2xl:w-65vw">
        <h1 className="text-3xl uppercase w-full col-span-2 lg:w-11/12 lg:col-span-1 lg:text-6xl">
          {title}
        </h1>
        <Link
          to={`https://www.themoviedb.org/movie/${id}`}
          target="_blank"
          className="col-span-2 lg:col-span-1"
        >
          <motion.button
            whileHover={{ backgroundColor: "#F5EFDF" }}
            type="button"
            className="flex items-center justify-center gap-1 bg-neon py-4 mt-20 w-24 text-sm rounded-full text-dark uppercase  lg:text-lg lg:w-32  lg:m-0"
          >
            TMDB
            <img
              src={arrow}
              className="w-2.5 mt-0.5 lg:w-3 lg:m-0 -rotate-90"
            />
          </motion.button>
        </Link>
        <div className="leading-none lg:pt-4">
          <h3 className="text-light text-opacity-50 text-sm uppercase lg:text-lg">
            Directed By
          </h3>
          {filterDirectors.length > 0 &&
            filterDirectors.map((obj) => <h1 key={obj.id}>{obj.name}</h1>)}
        </div>
        <div className="leading-none lg:pt-4">
          <h3 className="text-light text-opacity-50 text-sm uppercase lg:text-lg">
            Release Year
          </h3>
          <h1>{year}</h1>
        </div>
        <div className="leading-none col-span-2  w-full lg:w-8/12">
          <h3 className="text-light text-opacity-50 text-sm uppercase lg:text-lg">
            Overview
          </h3>
          <h1>{overview}</h1>
        </div>
        <div className="leading-none col-span-2">
          <h3 className="text-light text-opacity-50 text-sm uppercase lg:text-lg">
            Starring
          </h3>
          {cast.length > 0 &&
            cast
              .slice(0, 2)
              .map((obj) => <h1 key={obj.id}>{obj.original_name}</h1>)}
        </div>
      </div>
    </div>
  );
};

export default Transition(MovieDetails);
