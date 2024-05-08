import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import Top from '../../Components/Top/Top';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../../Api/Product/productSlice';
import { _addtocart, _carts } from '../../Api/cart/cartSlice';

const SingleProduct = () => {
  const { id } = useParams();

  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  let [size_, setSize_] = useState([selectedSize]);
  const { products, product, status, error } = useSelector(state => state.product);
  let token = localStorage.getItem('auth') ? localStorage.getItem('auth') : null;
  useEffect(() => {
    dispatch(fetchProductById({ id }))
  }, [id])
  let Sdata = product ? product : null;
  const basePrice = Sdata ? Sdata.price : 0;
  const [totalPrice, setTotalPrice] = useState(basePrice);
  // console.log({ products, product, status, error })

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    setTotalPrice(newQuantity * basePrice);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      setTotalPrice(newQuantity * basePrice);
    }
  };

  const imageSources = [
    { _id: 1, url: "https://via.placeholder.com/446x315", alt: "Main Image" },
    { _id: 2, src: "https://via.placeholder.com/121", alt: "Thumbnail 1" },
    { _id: 3, src: "https://via.placeholder.com/112", alt: "Thumbnail 2" },
    { _: 4, src: "https://via.placeholder.com/134", alt: "Thumbnail 3" },
  ];
  let img = Sdata ? Sdata.images[0] : null;

  const [mainImage, setMainImage] = useState(imageSources[0]);

  const [color_, setColor] = useState(0);
  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };
  const handleThumbnailClickColor = (color, i) => {
    setColor(i);

  }

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };
  console.log({ size_ })

  const handleAddtocart = async (e) => {
    e.preventDefault();
    let color = Sdata.color[color_]._id;
    let size = selectedSize;
    let price_ = Sdata.price;
    let addCart = await dispatch(_addtocart([{ product: id, color, price: price_, size, count: quantity }]))
    console.log({ addCart })
    dispatch(_carts());
  }
  return (

    <>

      <Top />
      <Navbar />


      <div className="container mx-auto px-4 py-6">
        {/* Responsive layout based on screen size */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Thumbnail images on the left for larger screens and below for smaller screens */}
          <div className="flex md:flex-col flex-row overflow-x-auto md:space-y-4 space-x-4">

            {Sdata && Sdata.images.length > 0 && Sdata.images.map((image) => (
              <div
                key={image._id}
                className="w-24 h-24 md:w-32 md:h-32 bg-gray-200 rounded overflow-hidden shadow cursor-pointer transition-transform transform hover:scale-105"
                onClick={() => handleThumbnailClick(image)}
              >
                <img
                  className="w-full h-full object-cover"
                  src={"http://localhost:5000/public/" + image.url}
                  alt="NO"
                />
              </div>
            ))}


            {Sdata && Sdata.color.length > 0 && Sdata.color.map((color, i) => (
              <div
                key={color._id}
                style={{ backgroundColor: `${color.color}`, border: `${color_ === i ? "3px solid black" : " "}` }}
                className="w-24 h-24 md:w-20 md:h-20  rounded overflow-hidden shadow cursor-pointer transition-transform transform"
                onClick={() => handleThumbnailClickColor(color, i)}
              >

              </div>
            ))}

          </div>



          {/* Main Product Image */}
          <div className="flex justify-center items-center md:flex-1">
            <img
              className="w-64 h-64 md:w-96 md:h-96 bg-gray-200 rounded overflow-hidden shadow-lg"
              src={img && "http://localhost:5000/public/" + img.url}
              alt="No"
            />
          </div>

          {/* Product details */}
          <div className="flex flex-col space-y-4 md:flex-1">
            {/* Product Name */}
            <h1 className="text-3xl font-semibold">{Sdata && Sdata.title}</h1>

            {/* Star Ratings */}
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={i < 4 ? faStarSolid : faStarRegular}
                  className="text-yellow-400"
                />
              ))}
              <span className="ml-2 text-gray-600 text-sm">(150 Reviews)</span>
            </div>

            {/* Base Price */}
            <p className="text-2xl font-bold">${Sdata && Sdata.price}</p>

            {/* Total Price */}
            <p className="text-xl font-semibold">Total: ${totalPrice}</p>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <button
                className="w-10 h-10 flex justify-center items-center border rounded border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                onClick={decreaseQuantity}
              >
                -
              </button>
              <p className="text-2xl">{quantity}</p>
              <button
                className="w-10 h-10 flex justify-center items-center border rounded border-gray-300 bg-red-500 text-white hover:bg-red-600"
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>

            {/* Size Selector */}
            <div className="flex items-center space-x-4">
              <div className="text-xl">Size:</div>
              {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                <div
                  key={size}
                  className={`w-8 h-8 flex justify-center items-center rounded border border-black ${selectedSize === size ? 'bg-red-500 text-white' : 'bg-white'
                    }`}
                  onClick={() => handleSizeChange(size)}
                >
                  {size}
                </div>
              ))}
            </div>

            {/* Buy Now Button */}


            {token ?
              <>
                <form>
                  <button onClick={handleAddtocart} className="w-full bg-gray-800 text-white rounded-lg my-2 py-2 hover:bg-gray-600 transition">
                    Add to cart
                  </button>
                  <button className=" w-full bg-red-500 text-white rounded-lg  my-2 py-2 hover:bg-red-600 transition">
                    Buy Now
                  </button>
                </form>
              </> :
              <>
                <button className="w-full bg-gray-800 text-white rounded-lg  my-2 py-2 hover:bg-gray-600 transition">
                  Add to cart
                </button>
                <button className=" w-full bg-red-500 text-white rounded-lg   my-2 py-2 hover:bg-red-600 transition">
                  Buy Now
                </button>
              </>
            }





            {/* Description */}
            <p className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: Sdata ? Sdata.description : "" }}>

            </p>

            {/* Additional Information */}
            <div className="border border-gray-300 rounded-lg p-4">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                  <div className="flex-col">
                    <div className="text-black text-base font-medium">Free Delivery</div>
                    <div className="text-black text-xs underline">
                      Enter your postal code for Delivery Availability
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                  <div className="flex-col">
                    <div className="text-black text-base font-medium">Return Delivery</div>
                    <div className="text-black text-xs">
                      Free 30-Day Returns. <span className="underline">Details</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingleProduct;
