import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faBars,
  faCartShopping,
  faMagnifyingGlass,
  faRightFromBracket,
  faStar,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="flex flex-col md:flex-row justify-around">
      <div className="flex justify-between items-center overflow-x-hidden mx-2 my-4 md:gap-[15vw]">
        <div>
          <Link to="/" className="font-bold text-xl md:text-2xl">
            Exclusive
          </Link>
        </div>
        <div className={`hidden md:flex gap-6 md:text-xl lg:gap-12`}>
          <Link to="/" className={`font-semibold text-lg ${location.pathname === "/" ? "line" : ""}`}>
            Home
          </Link>
          <Link to="/contact" className={`font-semibold text-lg  ${location.pathname === "/contact" ? "line" : ""}`}>
            Contact
          </Link>
          <Link to="/about" className={`font-semibold text-lg  ${location.pathname === "/about" ? "line" : ""}`}>
            About
          </Link>
          <Link to="/signup" className={`font-semibold text-lg  ${location.pathname === "/signup" ? "line" : ""}`}>
            Signup
          </Link>
        </div>

        <div className="flex gap-2 justify-center items-center">
          {!open && (
            <div className="relative">
              <input
                type="text"
                className="border shadow-md border-gray-300 rounded-lg px-2 lg:mr-40 py-1  focus:outline-none md:w-28 lg:w-52 "
                placeholder="Search..."
              />
              <FontAwesomeIcon className="absolute top-2 right-2 lg:right-44" icon={faMagnifyingGlass} />
            </div>
          )}
          <div className={`flex justify-center items-center gap-2 z-10 md:hidden`}>
            {!open && <FontAwesomeIcon onClick={handleOpen} icon={faBars} />}
            {open && (
              <FontAwesomeIcon
                className="absolute top-8 right-3"
                onClick={handleOpen}
                icon={faXmark}
              />
            )}
          </div>
        </div>
      </div>

      {open && (
        <div>
          <div className={`flex flex-col justify-center items-center gap-3 h-1/2 z-[2] bg-slate-300 py-4 w-[100vw] absolute top-0`}>
            <Link to="/" className="font-semibold">
              Home
            </Link>
            <Link to="/contact" className="font-semibold">
              Contact
            </Link>
            <Link to="/about" className="font-semibold">
              About
            </Link>
            <Link to="/signup" className="font-semibold">
              Signup
            </Link>
          </div>
        </div>
      )}

      {/* Icons (Heart, Cart, User) */}
      <div className="flex flex-col gap-4 absolute pr-1 items-end z-10 right-1 top-32 lg:flex-row lg:top-[55px] lg:right-4 md:text-2xl">
        <FontAwesomeIcon icon={faHeart} />
        <Link to="/cart" className="relative">
          <h1 className="rounded-[100%] bg-red-500 w-4 text-center absolute right-0 top-0 text-xs text-white">4</h1>
          <FontAwesomeIcon icon={faCartShopping} />
        </Link>
        <button onClick={() => setProfile(!profile)}>
          <FontAwesomeIcon icon={faUser} />
        </button>
      </div>

      {/* Profile section with close icon */}
      {profile && (
        <div className="absolute flex flex-col z-10 right-2 top-32 gap-4 p-3 bg-gradient-to-tr from-black to-[#9b9a9a] rounded">
          <div className="flex justify-between items-center">
            <h1 className="text-white flex justify-between items-center px-3 gap-2">
              <FontAwesomeIcon icon={faUser} />
              <Link to="/profile">Manage My Account</Link>
            </h1>
            <FontAwesomeIcon
              className="cursor-pointer"
              icon={faXmark}
              onClick={() => setProfile(false)}
            />
          </div>
          {/* Additional profile options */}
          <h1 className="text-white flex items-center px-3 gap-2">
            <FontAwesomeIcon icon={faBagShopping} />
            My Orders
          </h1>
          <h1 className="text-white flex items-center px-3 gap-2">
            <FontAwesomeIcon icon={faStar} />
            My Reviews
          </h1>
          <Link to="/signup" className="text-white flex items-center px-3 gap-2">
            <FontAwesomeIcon icon={faRightFromBracket} />
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
