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
import {
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./products.css";
import { cart } from '../../store/actions/authActions';
import { useDispatch } from 'react-redux';


const Products = ({ products }) => {
  const dispatch = useDispatch();

  const handleAtttocart = (e, id) => {
    e.preventDefault();
    let add_product = products.filter((item, i) => item._id === id)
    let cartData = [{
      product: id,
      count: 1,
      size: "M",
      price: add_product[0].price,
      color: add_product[0].color[0],
    }]
    console.log({ cartData })
    dispatch(cart(cartData))
  }


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
          <div style={{ display: "flex" }}>
            <div className="bg-red-600 w-4 h-7"></div>
            <span style={{ color: "red", fontSize: '18px', fontWeight: "700", marginLeft: "10px" }}>Today's</span>
          </div>
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
        {products.length > 0 && products.map((product, index) => (
          <>
            <div
              key={index}
              className="cards_"
            >
              <div className="card_content">
                <h1 className="percent">-40%</h1>
                <div className="icons">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="icon1"
                  />
                  <FontAwesomeIcon
                    icon={faEye}
                    className="icon1"
                  />
                </div>
                <div className="img_">
                  <img
                    src={product.images.length > 0 ? "http://localhost:5000/public/" + product.images[0].url : "klsd"}
                    alt=""
                    className="w-40 h-40"
                  />
                </div>
                <form method="post">

                  <button className="btnadtocart" onClick={(e) => handleAtttocart(e, product._id)}>Add to cart</button>
                </form>

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
            {/* <div
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
            </div> */}
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
