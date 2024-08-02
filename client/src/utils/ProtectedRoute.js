import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { PROTECTED } from "./ApiRoutes";
import { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(PROTECTED, { withCredentials: true })
      .then((response) => {
        if (response.data.status) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setIsLoading(false);
      });
  }, []);



  if (isLoading) {
    return <div className=" flex items-center justify-center w-screen h-screen">
      <ClipLoader color="#008cff" size={100} loading="true" />
    </div>; 
  }


  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
