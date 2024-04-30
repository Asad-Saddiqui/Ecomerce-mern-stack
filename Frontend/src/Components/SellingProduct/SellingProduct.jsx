import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faMobile,
  faSwatchbook,
  faTv,
  faWalkieTalkie,
} from "@fortawesome/free-solid-svg-icons";

const SellingProduct = () => {
  // Array of objects containing icon and text data
  const categoryData = [
    { icon: faMobile, text: "Phone", price:"260$" },
    { icon: faTv, text: "TV", price:"260$" },
    { icon: faSwatchbook, text: "Swatchbook", price:"260$" },
    { icon: faWalkieTalkie, text: "Walkie Talkie",  price:"260$" },
    { icon: faWalkieTalkie, text: "Walkie Talkie",  price:"260$" },
    { icon: faWalkieTalkie, text: "Walkie Talkie",  price:"160$" },
    { icon: faWalkieTalkie, text: "Walkie Talkie" },
    { icon: faWalkieTalkie, text: "Walkie Talkie" },
    { icon: faWalkieTalkie, text: "Walkie Talkie" },
  ];

  const containerRef = useRef(null);

  const handleScroll = (scrollOffset) => {
    if (containerRef.current) {
        containerRef.current.scrollBy({
          left: scrollOffset,
          behavior: 'smooth'
        });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      handleScroll(-100); 
    } else if (e.key === 'ArrowRight') {
      handleScroll(100); 
    }
  };

  return (
    <div className="px-10 mt-20">
      <div className="flex justify-start items-center gap-9">
        <div className="bg-red-600 w-5 h-5 rounded-full "></div>
        <h1 className="text-red-600 font-semibold">Best Selling Product</h1>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl text-nowrap w-[30vw]">
          Browse by Category
        </h1>
        <div className="flex justify-center gap-4 items-center">
          <div className="text-black bg-gray-300 flex justify-center items-center rounded-full shadow-md w-8 h-8 cursor-pointer">
            <FontAwesomeIcon icon={faChevronLeft} onClick={() => handleScroll(-100)} />
          </div>
          <div className="text-black bg-gray-300 flex justify-center items-center rounded-full shadow-md w-8 h-8 cursor-pointer">
            <FontAwesomeIcon icon={faChevronRight} onClick={() => handleScroll(100)} />
          </div>
        </div>
      </div>
      <div className="mt-5 flex justify-start gap-14 overflow-x-auto custom-scrollbar" ref={containerRef}>
        {categoryData.map((category, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center min-w-40 gap-4 border-black border-[1px] px-10 py-5 rounded-xl"
          >
            <FontAwesomeIcon className="w-10 h-10" icon={category.icon} />
            <h1 className="font-semibold">{category.text}</h1>
            {category.price && (
              <span className="text-sm text-gray-500 mt-2">{category.price}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellingProduct;
