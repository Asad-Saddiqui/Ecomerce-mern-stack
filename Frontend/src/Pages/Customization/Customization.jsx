import {
  faBars,
  faExternalLink,
  faFilter,
  faHeart,
  faPaperclip,
  faScissors,
  faSearch,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ShoeSider from "../Shoes/ShoeSider";
import { Link } from "react-router-dom";

const Customization = () => {
  const [color, setColor] = useState("red");
  const [tab, setTab] = useState("fabric");

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 text-gray-800">
      {/* Left Sidebar */}
      <div className="w-full md:w-1/3 p-10">
        {/* Filter Section */}
        <div className="flex justify-between items-center mb-6">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-200 transition">
            <FontAwesomeIcon icon={faFilter} />
            <span>Filter</span>
          </button>
          <span className="text-sm text-gray-600">193/193</span>
        </div>

        {/* Search Section */}
        <div className="relative mb-6">
          <input
            type="text"
            className="w-full py-2 pl-10 pr-3 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Search by name or property"
          />
          <FontAwesomeIcon
            className="absolute top-3 left-3 text-gray-500"
            icon={faSearch}
          />
        </div>

        {tab === "style" ? (
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold">Soals</h1>
            <div className="flex flex-wrap w-[100%] gap-9 ">
              <img width={150} height={150} src="1st.svg" alt="" />
              <img width={150} height={150} src="2nd.svg" alt="" />
              <img width={150} height={150} src="3rd.svg" alt="" />
            </div>
            <div className="flex flex-wr ap justify-between items-center"></div>
          </div>
        ) : (
          ""
        )}
        {tab === "accents" ? (
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold">Accents</h1>
            <div className="flex flex-wr ap justify-between items-center"></div>
          </div>
        ) : (
          ""
        )}
        <div>
          {/* Product List */}
          {tab === "fabric" ? (
            <div className="grid grid-cols-2 gap-6 overflow-y-auto">
              <section className="flex flex-col gap-2">
                <div className="rounded overflow-hidden">
                  <img
                    className="w-full"
                    src="https://d2w9m16hs9jc37.cloudfront.net/dimg/fabric/shirt/3023_huge_c300.jpg"
                    alt="Fabric"
                    onClick={() => setColor("yellow")}
                  />
                </div>
                <div className="flex justify-between text-xs font-semibold">
                  <span>Poppin</span>
                  <span>$69</span>
                </div>
                <span className="text-xs text-gray-600">
                  Cotton . Year Around
                </span>
              </section>
              <section className="flex flex-col gap-2">
                <div className="rounded overflow-hidden">
                  <img
                    onClick={() => setColor("blue")}
                    className="w-full"
                    src="https://d2w9m16hs9jc37.cloudfront.net/dimg/fabric/shirt/2740_huge_c300.jpg"
                    alt="Fabric"
                  />
                </div>
                <div className="flex justify-between text-xs font-semibold">
                  <span>Poppin</span>
                  <span>$69</span>
                </div>
                <span className="text-xs text-gray-600">
                  Cotton . Year Around
                </span>
              </section>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 bg-white p-10 shadow-lg flex flex-col justify-between overflow-y-scroll">
        <div className="flex justify-between items-center mb-8 h-[35vh] md:h-max overflow-y-hidden">
          <div className="flex items-center gap-3 text-gray-700">
            <FontAwesomeIcon className="text-xl" icon={faBars} />
            <span className="text-xl font-bold">Website</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <FontAwesomeIcon className="text-xl" icon={faExternalLink} />
            <FontAwesomeIcon className="text-xl" icon={faHeart} />
            <FontAwesomeIcon className="text-xl" icon={faShoppingBag} />
          </div>
        </div>

        {/* Main Content with Centered SVG */}
        <div className="flex  justify-start    items-start mb-[10vh] overflow-y-hidden  ">
          {/* Left-side Text */}
          <div className="flex flex-col items-center gap-6 text-gray-700">
            <div
              className="flex flex-col items-center gap-2 cursor-pointer"
              onClick={() => setTab("fabric")}
            >
              <FontAwesomeIcon className="text-2xl" icon={faPaperclip} />
              <span className="text-xs uppercase">Fabric</span>
            </div>
            <div
              className="flex flex-col items-center gap-2 cursor-pointer "
              onClick={() => setTab("style")}
            >
              <FontAwesomeIcon className="text-2xl" icon={faScissors} />
              <span className="text-xs uppercase">Style</span>
            </div>
            <div
              className="flex flex-col items-center gap-2 cursor-pointer"
              onClick={() => setTab("accents")}
            >
              <FontAwesomeIcon className="text-2xl" icon={faPaperclip} />
              <span class="text-xs uppercase">Accents</span>
            </div>
          </div>

          {/* Centered SVG */}
          <div className="flex justify-center flex-1">
            <div className=" w-[70vw] h-[70vh] md:w-[30vw]  md:h-1/2 flex justify-center items-center text-center mr-10">
              <div className="relative w-full h-max overflow-y-hidden">
                <ShoeSider />
              </div>
            </div>

            {/* Right-side Content */}
            <div className="flex flex-col gap-4 text-right text-gray-700">
              <div>
                <h1 className="text-2xl font-bold uppercase">
                  Your Custom Shirt
                </h1>
              </div>
              <div className="flex flex-col gap-2 text-gray-600">
                <span className="text-xl">$49</span>
                <span className="text-xs">VAT included</span>
              </div>
              <Link to="/billing" className="px-6 py-2 text-lg text-center text-white bg-yellow-600 rounded hover:bg-yellow-700 transition">
                Next
              </Link>
              <div className="flex flex-col items-center gap-2 text-gray-700">
                <span className="text-sm">
                  Order today, receive in 3 weeks.
                </span>
                <div className="flex items-center gap-2">
                  <button class="w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-200 transition">
                    +
                  </button>
                  <span className="text-sm">ZOOM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customization;
