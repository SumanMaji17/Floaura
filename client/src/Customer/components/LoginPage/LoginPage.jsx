import React from "react";
import Login from "./Login";
import Register from "./Register";
import { useSelector } from "react-redux";

export default function LoginPage({ onLoginSuccess }) {
  const loginError = useSelector((state) => state.user.loginError);
  return (
    <div className=" flex">
      <img
        src="Flower.jpg"
        className=" hidden md:block md:w-1/2 h-full rounded-l-lg"
      />

      <div className="flex flex-col w-full md:w-1/2 p-4">
        <div className="flex flex-col flex-1 justify-center mb-8">
          {loginError ? (
            <Register />
          ) : (
            <Login onLoginSuccess={onLoginSuccess} />
          )}

          <div></div>
        </div>
      </div>
    </div>
  );
}
