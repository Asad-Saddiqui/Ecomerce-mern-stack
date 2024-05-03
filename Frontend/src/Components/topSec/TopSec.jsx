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
  console.log({ topsec: products });

  let images_ = products ? (products.length > 0 && products.map((item) => item.images[0].url)) : [];
  console.log({ images_ });
  // const images = [
  //   "https://source.unsplash.com/random",
  //   "https://media.istockphoto.com/id/1432249453/photo/a-male-programmer-shows-a-female-colleague-a-coding-technique-the-codes-are-visible-on-the.webp?b=1&s=170667a&w=0&k=20&c=vEz9LXgvZNn8sHbVnPLTmnTtlqZtNKXQLg8xrbVc5rM=",
  //   "https://media.istockphoto.com/id/1536191188/photo/web-developers-using-a-computer-together-in-an-office.webp?b=1&s=170667a&w=0&k=20&c=12s792O3eRQUBbfts90cqJjCAnGkR_UZ_2s2LbBm6GM=",
  // ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };
  return (
    <div>
      <hr className="mb-10 md:mb-0" />
      <div className="flex flex-col main md:flex-row ">
        <div className="hidden md:flex flex-col gap-8 px-16 w-[25vw] py-10 border-r-[1px] border-black mr-14 font-semibold ">
          {category && category.map((category, index) => (
            <h1
              key={index}
              className="text-nowrap flex justify-between hover:translate-x-6 duration-300 cursor-pointer"
            >
              {category.title} <span>&gt;</span>
            </h1>
          ))}
        </div>

        <div className="right flex justify-center items-center">
          {images_ .length>0 &&
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