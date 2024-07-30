import React from "react";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";
import { Outlet } from "react-router-dom";

export default function CustomerLayout() {
  return (
    <>
      <NavBar />
      <div className=" pt-36 pb-10">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
