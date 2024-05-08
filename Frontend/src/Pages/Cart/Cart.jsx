import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Top from "../../Components/Top/Top";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { _addtocartUpdate, _carts, _deletecart } from '../../Api/cart/cartSlice';
import "./Cart.css";
import { ToastContainer, toast } from 'react-toastify';
const Button = ({ children, className, onClick }) => (
  <button
    className={`border border-black px-4 py-2 rounded ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const Cart = () => {
  let dispatch = useDispatch();
  let { carts } = useSelector((state) => state.addcart)
  const [_product, set_product] = useState([]);
  const [_updateCarts, set_updateCarts] = useState([]);
  const [_count, setCount] = useState([]);
  const [productDetail, setProductDetail] = useState([]);
  const [subtotal, setSubtotal] = useState();

  useEffect(() => {
    let carts_ = dispatch(_carts());
    carts_.then((data) => {
      if (data.error) {
        throw Error(data.payload);
      }
      if (Array.isArray(data.payload)) {
        let mydata = data.payload.map((item, i) => {
          let obj = {
            _id: item._id,
            Product: item.products[0].product._id,
            title: item.products[0].product.title,
            image: item.products[0].product.images,
            count: item.products[0].count,
            color: item.products[0].color,
            size: item.products[0].size,
            price: item.products[0].price
          }
          return obj;
        })

        setProductDetail(mydata)
        setSubtotal(calculateSubtotal(mydata))
        set_product(mydata);
      }
    })
  }, []);
  let usercart = carts
  // // // console.log(({ productDetail })

  const calculateSubtotal = (data) =>
    data.reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );




  const incrementQuantity = (item, index) => {

    setProductDetail(prev =>
      prev.map((item_, i) => {
        if (i === index) {
          return {
            ...item_,
            count: item_.count === undefined || item_.count === 0 ? 1 : item_.count + 1,
            color: [...item_.color, item_.color[0]],
            size: [...item_.size, item_.size[0]]
          };
        } else {
          return item_;
        }
      })
    );
  };


  const decrementQuantity = (item, index) => {
    setProductDetail((prev) =>
      prev.map((item__, i) =>
        i === index && item__.count > 0
          ? {
            ...item__,
            count: item__.count <= 1 ? 1 : item__.count - 1,
            // Remove the last element from the size array if it has more than one element
            size: item__.size.length > 1 ? item__.size.slice(0, -1) : item__.size,
            // Remove the last element from the color array if it has more than one element
            color: item__.color.length > 1 ? item__.color.slice(0, -1) : item__.color,
          }
          : item__
      )
    );
  };

  const updateCart = (e, productDetail) => {
    setSubtotal(calculateSubtotal(productDetail))
    dispatch(_addtocartUpdate(productDetail))
    dispatch(_carts())
  }
  const handleDeleteCart = (e, item, i) => {
    e.preventDefault();
    console.log({ deleted: item })
    dispatch(_deletecart(item._id))
    let carts_ = dispatch(_carts());
    carts_.then((data) => {
      if (data.error) {
        throw Error(data.payload);
      }
      if (Array.isArray(data.payload)) {
        let mydata = data.payload.map((item, i) => {
          let obj = {
            _id: item._id,
            Product: item.products[0].product._id,
            title: item.products[0].product.title,
            image: item.products[0].product.images,
            count: item.products[0].count,
            color: item.products[0].color,
            size: item.products[0].size,
            price: item.products[0].price
          }
          return obj;
        })

        setProductDetail(mydata)
        setSubtotal(calculateSubtotal(mydata))
        set_product(mydata);
      }
    })
    toast.success("Cart Deleted Successfuly")


  }
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
              {productDetail && (productDetail.length > 0 ? productDetail.map((item, index) => (
                <tr key={index}>
                  <td className="px-3 py-4 text-gray-700 whitespace-nowrap" style={{ display: "flex", justifyContent: "flex-start", alignItems: "baseline" }}>
                    <img style={{ width: "60px", height: "50px" }} src={`http://localhost:5000/public/${item.image[0].url}`} />
                    <p>{item.title}</p>
                    <button className="btndelete" onClick={(e) => handleDeleteCart(e, item, index)}>x</button>
                  </td>
                  <td className="px-3 py-4 text-gray-700 whitespace-nowrap">
                    {item.price}
                  </td>
                  <td className="px-3 py-4 text-gray-700 whitespace-nowrap">
                    <div className="flex items-center border border-gray-300 rounded-lg px-1 py-1">
                      <button
                        onClick={() => decrementQuantity(item, index)}
                        className="px-2 py-1 hover:bg-gray-200 rounded-l-lg"
                      >
                        <FontAwesomeIcon icon={faAngleDown} />
                      </button>
                      <div className="px-2 py-1 text-center">
                        {item.count}
                      </div>
                      <button
                        onClick={() => incrementQuantity(item, index)}
                        className="px-2 py-1 hover:bg-gray-200 rounded-r-lg"
                      >
                        <FontAwesomeIcon icon={faAngleUp} />
                      </button>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-gray-700 whitespace-nowrap">
                    ${item.count * item.price}
                  </td>
                </tr>
              )) : "No data")}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
          <Button className="mb-4 sm:mb-0 hover:bg-red-500 hover:text-white duration-300">Return to Shop</Button>
          <Button className="hover:bg-red-500 hover:text-white duration-300" onClick={(e) => updateCart(e, productDetail)}>Update Cart</Button>
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
        <ToastContainer />

      </div>
      <Footer />
    </div>
  );
};

export default Cart;
