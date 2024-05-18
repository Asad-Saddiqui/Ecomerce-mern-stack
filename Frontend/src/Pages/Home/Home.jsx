import React, { useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import TopSec from "../../Components/topSec/TopSec";
import Products from "../../Components/Product/Products";
import Footer from "../../Components/Footer/Footer";
import Top from "../../Components/Top/Top";
import Categories from "../../Components/Categories/Categories";
import SellingProduct from "../../Components/SellingProduct/SellingProduct";
import ImageComp from "../../Components/ImageCom/ImageComp";
import ImagesSec from "../../Components/ImagesSec/ImagesSec";
import Feature from "../../Components/Feature/Feature";
import BestSellingProducts from "../../Components/BestSellingProducts/BestSellingProducts";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../Api/Product/productSlice';
import { getcategory } from "../../Api/category/categorySlice";
import Slider from "../../Components/Slider/Slider";

// import { getbrand } from '../../store/actions/authActions';
// import { getcategory } from '../../store/actions/authActions';

const Home = () => {
  const dispatch = useDispatch();
  const { products, product, status, error } = useSelector(state => state.product);
  const { category } = useSelector(state => state.cat_);
  // const { brand } = useSelector(state => state.brand);
  useEffect(() => {
    dispatch(fetchProducts());
    // dispatch(getbrand());
    dispatch(getcategory());
  }, []);
  let data = products


  function isToday(dateString) {
    const createdAtDate = new Date(dateString);
    const today = new Date();

    console.log('createdAtDate:', createdAtDate);
    console.log('today:', today);

    return (
      createdAtDate.getDate() === today.getDate() &&
      createdAtDate.getMonth() === today.getMonth() &&
      createdAtDate.getFullYear() === today.getFullYear()
    );
  }

  // Assuming 'data' is the array of products
  let todayProduct = data
    ? data.length > 0
      ? data.filter(item => {
        const isCreatedToday = isToday(item.createdAt);
        console.log(`Product: ${item.title}, Created Today: ${isCreatedToday}`);
        return isCreatedToday;
      })
      : []
    : "";

  let discountProduct = data ? data.length > 0 ? data.filter(product => product.discount > 0) : [] : "";
  console.log({ todayProduct })
  return (
    <div>
      <div>
        <Top />
        <Navbar />
        <TopSec category={category} products={discountProduct} />
      </div>
      <div>
        {data &&
          <Products offer={true} title="Today Products" products={todayProduct} />
        }
      </div>
      <Categories category={category} />
      <div className="w-full  my-10">
        <Slider />

      </div>
      {data && <Products offer={false} title="All Products" products={data} />}
      <ImageComp />
      <ImagesSec />
      <Feature />
      <Footer />

    </div>
  );
};

export default Home;
