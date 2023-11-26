import React from "react";
import Header from "../components/common/Header";
import { Outlet } from "react-router-dom";
export default function Rootlayout() {
  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
