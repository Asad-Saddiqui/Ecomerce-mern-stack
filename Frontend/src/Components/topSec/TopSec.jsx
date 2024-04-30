import React, { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Parallax, Pagination, Navigation } from 'swiper/modules';
const ImageSwapper = ({ imageUrl, onNext, onPrevious }) => {
  return (
    <div className="relative w-[70vw] md:[70vw]">
      <img
        src={imageUrl}
        alt="Image"
        className=" h-[70vh] w-[70vw] md:[70vw] rounded-lg"
      />
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

const TopSec = ({ category }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://source.unsplash.com/random",
    "https://media.istockphoto.com/id/1432249453/photo/a-male-programmer-shows-a-female-colleague-a-coding-technique-the-codes-are-visible-on-the.webp?b=1&s=170667a&w=0&k=20&c=vEz9LXgvZNn8sHbVnPLTmnTtlqZtNKXQLg8xrbVc5rM=",
    "https://media.istockphoto.com/id/1536191188/photo/web-developers-using-a-computer-together-in-an-office.webp?b=1&s=170667a&w=0&k=20&c=12s792O3eRQUBbfts90cqJjCAnGkR_UZ_2s2LbBm6GM=",
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      <hr className="mb-10 md:mb-0" />
      <div className="flex flex-col main md:flex-row ">
        <div className="hidden md:flex flex-col gap-8 px-16 w-[25vw] py-10 border-r-[1px] border-black mr-14 font-semibold ">
          {category.category && category.category.map((category, index) => (
            <h1
              key={index}
              className="text-nowrap flex justify-between hover:translate-x-6 duration-300 cursor-pointer"
            >
              {category.title} <span>&gt;</span>
            </h1>
          ))}
        </div>

        <div className="right flex justify-center items-center">
          <ImageSwapper
            imageUrl={images[currentIndex]}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        </div>
      </div>
    </div>
  );
};

export default TopSec;
