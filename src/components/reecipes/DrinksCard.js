import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";
import Pagination from "../Pagination";
import logo from "../../assets/images/s1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faC } from "@fortawesome/free-solid-svg-icons";
import { faClockFour } from "@fortawesome/free-solid-svg-icons";

export default function DrinksCard({
  currentPage,
  setCurrentPage,
  postsPerPage,
  indexOfFirstPost,
  indexOfLastPost,
  len
  }) {
  const data = useLoaderData();

  const {
    recipesList: { documents },
  } = data || {};

  const filterRecipes = documents.filter((el) =>
    el.category.includes("656131c155fa025551457e36")
  );

  const currentPosts = filterRecipes.slice(indexOfFirstPost, indexOfLastPost);

 
  return (
    <div className="">
      <h1 className="font-montez text-4xl text-green-300 mt-2 lg:mt-8">Drinks</h1>
      <div className="grid grid-cols-3 h-300px gap-8 ">
        {currentPosts.map((el) => (
          <div key={el._id} className="">
            <Link className="">
              <img src={el.image} alt=""className=" w-200px lg:w-300px h-200px lg:h-250px  shadow-xl dark:shadow-gray-800 transition-all duration-300 rounded-lg filter grayscale-0 hover:grayscale" />
            </Link>
            <div className="pl-4">
              <div className="pt-2">
              <div className="flex justify-between ">
                <Link
                  to={`details/${el._id}`.toString()}
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
          </div>
        ))}
      </div>
      <Pagination
        totalRes={len}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        isHidden={"hidden"}
      />
    </div>
  );
}
