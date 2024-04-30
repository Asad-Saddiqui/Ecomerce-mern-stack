import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faEye,
  faHeart,
  faMobile,
  faSwatchbook,
  faTv,
  faWalkieTalkie,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Products = ({ products }) => {

  const categoryData = [
    {
      icon: faMobile,
      text: "Phone",
      price: "200$",
      removedPrice: "$1150",
      reviews: " (900) ",
    },
    { icon: faTv, text: "TV" },
    {
      icon: faSwatchbook,
      text: "Swatchbook",
      price: "200$",
      removedPrice: "$1150",
      reviews: " (900) ",
    },
    {
      icon: faWalkieTalkie,
      text: "Walkie Talkie",
      price: "200$",
      removedPrice: "$1150",
      reviews: " (900) ",
    },
    {
      icon: faWalkieTalkie,
      text: "Walkie Talkie",
      price: "200$",
      removedPrice: "$1150",
      reviews: " (900) ",
    },
    {
      icon: faWalkieTalkie,
      text: "Walkie Talkie",
      price: "200$",
      removedPrice: "$1150",
      reviews: " (900) ",
    },
    { icon: faWalkieTalkie, text: "Walkie Talkie" },
    { icon: faWalkieTalkie, text: "Walkie Talkie" },
    { icon: faWalkieTalkie, text: "Walkie Talkie" },
  ];

  const containerRef = useRef(null);

  const handleScroll = (scrollOffset) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      handleScroll(-100);
    } else if (e.key === "ArrowRight") {
      handleScroll(100);
    }
  };

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update the current time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div className="px-10 mt-20">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5">
        <div className="">
          <div className="bg-red-600 w-5 h-5"></div>
          <h1 className="text-black font-semibold text-3xl md:text-4xl overflow-y-hidden">
            Flash Sales
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
          <h1 className="font-semibold text-xl md:text-2xl">Offer Time:</h1>
          <p className="font-bold text-2xl md:text-3xl overflow-y-hidden text-red-600">
            {currentTime.toLocaleTimeString()}
          </p>
        </div>

        <div className="flex gap-4 justify-center items-center">
          <div className="text-black bg-gray-300 flex justify-center items-center rounded-full shadow-md w-8 h-8 cursor-pointer">
            <FontAwesomeIcon
              icon={faChevronLeft}
              onClick={() => handleScroll(-100)}
            />
          </div>
          <div className="text-black bg-gray-300 flex justify-center items-center rounded-full shadow-md w-8 h-8 cursor-pointer">
            <FontAwesomeIcon
              icon={faChevronRight}
              onClick={() => handleScroll(100)}
            />
          </div>
        </div>
      </div>

      <div
        className="mt-5 flex justify-start gap-14 overflow-x-auto custom-scrollbar"
        ref={containerRef}
      >
        {products.length > 0 && products.map((category, index) => (
          <>
            <div
              key={category._id}
              className=" bg-gray-200 relative flex flex-col ml-8 justify-center items-center min-w-60 min-h-60 gap-4 border-black border-[1px] px-10 py-5 rounded-xl"
            >
              <div className=" opacity-0 bg-transparent z-10 w-full h-full absolute hover:opacity-100 duration-500 ">
                <div className="text-white absolute bottom-0  text-center font-bold text-sm py-3 bg-black w-full cursor-pointer">
                  Add to Cart
                  <Link to={"/product/" + category._id}>{category.title}</Link>
                </div>
              </div>
              <h1 className=" text-white absolute top-2 left-2 px-1 py-1  bg-red-600 rounded">
                -40%
              </h1>
              <h1 className="flex flex-col gap-2 absolute top-2 right-2">
                {" "}
                <FontAwesomeIcon
                  className="text-black text-2xl bg-slate-50 rounded-full p-2 shadow-md "
                  icon={faHeart}
                />
                <FontAwesomeIcon
                  className="text-black text-2xl bg-slate-50 rounded-full p-2 shadow-md"
                  icon={faEye}
                />
              </h1>
              {/* <FontAwesomeIcon className="w-10 h-10" icon={category.icon} /> */}
              <h1 className="font-semibold"><Link to={"/product/" + category._id }>{category.title}</Link></h1>
          
            </div>
          </>
        ))}
      </div>

      <button className=" px-4 py-2 bg-red-500 text-white rounded-md m-auto flex my-12">
        View All Products
      </button>
      <hr />
    </div>
  );
};

export default Products;
