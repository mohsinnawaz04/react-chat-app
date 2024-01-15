import React, { useEffect, useRef, useState } from "react";
import { auth } from "../../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Swal from "sweetalert2";

const Dropdown = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdown = useRef(null);

  const handleButtonClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    setDropdownOpen(!isDropdownOpen);

    if (auth.currentUser) {
      console.log(auth.currentUser);
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          Swal.fire({
            position: "center",
            icon: "success",
            title: "You have been logged out",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((error) => {
          // An error happened.
          console.log("EEROR: ", error);
        });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "No user found, Cannot Log out",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     signOut(auth)
    //       .then(() => {
    //         // Sign out successful
    // Swal.fire({
    //   position: "center",
    //   icon: "success",
    //   title: "You have been logged out",
    //   showConfirmButton: false,
    //   timer: 1500,
    // });
    //       })
    //       .catch((err) => {
    //         console.log("EEROR: ", err);
    //       });
    //   } else {
    // Swal.fire({
    //   position: "center",
    //   icon: "error",
    //   title: "No user found, Cannot Log out",
    //   showConfirmButton: false,
    //   timer: 1500,
    // });
    //   }
    // });
  };

  return (
    <div ref={dropdown} className="relative inline-block text-left w-full">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 
          ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
          onClick={handleButtonClick}
        >
          Account
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {/*
        Dropdown menu, show/hide based on menu state.
        */}
      {isDropdownOpen && (
        <div
          className="absolute w-full z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1 w-full" role="none">
            {/* Dropdown content */}
            <button
              onClick={handleLogout}
              className="text-gray-700 block px-4 py-2 text-sm w-full"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-0"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
