import React from "react";
import { Outlet } from "react-router-dom";
import { createContext, useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, _setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);


  const setToken = (newToken) => {
    _setToken(newToken);
  };
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem('token',token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token')
    }
  }, [token]);

  useEffect(() => {
    const getUser = async () => {
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
          setUser(fetchedUsersList.document);
          console.log(fetchedUsersList);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    getUser(); 
  }, [token]);


  const handleLogout = useCallback(() => {

    setToken(null);
    navigate("/", { replace: true });
  
  }, [navigate]);

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      handleLogout,
      user,
    }),
    [token, handleLogout, user]
  );
  
 
  return (
    <TokenContext.Provider value={contextValue}>
      <Outlet />
    </TokenContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(TokenContext);
};
