import React, { useEffect } from 'react'
import Top from '../../Components/Top/Top'
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../Api/Order/orderSlice';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import Skeleton from '@mui/material/Skeleton';
import { Link } from 'react-router-dom';
function Order() {
    const { status, Orders, error } = useSelector(state => state.Myorder)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrders())

    }, [])
    console.log({ status, Orders, error })

    return (
        <>
            <Top />
            <Navbar />
            <div className='container mx-auto my-10 px-4 sm:px-6 lg:px-8 flex flex-col gap-16'>
                {status === 'loading' &&
                    <>
                        <Skeleton height={40} />
                        <Skeleton animation="wave" height={40} />
                        <Skeleton animation="wave" height={40} />
                        <Skeleton animation="wave" height={40} />
                    </>

                }

                {status === 'succeeded' && <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
                    <h2 style={{ textAlign: "center" }}>Orders</h2>
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Sr #
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Quantity
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Order Status
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Payment Status
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {Orders && (Orders.length > 0 ? Orders.map((item, index) => (
                            <tr>
                                <td className="px-3 py-4 text-gray-700 whitespace-nowrap" style={{ display: "flex", justifyContent: "flex-start", alignItems: "baseline" }}>
                                    {/* <img style={{ width: "60px", height: "50px" }} src={`http://localhost:5000/public/${item.image[0].url}`} /> */}
                                    {index + 1}
                                </td>
                                <td className="px-3 py-4 text-gray-700 whitespace-nowrap">
                                    $ {item.paymentIntent.transactions[0].amount.total}
                                </td>
                                <td className="px-3 py-4 text-gray-700 whitespace-nowrap">
                                    {item.products.length}
                                </td>
                                <td className="px-3 py-4 text-gray-700 whitespace-nowrap">
                                    {item.orderStatus}
                                </td>
                                <td className="px-3 py-4 text-gray-700 whitespace-nowrap">
                                    {item.paymentIntent.status}
                                </td>
                                <td className="px-3 py-4 text-gray-700 whitespace-nowrap">
                                    <Link to={`/order/details/${item._id}`}>Details</Link>
                                </td>
                            </tr>
                        )) : "No data")}
                    </tbody>
                </table>}

            </div>
            <Footer />
        </>
    )
}

export default Order