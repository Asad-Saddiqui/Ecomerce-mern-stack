import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./products.css";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import { _addtocart, _carts } from "../../Api/cart/cartSlice";
import { addProductToWishlist } from "../../Api/wishlist/wishlistSlice";
import { Button, Modal } from 'antd';
import Rating from '@mui/material/Rating';
import { fetchProducts } from "../../Api/Product/productSlice";

const Products = ({ offer, title, products }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState(2);
  const [prodId, setProdId] = useState("");

  const dispatch = useDispatch();
  let token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).token : null;

  const showModal = (productId) => {
    setProdId(productId);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (prodId) {
      try {
        let response = await fetch('http://localhost:5000/api/product/rating', {
          method: "PUT",
          headers: {
            "authorization": `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ star: value, prodId }),
        });
        response = await response.json();
        dispatch(fetchProducts());

        // console.log({ Rating: response })
        // if (response.success) {
        //   toast.success("Rating submitted successfully");
        // } else {
        //   toast.error(response.message);
        // }
      } catch (error) {
        toast.error("An error occurred while submitting the rating");
      }
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAtttocart = async (e, id) => {
    e.preventDefault();
    let add_product = products.filter((item) => item._id === id);
    let cartData = [{
      product: id,
      count: 1,
      size: "M",
      price: add_product[0].price,
      color: add_product[0].color[0]._id,
    }];
    if (token) {
      let cart = await dispatch(_addtocart(cartData));
      if (cart.type === 'addtocart/fulfilled') {
        toast.success("Added Successfully");
        dispatch(_carts());
      } else {
        toast.error(cart.payload);
      }
    }
  };

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
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="px-10 mt-20">
      <Modal title="Rate Product" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Modal>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5">
        <div className="">
          <div style={{ display: "flex" }}>
            <div className="bg-red-600 w-4 h-7"></div>
            <span style={{ color: "red", fontSize: '18px', fontWeight: "700", marginLeft: "10px" }}>{title}</span>
          </div>
          <h1 className="text-black font-semibold text-3xl md:text-4xl overflow-y-hidden">
            Flash Sales
          </h1>
        </div>
        {offer &&
          <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
            <h1 className="font-semibold text-xl md:text-2xl">Offer Time:</h1>
            <p className="font-bold text-2xl md:text-3xl overflow-y-hidden text-red-600">
              {currentTime.toLocaleTimeString()}
            </p>
          </div>
        }
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
        onKeyDown={handleKeyDown}
      >
        {products.length > 0 && products.map((product, index) => (
          <div key={index} className="cards_">
            <div className="card_content overflow-y-hidden">
              <h1 className="percent">-40%</h1>
              <div className="icons">
                {token ? <FontAwesomeIcon
                  icon={faHeart}
                  className="icon1"
                  onClick={async () => {
                    let users = await dispatch(addProductToWishlist(product._id));
                    if (users) {
                      toast.success(users.payload.msg);
                    }
                  }}
                /> : <FontAwesomeIcon
                  icon={faHeart}
                  className="icon1"
                />}
                <FontAwesomeIcon
                  icon={faEye}
                  onClick={() => showModal(product._id)}
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
                <p className="opacity-50 text-base line-through">
                  {product.price}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Rating
                name="read-only"
                readOnly
                value={parseInt(product.totalrating)}
              />
              <span>{product.reviews}</span>
            </div>
          </div>
        ))}
      </div>
      {!offer &&
        <Link to="/cate" className="px-4 py-2 w-max bg-red-500 text-white rounded-md m-auto flex my-12">
          View All Products
        </Link>
      }
      <hr />
      <ToastContainer />
    </div>
  );
};

export default Products;
