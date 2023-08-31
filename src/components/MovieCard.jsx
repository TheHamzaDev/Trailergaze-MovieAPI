import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

export const MovieCard = (props) => {
  const BACKDROP_IMAGE = "https://image.tmdb.org/t/p/w1280/";
  const MOVIE_DETAILS =
    "https://api.themoviedb.org/3/movie/" +
    props.id +
    "?api_key=77c4dbe7e827bbe92b720b38af14e9d5";

  const [details, setDetails] = useState([]);
  const { removeMovieFromWatchlist, addMovieToWatchlist, watchlist } =
    useContext(GlobalContext);

  let storedMovie = watchlist.find((m) => m.id === props.id);
  const removeBtn = storedMovie ? true : false;

  const genreArray = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fanatsy" },
    { id: 36, name: "27" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
  ];

  useEffect(() => {
    fetch(MOVIE_DETAILS)
      .then((res) => res.json())
      .then((data) => {
        setDetails(data);
      });
  }, []);

  function findGenreName(array, genreId) {
    return array.find((element) => {
      return element.id === genreId;
    });
  }

  return details.backdrop_path && props.genre_ids ? (
    <motion.section
      className="cursor-pointer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="overflow-hidden mb-3 relative z-10">
        <Link
          to={`/movie/${props.title}`}
          state={{
            id: props.id,
            title: props.title,
            overview: props.overview,
            year: props.release_date.substring(0, 4),
          }}
        >
          <motion.img
            whileHover={{
              borderTopLeftRadius: "150px",
              borderTopRightRadius: "150px",
              borderBottomLeftRadius: "150px",
            }}
            src={BACKDROP_IMAGE + details.backdrop_path}
            alt={props.title}
            loading="lazy"
          />
        </Link>
        {!removeBtn ? (
          <motion.button
            type="button"
            whileHover={{ backgroundColor: "#BDFF00", color: "#0b0c0b" }}
            className="absolute bottom-5 right-5 text-light bg-dark.5 w-10 h-10 rounded-full flex items-center justify-center"
            onClick={() => addMovieToWatchlist(props)}
          >
            <span>+</span>
          </motion.button>
        ) : (
          <motion.button
            type="button"
            whileHover={{ backgroundColor: "#c1121f" }}
            className="absolute bottom-5 right-5 text-light bg-dark.5 w-10 h-10 rounded-full flex items-center justify-center"
            onClick={() => removeMovieFromWatchlist(props.id)}
          >
            <span>-</span>
          </motion.button>
        )}
      </div>
      <div className="flex flex-col float-left w-36 ">
        <p className="text-xs text-light opacity-50">▶</p>
        <p className="text-xs text-light text-opacity-50">
          {details.runtime + " mins"}
        </p>
      </div>
      <div className="text-xs uppercase text-light float-left">
        <h4>{props.title}</h4>
        <h4 className="text-light text-opacity-50">
          {props.release_date.substring(0, 4)} /{" "}
          {props.genre_ids[0]
            ? findGenreName(genreArray, props.genre_ids[0]).name
            : " "}
        </h4>
      </div>
    </motion.section>
  ) : (
    ""
  );
};
