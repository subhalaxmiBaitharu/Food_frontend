
import Login from './pages/login';
import Home from './pages/home';
import Product from './pages/product'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Cart from './pages/cart';
import Profile from './pages/profile';
import Address from './pages/address';
import Payment from './pages/payment';
import Register from './pages/register';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

function App() {

  const loadCartFromStorage = () => {
    const storedCart = localStorage.getItem("shoppingCart");
    return storedCart ? JSON.parse(storedCart) : [];
  };

  const [cart, setCart] = useState(loadCartFromStorage);

  useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  }, [cart]);

  const addItemToCart = (product) => {
    setCart((currentCart) => {
      const exists = currentCart.find((item) => item._id === product._id);
      if (exists) {
        return currentCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const loadAddressFromStorage = () => {
    const storedAddress = localStorage.getItem('deliveryAddress');
    return storedAddress || "";
  };
  const [deliveryAddress, setDeliveryAddress] = useState(loadAddressFromStorage);

  const updateDeliveryAddress = (address) => {
    setDeliveryAddress(address);
    localStorage.setItem('deliveryAddress', address);
  };

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />}/>
        <Route path="/home" element={<Home cart={cart} setCart={setCart} deliveryAddress={deliveryAddress} />}/>
        <Route path="/product" element={<Product cart={cart} setCart={setCart} addItemToCart={addItemToCart} deliveryAddress={deliveryAddress} />} />
        <Route path="/cart" element={<Cart cart={cart} deliveryAddress={deliveryAddress} /> } />
        <Route path="/payment" element={<Payment cart={cart} setCart={setCart} deliveryAddress={deliveryAddress} /> } />
        <Route path="/address" element={<Address deliveryAddress={deliveryAddress} setDeliveryAddress={updateDeliveryAddress} />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
