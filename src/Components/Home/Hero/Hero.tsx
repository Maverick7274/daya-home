"use client";

import React, { useState } from "react";
import BigDipper from "@/Components/Home/Hero/BigDipper";
import SlidingBanner from "@/Components/Utils/SlidingBanner";
import starsData from "@/Data/starData"; // Import JSON data
import StarLayerOne from "@/Assets/star-layer.svg";
import StarLayerTwo from "@/Assets/star-layer1.svg";
import { motion } from "framer-motion";

interface StarData {
  x: number;
  y: number;
  name: string;
  image: string;
  heading: string;
  description: string;
  url: string;
}

const Hero = () => {
  const [activeStar, setActiveStar] = useState<StarData>(starsData[0]); // Default to the first star

  const textAnimation = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
    transition: { duration: 0.5, ease: "easeOut" },
  };

  return (
    <div className="relative flex w-full h-screen overflow-hidden bg-black">
      {/* Starfield Background */}
      <motion.div
        className="absolute inset-0"
        initial={{ translateX: 0 }}
        animate={{ translateX: -100 }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
      >
        <StarLayerOne />
      </motion.div>
      <motion.div
        className="absolute inset-0"
        initial={{ translateX: 0 }}
        animate={{ translateX: 100 }}
        transition={{ repeat: Infinity, duration: 90, ease: "linear" }}
      >
        <StarLayerTwo />
      </motion.div>

      {/* Hero Content & BigDipper */}
      <div className="hidden w-full md:flex">
        {/* Left Section: Dynamic Hero Content */}
        <motion.div
          className="flex flex-col items-start justify-center w-1/2 px-8 pl-8 space-y-4 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          key={activeStar.heading}
        >
          {/* Heading */}
          <motion.h1
            className="text-4xl font-extrabold tracking-wider md:text-6xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeStar.heading}
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg text-gray-300 md:text-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {activeStar.description}
          </motion.p>

          {/* Button */}
          {activeStar.url && (
            <motion.a
              href={activeStar.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 text-black bg-yellow-400 rounded-lg hover:bg-yellow-500"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Learn More
            </motion.a>
          )}
        </motion.div>

        {/* Right Section: BigDipper */}
        <div className="relative w-1/2">
          <BigDipper onStarHover={(star) => setActiveStar(star)} />
        </div>
      </div>

      {/* Sliding Banner for Small Screens */}
      <div className="flex w-full md:hidden">
        <SlidingBanner items={starsData} />
      </div>
    </div>
  );
};

export default Hero;
