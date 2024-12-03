
import style from './home.module.css';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Share from '../../images/share.png'
import Remove from '../../images/Remove.png'
import Scooter from '../../images/Delivery Scooter.png'
import Store from '../../images/New Store.png'
import Down from '../../images/Down Button.png'
import Forward from '../../images/Forward Button.png'
import Cart from '../../images/shop.png'
import ForwardWhite from '../../images/Forward Button White.png'
import Ordering from '../../images/Ordering APP.png'
import Wallpaper1 from '../../images/Wallpaper1.png'
import Wallpaper2 from '../../images/Wallpaper2.png'
import question1 from '../../images/question1.png'
import question2 from '../../images/question2.png'
import question3 from '../../images/question3.png'
import Banner from '../../images/ban.png'
import DesignGirl from '../../images/Untitled-2 1.png'
import Design from '../../images/image 1.png'
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Next from '../../images/Next page (2).png';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllPhotos, getUserDetailsById } from '../../routes';
import { Skeleton } from '@mui/material';
import Arrow from '../../images/Next page.png'
import { toast, ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';

const Food = [
  {
    type: "Burgers & Fast Food",
    num: "21 Restaurants"
  },
  {
    type: "Salads",
    num: "32 Restaurants"
  },
  {
    type: "Pasta & Casuals",
    num: "4 Restaurants"
  },
  {
    type: "Pizza",
    num: "33 Restaurants"
  },
  {
    type: "Breakfast",
    num: "23 Restaurants"
  },
  {
    type: "Soups",
    num: "33 Restaurants"
  }
]

export default function Home({ cart, setCart, deliveryAddress }) {
  const navigate = useNavigate();
  const [value, setValue] = useState('1');
  const [viewCart, setViewCart] = useState(false);
  const [tempValue, setTempValue] = useState('3');
  const [totalPrice, setTotalPrice] = useState(0);
  const [photos, setPhotos] = useState(null);
  const [orderingPhoto, setOrderingPhotos] = useState(null)

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const data = await getAllPhotos();
        setPhotos(data);

        const orderingPhoto = data.filter(photo => photo.name?.toLowerCase().includes('ordering'));
        setOrderingPhotos(orderingPhoto);

      } catch (err) {
        console.log('Failed to load photos.');
      }
    };

    loadPhotos();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeDemo = (event, newValue) => {
    setTempValue(newValue);
  };


  useEffect(() => {
    const calculatedTotal = cart.reduce((sum, item) => {
      return sum + Number(item.price);
    }, 0);
    setTotalPrice(calculatedTotal);
  }, [cart]);

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

  return (
    <div className={!viewCart ? style.homeContent : window.innerWidth < 768 ? style.homeContainerBlur : style.homeContent} >
      <ToastContainer />
      <Navbar viewCart={viewCart} setViewCart={setViewCart} currentAddress={deliveryAddress} />
      <div className={style.homeContainer}>
        <div className={style.banner}>
          <div className={style.bannerLeft}>
            <p>Order Restaurant food, takeaway and groceries.</p>
            <h1>Feast Your Senses, <span>Fast and Fresh</span></h1>
            <p>Enter a postcode to see what we deliver</p>
            <div className={style.inputData}>
              <p className={style.all}><input type='email' placeholder='e.g. EC4R 3TE' />
                {window.innerWidth < 480 ? <img className={style.arrow} src={Next} alt='Arrow' /> : <button>Subscribe</button>}</p>
            </div>
          </div>
          <img className={style.ban} src={Banner} alt='Banner' />
          <img className={style.design} src={Design} alt='Design' />
          <img className={style.designGirl} src={DesignGirl} alt='DesignGirl' />
        </div>
        <div className={style.middlebar}>
          {window.innerWidth > 768 ? <p>Up to -40% 🎊 Order.uk exclusive deals</p> : <p>Up to -40% Discount Offers🎊</p>}
          <div className={style.mobileContent}><img src={Arrow} alt='Arrow' />Pizza & Fast Food</div>
          <Box
            sx={{
              pt: 4,
              display: { xs: "none", md: "block" },
              width: '100%',
              '& .MuiTabPanel-root': { py: 2, px: 0 },
              '& .MuiTab-root': {
                color: 'black',
                opacity: 0.8,
                fontSize: 17,
                lineHeight: '24px',
                textTransform: 'capitalize',
                px: { xs: 2, md: 3, lg: 5 },
                '&.Mui-selected': {
                  color: '#FC8A06',
                  border: "2px solid #FC8A06",
                  borderRadius: "100px",

                },
                mt: 1
              },
              '& .MuiTabs-indicator': {
                background: 'none',
              },
            }}>
            <TabContext value={tempValue}>
              <Box sx={{ marginLeft: "20%" }}>
                <TabList onChange={handleChangeDemo} aria-label="lab API tabs example">
                  <Tab label="Vegan" value="1" />
                  <Tab label="Sushi" value="2" />
                  <Tab label="Pizza & Fast Food" value="3" />
                  <Tab label="Others" value="4" />
                </TabList>
              </Box>

            </TabContext>
          </Box>

        </div>
        <div className={style.container}>
          <div className={style.insideContainer}>
            <div className={style.middleFoodContainer}>
              <div className={style.foodContainer}>
                <div className={style.backgroundContainer1}>
                  <div className={style.blackBox}>
                    -40%
                  </div>
                  <div className={style.backgroundText}>
                    <p>Restaurant</p>
                    <h3>Chef Burgers London</h3>
                  </div>
                </div>
                <div className={style.backgroundTextMobile}>
                  <p>Restaurant</p>
                  <h3>Chef Burgers London</h3>
                </div>
              </div>
              <div className={style.foodContainer}>
                <div className={style.backgroundContainer}>
                  <div className={style.blackBox}>
                    -20%
                  </div>
                  <div className={style.backgroundText}>
                    <p>Restaurant</p>
                    <h3>Grand Ai Cafe London</h3>
                  </div>
                </div>
                <div className={style.backgroundTextMobile}>
                  <p>Restaurant</p>
                  <h3>Grand Ai Cafe London</h3>
                </div>
              </div>
              <div className={style.foodContainer}>
                <div className={style.backgroundContainer1}>
                  <div className={style.blackBox}>
                    -17%
                  </div>
                  <div className={style.backgroundText}>
                    <p>Restaurant</p>
                    <h3>Butterbrot Caf’e London</h3>
                  </div>
                </div>
                <div className={style.backgroundTextMobile}>
                  <p>Restaurant</p>
                  <h3>Butterbrot Caf’e London</h3>
                </div>
              </div>
            </div>


            <div className={style.dealContainer}>
              <p>Order.uk Popular Categories 🤩</p>
              <div className={style.insideDealContainer} style={{ justifyContent: viewCart ? 'flex-start' : 'space-between', }}>

                {photos
                  ? photos
                    .filter(photo => photo.name?.toLowerCase().includes('categories'))
                    .map((item, idx) => (
                      <div
                        key={idx}
                        className={style.dealImageContainer}
                        style={{
                          marginLeft: viewCart ? '1.5rem' : '0',
                          marginTop: viewCart ? '1rem' : '0',
                        }}
                      >
                        <img src={item.photo} alt="Food" />
                        <h3>{Food[idx].type}</h3>
                        <p>{Food[idx].num}</p>
                      </div>
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
                  <div key={idx} className={style.cartBottomContent}>
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
                  <img src={Store} alt="Home" />
                  <p><span>Collection</span></p>
                  <p>Starts at 17:50</p>
                </div>
              </div>
              <button className={style.checkout} onClick={() => { totalPrice >= 20 && navigate('/cart') }} style={{ background: totalPrice >= 20 ? "#028643" : "#FFB1B1" }}><img src={ForwardWhite} alt="Forward Icon" />Checkout!</button>
            </div>
          </div>}

        </div>
        <div className={style.popularRestaurant}>
          <p>Popular Restaurants</p>
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
        <div className={style.order}>
          <img src={Ordering} alt='Ordering App' />
        </div>

        <div className={style.wallpapers}>
          <img src={Wallpaper1} alt='Wallpaper' />
          <img src={Wallpaper2} alt="Wallpaper" />
        </div>

        <div className={style.questionBar}>
          <div className={style.questionNavbar}>

            <p>Know more about us!</p>
            <Box
              sx={{
                pt: 4,
                display: { xs: "none", md: "block" },
                width: '100%',
                '& .MuiTabPanel-root': { py: 2, px: 0 },
                '& .MuiTab-root': {
                  color: 'black',
                  opacity: 0.8,
                  fontSize: 15,
                  lineHeight: '24px',
                  textTransform: 'capitalize',
                  px: { xs: 2, md: 3, lg: 3 },
                  '&.Mui-selected': {
                    border: "2px solid #FC8A06",
                    borderRadius: "100px",
                    fontWeight: "bolder"
                  },
                  mt: 1
                },
                '& .MuiTabs-indicator': {
                  background: 'none',
                },
              }}>
              <TabContext value={value}>
                <Box sx={{ marginBottom: "2rem", marginLeft: "10%" }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Frequent Questions" value="1" />
                    <Tab label="Who we are?" value="2" />
                    <Tab label="Partner Program" value="3" />
                    <Tab label="Help & Support" value="4" />
                  </TabList>
                </Box>

              </TabContext>
            </Box>
          </div>

          <div className={style.questionContainer}>
            <div className={style.questionBank}>
              <p><span>How does Order.UK work?</span></p>
              <p>What payment methods are accepted?</p>
              <p>Can I track my order in real-time?</p>
              <p>Are there any special discounts or promotions available?</p>
              <p>Is Order.UK available in my area?</p>
            </div>
            <div className={style.rightContainer}>
              <div className={style.rightQuestionContainer}>
                <div className={style.photoQuestionContainer}>
                  <header>Place an Order!</header>
                  <img src={question1} alt='Photo' />
                  <p>Place order through our website or Mobile app</p>
                </div>
                <div className={style.photoQuestionContainer}>
                  <header>Track Progress</header>
                  <img src={question2} alt='Photo' />
                  <p>Your can track your order status with delivery time</p>
                </div>
                <div className={style.photoQuestionContainer}>
                  <header>Get your Order!</header>
                  <img src={question3} alt='Photo' />
                  <p>Receive your order at a lighting fast speed!</p>
                </div>
              </div>
              <p>Order.UK simplifies the food ordering process. Browse through our diverse menu, select your favorite dishes, and proceed to checkout. Your delicious meal will be on its way to your doorstep in no time!</p>
            </div>
          </div>

        </div>

        <div className={style.score}>
          <div className={style.scoreBar}>
            <h1>546+</h1>
            <p>Registered Riders</p>
          </div>
          <div className={style.scoreLine}></div>
          <div className={style.scoreBar}>
            <h1>789,900+</h1>
            <p>Orders Delivered</p>
          </div>
          <div className={style.scoreLine}></div>
          <div className={style.scoreBar}>
            <h1>690+</h1>
            <p>Restaurants Partnered</p>
          </div>
          <div className={style.scoreLine}></div>
          <div className={style.scoreBar}>
            <h1>17,457+</h1>
            <p>Food items</p>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}
