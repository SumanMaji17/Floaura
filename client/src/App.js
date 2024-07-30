import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminLogin from "./Admin/Login/AdminLogin";
import AdminSignUp from "./Admin/SignUp/AdminSignUp";
import Dashboard from "./Admin/Dashboard/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Customer/Home/Home";
import CustomerLayout from "./Customer/CustomerLayout";
import Cart from "./Customer/components/Cart/Cart";
import ProductPage from "./Customer/components/products/ProductPage";
import ProductPageByCategory from "./Customer/components/products/ProductPageByCategory";
import PageNotFound from "./common/PageNotFound/PageNotFound";
import ProductDetails from "./common/Product/ProductDetails";
import CheckOut from "./Customer/components/order/CheckOut";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllReviews, fetchUserData } from "./redux/actions/userAction";
import { fetchAllCategory } from "./redux/actions/categoryActions";
import { initializeCartFromStorage } from "./redux/actions/cartAction";
import { fetchAllProduct } from "./redux/actions/productAction";
import AddAddress from "./Customer/components/address/AddAddress";
import PaymentSummary from "./Customer/components/payment/PaymentSummary";
import { fetchAllAddress } from "./redux/actions/addressActions";
import Address from "./Customer/components/address/Address";
import PaymentSucces from "./Customer/components/payment/PaymentSucces";
import PaymentFail from "./Customer/components/payment/PaymentFail";
import Order from "./Customer/components/order/Order";
import OrderDetails from "./Customer/components/order/OrderDetails";
import AllAddress from "./Customer/components/address/AllAddress";
import MyAddresses from "./Customer/components/address/MyAddresses";
import AddEditAddress from "./Customer/components/address/AddEditAddress";
import SellWithUs from "./Customer/SupportComponents/SellWithUs";
import AboutUs from "./Customer/SupportComponents/AboutUs";
import ContactUs from "./Customer/SupportComponents/ContactUs";
import CreateReview from "./Customer/components/Review/CreateReview";
import AllReviews from "./Customer/components/Review/AllReviews";
import EditReview from "./Customer/components/Review/EditReview";
import EditProfile from "./Customer/editProfile/EditProfile";
import ProtectedRoute from "./utils/ProtectedRoute";
import ScrollToTop from "./Customer/SupportComponents/ScrollToTop";

function App() {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    if (!userInfo) {
      dispatch(fetchUserData());
    }
  }, [userInfo, dispatch]);

  useEffect(() => {
    if (products.length === 0 || categories.length === 0) {
      dispatch(fetchAllCategory());
      dispatch(fetchAllProduct());
      dispatch(initializeCartFromStorage());
      dispatch(fetchAllAddress());
      dispatch(fetchAllReviews());
    }
  }, [products.length, categories.length, dispatch]);

  return (
    <>
      <Router>
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<CustomerLayout />}>
            <Route index element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/best-seller" element={<ProductPage />} />
            <Route path="/:categoryTitle" element={<ProductPageByCategory />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route
              path="/success"
              element={
                <ProtectedRoute isLoggedIn={userInfo}>
                  <PaymentSucces />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cancel"
              element={
                <ProtectedRoute isLoggedIn={userInfo}>
                  <PaymentFail />
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-orders"
              element={
                <ProtectedRoute isLoggedIn={userInfo}>
                  <Order />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-details"
              element={
                <ProtectedRoute isLoggedIn={userInfo}>
                  <OrderDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-addresses"
              element={
                <ProtectedRoute isLoggedIn={userInfo}>
                  <MyAddresses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-address"
              element={
                <ProtectedRoute isLoggedIn={userInfo}>
                  <AddEditAddress />
                </ProtectedRoute>
              }
            />
            <Route path="/sell-with-us" element={<SellWithUs />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route
              path="/create-review"
              element={
                <ProtectedRoute isLoggedIn={userInfo}>
                  <CreateReview />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-reviews"
              element={
                <ProtectedRoute isLoggedIn={userInfo}>
                  <AllReviews />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-review"
              element={
                <ProtectedRoute isLoggedIn={userInfo}>
                  <EditReview />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-profile"
              element={
                <ProtectedRoute isLoggedIn={userInfo}>
                  <EditProfile />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route
            path="/check-out"
            element={
              <ProtectedRoute isLoggedIn={userInfo}>
                <CheckOut />
              </ProtectedRoute>
            }
          >
            <Route index element={<Address />} />
            <Route path="/check-out/add-address" element={<AddAddress />} />
            <Route path="/check-out/payment" element={<PaymentSummary />} />
          </Route>
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/adminSignup" element={<AdminSignUp />} />
          <Route path="/admin/*" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
