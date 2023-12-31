import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import userEvent from "@testing-library/user-event";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import TopBar from "../TopBar";
import Mainbar from "../Mainbar";
import CategoriesList from "./CategoriesList";
import mainfruite from "../../assets/images/mainfruite.png";

export default function SearchResult() {
        const location = useLocation();
        const myParam = new URLSearchParams(location.search).get("myParam");
        const [recipes, setRecipes] = useState([]);
      
        useEffect(() => {
          const handleSearch = async () => {
            try {
              const response = await fetch(
                `http://localhost:8080/recipes?search=${myParam}`
              );
              const data = await response.json();
      
              if (data && data.documents) {
                const formattedRecipes = data.documents.map((recipe) => ({
                  _id: recipe._id,
                  name: recipe.name,
                  image: recipe.image,
                  category: {
                    _id: recipe.category._id,
                    name: recipe.category.name,
                  },
                  calories: recipe.calories,
                  prep_time: recipe.prep_time,
                  ratingsAverage: recipe.ratingsAverage,
                  ratingsQuantity: recipe.ratingsQuantity,
                  total_ratings: recipe.total_ratings,
                  // Add other properties if needed
                }));
      
                setRecipes(formattedRecipes);
              } else {
                setRecipes([]);
              }
            } catch (error) {
              console.error("Error searching for recipes:", error);
            }
          };
      
          if (myParam) {
            handleSearch();
          }
        }, [myParam]);
      
        return (
          <div >
            <div>
              <TopBar />
              <Mainbar />
            </div>
            <div className="flex relative ">
              <CategoriesList width={"w-1/4 md:w-2/12 mt-14 "} path={"category"} />
              
              <div className="container mx-auto px-8 mt-20 lg:w-9/12 xl:w-10/12  md:w-10/12 xxl:w-7/12">
                <div className="grid md:grid-cols-2  sm:w-7/12 sm:mx-auto lg:grid-cols-3 gap-8  md:w-10/12">
                  {recipes.map((recipe) => (
                    <div key={recipe._id} className="bg-white rounded-lg overflow-hidden shadow-md transition duration-200 border-2 hover:border-green-200 ">
                      <Link to={`/recipe/${recipe._id}`}>
                        <img
                          src={recipe.image}
                          alt={recipe.name}
                          className="w-full h-28 md:h-48 object-cover transition duration-300 grayscale-0 hover:grayscale "
                        />
                      </Link>
                      <div className="p-4">
                        <div className="pt-2">
                          <div className="flex justify-between">
                            <Link to={`recipe/${recipe._id}`} className="text-base md:text-lg font-semibold text-green-700 hover:text-green-600 truncate">
                              {recipe.name}
                            </Link>
                            <p className="bg-green-200 text-xs font-semibold py-1 px-2 rounded h-1/3 w-1/3 md:w-1/4 text-center">
                              {recipe.calories}
                            </p>
                          </div>
                          <p className="text-sm font-light">
                            {recipe.prep_time} minutes
                          </p>
                          <div className="flex justify-between items-center">
                            <StarRating average={recipe.ratingsAverage} quantity={recipe.ratingsQuantity} />
                            <p className="text-sm font-light text-gray-500">
                              {recipe.total_ratings} ratings
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <img src={mainfruite} alt="" className="mt-80 md:mt-0 lg:w-1/5 lg:mt-10 w-1/3 md:w-1/4 h-1/2 xl:w-1/5 sm:w-1/2 sticky top-1/2" />
            </div>
          
          </div>
        );
      }