import React, { useState } from "react";
import './topSec.css';
const ImageSwapper = ({ imageUrl, onNext, onPrevious }) => {
  return (
    <div className="relative w-[70vw] md:[70vw]">
      <div class="content">
        <div class="item-section">
          <div>
            <h3>Up to 10% </h3>
            <h3>off Voucher</h3>
            <button className="shopbtn">Shop Now</button>
          </div>
          <div className="imagesection">
            <img
              src={"http://localhost:5000/public/" + imageUrl}
              alt="Image"
            />
          </div>

        </div>

      </div>
      <div className="absolute top-0 right-0 bottom-0 left-0 flex justify-between items-center px-4">
        <button
          onClick={onPrevious}
          className="text-white bg-gray-800 p-2 rounded-full hover:bg-gray-600"
        >
          &lt;
        </button>
        <button
          onClick={onNext}
          className="text-white bg-gray-800 p-2 rounded-full hover:bg-gray-600"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};
const TopSec = ({ category, products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  let images_ = products ? (products.length > 0 && products.map((item) => item.images[0].url)) : [];
  let catArray = category ? category.slice(0, 7) : null


  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };
  console.log({ products })

  return (
    <div>
      <hr className="mb-10 md:mb-0" />
      <div className="flex flex-col main md:flex-row ">
        <div className="hidden md:flex flex-col gap-8 px-16 w-[25vw] py-10 border-r-[1px] border-black mr-14 font-semibold ">
          {catArray && catArray.map((category, index) => (
            <>
              <h1
                key={index}
                className="text-nowrap flex justify-between hover:translate-x-6 duration-300 cursor-pointer"
              >
                {category.title} <span>&gt;</span>
              </h1>
            </>
          ))}
        </div>

        <div className="right flex justify-center items-center">
          {images_.length > 0 &&
            <ImageSwapper
              imageUrl={images_[currentIndex]}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default TopSec;