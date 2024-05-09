import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { getOrderByUser, getOrders } from "../features/auth/authSlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const ViewOrder = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderByUser(userId));
  }, [userId]);
  let orderState = useSelector((state) => state.auth.orderbyuser);
  let myproducts = orderState && (orderState[0] ? orderState[0].products : "")
  console.log({orderState,myproducts});
  const data1 = [];
  if (myproducts) {
    for (let i = 0; i < myproducts.length; i++) {
      data1.push({
        key: i + 1,
        name: myproducts[i].product.title,
        brand: myproducts[i].product.brand,
        count: myproducts[i].count,
        amount: myproducts[i].product.price,
        color: (
          <div style={{ display: "flex" }}>
            {myproducts[i].color.map((col, index) => (
              <div
                key={index}
                style={{
                  margin: "4px",
                  backgroundColor: `${col.title}`,
                  width: "20px",
                  height: "20px",
                }}
              >
                {/* Optionally, you can display the color name */}
                {/* {col.title} */}
              </div>
            ))}
          </div>
        ),
        date: myproducts[i].product.createdAt,
        action: (
          <>
            <Link to="/" className=" fs-3 text-danger">
              <BiEdit />
            </Link>
            <Link className="ms-3 fs-3 text-danger" to="/">
              <AiFillDelete />
            </Link>
          </>
        ),
      });
    }
  }
  return (
    <div>
      <h3 className="mb-4 title">View Order</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;
