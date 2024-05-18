import React, { useEffect } from 'react';
import Top from '../../Components/Top/Top';
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../Api/Order/orderSlice';
import Skeleton from '@mui/material/Skeleton';
import { useParams } from 'react-router-dom';

function OrderDetails() {
    const { id } = useParams();
    const { status, Orders, error } = useSelector(state => state.Myorder);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch, id]);

    console.log({ id, status, Orders, error });

    let Products = status === "succeeded" && Orders.find((item) => item._id === id);
    console.log({ Products });

    return (
        <>
            <Top />
            <Navbar />
            <div className='container mx-auto my-10 px-4 sm:px-6 lg:px-8 flex flex-col gap-16'>
                {status === 'loading' && (
                    <>
                        <Skeleton height={40} />
                        <Skeleton animation="wave" height={40} />
                        <Skeleton animation="wave" height={40} />
                        <Skeleton animation="wave" height={40} />
                    </>
                )}

                {status === 'failed' && (
                    <div className="text-red-500">Error: {error}</div>
                )}

                {status === 'succeeded' && (
                    <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sr #</th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {Products && Products.products.length > 0 ? (
                                Products.products.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-3 py-4 text-gray-700 whitespace-nowrap" style={{ display: "flex", justifyContent: "flex-start", alignItems: "baseline" }}>
                                            {index + 1}
                                        </td>
                                        <td className="px-3 py-4 text-gray-700 whitespace-nowrap">
                                            {item.product.title}
                                        </td>
                                        <td className="px-3 py-4 text-gray-700 whitespace-nowrap">
                                            {item.product.category}
                                        </td>
                                        <td className="px-3 py-4 text-gray-700 whitespace-nowrap">
                                            {item.product.brand}
                                        </td>
                                        <td className="px-3 py-4 text-gray-700 whitespace-nowrap">
                                            $ {item.product.price}.00
                                        </td>
                                        <td className="px-3 py-4 text-gray-700 whitespace-nowrap">
                                            {item.count}
                                        </td>
                                        <td className="px-3 py-4 text-gray-700 whitespace-nowrap">
                                            $ {item.count * item.product.price}.00
                                        </td>
                                        <td className="px-3 py-4 text-gray-700 whitespace-nowrap">
                                           ....
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-3 py-4 text-gray-700 whitespace-nowrap">No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
            <Footer />
        </>
    );
}

export default OrderDetails;
