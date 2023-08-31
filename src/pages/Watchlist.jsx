import React, { useContext } from "react";
import Transition from "../components/Transition";
import { GlobalContext } from "../context/GlobalState";
import { MovieCard } from "../components/MovieCard";

const Watchlist = () => {
  const { watchlist } = useContext(GlobalContext);
  return (
    <section className="pt-20vh">
      <h1 className="text-light uppercase text-2xl lg:text-6xl">Watchlist</h1>
      <div className="grid grid-cols-1 gap-y-20 gap-x-6 pt-4 pb-48 sm:grid-cols-2 lg:gap-y-32 lg:grid-cols-3 2xl:grid-cols-4">
        {watchlist.length > 0 &&
          watchlist.map((movie) => <MovieCard key={movie.id} {...movie} />)}
      </div>
    </section>
  );
};

export default Transition(Watchlist);
