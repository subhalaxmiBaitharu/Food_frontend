import Navbar from "../../components/Navbar";
import style from './product.module.css'
import Note from '../../images/Order Completed.png'
import Moto from '../../images/Motocross.png'
import Rating from '../../images/rating.png'
import Burger from '../../images/burger.png'
import Clock from '../../images/Clock (1).png'
import Time from '../../images/Clock.png'
import Track from '../../images/Tracking.png'
import Verify from '../../images/ID Verified.png'
import Product1 from '../../images/product1.png'
import Product2 from '../../images/product2.png'
import Product3 from '../../images/product3.png'
import Cart from '../../images/shop.png'
import { Box, Skeleton, Tab } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import { useEffect, useState } from "react";
import Share from '../../images/share.png'
import Remove from '../../images/Remove.png'
import Scooter from '../../images/Delivery Scooter.png'
import Home from '../../images/New Store.png'
import Down from '../../images/Down Button.png'
import Forward from '../../images/Forward Button.png'
import ForwardWhite from '../../images/Forward Button White.png'
import Search from '../../images/Search More.png'
import Plus from '../../images/Plus (2).png'
import IndiaMap from "../../components/IndiaMap";
import Left from '../../images/Group 57.png'
import Right from '../../images/Group 56.png'
import Profile from '../../images/Ellipse 3.png'
import Times from '../../images/Time Span.png'
import Stars from '../../images/Group 52.png'
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import { getAllFoodItems, getAllPhotos } from "../../routes";
import { toast, ToastContainer } from "react-toastify";

const options = ["Offers", "Burgers", "Fries", "Snacks", "Salads", "Cold Drinks", "Happy Meal®", "Desserts", "Hot Drinks", "Sauces", "Orbit®"]

export default function Product({ cart, setCart, addItemToCart, deliveryAddress }) {
    const navigate = useNavigate();
    const [value, setValue] = useState('1');
    const [viewCart, setViewCart] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [search, setSearch] = useState("");
    const [photos, setPhotos] = useState(null);
    const [loading, setLoading] = useState(true);
    const cards = Array(3).fill(null);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const calculatedTotal = cart.reduce((sum, item) => {
            return sum + Number(item.price);
        }, 0);
        setTotalPrice(calculatedTotal);
    }, [cart]);

    const handleToast = () => {
        toast.success("Item Added to Cart");
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllFoodItems();
                setProducts(data);
                setFilteredProducts(data)
            } catch (error) {
                console.error("Error fetching food items:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

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
        if (search === "") {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.description.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }, [search]);

    const handleRemoveItem = (itemIndex) => {
        const updatedCart = cart.filter((_, index) => index !== itemIndex);
        setCart(updatedCart);
    };

    const copyCartLink = () => {
        const cartPageUrl = `${window.location.protocol}//${window.location.host}/cart`;
        navigator.clipboard
            .writeText(cartPageUrl)
            .then(() => {
                toast('Cart URL copied successfully!');
            })
            .catch((error) => {
                console.error('An error occurred while copying the cart link:', error);
            });
    };

    const renderSkeletonLoader = () => {
        return Array(4)
            .fill(null)
            .map((_, idx) => (
                <div className={style.itemCard} key={idx}>
                    <Skeleton variant="rectangular" height={150} sx={{ width: { xs: 350, md: 400 } }} />
                </div>
            ));
    };

    return (
        <div className={!viewCart ? style.productContainer : window.innerWidth < 768 ? style.productContainerBlur : style.productContainer} >
            <ToastContainer />
            <Navbar viewCart={viewCart} setViewCart={setViewCart} currentAddress={deliveryAddress} />
            <div className={style.banner}>
                <div className={style.bannerClock}><p><img src={Clock} alt="Clock" />Open until 3:00 AM</p></div>
                <div className={style.bannerLeft}>
                    <p>I'm lovin' it!</p>
                    <h1>McDonald’s East London</h1>
                    <div className={style.bannerInfo}>
                        <p><img src={Note} alt="Notepad Img" />Minimum Order: 120 Rs</p>
                        <p><img src={Moto} alt="Bike Img" />Delivery in 20-25 Minutes</p>
                    </div>
                </div>
                <div className={style.bannerRight}>
                    <img className={style.burger} src={Burger} alt="Burger" />
                    <img className={style.rating} src={Rating} alt="Rating" />
                </div>
            </div>

            <div className={style.searchBar}>
                <p>All Offers from McDonald’s East London</p>
                <div className={style.search}>
                    <img src={Search} alt="Search Icon" />
                    <input type="Search" placeholder="Search from menu..." value={search}
                        onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>


            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    overflowX: { xs: "scroll", md: "hidden" },
                    pl: 0,
                    background: "#FC8A06",
                    mt: 4,
                    mb: { xs: 4, md: 0 },
                    pt: 1,
                    pb: 1.5,
                    width: '100%',
                    '& .MuiTabPanel-root': { py: 2, px: 0 },
                    '& .MuiTab-root': {
                        color: '#fff',
                        opacity: 0.8,
                        fontSize: 17,
                        lineHeight: '24px',
                        textTransform: 'capitalize',
                        px: { xs: 2, md: 3, lg: 4 },
                        '&.Mui-selected': {
                            color: '#ffffff',
                            background: "#000000",
                            borderRadius: "100px",
                        },
                        mt: 1
                    },
                    '& .MuiTabs-indicator': {
                        background: 'none',
                    },
                }}>
                <TabContext value={value}>
                    <Box sx={{ marginLeft: "2%" }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            {options.map((item, idx) =>
                                <Tab key={idx} label={item} value={String(idx + 1)} />
                            )}

                        </TabList>
                    </Box>
                </TabContext>
            </Box>
            <div className={style.mainContainer}>

                <div>

                    <div className={style.photoContainer}>
                        <img src={Product1} alt="Photo" />
                        <img src={Product2} alt="Photo" />
                        <img src={Product3} alt="Photo" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <div className={style.itemDiv}>
                            <h1>Burgers</h1>

                            <div className={style.itemContainer}>

                                {loading
                                    ? renderSkeletonLoader()
                                    : filteredProducts.filter((item) => item.type === "burger").map((item,idx) => (
                                        <div className={style.itemCard} key={idx}>
                                            <div className={style.cardDesc}>
                                                <h3>{item.name}</h3>
                                                <p>{item.description}</p>
                                                <h3>₹ {item.price}</h3>
                                            </div>
                                            <img className={style.item} src={item.photo} alt="Item" />
                                            <div
                                                className={style.cardPlus}
                                                onClick={() => (addItemToCart(item), handleToast())}
                                            >
                                                <img src={Plus} alt="Add to Cart" />
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className={style.itemDiv}>
                            <h1>Fries</h1>

                            <div className={style.itemContainer}>

                                {loading
                                    ? renderSkeletonLoader()
                                    : filteredProducts.filter((item) => item.type == "fries").map((item,idx) => (
                                        <div className={style.itemCard} key={idx}>

                                            <div className={style.cardDesc}>
                                                <h3>{item.name}</h3>
                                                <p>{item.description}</p>
                                                <h3>₹ {item.price}</h3>
                                            </div>
                                            <img className={style.item} src={item.photo} alt="Item" />
                                            <div
                                                className={style.cardPlus}
                                                onClick={() => (addItemToCart(item), handleToast())}
                                            >
                                                <img src={Plus} alt="Add to Cart" />
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className={style.itemDiv}>
                            <h1>Cold Drinks</h1>

                            <div className={style.itemContainer}>

                                {loading
                                    ? renderSkeletonLoader()
                                    : filteredProducts.filter((item) => item.type == "cold drinks").map((item,idx) => (
                                        <div className={style.itemCard} key={idx}>

                                            <div className={style.cardDesc}>
                                                <h3>{item.name}</h3>
                                                <p>{item.description}</p>
                                                <h3>₹ {item.price}</h3>
                                            </div>
                                            <img className={style.item} src={item.photo} alt="Item" />
                                            <div
                                                className={style.cardPlus}
                                                onClick={() => (addItemToCart(item), handleToast())}
                                            >
                                                <img src={Plus} alt="Add to Cart" />
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

                </div>


                {viewCart && <div className={style.cart}>
                    <div className={style.cartClick}>
                        <img src={Share} alt="Share" />
                        <p>Share this cart with your friends</p>
                        <button onClick={copyCartLink}>Copy Link</button>
                    </div>
                    <div className={style.cartBottom}>
                        <div className={style.cartNav}>
                            <img src={Cart} alt="Cart" />
                            <p>My Basket</p>
                        </div>
                        <div className={style.cartList}>
                            {cart.map((item, idx) =>
                                <div className={style.cartBottomContent}>
                                    <p className={style.times}>1x</p>
                                    <div>
                                        <h4><span>₹ {item.price}</span></h4>
                                        <h4>{item.name}</h4>
                                        <h5>{item.description}</h5>
                                    </div>
                                    <img src={Remove} onClick={() => handleRemoveItem(idx)} style={{ cursor: "pointer" }} />
                                </div>
                            )}
                        </div>
                        <div className={style.price}>
                            <div><p>Sub Total: </p><span>₹ {totalPrice}.00</span></div>
                            <div><p>Discounts: </p><span>₹ -3.00</span></div>
                            <div><p>Delivery Fee: </p><span>₹ 3.00</span></div>
                        </div>
                        <div className={style.amount}>
                            <div className={style.pay}><p>Total to pay</p><span>₹ {totalPrice}.00</span></div>
                            <div className={style.option}>Choose your free item..<img src={Down} alt="Down Arrow" /></div>
                            <div className={style.option}>Apply Coupon Code here<img src={Forward} alt="Forward Arrow" /></div>
                        </div>
                        <div className={style.select}>
                            <div className={style.selectedMenu}>
                                <img src={Scooter} alt="Scooter" />
                                <p><span>Delivery</span></p>
                                <p>Starts at 17:50</p>
                            </div>
                            <div className={style.line}></div>
                            <div className={style.selectMenu}>
                                <img src={Home} alt="Home" />
                                <p><span>Collection</span></p>
                                <p>Starts at 17:50</p>
                            </div>
                        </div>
                        <button className={style.checkout} onClick={() => { totalPrice >= 20 && navigate('/cart') }} style={{ background: totalPrice >= 20 ? "#028643" : "#FFB1B1" }}><img src={ForwardWhite} alt="Forward Icon" />Checkout!</button>
                    </div>
                </div>}
            </div>
            <div className={style.information}>
                <div className={style.infoContainer}>
                    <h2><img src={Track} alt="Icon" />Delivery information</h2>
                    <p><span>Monday:</span> 12:00 AM–3:00 AM, 8:00 AM–3:00 AM</p>
                    <p><span>Tuesday:</span> 8:00 AM–3:00 AM</p>
                    <p><span>Wednesday:</span> 8:00 AM–3:00 AM</p>
                    <p><span>Thursday:</span> 8:00 AM–3:00 AM</p>
                    <p><span>Friday:</span> 8:00 AM–3:00 AM</p>
                    <p><span>Saturday:</span> 8:00 AM–3:00 AM</p>
                    <p><span>Sunday:</span> 8:00 AM–12:00 AM</p>
                    <p><span>Estimated time until delivery:</span> 20 min</p>
                </div>
                <div className={style.infoContainer}>
                    <h2><img src={Verify} alt="Icon" />Contact information</h2>
                    <p>If you have allergies or other dietary</p><p> restrictions, please contact the restaurant. The</p><p> restaurant will provide food-specific</p><p>information upon request.</p>
                    <p><span>Phone number</span></p>
                    <p>+91 9473930402</p>
                    <p><span>Website</span></p>
                    <p>http://mcdonalds.in/</p>

                </div>
                <div className={style.infoContainerBlack}>
                    <h2><img src={Time} alt="Icon" />Operational Times</h2>
                    <p><span>Monday:</span> 8:00 AM–3:00 AM</p>
                    <p><span>Tuesday:</span> 8:00 AM–3:00 AM</p>
                    <p><span>Wednesday:</span> 8:00 AM–3:00 AM</p>
                    <p><span>Thursday:</span> 8:00 AM–3:00 AM</p>
                    <p><span>Friday:</span> 8:00 AM–3:00 AM</p>
                    <p><span>Saturday:</span> 8:00 AM–3:00 AM</p>
                    <p><span>Sunday:</span> 8:00 AM–3:00 AM</p>
                </div>
            </div>

            <div className={style.map}>
                <IndiaMap />
            </div>
            <div className={style.review}>
                <img className={style.ratingCard} src={Rating} alt="Rating" />
                <div className={style.reviewTop}>
                    <h1>Customer Reviews</h1>
                    <div className={style.arrowControl}>
                        <img src={Left} alt="Arrow" />
                        <img src={Right} alt="Arrow" />
                    </div>
                </div>
                <div className={style.cardContainer}>

                    {cards.map((_, idx) =>
                        <div key={idx} className={style.card}>
                            <div  className={style.reviewCard}>
                                <div className={style.reviewCardTop}>
                                    <div className={style.topInside}>
                                        <img src={Profile} alt="Profile" />
                                        <div className={style.cardLine}></div>
                                        <div className={style.top}>
                                            <h4>St Gix</h4>
                                            <p><span>South London</span></p>
                                        </div>
                                    </div>
                                    <div className={style.starTop}>
                                        <img src={Stars} alt="Stars" />
                                        <p> <img src={Times} alt="Time" /> 24th September, 2023</p>
                                    </div>
                                </div>
                                <div className={style.contentCard}>
                                    <p>The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly.</p>
                                </div>
                            </div>
                        </div>)}
                </div>
            </div>

            <div className={style.popularRestaurant}>
                <p>Similar Restaurants</p>
                <div className={style.popularContainer}>
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
            <Footer />
            <div>

            </div>
        </div>
    )
}