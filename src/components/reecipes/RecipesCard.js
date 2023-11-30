import { useLoaderData, Link } from "react-router-dom";
import React, { createContext, useContext, useEffect, useState } from "react";
import Pagination from "../Pagination";
import { RecipesContext } from "./PaginationParent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faC } from "@fortawesome/free-solid-svg-icons";
import { faClockFour } from "@fortawesome/free-solid-svg-icons";

export default function RecipesCard({
  currentPage,
  setCurrentPage,
  postsPerPage,
  indexOfFirstPost,
  indexOfLastPost,
}) {
  const data = useLoaderData();

  const {
    recipesList: { documents },
  } = data || {};

  const { dataFromChild, setDataFromChild } = useContext(RecipesContext);

  const filterRecipes = documents.filter((el) =>
    ["656134f855fa025551457e3c", "656827015cec2c453a58a2b3"].includes(
      el.category
    )
  );

  const slicedCurrentPosts = filterRecipes.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  useEffect(() => {
    setDataFromChild(filterRecipes);
  }, []);

  return (
    <div className="">
      <h1 className="mt-8 font-montez text-4xl text-green-300">Cussines</h1>
      <div className="grid grid-cols-3 h-300px gap-8 ">
        {slicedCurrentPosts.map((el) => (
          <div key={el._id} className="">
            <Link to={`${el._id}`.toString()}>
              <img
                src={el.image}
                alt=""
                className=" w-200px lg:w-300px h-200px lg:h-250px  shadow-xl dark:shadow-gray-800 transition-all duration-300 rounded-lg filter grayscale-0 hover:grayscale"
              />
            </Link>
            <div className="pt-2">
              <div className="flex justify-between ">
                <Link
                  to={`${el._id}`.toString()}
                  className="font-light text-xl"
                >
                  {el.name}
                </Link>

                <p className="bg-green-200 w-1/5 h-1/4 text-sm font-light">
                  <FontAwesomeIcon icon={faC} className="px-2" />
                  {el.calories}
                </p>
              </div>
              <div>
                <p className="text-sm font-light ">
                  <FontAwesomeIcon icon={faClockFour} className="pr-2" />
                  {el.prep_time} minutes
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        totalRes={filterRecipes.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        isHidden={"hidden"}
      />
    </div>
  );
}
