import React, { useEffect, useState } from "react";
import { FaLocationArrow, FaRegAddressBook } from "react-icons/fa";
import { MdHome, MdKeyboardArrowDown } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import { ImGift } from "react-icons/im";
import { IoCartOutline } from "react-icons/io5";
import { IoStorefrontOutline } from "react-icons/io5";
import { LuContact2 } from "react-icons/lu";
import { FiPhone } from "react-icons/fi";
import { RiWhatsappFill } from "react-icons/ri";
import { RiMenu2Fill } from "react-icons/ri";
import { BsBoxSeam, BsQuestionSquare } from "react-icons/bs";
import { PiUserBold } from "react-icons/pi";
import { TbLogout } from "react-icons/tb";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import Search from "../../../common/search/Search";
import { BiSolidCategory } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import { TiLocation } from "react-icons/ti";
import LoginPage from "../LoginPage/LoginPage";
import { useDispatch, useSelector } from "react-redux";
import { motion, useAnimation } from "framer-motion";
import { logout } from "../../../redux/actions/userAction";


export default function NavBar() {
  const navigate = useNavigate();
  const totalItems = useSelector((state) => state.cart.totalItems);
  const dispatch = useDispatch();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const controls = useAnimation();
  const message = "hi";
  const whatsappLink = `https://api.whatsapp.com/send?phone=${
    process.env.REACT_APP_PHONE_NUMBER
  }&text=${encodeURIComponent(message)}`;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

  useEffect(() => {
    controls.start({ y: visible ? 0 : -100 });
  }, [visible, controls]);

  const { userInfo } = useSelector((state) => state.user);
  const categories = useSelector((state) => state.category.categories);
  const [showCategories, setShowCategories] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isOpenDeliveryBox, setOpenDeliveryBox] = useState(false);
  const [isLogin, setLogin] = useState(false);

  const handleLoginSuccess = () => {
    setLogin(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <motion.nav
        animate={controls}
        transition={{ duration: 0.2 }}
        className=" bg-cyan-900 z-20 text-white min-h-[14vh] flex min-w-full items-center justify-between px-24 fixed "
      >
        <div className=" flex items-center">
          <span className=" cursor-pointer">FLOAURA</span>
          <div
            className=" flex px-10 items-center gap-1 cursor-pointer"
            onClick={() => setOpenDeliveryBox(true)}
          >
            <FaLocationArrow />
            <span>Deliver To</span>
            <MdKeyboardArrowDown />
          </div>
        </div>
        <div className=" flex items-center">
          <div className=" px-14 ">
            <Search />
          </div>
          <div>
            <ul className=" flex items-center ">
              <li
                className=" items-center flex flex-col gap-1 px-4 py-2 text-sm hover:text-gray-400 cursor-pointer active:text-gray-600"
                onClick={() => navigate("/")}
              >
                <MdHome className=" text-2xl" />
                <span>Home</span>
              </li>
              <li
                className=" items-center  flex flex-col gap-1 px-4 py-2 text-sm hover:text-gray-400 cursor-pointer active:text-gray-600"
                onMouseEnter={() => setShowCategories(true)}
                onMouseLeave={() => setShowCategories(false)}
              >
                <BiSolidCategory className=" text-2xl" />
                <span>Category</span>
                {showCategories && categories.length !== 0 && (
                  <div className="absolute text-lg font-medium top-[74px] right-36 z-10 bg-slate-50 text-gray-800 border border-gray-300  rounded-md">
                    <div className="flex w-[370px]">
                      <div className=" w-1/3">
                        {categories.map(
                          (category, index) =>
                            index % 3 === 0 && (
                              <div
                                key={index}
                                onClick={() => navigate(`/${category.name}`)}
                                className={`p-2 hover:underline 
                          }`}
                              >
                                {category.name}
                              </div>
                            )
                        )}
                      </div>
                      <div className=" w-1/3 border-x-2">
                        {categories.map(
                          (category, index) =>
                            index % 3 === 1 && (
                              <div
                                key={index}
                                onClick={() => navigate(`/${category.name}`)}
                                className={`p-2 hover:underline 
                          }`}
                              >
                                {category.name}
                              </div>
                            )
                        )}
                      </div>
                      <div className="w-1/3">
                        {categories.map(
                          (category, index) =>
                            index % 3 === 2 && (
                              <div
                                key={index}
                                onClick={() => navigate(`/${category.name}`)}
                                className={`p-2 hover:underline 
                          }`}
                              >
                                {category.name}
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li className=" items-center flex flex-col gap-1 px-4 py-2 text-sm hover:text-gray-400 cursor-pointer active:text-gray-600 ">
                <NavLink to="/cart">
                  <div>
                    {totalItems > 0 && (
                      <span className=" flex items-center w-5 py-[2px] justify-center bg-red-500 text-white text-xs rounded-full relative top-[10px] -right-[10px]">
                        {totalItems}
                      </span>
                    )}
                    <IoCartOutline className=" text-2xl" />
                  </div>
                  <span>Cart</span>
                </NavLink>
              </li>
              {userInfo ? (
                <li
                  className=" items-center flex flex-col gap-1 px-4 py-2 text-sm hover:text-gray-400 cursor-pointer active:text-gray-600"
                  onMouseEnter={() => setShowAccount(true)}
                  onMouseLeave={() => setShowAccount(false)}
                >
                  <FaRegCircleUser className=" text-2xl" />
                  <span>My Account</span>
                  {showAccount && (
                    <div className=" flex flex-col justify-center w-[350px] items-center absolute text-lg font-medium top-[74px] right-24 z-10 bg-slate-50 text-gray-800  rounded-md overflow-hidden border ">
                      <div className="border-b-2 w-full flex flex-col px-5 py-3">
                        <FaRegCircleUser className=" text-3xl" />
                        <span className=" font-bold">{userInfo.name}</span>
                        <span className=" flex text-sm gap-3 py-2">
                          <span>{userInfo.phone}</span>
                          <span>|</span>
                          <span>{userInfo.email}</span>
                        </span>
                      </div>

                      <div
                        className=" border-b-2 w-full px-5 py-3 flex gap-3 items-center hover:bg-slate-200 "
                        onClick={() => navigate("/my-orders")}
                      >
                        <BsBoxSeam className=" text-xl" />
                        <span>My Orders</span>
                      </div>
                      <div
                        className=" border-b-2 w-full flex items-center gap-3 px-5 py-3 hover:bg-slate-200 "
                        onClick={() => navigate("/my-addresses")}
                      >
                        <FaRegAddressBook className=" text-2xl" />
                        <span>Manage Address</span>
                      </div>
                      <div
                        className="border-b-2 w-full px-5 py-3 flex items-center gap-3 hover:bg-slate-200 "
                        onClick={() => navigate("/my-reviews")}
                      >
                        <HiOutlineChatBubbleBottomCenterText className=" text-2xl font-bold" />
                        <span>My Reviews</span>
                      </div>
                      <div
                        className="border-b-2 w-full px-5 py-3 flex items-center gap-3  hover:bg-slate-200 "
                        onClick={() => navigate("/edit-profile")}
                      >
                        <PiUserBold className=" text-2xl" />
                        <span>Edit Profile</span>
                      </div>
                      <div
                        className="w-full px-5 py-3 flex gap-3 items-center  hover:bg-slate-200 "
                        onClick={handleLogout}
                      >
                        <TbLogout className=" text-2xl" />
                        <span>Logout</span>
                      </div>
                    </div>
                  )}
                </li>
              ) : (
                <li
                  className=" items-center flex flex-col gap-1 px-4 py-2 text-sm hover:text-gray-400 cursor-pointer active:text-gray-600"
                  onClick={() => setLogin(true)}
                >
                  <FaRegCircleUser className=" text-2xl" />
                  <span>Hi Guest</span>
                </li>
              )}
              <li
                className=" items-center flex flex-col gap-1 px-4 py-2 text-sm hover:text-gray-400 cursor-pointer active:text-gray-600"
                onMouseEnter={() => setShowMore(true)}
                onMouseLeave={() => setShowMore(false)}
              >
                <RiMenu2Fill className=" text-2xl" />
                <span>More</span>
                {showMore && (
                  <div className=" flex flex-col justify-center w-[350px] items-center absolute text-lg font-medium top-[74px] right-24 z-10 bg-slate-50 text-gray-800  rounded-md overflow-hidden border ">
                    <div
                      className=" border-b-2 w-full px-5 py-3 flex gap-3 items-center hover:bg-slate-200 "
                      onClick={() => navigate(`/corporate-gifts`)}
                    >
                      <ImGift className=" text-2xl" />
                      <span>Corporate Gifts</span>
                    </div>
                    <div
                      className=" border-b-2 w-full flex items-center gap-3 px-5 py-3 hover:bg-slate-200 "
                      onClick={() => navigate("/sell-with-us")}
                    >
                      <IoStorefrontOutline className=" text-2xl" />
                      <span>Sell With Us</span>
                    </div>
                    <div className="border-b-2 w-full px-5 py-3 flex items-center gap-3 hover:bg-slate-200 ">
                      <BsQuestionSquare className=" text-2xl font-bold" />
                      <span>FAQ</span>
                    </div>
                    <div
                      className="border-b-2 w-full px-5 py-3 flex items-center gap-3  hover:bg-slate-200 "
                      onClick={() => navigate("about-us")}
                    >
                      <LuContact2 className=" text-2xl" />
                      <span>About Us</span>
                    </div>
                    <div
                      className="border-b-2 w-full px-5 py-3 flex gap-3 items-center  hover:bg-slate-200 "
                      onClick={() => navigate("/contact-us")}
                    >
                      <FiPhone className=" text-2xl" />
                      <span>Contact Us</span>
                    </div>
                    <div className="w-full px-5 py-3 flex gap-3 items-center  hover:bg-slate-200 ">
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=" flex gap-3 w-full"
                      >
                        <RiWhatsappFill className=" text-3xl text-green-600" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </motion.nav>
      {isOpenDeliveryBox && (
        <div
          className="fixed inset-0 z-10 flex items-center justify-center bg-gray-700 bg-opacity-50 overflow-hidden"
          onClick={() => setOpenDeliveryBox(false)}
        >
          <div
            className="bg-white rounded-3xl flex flex-col gap-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className=" flex gap-14 bg-gradient-to-tl from-slate-900 to-cyan-700 p-5 rounded-t-3xl">
              <div className=" flex flex-col gap-3 text-white text-xl font-serif font-bold">
                <span>Enter your Pin Code to discover FREE</span>
                <span> shipping options</span>
              </div>
              <img src="imageDelivery.png" alt="Delivery" className=" w-32" />
            </div>

            <div className=" p-3 mx-8 flex border-2 rounded-xl border-black items-center ">
              <TiLocation className=" text-3xl text-cyan-900 motion-safe:animate-bounce " />
              <input
                type="text"
                placeholder="Enter Pincode Or City"
                className=" w-full p-2 outline-none placeholder:text-gray-400 placeholder:text-opacity-50 placeholder:text-xl font-semibold text-xl "
              />
            </div>
            <div className=" mx-8 mb-8 font-medium text-gray-400 text-sm">
              Join our ever-growing family of 10,000+ delighted customers in
              many cities!
            </div>
          </div>
        </div>
      )}
      {isLogin && (
        <div
          className="fixed inset-0  z-20 flex items-center justify-center bg-gray-700 bg-opacity-50 overflow-hidden"
          onClick={() => setLogin(false)}
        >
          <div
            className="flex rounded-lg shadow-lg w-full h-[550px] sm:w-3/4 lg:w-7/12 bg-white sm:mx-0"
            onClick={(e) => e.stopPropagation()}
          >
            <LoginPage onLoginSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}
    </>
  );
}
