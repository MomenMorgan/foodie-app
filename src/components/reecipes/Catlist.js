import React from "react";
import { Link } from "react-router-dom";

export default function Catlist() {
  return (
    <div>
      <div className="">
        <h2>Filter Recipes</h2>
        <div>
          <h2>Diet</h2>

          <ul>
            <li>
              <Link to="#"> Dairy Free </Link>
            </li>
            <li>
              <Link to="#">Egg Free</Link>
            </li>
            <li>
              <Link to="#">Sugar Free</Link>
            </li>
            <li>
              <Link to="#">Gluten Free</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2>Allergies</h2>

          <ul>
            <li>
              {" "}
              <Link to="#">Glutten</Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="#">Legumes</Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="#">Grain</Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="#">Fruite</Link>{" "}
            </li>
          </ul>
        </div>
        <div>
          <h2>Cusine</h2>

          <ul>
            <li>
              {" "}
              <Link to="#">Aian</Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="#">Italian</Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="#">Chines</Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="#">Thai</Link>{" "}
            </li>
          </ul>
        </div>
        <div>
          <h2>Goals</h2>

          <ul>
            <li>
              {" "}
              <Link to="#">Weight loss</Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="#">Freshness</Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="#">Activeness</Link>{" "}
            </li>
            <li>
              {" "}
              <Link to = "#">Rich Nutritions</Link>{" "}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
