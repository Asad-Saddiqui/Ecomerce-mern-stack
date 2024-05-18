import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { deleteOrderByid, getOrders, updateOrderByid } from "../features/auth/authSlice";
import { Divider, Flex, Tag } from 'antd';
import { Button, Modal } from 'antd';
import { Select } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Space } from 'antd';
const { confirm } = Modal;
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Payment Status",
    dataIndex: "spaymenttatus",
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

const Orders = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [order_, setOrder_] = useState("");
  const [selector, setselector] = useState("");
  const dispatch = useDispatch();
  const showDeleteConfirm = async (id) => {
    confirm({
      title: 'Are you sure delete this task?',
      icon: <ExclamationCircleFilled />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        let deletes = dispatch(deleteOrderByid({ _id: id }));
        deletes.then((data) => {
          if (data.type === "order/delete-order/fulfilled") {
            dispatch(getOrders());
          }
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const showModal = (order) => {
    setIsModalOpen(true);
    setOrder_(order)
  };

  const handleOk = async () => {
    if (selector && order_) {
      let order_s = await dispatch(updateOrderByid({ selector, _id: order_._id }));
      console.log({ order_s })
      if (order_s.type === 'order/update-order/fulfilled') {
        dispatch(getOrders());
        setIsModalOpen(false);
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const getColors = (status) => {
    switch (status) {
      case 'Not Paid':
        return 'warning';
      case 'Paid':
        return 'success'; // Example color
      default:
        return 'default'; // Default color
    }
  };
  const getColor = (status) => {
    switch (status) {
      case 'Not Processed':
        return 'warning';
      case 'Cash on Delivery':
        return 'processing'; // Example color
      case 'Processing':
        return 'processing';
      case 'Dispatched':
        return 'success'; // Example color
      case 'Cancelled':
        return 'error'; // Example color
      case 'Delivered':
        return 'success';
      default:
        return 'default'; // Default color
    }
  };

  const orderState = useSelector((state) => state.auth.orders);
  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i].orderby.firstname,
      product: (
        <Link to={`/admin/order/${orderState[i]._id}`}>
          View Order
        </Link>
      ),
      amount: "$" + orderState[i].paymentIntent.transactions[0].amount.total,
      status: (
        <Tag color={getColor(orderState[i].orderStatus)}>
          {orderState[i].orderStatus}
        </Tag>
      ),
      spaymenttatus: (<>
        <Tag color={getColors(orderState[i].paymentIntent.status)}>
          {orderState[i].paymentIntent.status}
        </Tag>
      </>),
      date: new Date(orderState[i].createdAt).toLocaleString(),
      action: (
        <>
          <Link className="ms-3 fs-3 text-success" >
            <BiEdit onClick={() => showModal(orderState[i])} />
          </Link>

          <Link className="ms-3 fs-3 text-danger" >
            <AiFillDelete onClick={() => showDeleteConfirm((orderState[i]._id))} />
          </Link>
        </>
      ),
    });
  }
  const handleSelectChange = (value) => {
    setselector(value)
  };
  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>{<Table columns={columns} dataSource={data1} />}</div>
      <Modal title="Basic Modal" style={{
        height: 400,

      }} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Select
          showSearch
          style={{
            width: 400,
          }}
          placeholder="Search to Select"
          optionFilterProp="children"
          filterOption={(input, option) => (option.label ?? '').includes(input)}
          filterSort={(optionA, optionB) =>
            (optionA.label ?? '').toLowerCase().localeCompare((optionB.label ?? '').toLowerCase())
          }
          onChange={handleSelectChange} // Call handleSelectChange when the selection changes
          options={[
            {
              value: 'Not Processed',
              label: 'Not Processed',
            },
            {
              value: 'Cash on Delivery',
              label: 'Cash on Delivery',
            },
            {
              value: 'Processing',
              label: 'Processing',
            },
            {
              value: 'Dispatched',
              label: 'Dispatched',
            },
            {
              value: 'Cancelled',
              label: 'Cancelled',
            },
            {
              value: 'Delivered',
              label: 'Delivered',
            },
          ]}
        />
      </Modal>
    </div>
  );
};

export default Orders;
