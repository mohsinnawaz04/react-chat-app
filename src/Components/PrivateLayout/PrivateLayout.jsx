import React, { useEffect, useState } from "react";
import { auth } from "../../config/firebase";
import { Outlet, useNavigate } from "react-router-dom";
import App from "../../App";
import Navbar from "../Navbar/Navbar";
import { onAuthStateChanged } from "firebase/auth";
import ChatBox from "../ChatBox/ChatBox";

function PrivateLayout() {
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

export default PrivateLayout;
