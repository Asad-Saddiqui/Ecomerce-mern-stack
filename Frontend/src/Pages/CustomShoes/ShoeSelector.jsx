import { faScissors } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShoesData } from "./../ShoesData/ShoesData";

const ShoeSelector = () => {
  const location = useLocation();
  const locationShoe = location.state; // Detail coming from `location.state`

  // Add the shoe from `location.state` to the start of `ShoesData`
  const shoeData = locationShoe ? [locationShoe, ...ShoesData] : [...ShoesData];
  
  const [selectedShoe, setSelectedShoe] = useState(locationShoe || shoeData[0]);
  const navigate = useNavigate();
  const [section, setSection] = useState("main");

  const handlePlaceOrder = () => {
    navigate("/billing", { state: { shoe: selectedShoe } });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left side: Selected shoe */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold overflow-y-hidden">{selectedShoe.name}</h2>
        <img
          src={selectedShoe.img}
          alt={selectedShoe.name}
          className="w-2/3 h-2/3 rounded-lg shadow-lg my-4"
        />
        <p className="text-xl text-gray-600 overflow-y-hidden">Price: ${selectedShoe.price}</p>
        <p className="text-sm text-gray-500 overflow-y-hidden">Reviews: {selectedShoe.reviews}</p>
        <button
          className="mt-4 px-6 py-3 overflow-y-hidden bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>

      {/* Right side: Shoe list */}
      <div className="w-1/3 flex flex-col space-y-4 overflow-y-auto bg-white p-6 rounded-lg shadow-lg h-full">
        {shoeData.map((shoe) => (
          <div
            key={shoe.id}
            className={`flex items-center justify-between p-3 rounded-lg transition duration-150 ease-in-out ${
              shoe.id === selectedShoe.id
                ? "bg-blue-100"
                : "bg-gray-50 hover:bg-gray-200"
            }`}
            onClick={() => setSelectedShoe(shoe)}
          >
            <img
              src={shoe.img}
              alt={shoe.name}
              className="w-12 h-auto rounded-full"
            />
            <div className="flex flex-col ml-4">
              <h3 className="text-lg font-semibold">{shoe.name}</h3>
              <p className="text-sm text-gray-500">Price: ${shoe.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoeSelector;
