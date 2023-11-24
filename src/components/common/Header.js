import {Outlet } from "react-router-dom";

import TopBar from "../TopBar";
import Mainbar from "../Mainbar";


export default function Header() {


  return (
    <div>
      <header>
        <nav>
        <TopBar />
        <Mainbar /> 
        <TopBar />
          
        </nav>
        
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
