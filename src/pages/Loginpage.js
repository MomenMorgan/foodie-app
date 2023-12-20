import React from "react";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { TokenContext } from "./TokenContext";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import sign from "../assets/images/sign.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";

export default function Loginpage() {
  const { token, setToken, handleLogout } = useContext(TokenContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/login", loginData);

      if (res.status === 200) {
        const { token } = res.data;
        setToken(token);
        const { email } = loginData;
        localStorage.setItem("email", email);
        const id = res.data.userId;
        localStorage.setItem("userId", id);
        navigate("/", { replace: true });
      } else {
        console.log(res.status);
      }
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full h-full flex justify-center items-center ">
        <div className="w-500px h-500px bg-white mt-20 rounded-lg ">
          <div className="grid grid-cols-1 gap-4 mt-10  justify-center">
            <div className="col-span-2">
              <img src={sign} alt="sign" className="mx-auto w-1/2" />
            </div>
            <div className="col-span-2">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="email"
              >
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className={`mr-2 ml-2 $ ${error && "text-red-400"}`}
                />
                Email
              </label>
              <input
                type="text"
                placeholder={`Enter your email`}
                name="email"
                value={loginData.email !== null ? loginData.email : ""}
                onChange={handleChange}
                className="w-full px-3 py-2 mb-5 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="col-span-2">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="password"
              >
                <FontAwesomeIcon
                  icon={faLock}
                  className={`mr-2 ml-2 ${error && "text-red-400"}`}
                />
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={handleChange}
                name="password"
                className="w-full px-3 py-2 mb-5 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="col-span-1 text-center">
              {error && <p className="text-red-400 pb-2">{error}</p>}
            </div>
            <div className="col-span-2 grid justify-center">
              <div className="col-span-1">
                <button className="px-4 py-2 font-bold text-white bg-green-900 rounded hover:bg-green-800 focus:outline-none focus:shadow-outline transition-all duration-200">
                  Login
                </button>
              </div>
            </div>
            <div className="col-span-2 grid ml-4  text-center ">
              <p className="text-gray-400 text-md font-poppins">
                Navigate as Guest{" "}
                <Link
                  to={"/"}
                  className="text-green-900  font-poppins hover:text-green-100 drop-shadow-2xl transition-all duration-100"
                >
                  Home
                </Link>
              </p>
              <p className="text-gray-400 text-md font-poppins">
                Forgotten Password?{" "}
                <Link
                  to={"/"}
                  className="text-green-900 font-poppins hover:text-green-100 drop-shadow-2xl transition-all duration-100"
                >
                  Restore
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
