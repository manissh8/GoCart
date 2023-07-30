import './App.css';
import { useState,useEffect } from 'react';
import Header from "./component/layout/Header/Header";
import {BrowserRouter as Router,Route, Routes,Switch} from "react-router-dom";
import Webfont from "webfontloader";
import React  from 'react';
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import Loader from './component/layout/Loader/Loader';
import ProductDetails from "./component/Product/ProductDetails.js"
import Products from "./component/Product/Products.js";
import UserOptions from "./component/layout/Header/UserOptions.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from './component/User/LoginSignUp';
import Profile from "./component/User/Profile.js";
import store from "./store";
import { loadUser } from './actions/userAction';
import { useSelector } from 'react-redux';
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import  ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from  "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/admin/Dashboard.js";
import ProductList from "./component/admin/ProductList.js";
import axios from "axios";
import  Payment from "./component/Cart/Payment.js";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import NewProduct from './component/admin/NewProduct';
import UpdateProduct from './component/admin/UpdateProduct.js';
import OrderList from './component/admin/OrderList.js';
import ProcessOrder from "./component/admin/ProcessOrder.js";
import UserList from "./component/admin/UserList.js";
import UpdateUser from "./component/admin/UpdateUser.js";
import ProductReviews from "./component/admin/ProductReviews.js";
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";
import NotFound from "./component/layout/NotFound/NotFound.js";


function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }


    useEffect(()=>{
    Webfont.load({
      google:{
        families:["Roboto", "Droid Sans", "Chilanka"]
      },
    });
    
    store.dispatch(loadUser());

    if(isAuthenticated){
      getStripeApiKey();
    }
  },[]);
 
  //Function to disable right click on the site
  // window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <Router>
      <Header/>
      {isAuthenticated && <UserOptions user={user} />}


      <Routes>

      <Route element={<ProtectedRoute isAdmin={false}/>}>
      {stripeApiKey && (
        <Route exact path="/process/payment" element={
          <Elements stripe={loadStripe(stripeApiKey)}>
            <Payment />
          </Elements>
        } />
      )}
      </Route>

      <Route exact path="/" element={<Home/>} />
      <Route exact path="/product/:id" element={<ProductDetails/>} />
      <Route exact path="/products" element={<Products/>} />
      <Route path="/products/:keyword" element={<Products/>} />

      <Route exact path="/search" element={<Search/>} />
      <Route exact path="/contact" element={<Contact/>} />
      <Route exact path="/about" element={<About/>} />
      


      // Routes accessible to all logged in users
      <Route element={<ProtectedRoute isAdmin={false}/>}>
      <Route exact path="/account" element={<Profile/>} />
      <Route exact path="/me/update" element={<UpdateProfile/>} />
      <Route exact path="/password/update" element={<UpdatePassword/>} />
      <Route exact path="/shipping" element={<Shipping/>} />
      
      <Route exact path="/success" element={<OrderSuccess/>} />
      <Route exact path="/orders" element={<MyOrders/>} />   
      <Route exact path="/order/:id" element={<OrderDetails/>} />
      <Route exact path="/order/confirm" element={<ConfirmOrder/>} />
      </Route>

      // Routes accessible to only admin
      <Route element={<ProtectedRoute isAdmin={true}/>}>
         <Route exact path="/admin/dashboard" element={<Dashboard/>} />
         <Route exact path="/admin/products" element={<ProductList/>} />
         <Route exact path="/admin/product" element={<NewProduct/>} />
         <Route exact path="/admin/product/:id" element={<UpdateProduct/>} />
         <Route exact path="/admin/orders" element={<OrderList/>} />
         <Route exact path="/admin/order/:id" element={<ProcessOrder/>} />
         <Route exact path="/admin/users" element={<UserList/>} />
         <Route exact path="/admin/user/:id" element={<UpdateUser/>} />
         <Route exact path="/admin/reviews" element={<ProductReviews/>} />
      </Route>
      
      <Route exact path="/password/forgot" element={<ForgotPassword/>} />
      <Route exact path="/password/reset/:token" element={<ResetPassword/>} />
      <Route exact path="/login" element={<LoginSignUp/>} />
      <Route exact path="/cart" element={<Cart/>} />
      <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />
      </Routes>
      <Footer/>
    </Router>
   
  );
}

export default App
