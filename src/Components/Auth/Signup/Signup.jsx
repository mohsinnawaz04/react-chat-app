import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebase";

function Signup() {
  const [showHidePassword, setshowHidePassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const passwords = {
    pass: watch("password"),
    cPass: watch("passwordConfirmation"),
  };
  function onSignUp(data) {
    console.log(data);

    if (passwords.pass !== passwords.cPass) {
      return Swal.fire({
        position: "center",
        icon: "error",
        title: "Passwords do not match",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
  function showHidePwd() {
    setshowHidePassword((prev) => !prev);
  }

  function signInWithEmail(data) {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your account has been created",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.warn("EEROR: ", err);
      });
  }
  return (
    <div className="bg-zinc-700 dark:bg-zinc-800 h-screen lg:p-52 p-3">
      <section className="max-w-sm p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-2xl text-center font-semibold text-gray-700 capitalize dark:text-white">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit(signInWithEmail)}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-1">
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="username"
              >
                Name
              </label>
              <input
                id="username"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border-2 border-slate-300 rounded-md dark:bg-gray-800
                 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300
                  outline-none focus:outline-none focus:ring"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Please enter your name",
                  },
                })}
              />
              <p className="text-red-500 text-xs italic">
                {errors.name?.message}
              </p>
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="emailAddress"
              >
                Email Address
              </label>
              <input
                id="emailAddress"
                type="email"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border-2 border-slate-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 outline-none focus:outline-none focus:ring"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Please enter your email",
                  },
                  pattern: {
                    value:
                      /^[a-zA-z][a-zA-z0-9]{3,}[@]{1}[a-z]{4,7}[\.]{1}[a-zA-z]{2,3}$/gm,
                    message: "Email is not correct",
                  },
                })}
              />
              <p className="text-red-500 text-xs italic">
                {errors.email?.message}
              </p>
            </div>
            <div className="flex flex-wrap items-center">
              <label
                className="text-gray-700 dark:text-gray-200 w-full"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type={showHidePassword ? "text" : "password"}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border-2 border-slate-300 rounded-md dark:bg-gray-800
                 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300
                  outline-none focus:outline-none focus:ring flex-1"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Please enter your password",
                  },
                  minLength: {
                    value: 8,
                    message: "Password cannot be less than 8 characters",
                  },
                })}
              />
              <button
                type="button"
                onClick={showHidePwd}
                className="bg-slate-200 h-fit py-3 px-3 mt-2 rounded-md"
              >
                {showHidePassword ? "Hide" : "Show"}
              </button>
              <p className="text-red-500 text-xs italic w-full">
                {errors.password?.message}
              </p>
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="passwordConfirmation"
              >
                Password Confirmation
              </label>
              <input
                id="passwordConfirmation"
                type="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border-2 border-slate-300 rounded-md dark:bg-gray-800
                 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300
                  outline-none focus:outline-none focus:ring"
                {...register("passwordConfirmation", {
                  required: {
                    value: true,
                    message: "Please re-enter your password",
                  },
                })}
              />
              <p className="text-red-500 text-xs italic">
                {errors.passwordConfirmation?.message}
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-8 py-2.5 my-2 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600
               focus:outline-none focus:bg-gray-600"
            >
              Create Account
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Signup;
