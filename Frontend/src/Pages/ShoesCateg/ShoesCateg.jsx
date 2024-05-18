import React, { useState } from "react";
import "./shoesCat.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faHome,
  faInfoCircle,
  faEnvelope,
  faPhone,
  faStar,
  faShoePrints,
} from "@fortawesome/free-solid-svg-icons";

const shoeData = [
  {
    id:1,
    name: "Derby Shoes",
    price: "175",
    desc: "Choose your derby shoes for men online. Find all kind of derby shoes, from leather derby shoes to suede derby shoes. All materials and leathers available and personalization options to create the derby shoes you have in mind.",
    reviews: "19627",
    img:"./boot.jpg"
  },
  { id:2,
    name: "Leather Shoes",
    price: "195",
    desc: "Choose your derby shoes for men online. Find all kind of derby shoes, from leather derby shoes to suede derby shoes. All materials and leathers available and personalization options to create the derby shoes you have in mind.",
    reviews: "13,627",
    img:"./boot2.jpg"
  },
  {
    id:3,
    name: "Pishawari Shoes",
    price: "155",
    desc: "Choose your derby shoes for men online. Find all kind of derby shoes, from leather derby shoes to suede derby shoes. All materials and leathers available and personalization options to create the derby shoes you have in mind.",
    reviews: "15,327",
    img:"./boot3.jpg"
  },
  {
    id:3,
    name: "Pishawari Shoes",
    price: "155",
    desc: "Choose your derby shoes for men online. Find all kind of derby shoes, from leather derby shoes to suede derby shoes. All materials and leathers available and personalization options to create the derby shoes you have in mind.",
    reviews: "15,327",
    img:"./boot.jpg"
  },
  {
    id:3,
    name: "Pishawari Shoes",
    price: "155",
    desc: "Choose your derby shoes for men online. Find all kind of derby shoes, from leather derby shoes to suede derby shoes. All materials and leathers available and personalization options to create the derby shoes you have in mind.",
    reviews: "15,327",
    img:"./boot.jpg"
  },
];

const ShoesCateg = () => {

  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [detail, setDetail] = useState(shoeData[0])


  const handleNavigate = ()=>{
    navigate("/select", {state:detail})
  }

  // console.log(detail)
  return (
    <>
      <div className="h-[100vh]  cat-bg" style={{backgroundImage: `url(${detail.img})`}} >
        <nav className="bg-transparent text-black p-4">
          <div className="container mx-auto flex justify-between items-center">
            {/* Logo and Home Link */}
            <div className="text-2xl font-bold flex items-center space-x-2">
              <FontAwesomeIcon icon={faHome} />
              <Link to="/">MyApp</Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden" onClick={toggleMenu}>
              <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
            </div>

            {/* Desktop Menu */}
            <ul
              className={`${
                isOpen ? "block" : "hidden"
              } sm:flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 items-center`}
            >
              <li>
                <Link
                  to="/"
                  className="flex items-center space-x-2 hover:text-gray-400 transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faHome} />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="flex items-center space-x-2 hover:text-gray-400 transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  <span>About</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="flex items-center space-x-2 hover:text-gray-400 transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="flex flex-col text-black">
          <div className="flex flex-col px-16 gap-2 ">
            <h1 className="text-4xl font-semibold overflow-y-hidden">
              Derby Shoes
            </h1>
            <h2 className="text-2xl font-semibold">from ${detail.price}</h2>
            <div className="flex gap-4">
              <section>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </section>
              <section className="font-light underline">{detail.reviews} Reviews</section>
            </div>
            <div className="flex flex-col items-start gap-8">
              <p className="text-xl font-semibold">
               {detail.name}
              </p>
              <p className="text-base max-w-96">
               {detail.desc}
              </p>

              <button onClick={handleNavigate} className="bg-white hover:bg-black hover:text-white duration-300 text-sm font-bold px-4 py-4 rounded-3xl">
                Design your darbies
              </button>
              <p>Order today, receive it by May 22.Free shipping</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-semibold py-10">
          How to get your custom derby shoes
        </h1>

        <div className="flex justify-evenly">
          <section className="flex flex-col items-center gap-2 ">
            <FontAwesomeIcon className="text-2xl" icon={faShoePrints} />
            <h2 className="font-bold">Select</h2>
            <p className="w-10/12 text-center">
              Choose a base style. Design options are just endless
            </p>
          </section>
          <section className="flex flex-col items-center gap-2 ">
            <FontAwesomeIcon className="text-2xl" icon={faShoePrints} />
            <h2 className="font-bold">Select</h2>
            <p className="w-10/12 text-center">
              Choose a base style. Design options are just endless
            </p>
          </section>
          <section className="flex flex-col items-center gap-2 ">
            <FontAwesomeIcon className="text-2xl" icon={faShoePrints} />
            <h2 className="font-bold">Select</h2>
            <p className="w-10/12 text-center">
              Choose a base style. Design options are just endless
            </p>
          </section>
        </div>
      </div>

      <div className="py-10 px-4 ">
        <h1 className="py-10 text-xl font-bold">Our Collections</h1>
        <div className="flex flex-row gap-6 overflow-x-scroll whitespace-nowrap flex-nowrap w-full no-scrollbar">

        {shoeData.map((data, i) => (
          <div key={i} className="flex-shrink-0  ">
            <div onClick={()=>setDetail(shoeData[i])} className="flex flex-col gap-1">
              <img src={data.img} className=" rounded-sm w-[28vw] h-[40vh]" alt="Boot" />
              <p className="text-sm px-2">{data.name}</p>
              <h1 className="text-sm font-bold px-2">${data.price}</h1>
            </div>
          </div>
        ))}
      </div>
        </div>
    </>
  );
};

export default ShoesCateg;
