import Navbar from "../../components/Navbar";
import style from './cart.module.css'

import Location from '../../images/location (2).png'
import Arrow from '../../images/arrow (2).png'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import { getAllPhotos } from "../../routes";
import { Skeleton } from "@mui/material";


export default function Cart({ cart, deliveryAddress }) {
    const navigate = useNavigate();
    const [photos, setPhotos] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const loadPhotos = async () => {
            try {
                const data = await getAllPhotos();
                setPhotos(data);

            } catch (err) {
                console.log('Failed to load photos.');
            }
        };

        loadPhotos();
    }, []);

    useEffect(() => {
        const calculatedTotal = cart.reduce((sum, item) => {
            return sum + Number(item.price);
        }, 0);
        setTotalPrice(calculatedTotal);
    }, [cart]);

    return (
        <div className={style.container}>
            <Navbar currentAddress={deliveryAddress} />
            <div className={style.content}>
                <h2><div className={style.back} onClick={() => navigate(-1)}>🡠</div>{window.innerWidth > 768 ? "Your Order Details" : "Checkout"}</h2>
                <div className={style.order}>

                    <div className={style.orderLeft}>
                        <div className={style.orderCart}>

                            {
                                cart.map((item, idx) => {

                                    return (
                                        <div key={idx} className={style.orderItem}>
                                            <div className={style.orderInside}>
                                                <img src={item.photo} alt="photo" />
                                                <div>
                                                    <h3>{item.name}</h3>
                                                    <p>1x item</p>
                                                </div>

                                            </div>
                                            <p><span>₹ {item.price}</span></p>
                                        </div>)
                                })
                            }

                        </div>

                        <div style={{ marginTop: "1rem" }}>
                            <p>Notes</p>
                            <input type="text" placeholder="Add order notes" />
                        </div>
                    </div>
                    <div className={style.orderRight}>
                        <h3>Delivery Address</h3>
                        <div className={style.delivery}>
                            <div className={style.deliveryAddress} onClick={() => navigate('/address')}>
                                <img src={Location} alt="Location Icon" />
                                <div>
                                    <span>Delivery Address</span>
                                    <p>{deliveryAddress}</p>
                                </div>
                            </div>
                            <img src={Arrow} alt="Forward Arrow" />
                        </div>
                        <div className={style.deliveryItem}>
                            <div>
                                <p>Items</p>
                                <p>₹ {totalPrice}</p>
                            </div>
                            <div>
                                <p>Sales Tax</p>
                                <p>₹ 10</p>
                            </div>
                        </div>
                        <div className={style.deliveryTotal}>
                            <p>Subtotal(3 items)</p>
                            <p><span>₹ {totalPrice + 10}</span></p>
                        </div>
                        <button onClick={() => navigate('/payment')}
                            disabled={cart.length === 0}
                            className={cart.length === 0 ? style.disabledButton : ''}
                        >Choose Payment Method</button>
                    </div>

                </div>
                <div style={{ marginBlock: "3rem" }} className={style.restaurant}>
                    <h2>Similar Restaurants</h2>
                    <div className={style.similarRestaurant}>
                        {photos
                            ? photos
                                .filter(photo => photo.name?.toLowerCase().includes('restaurant'))
                                .map((item, idx) => (
                                    <img
                                        key={idx}
                                        src={item.photo}
                                        alt="Restaurant"
                                        onClick={() => navigate('/product')}
                                    />
                                ))
                            : Array.from(new Array(6)).map((_, idx) => (
                                <Skeleton
                                    key={idx}
                                    variant="rectangular"
                                    width={200}
                                    height={220}
                                    style={{ borderRadius: '8px', margin: '0.5rem' }}
                                />
                            ))}


                    </div>
                </div>
            </div>
            {window.innerWidth > 480 && <Footer />}
        </div>
    )
}