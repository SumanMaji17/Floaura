import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { fetchAdminData } from "../../redux/actions/adminActions";
import SidePanel from "../SidePanel/SidePanel";
import AddCategory from "../components/Category/AddCategory";
import AllCategory from "../components/Category/AllCategory";
import AddProduct from "../components/Product/AddProduct";
import AllProduct from "../components/Product/AllProduct";
import { fetchAllCategory } from "../../redux/actions/categoryActions";
import EditCategory from "../components/Category/EditCategory";
import { fetchAllProduct } from "../../redux/actions/productAction";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminInfo, adminPanelError } = useSelector((state) => state.admin);
 
  useEffect(() => {
    const fetchDataAndNavigate = () => {
      dispatch(fetchAdminData()).then(() => {
        if (adminPanelError === "Unauthorized") {
          navigate("/adminLogin");
        }
      });
      dispatch(fetchAllCategory());
      dispatch(fetchAllProduct());
    };

    if (!adminInfo) {
      fetchDataAndNavigate();
    }
  }, [adminInfo, dispatch, navigate, adminPanelError]);

  return (
    <div>
      {adminInfo ? (
        <>
          <div className="flex h-screen bg-gray-100">
            <SidePanel />

            <div className="flex-1 overflow-y-auto p-4">
              <Routes>
                {/* Define your routes and components here */}
                {/* <Route path="/admin/dashboard" component={} /> */}
                <Route
                  path="/category/add-category"
                  element={<AddCategory />}
                />
                <Route
                  path="/category/all-category"
                  element={<AllCategory />}
                />
                <Route
                  path="/category/edit-category/:categoryId"
                  element={<EditCategory />}
                />
                <Route path="/products/add-product" element={<AddProduct />} />
                <Route path="/products/all-products" element={<AllProduct />} />
                {/* Add more routes as needed */}
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
