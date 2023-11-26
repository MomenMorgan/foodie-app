import { Outlet } from "react-router-dom";

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
          <div className="flex justify-center h-600px mt-8 ">
            <MySwiper width={"3/4"} />
          </div>
        </nav>
      </header>
    </div>
  );
}
