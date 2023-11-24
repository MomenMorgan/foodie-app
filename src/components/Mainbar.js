import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "./Dropdown";
import {
  faChevronDown,
  faMagnifyingGlass,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

import logo from "../assets/images/foodie-logo-zip-file/png/logo-no-background.png";

export default function Mainbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const showAllCategories = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="my-4 flex justify-center ">
      <div
        className="flex justify-between items-center w-3/4 px-28 py-4 bg-white shadow-xl rounded-3xl
            "
      >
        <div className="w-44">
          <img src={logo} alt="logo" />
        </div>

        <form className="w-1/2 relative">
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
            
            <div className="absolute my-20 bg-slate-100 w-40 z-10 rounded-lg shadow  ">
                <Dropdown show = {showDropdown} />
            </div>
            <div class="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-3xl border-s-gray-50 border-s-2 border 
                      border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  
                      dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 focus:outline-none"
                placeholder="Search Mockups, Logos, Design Templates..."
                required
              />
              <button
                type="submit"
                className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-3xl
                       border 
                      border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
                      focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 focus:border-blue-800"
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
    </div>
  );
}
