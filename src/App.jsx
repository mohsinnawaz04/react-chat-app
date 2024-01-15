import React, { useEffect, useState } from "react";
import { ref, get, set, child } from "firebase/database";
import { db, dbRef } from "./config/firebase";
import Navbar from "./Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  const [value, setvalue] = useState("empty");

  function writeData(name, email, password) {
    set(ref(db, `users/${name}`), {
      username: name,
      email: email,
      password: password,
    });
  }

  function readData() {
    get(child(dbRef, `users/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("NOT FOUND");
        }
      })
      .catch((err) => {
        console.warn("ERR: ", err);
      });
  }

  useEffect(() => {
    writeData("mohsin", "bhaimohsin", "gikgs");
  }, []);

  useEffect(() => {
    readData();
  });

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
