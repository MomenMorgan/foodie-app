import React, { useState } from "react";
import sign from "../../assets/images/sign.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState([]);

  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();


  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        errorData.error.forEach((error) => {
          setError((prev) => [...prev, error.msg]);
        });

        return;
      }

      const data = await response.json();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  console.log(formData)
  return (
    <div>
    <form
        className="flex flex-col items-center justify-center w-full max-w-lg mx-auto mt-20"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="w-1/2">
          <img src={sign} alt="sign" />
        </div>
        <div className="w-full">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="w-full px-3 py-2 mb-5 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Username"
            onChange={handleChange}
          />

          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full px-3 py-2 mb-5 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full px-3 py-2 mb-5 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            onChange={handleChange}
          />
        </div>
        {error.length > 0 && (
          <div className="text-red-400 pb-4">
            <ul>
              {error.map((errorMsg, index) => (
                <li key={index}>{errorMsg}</li>
              ))}
            </ul>
          </div>
        )}
        <button
          className="px-4 py-2 font-bold text-white bg-green-900 rounded hover:bg-green-800 focus:outline-none focus:shadow-outline transition-all duration-200"
          type="submit"
        >
          Sign Up
        </button>
        <div className="mt-4">
          <p className="text-gray-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-green-900 hover:text-green-700 transition-all duration-200"
            >
              Login
            </a>
          </p>
          <p className="text-gray-400 text-md font-poppins">Navigate as Guest  <Link to={"/"} className="text-green-900  font-poppins hover:text-green-100 drop-shadow-2xl transition-all duration-100">Home</Link></p>
        </div>
      </form> 
    </div>
  );
}

