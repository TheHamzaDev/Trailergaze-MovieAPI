import React from "react";
import Transition from "../components/Transition";

const About = () => {
  return (
    <>
      <section className="text-4xl text-light pt-20 w-50vw pb-48 md:text-5xl xl:text-6xl 2xl:text-7xl">
        TRAILERGAZE IS A PROJECT THAT AIMS TO SHOWCASE TRAILERS AND DETAILS OF
        CURRENTLY POPULAR MOVIES USING THE{" "}
        <span className="text-neon underline">
          <a href="https://www.themoviedb.org/">TMDB</a>
        </span>{" "}
        API.
      </section>
    </>
  );
};

export default Transition(About);
