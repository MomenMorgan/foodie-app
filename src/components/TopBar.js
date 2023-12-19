import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { TokenContext } from "../pages/TokenContext";
import { useEffect } from "react";

export default function TopBar() {
  const { token, setToken, handleLogout } = useContext(TokenContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          const fres = await fetch("http://localhost:8080/users", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!fres.ok) {
            throw new Error("Something went wrong");
          }

          const fetchedUsersList = await fres.json();
          console.log(fetchedUsersList);
          setUser(fetchedUsersList);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [token]);
  return (
    <div className="flex justify-between px-0 md:px-28 py-2 bg-black text-white shadow-xl">
      <div className="flex">
        <Link
          to="/"
          className="mr-8 text-sm md:text-base hover:text-green-200 transition-all duration-150 "
        >
          Home
        </Link>
        <Link
          to="/"
          className="mr-8 text-sm md:text-base  hover:text-green-200 transition-all duration-150"
        >
          Books
        </Link>
        <Link
          to="/"
          className="text-sm md:text-base  hover:text-green-200 transition-all duration-150"
        >
          Popular
        </Link>
      </div>
      <div className="flex">
        {!token ? (
          <>
            <Link to="/login" className="mr-8 text-sm md:text-base  hover:text-green-200 transition-all duration-150 ">
              <FontAwesomeIcon
                icon={faRightToBracket}
                className="mr-4 text-green-500"
              />
              Login
            </Link>
            <Link to="/signup" className="mr-2 md:mr-0 text-sm md:text-base  hover:text-green-200 transition-all duration-150">
              <FontAwesomeIcon icon={faUser} className="mr-4 text-green-500" />
              Sign Up
            </Link>
          </>
        ) : (
          <button
            className="mr-2 md:mr-4 text-sm md:text-base"
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faUser} className="mr-4 text-green-500" />
            Logout
          </button>
        )}
        {token && user.document && user.document.role === "admin" ? (
          <Link
            className="mr-2 md:mr-0 text-sm md:text-base"
            to={"/AdminPanel"}
          >
            <FontAwesomeIcon
              icon={faUserTie}
              className=" text-green-500 mr-2"
            />
            Admin Panel
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
