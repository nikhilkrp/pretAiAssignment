import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null); // null = loading state

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await api.get("/profile/me");
        if (data) {
          setIsAuth(true);
        }
      } catch (err) {
        setIsAuth(false);
      }
    };
    verifyUser();
  }, []);

  if (isAuth === null) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Checking authentication...
      </div>
    );
  }

  return isAuth ? children : <Navigate to="/signin" replace />;
}

export default ProtectedRoute;
