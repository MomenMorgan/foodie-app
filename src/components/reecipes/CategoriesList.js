import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";

export default function CategoriesList({ width, path }) {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const data = useLoaderData();

  const {
    categoriesList: { documents },
    recipesList: { documents: recipes },
  } = data || {};

  return (
    <div className={`p-0 pl-0 lg:pl-10 lg:w-2/12  ${width} relative`}>
      {/* Toggle button for medium screens */}
      <button
        className="block md:hidden relative md:absolute top-20 pb-4 pl-2 font-montez text-3xl text-green-100 cursor-pointer"
        onClick={() => togglePopup()}
      >
        <FontAwesomeIcon icon={faBarsStaggered} />
      </button>

      {/* List display for large screens */}
      <div className="hidden md:block">
        <h1 className="pb-4 font-montez text-4xl text-green-100">Filter recipes</h1>
        <h2 className="pt-4 text-xl text-green-200">Cuisine</h2>
        {documents.map((el) => (
          <div
            key={el._id}
            className="text-md pl-2 font-light hover:text-green-200 hover:font-medium w-100px pt-1"
          >
            <Link to={`/${el._id}`.toString()}>{el.name}</Link>
          </div>
        ))}

        <h2 className="pt-4 text-xl text-green-200">Diet</h2>
        {recipes.map(
          (el) =>
            el.diet === "true" && (
              <div
                key={el._id}
                className="text-md pl-2 font-light hover:text-green-200 hover:font-medium w-120px"
              >
                <Link to={`/recipe/${el._id}`}>{el.name}</Link>
              </div>
            )
        )}

        <h2 className="pt-4 text-xl text-green-200">Vegetarians</h2>
        {recipes.map(
          (el) =>
            el.vegetarian && (
              <div
                key={el._id}
                className="text-md pl-2 font-light hover:text-green-200 hover:font-medium pt-1 w-120px"
              >
                <Link to={`/recipe/${el._id}`}>{el.name}</Link>
              </div>
            )
        )}
      </div>

      {/* Popup for medium screens */}
      {showPopup && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 z-40"
          onClick={() => setShowPopup(false)}
        ></div>
      )}
      {showPopup && (
        <div className="absolute top-14 left-0 z-50 p-4 bg-white shadow-md rounded-lg md:hidden">
          <h2 className="pt-4 text-xl text-green-200">Cuisine</h2>
          {documents.map((el) => (
            <div
              key={el._id}
              className="text-md pl-2 font-light hover:text-green-200 hover:font-medium w-100px pt-1"
            >
              <Link to={`/${el._id}`.toString()}>{el.name}</Link>
            </div>
          ))}

          <h2 className="pt-4 text-xl text-green-200">Diet</h2>
          {recipes.map(
            (el) =>
              el.diet === "true" && (
                <div
                  key={el._id}
                  className="text-md pl-2 font-light hover:text-green-200 hover:font-medium w-120px"
                >
                  <Link to={`/recipe/${el._id}`}>{el.name}</Link>
                </div>
              )
          )}

          <h2 className="pt-4 text-xl text-green-200">Vegetarians</h2>
          {recipes.map(
            (el) =>
              el.vegetarian && (
                <div
                  key={el._id}
                  className="text-md pl-2 font-light hover:text-green-200 hover:font-medium pt-1 w-120px"
                >
                  <Link to={`/recipe/${el._id}`}>{el.name}</Link>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
}