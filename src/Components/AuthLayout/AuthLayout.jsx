import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import ChatBox from "../ChatBox/ChatBox";
import Navbar from "../Navbar/Navbar";

function AuthLayout() {
  const navigate = useNavigate();

  const [userInfo, setuserInfo] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user;
        console.log("USER", uid);
        setuserInfo(uid);

        navigate("/");
      } else {
        navigate("/auth/login");
      }
    });
  }, [userInfo]);
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default AuthLayout;
