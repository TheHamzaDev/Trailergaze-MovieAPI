import React from "react";
import { motion } from "framer-motion";
import star from "../src/assets/images/star.svg";

export const PageLoader = () => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: "100vh" }}
      transition={{ delay: 2.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="w-screen h-screen bg-neon fixed z-50 flex items-center justify-center overflow-x-hidden "
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src={star} />
      </motion.div>
    </motion.div>
  );
};
