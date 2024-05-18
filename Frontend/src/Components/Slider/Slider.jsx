import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const images = [
  "/boot.jpg", // Path relative to the public folder
  "/boot2.jpg",
  "/boot3.jpg",
];

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const interval = 5000; // Default interval for slide changes
  const length = images.length;

  const Navigate= useNavigate()

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + length) % length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, interval); // Automatically change slides
    return () => clearInterval(timer); // Clear interval on component unmount
  }, [interval]); // Only depend on the interval, avoid re-render loops

  if (length === 0) {
    return <div>No images available</div>;
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gray-200">
      <button
        onClick={prevSlide}
        className="absolute left-0 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="text-2xl" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        <FontAwesomeIcon icon={faChevronRight} className="text-2xl" />
      </button>

      <div className="flex w-full justify-center relative">
        <img
          src={images[current]}
          alt={`Slide ${current}`}
          className="w-full h-[90vh] object-cover"
        />
      </div>
      <button onClick={()=>Navigate("/custom")} className="absolute bottom-14 left-[40%] bg-blue-600 rounded-2xl overflow-y-hidden px-4 py-3 text-white text-xl font-bold ">
        Customize as Per Need
      </button>
    </div>
  );
};

export default Slider;
