import React, { useState } from "react";
import { Link } from "react-router-dom";
export default function Dropdown({show}) {
  const categories = ["All", "Food", "Drinks", "Desserts"];



  return (
    <div>
      <div onClick={show}>
      </div>
      {show && (
        <div>
          {categories.map((category) => (
            <ul className="p-2 hover:bg-green-700 rounded-lg">
              <li className="hover:bg-green-700 w-full rounded-lg">
               
                <Link to= "/"  className="w-full">{category}</Link>
              </li>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
}
