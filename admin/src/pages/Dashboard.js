import { Card, Col, Row } from 'antd';
import { getUsers } from "../features/cutomers/customerSlice";
import { getProducts } from "../features/product/productSlice";
import { getOrders } from "../features/auth/authSlice";
import { getBlogs } from "../features/blogs/blogSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getProducts());
    dispatch(getBlogs());
    dispatch(getOrders());
    dispatch(getCategories());

  }, []);
  const customerstate = useSelector((state) => state.customer.customers);
  const productState = useSelector((state) => state.product.products);
  const orderState = useSelector((state) => state.auth.orders);
  const getBlogState = useSelector((state) => state.blogs.blogs);
  const pCatStat = useSelector((state) => state.pCategory.pCategories);
  let likedVideos = productState ? productState.filter((item) => item.isisLiked) : [];



  return (
    <>

      <Row gutter={16}>
        <Col style={{ marginTop: '10px' }} span={8}>
          <Card title="Total User" bordered={false}>
            {customerstate && customerstate.length}
          </Card>
        </Col>
        <Col style={{ marginTop: '10px' }} span={8}>
          <Card title="Total Product" bordered={false}>
            {productState ? productState.length : 0}
          </Card>
        </Col>
        <Col style={{ marginTop: '10px' }} span={8}>
          <Card title="Total Blogs" bordered={false}>
            {getBlogState ? getBlogState.length : 0}
          </Card>
        </Col>

        <Col style={{ marginTop: '10px' }} span={8}>
          <Card title="Liked Products" bordered={false}>
            {likedVideos ? likedVideos.length : 0}
          </Card>
        </Col>
        <Col style={{ marginTop: '10px' }} span={8}>
          <Card title="Product Category" bordered={false}>
            {pCatStat ? pCatStat.length : 0}
          </Card>
        </Col>
        <Col style={{ marginTop: '10px' }} span={8}>
          <Card title="Brands" bordered={false}>
            6
          </Card>
        </Col>
        <Col style={{ marginTop: '10px' }} span={8}>
          <Card title="Total Orders" bordered={false}>
            {orderState ? orderState.length : 0}
          </Card>
        </Col>
        <Col style={{ marginTop: '10px' }} span={8}>
          <Card title="Today Orders" bordered={false}>
            6
          </Card>
        </Col>
      </Row>
    </>
  )
}
export default Dashboard;
