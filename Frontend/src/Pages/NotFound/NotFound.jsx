import React from "react";
import Top from "../../Components/Top/Top";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <Top />
      <Navbar />
      <div className="my-20 mx-20">
        <div className="flex flex-col">
          <h1>
            Home / <span className="font-bold">404 Error</span>
          </h1>
        </div>
        <div className="flex flex-col gap-10 justify-center items-center">
          <h1 className=" text-5xl font-semibold h-max overflow-y-hidden">404 Not Found</h1>
          <h2>Your visited page not found. You may go home page.</h2>
          <Link
            to="/"
            className="bg-red-500 text-white px-4 py-2 duration-300 border-[1px] rounded hover:bg-transparent hover:text-black "
          >
            Back to home page
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
