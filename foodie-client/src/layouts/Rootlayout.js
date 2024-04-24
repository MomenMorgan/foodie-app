import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { Outlet } from "react-router-dom";;
export default function Rootlayout() {

 
  return (
    <div>
      
      <Header />
      <div>
      
        <Outlet />
        <Footer />
      </div>
     
    </div>
  );
}
