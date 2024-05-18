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
    title: "Color & Size",
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
  let { isError, isLoading, isSuccess, orderbyuser } = useSelector((state) => state.auth);
  console.log({ isError, isLoading, isSuccess, orderbyuser })
  // let myproducts = orderState && (orderState[0] ? orderState[0].products : "")
  const data1 = [];
  if (orderbyuser) {
    for (let i = 0; i < orderbyuser.products.length; i++) {
      data1.push({
        key: i + 1,
        name: orderbyuser.products[i].product.title,
        brand: orderbyuser.products[i].product.brand,
        count: orderbyuser.products[i].count,
        amount: "$" + orderbyuser.products[i].product.price + ".00",
        color: (
          <div style={{ display: "flex" }}>
            {orderbyuser.products[i].color.map((col, index) => (
              <div
                key={index}
                style={{
                  margin: "4px",
                  backgroundColor: `${col.title}`,
                  width: "20px",
                  height: "20px",
                  textAlign: "center"
                }}
              >
                {orderbyuser.products[i].size[index]}
              </div>
            ))}
          </div>
        ),
        date: orderbyuser.products[i].product.createdAt,
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
        Name:{orderbyuser && (orderbyuser.orderby.firstname + " " + (orderbyuser.orderby.lastname ? orderbyuser.orderby.lastname : ""))}
      </div>
      <div>
        Email:{orderbyuser && orderbyuser.orderby.email}
      </div>
      <div>
        Phone # :{orderbyuser && orderbyuser.phoneNumber}
      </div>
      <div>
        City  :{orderbyuser && orderbyuser.townCity}      </div>
      <div>
        Address :{orderbyuser && orderbyuser.streetAddress}
      </div>
      {orderbyuser && orderbyuser.company && (<>
        <div>
          Company :{orderbyuser && orderbyuser.company}
        </div>

      </>)}

      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;
