import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "./Dropdown";
import _debounce from "lodash/debounce";
import { useEffect } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import {
  faChevronDown,
  faMagnifyingGlass,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

import logo from "../assets/images/foodie-logo-zip-file/png/logo-no-background.png";
import { Link } from "react-router-dom";

export default function Mainbar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showRecipeList, setShowRecipeList] = useState(false);

  const myParam = searchParams.get("query");

  const navigateToSearchResults = () => {
    if (searchTerm.trim() !== "") {
      // Navigate to SearchResults component with the query string
      setSearchParams({ myParam: searchTerm });
      navigate({
        pathname: "/Search",
        search: `?myParam=${searchTerm}`,
      });
    }
  };

  const showAllCategories = () => {
    setShowDropdown(!showDropdown);
  };
  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/recipes?search=${searchTerm}`
      );
      const data = await response.json();
      setRecipes(data.documents);
      // Handle the API response accordingly...
    } catch (error) {
      console.error("Error searching for recipes:", error);
    }
  };

  const delayedSearch = _debounce(handleSearch, 300);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);

    if (e.target.value.trim() !== "") {
      delayedSearch();
      setShowRecipeList(true);
    } else {
      setRecipes([]);
      setShowRecipeList(false); // Reset recipes or fetch default recipes
    }
  };
  const handleInputBlur = () => {
    setSearchTerm("");
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      const searchInput = document.getElementById("search-dropdown");
      const searchResults = document.querySelector(".mt-20.absolute.z-50 ul");

      if (
        searchInput &&
        !searchInput.contains(event.target) &&
        searchResults &&
        !searchResults.contains(event.target)
      ) {
        setShowRecipeList(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [recipes, showRecipeList]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submission behavior
      navigateToSearchResults();
    }
  };

  return (
    <div className="my-4 flex justify-center  ">
      <div
        className="flex justify-between items-center w-full md:w-3/4 px-2 lg:px-28 py-4 bg-white shadow-xl rounded-3xl
        
            "
      >
        <div className=" w-28 sm:w-44">
          <img src={logo} alt="logo" />
        </div>

        <form className="w-1/2 relative" onSubmit={handleSearch}>
          <div class="flex">
            <label
              for="search-dropdown"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Your Email
            </label>
            <button
              class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border
                     border-gray-300 rounded-s-lg
                     hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 
                     dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
              type="button"
              onClick={showAllCategories}
            >
              <FontAwesomeIcon
                icon={faChevronDown}
                className="ml-2 text-black
                      "
              />
            </button>

            <div className="z-10 absolute my-16 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ">
              <Dropdown show={showDropdown} />
            </div>
            <div class="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-3xl border-s-gray-50 border-s-2 border 
                border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  
                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 focus:outline-none"
                placeholder="Search for recipes"
                value={searchTerm}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                autoComplete="off"
                onKeyDown={handleKeyPress}
                required
              />
              <button
                type="submit"
                className="hidden"
              >
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="text-white"
                />
                <span class="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>

        <div>
          <FontAwesomeIcon
            icon={faUserCircle}
            className="text-green-500 text-3xl"
          />
        </div>
      </div>
      <div className="mt-20 absolute z-50 lg:w-1/6  xs:left-2/4 md:w-1/5 xs:w-2/6  ">
        {showRecipeList && (
          <ul className="bg-white w-full p-2 border rounded-md block ">
            {recipes.map((recipe) => (
              <li className="block px-4  py-2 xs:px-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-md transition-all hover:translate-x-2 lg:text-base xs:text-sm">
                <Link
                  key={recipe.id}
                  to={`/recipe/${recipe._id}#middle`}
                  className="font-poppins text-green-100 "
                  onClick={() => setShowRecipeList(false)}
                >
                  {recipe.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
