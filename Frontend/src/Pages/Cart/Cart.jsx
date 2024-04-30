import React, { useState, useEffect } from "react";
import Top from "../../Components/Top/Top";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Button = ({ children, className, onClick }) => (
  <button
    className={`border border-black px-4 py-2 rounded ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const Cart = () => {
  const [productDetail, setProductDetail] = useState([
    {
      name: "Shoes",
      price: 60,
      quantity: 2,
    },
    {
      name: "Watch",
      price: 10,
      quantity: 2,
    },
    {
      name: "Chair",
      price: 620,
      quantity: 2,
    },
  ]);

  const calculateSubtotal = () =>
    productDetail.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

  const [subtotal, setSubtotal] = useState(calculateSubtotal());

  useEffect(() => {
    setSubtotal(calculateSubtotal());
  }, [productDetail]);

  const incrementQuantity = (index) => {
    setProductDetail((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (index) => {
    setProductDetail((prev) =>
      prev.map((item, i) =>
        i === index && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <div>
      <Top />
      <Navbar />
      <div className="container mx-auto my-10 px-4 sm:px-6 lg:px-8 flex flex-col gap-16">
        <h1>
          Home / <span className="font-bold">Cart</span>
        </h1>

        {/* Responsive table with horizontal scrolling */}
        <div className="overflow-x-auto w-full">
          <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productDetail.map((item, index) => (
                <tr key={index}>
                  <td className="px-3 py-4 text-gray-700 whitespace-nowrap">
                    {item.name}
                  </td>
                  <td className="px-3 py-4 text-gray-700 whitespace-nowrap">
                    ${item.price}
                  </td>
                  <td className="px-3 py-4 text-gray-700 whitespace-nowrap">
                    <div className="flex items-center border border-gray-300 rounded-lg px-1 py-1">
                      <button
                        onClick={() => decrementQuantity(index)}
                        className="px-2 py-1 hover:bg-gray-200 rounded-l-lg"
                      >
                        <FontAwesomeIcon icon={faAngleDown} />
                      </button>
                      <div className="px-2 py-1 text-center">{item.quantity}</div>
                      <button
                        onClick={() => incrementQuantity(index)}
                        className="px-2 py-1 hover:bg-gray-200 rounded-r-lg"
                      >
                        <FontAwesomeIcon icon={faAngleUp} />
                      </button>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-gray-700 whitespace-nowrap">
                    ${item.quantity * item.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
          <Button className="mb-4 sm:mb-0 hover:bg-red-500 hover:text-white duration-300">Return to Shop</Button>
          <Button className="hover:bg-red-500 hover:text-white duration-300">Update Cart</Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between mt-6">
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <input
              type="text"
              placeholder="Coupon Code"
              className="py-2 px-4 border-[1px] rounded border-black outline-none"
            />
            <Button className="bg-red-500 text-white border-none">Apply Coupon</Button>
          </div>
          
          <section className="flex flex-col gap-4 border-[1px] border-black rounded p-4 w-full sm:w-[300px]">
            <h2 className="font-bold text-center">Cart Total</h2>
            <div className="flex justify-between border-b pb-2">
              <h3>Subtotal:</h3>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <h3>Shipping:</h3>
              <span>Free</span>
            </div>
            <div className="flex justify-between">
              <h3>Total:</h3>
              <span>${subtotal}</span>
            </div>
            <Link to="/billing">
            <Button className="bg-red-500 text-white border-none">Proceed to Checkout</Button>
            </Link>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
