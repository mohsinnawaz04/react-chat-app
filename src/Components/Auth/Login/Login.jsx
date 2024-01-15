import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { auth, googlProvider, githubProvider } from "../../../config/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
function Login() {
  const [showHidePassword, setshowHidePassword] = useState(false);
  const [userDetails, setuserDetails] = useState("NOTHING");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onLogin(data) {
    console.log(data);

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        setuserDetails(userCredential.user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  function showHidePwd() {
    setshowHidePassword((prev) => !prev);
  }

  function handleGoogleLogin() {
    console.log("clicked");

    signInWithPopup(auth, googlProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);

        navigate("/");
      })
      .catch((err) => {
        console.warn("EEROR: ", err);
      });
  }
  function handleGithubLogin() {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        console.log("USERRR: ", user);

        navigate("/");
      })
      .catch((err) => {
        console.warn("EEROR: ", err);
      });
  }

  return (
    <div className="bg-zinc-700 dark:bg-zinc-800 h-screen lg:p-52 p-3">
      <section className="max-w-sm p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-2xl text-center font-semibold text-gray-700 capitalize dark:text-white">
          Login
        </h2>
        <form onSubmit={handleSubmit(onLogin)}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-1">
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
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border-2 border-slate-300 rounded-md dark:bg-gray-800
                 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40
                  dark:focus:border-blue-300
                  outline-none focus:outline-none focus:ring"
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
                 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40
                  dark:focus:border-blue-300
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
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600
               focus:outline-none focus:bg-gray-600"
            >
              Login
            </button>
          </div>
        </form>
        <div className="w-full mt-7">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center w-full p-2 pl-5 mb-5 rounded border bg-slate-100 lg:gap-20 hover:cursor-pointer"
          >
            <FaGoogle />
            Sign in with google
          </button>
          <button
            onClick={handleGithubLogin}
            className="flex items-center w-full p-2 pl-5 mb-2 rounded border bg-slate-100 lg:gap-20 hover:cursor-pointer"
          >
            <FaGithub />
            Sign in with github
          </button>
        </div>
      </section>
    </div>
  );
}

export default Login;
