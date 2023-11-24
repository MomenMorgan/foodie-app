import {Outlet } from "react-router-dom";

import TopBar from "../TopBar";
import Mainbar from "../Mainbar";
import MySwiper from "../Swiper";


export default function Header() {


  return (
    <div>
      <header>
        <nav>
        <TopBar />
        <Mainbar /> 
        <MySwiper />
          
        </nav>
        
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
