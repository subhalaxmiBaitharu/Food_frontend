import style from './navbar.module.css'
import Star from '../images/star.png'
import Cart from '../images/shop.png'
import Arrow from '../images/arrow.png'
import Locate from '../images/Location.png'
import Logo1 from '../images/LOGO 1.png'
import Male from '../images/Male.png'
import Photo from '../images/Ellipse 11.png'
import MenuIcon from '../images/Menu (1).png'
import { Box, Tab } from '@mui/material'
import { TabContext, TabList } from '@mui/lab'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getUserDetailsById } from '../routes'

export default function Navbar({ viewCart, setViewCart, currentAddress }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState('/product'.includes(location.pathname)?'4':'1');
  const [user, setUser] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId")
    if (userId) {
      getUserDetailsById(userId)
        .then((data) => {
          const userDetails = localStorage.setItem("userDetails",JSON.stringify(data.user));
          setUser(data.user)
        })
        .catch((error) => console.error("Error fetching user details:", error));
    }
  }, []);

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      setUser(JSON.parse(userDetails));
    }
  }, []);

  const handleCart = () => {

    if (viewCart) {
      setViewCart(false);
    }
    else {
      setViewCart(true);
    }
  }

  const toggleMenu = () => {
    setOpenMenu(!openMenu);

  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (

    <>
      <div className={style.topBar}>
        <div className={style.topLeftBar}>
          <div className={style.leftBar}>
            <img style={{ marginRight: "0.5rem" }} src={Star} alt="Star" />
            <p>Get 5% Off your first order, <span style={{ color: "#FC8A06", textDecoration: "underline" }}>Promo: ORDER5</span></p>
          </div>
          <div className={style.leftBar}>
            <img style={{ marginRight: "0.5rem" }} src={Locate} alt="Location" />
            <p>{currentAddress}<a style={{ color: "#FC8A06", textDecoration: "underline", marginLeft: "1rem", cursor: "pointer" }} onClick={() => navigate('/address')}>Change Location</a></p>
          </div>
        </div>
        <div className={`${viewCart?style.rightBarClose:style.rightBar} ${['/home', '/product'].includes(location.pathname) ? '' : style.disabled
          }`}
          onClick={() => handleCart()}>
          <img style={{ marginLeft: "1rem", width: "2rem" }} src={Cart} alt="Cart Icon" />
          <p>My Cart</p>
          <div className={style.line}></div>

          <div className={style.line}></div>
          <img style={{ marginRight: "1rem", width: "2rem" }} src={Arrow} alt="Down Arrow" />
        </div>
      </div>

      <div className={style.navbar}>
        <div className={style.mobileNavTop}>
          <img src={Logo1} alt="Order" />
          <div className={style.hamburger} onClick={toggleMenu}>
            <img src={MenuIcon} alt="Menu Icon" />
          </div>
        </div>
        <Box
          sx={{
            pt: { xs: 1, md: 4 },
            pb: { xs: 2, md: 0 },
            display: { xs: "none", md: "flex" },
            position: { xs: "absolute", md: "relative" },
            justifyContent: "space-between",
            flexWrap: "nowrap",
            overflowX: { xs: "scroll", md: "hidden" },
            top: { xs: "4rem", md: 0 },
            left: "0",
            width: "100%",
            zIndex: "1000",
            '& .MuiTabPanel-root': { py: 2, px: 0, },
            '& .MuiTab-root': {
              color: 'black',
              opacity: 0.8,
              fontSize: 17,
              lineHeight: '24px',
              textTransform: 'capitalize',
              px: { xs: 2, md: 3, lg: 3.5 },

              '&.Mui-selected': {
                color: '#fff',
                background: "#FC8A06",
                borderRadius: "100px",
                border: "none"
              },
            },
            '& .MuiTabs-indicator': {
              background: 'none',
            },
          }}>
          <TabContext value={value}>
            <Box sx={{ marginLeft: "20%" }}>
              <TabList
                onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Home" value="1" />
                <Tab label="Browse Menu" value="2" />
                <Tab label="Special Offers" value="3" />
                <Tab label="Restaurants" value="4" />
                <Tab label="Track Order" value="5" />
              </TabList>
            </Box>
          </TabContext>
        </Box>
        <button className={style.btn} onClick={() => { user ? navigate('/profile') : navigate('/login') }}><img style={{ marginRight: "0.5rem", width: "1.5rem", }} src={Male} alt="Male User" />{user ? user.name : "Login/Signup"}</button>
      </div>
      {['/home', '/product'].includes(location.pathname) && (<div className={style.mobileNav}>
        <button className={style.btn} onClick={() => { user ? navigate('/profile') : navigate('/login') }}><img style={{ marginRight: "0.5rem", width: "2.5rem", }} src={Photo} alt="Male User" />{user ? user.name : "Login/Signup"}</button>
        <div className={`${style.rightBar} ${['/home', '/product'].includes(location.pathname) ? '' : style.disabled
          }`}
          onClick={() => handleCart()}>
          <img style={{ marginLeft: "1rem", width: "2rem" }} src={Cart} alt="Cart Icon" />
          <p>My Cart</p>
        </div>
      </div>)}

      {['/home', '/product'].includes(location.pathname) && (
        <div className={style.mobileLocation}>
          <img style={{ marginRight: "0.5rem" }} src={Locate} alt="Location" />
          <p>{currentAddress}</p>
        </div>
      )}
    </>
  )
}
