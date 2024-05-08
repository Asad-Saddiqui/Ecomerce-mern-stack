import React, { useEffect } from 'react';
import Top from '../../Components/Top/Top';
import Navbar from '../../Components/Navbar/Navbar';
import './wishlist.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist } from '../../Api/wishlist/wishlistSlice';

function Wishlist() {
    const dispatch = useDispatch();
    const { wishlist, loading, error } = useSelector(state => state.userWishlist);

    useEffect(() => {
        dispatch(fetchWishlist());
    }, [dispatch]);
    console.log("working")
    console.log({ wishlist, loading, error })
    return (
        <>
            <Top />
            <Navbar />
            <div className='wishlist'>
                <div className="wishlist-content">
                    <div>
                        <div className="top-tag">
                            <button className='btn1'>Wishlist ({wishlist ? wishlist.wishlist.length : 0})</button>
                            <button className='btn2'>See All</button>
                        </div>
                        <div className='main-section'>
                            {wishlist && wishlist.wishlist.map((item, index) => (
                            <div key={index} className='card'>
                                <div className='title'>
                                    <div className='percent'>
                                        -35%
                                    </div>
                                    <div className='delicon'>
                                        X
                                    </div>
                                </div>
                                <div className='card-body'>
                                        <img src={"http://localhost:5000/public/" + item.images[0].url} alt='' />
                                </div>
                                <div>
                                    <button className='btnadd'>Add to Cart</button>
                                </div>
                                <div className='content-section'>
                                    <p className='btntitle'>{item.title}</p>
                                    <p><b className='btnprice'>{item.price}</b> <del className='btnpricehigh'> {item.originalPrice} </del> </p>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Wishlist;
