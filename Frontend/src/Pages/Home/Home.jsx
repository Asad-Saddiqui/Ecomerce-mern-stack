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
import { getproduct } from '../../store/actions/authActions';
import { getbrand } from '../../store/actions/authActions';
import { getcategory } from '../../store/actions/authActions';

const Home = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.products);
  const { brand } = useSelector(state => state.brand);
  const category = useSelector(state => state.category);
  useEffect(() => {
    dispatch(getproduct());
    dispatch(getbrand());
    dispatch(getcategory());
  }, []);
  console.log({ category })
  console.log({ Product: data })
  console.log({ brand })
  return (
    <div>
      <div>
        <Top />
        <Navbar />
        <TopSec category={category} />
      </div>
      <div>
        {data &&
          <Products products={data} />
        }
      </div>
      {data && <BestSellingProducts products={data} />}
      <ImageComp />
      <Categories />
      <ImagesSec />
      <Feature />
      <Footer />

    </div>
  );
};

export default Home;
