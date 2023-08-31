import React from "react";
import { Link } from "react-router-dom";
import { motion, useCycle, AnimatePresence } from "framer-motion";
import logo from "../../public/logo_icon.svg";
import close from "../../public/close_menu_icon.svg";
import menu from "../../public/menu_icon.svg";

export const NavBar = () => {
  const [isOpen, cycleIsOpen] = useCycle(false, true);

  return (
    <>
      <nav className="text-xs uppercase text-light flex items-center justify-between py-4 px-6 bg-dark z-40 fixed left-0 right-0 w-full">
        <Link to="/">
          <img src={logo} alt="TRAILERGAZE" className="w-8" />
        </Link>
        <Link to="/watchlist" className="hidden lg:block">
          Watchlist
        </Link>
        <Link to="/search" className="hidden lg:block">
          Search
        </Link>
        <span className="text-neon hidden lg:block">
          <Link to="/about">About</Link>
        </span>
        <button onClick={cycleIsOpen} className="lg:hidden">
          {isOpen ? (
            <img className="w-4" src={close} />
          ) : (
            <img className="w-5" src={menu} />
          )}
        </button>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ width: 0 }}
            animate={{ width: "100vw" }}
            exit={{ width: 0, transition: { delay: 0.72, duration: 0.3 } }}
            className="text-4xl uppercase text-light w-full fixed top-0 right-0 px-6 bg-dark h-full flex flex-col items-end justify-center z-30 sm:text-7xl"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.15 } }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-end justify-center mt-45vh"
            >
              <Link to="/" onClick={cycleIsOpen}>
                Home
              </Link>
              <Link to="/watchlist" onClick={cycleIsOpen} className="mt-4">
                Watchlist
              </Link>
              <Link to="/search" onClick={cycleIsOpen} className="mt-4">
                Search
              </Link>
              <Link to="/about" onClick={cycleIsOpen} className="mt-4">
                About
              </Link>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};
