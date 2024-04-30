import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faHeart,
  faEye,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const BestSellingProducts = ({ products }) => {
  const categoryData = [
    {
      iconSrc: "https://source.unsplash.com/random",
      productName: "Phone",
      price: "$200",
      removedPrice: "$1150",
      reviews: "(900)",
    },
    {
      iconSrc: "https://source.unsplash.com/random?nature",
      productName: "TV",
      price: "$960",
      removedPrice: "$1160",
      reviews: "(1200)",
    },
    {
      iconSrc: "https://source.unsplash.com/random?city",
      productName: "Swatchbook",
      price: "$200",
      removedPrice: "$1150",
      reviews: "(600)",
    },
    {
      iconSrc: "https://source.unsplash.com/random?technology",
      productName: "Walkie Talkie",
      price: "$200",
      removedPrice: "$1150",
      reviews: "(750)",
    },
    {
      iconSrc: "https://source.unsplash.com/random?abstract",
      productName: "Walkie Talkie",
      price: "$200",
      removedPrice: "$1150",
      reviews: "(750)",
    },
    {
      iconSrc: "https://via.placeholder.com/140x176",
      productName: "Walkie Talkie",
      price: "$200",
      removedPrice: "$1150",
      reviews: "(750)",
    },
    {
      iconSrc: "https://via.placeholder.com/140x176",
      productName: "Walkie Talkie",
      price: "$200",
      removedPrice: "$1150",
      reviews: "(750)",
    },
    {
      iconSrc: "https://via.placeholder.com/140x176",
      productName: "Walkie Talkie",
      price: "$200",
      removedPrice: "$1150",
      reviews: "(750)",
    },
    // Add more products as needed
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

  return (
    <div className="px-10 mt-20">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5 mb-12 ">
          <div className="bg-red-600 w-5 h-5 rounded-[100%] mb-[75px] lg:mb-0" />
          <h1 className="text-black font-semibold text-3xl md:text-4xl h-28 lg:h-12 overflow-y-hidden">
            Best Selling Products
          </h1>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 justify-center items-center">
          <div
            className="bg-gray-300 rounded-full shadow-md w-8 h-8 cursor-pointer flex justify-center items-center"
            onClick={() => handleScroll(-200)}
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-black" />
          </div>
          <div
            className="bg-gray-300 rounded-full shadow-md w-8 h-8 cursor-pointer flex justify-center items-center"
            onClick={() => handleScroll(200)}
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-black" />
          </div>
        </div>
      </div>

      {/* Scrollable Product Section */}
      <div
        className="flex gap-8 overflow-x-auto custom-scrollbar"
        ref={containerRef}
        style={{ width: "100%", height: "auto" }}
      >
        {products.length > 0 && products.map((product, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-xl flex flex-col justify-between p-5 border min-w-[200px] relative"
            style={{ minWidth: "200px", maxWidth: "250px" }}
          >
            <div className="flex justify-between ">
              <h1 className="bg-red-600 text-white rounded px-2 py-1 mb-4 font-semibold">-40%</h1>
              <div className="flex gap-2 absolute right-6 top-20 flex-col">
                <FontAwesomeIcon
                  icon={faHeart}
                  className="text-black bg-slate-50 rounded-full p-2 shadow-md"
                />
                <FontAwesomeIcon
                  icon={faEye}
                  className="text-black bg-slate-50 rounded-full p-2 shadow-md"
                />
              </div>
            </div>

            <div className="w-full flex justify-center">
              <img
                src={product.images.length > 0 ? "http://localhost:5000/public/" + product.images[0].url : "klsd"}
                alt=""
                className="w-40 h-40"
              />
            </div>

            <h3 className="text-black font-medium text-lg">
              <Link to={"/product/" + product._id}> {product.title}</Link>
            </h3>


            <div className="flex items-center gap-2">
              <p className="text-red-500 text-base">{product.price}</p>
              {product.price && (
                <p class="opacity-50 text-base line-through">
                  {product.price}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className={i < 4 ? "text-yellow-400" : "text-gray-400"}
                />
              ))}
              <span>{product.reviews}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="px-4 py-2 bg-red-500 text-white rounded-md my-12">
        View All Products
      </button>
    </div>
  );
};

export default BestSellingProducts;
