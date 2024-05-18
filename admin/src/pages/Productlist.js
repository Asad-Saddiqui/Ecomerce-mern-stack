import React, { useEffect } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, delete_single_aproduct } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Sold",
    dataIndex: "sold",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Remaning",
    dataIndex: "remaning",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Discount",
    dataIndex: "discount",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Productlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const handledeleteProduct = () => {
    console.log("click button");
  }
  const productState = useSelector((state) => state.product.products);
  const data1 = [];
  console.log({ productState })
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i].title,
      brand: productState[i].brand,
      category: productState[i].category,
      quantity: `${productState[i].quantity + productState[i].sold}`,
      remaning: `${productState[i].sold}`,
      discount: `${productState[i].discount}`,
      sold: `${productState[i].quantity - productState[i].sold}`,
      price: `${productState[i].price}`,
      action: (
        <>
          <Link to={`/admin/product/${productState[i]._id}`} className=" fs-3 text-danger">
            <BiEdit />
          </Link>
          <Link className="ms-3 fs-3 text-danger">
            <AiFillDelete onClick={async (e) => {
              e.preventDefault();
              console.log(productState, productState[i])
              let delete_ = await dispatch(delete_single_aproduct(productState[i]._id));
              if (delete_.type === "product/detele-a-products/fulfilled") {
                dispatch(getProducts());
                toast.success("Product Deleted Successfully")
              }
            }} />
          </Link>
        </>
      ),
    });
  }
  console.log(data1);
  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
        <ToastContainer />
      </div>
    </div>
  );
};

export default Productlist;
