import React from "react";
import Movie from "./components/Movie";
import { NavBar } from "./components/NavBar";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import About from "./pages/About";
import Search from "./pages/Search";
import Watchlist from "./pages/Watchlist";
import MovieDetails from "./pages/MovieDetails";

import { PageLoader } from "./components/PageLoader";
import { GlobalProvider } from "./context/GlobalState";

function App() {
  const location = useLocation();

  return (
    <GlobalProvider>
      <PageLoader />
      <main className="px-6 font-sequel relative min-h-screen overflow-x-hidden">
        <NavBar />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route index element={<Movie />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/search" element={<Search />} />
            <Route path="/about" element={<About />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </AnimatePresence>
        <footer className="pb-6 absolute bottom-0 left-0 right-0 px-6 -z-50">
          <p className="text-xs text-light text-opacity-50">
            © 2023 H. KHAN — TRAILERGAZE
          </p>
        </footer>
      </main>
    </GlobalProvider>
  );
}

export default App;
