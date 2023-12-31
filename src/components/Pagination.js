import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

export default function Pagenation({
  postsPerPage,
  totalRes,
  setCurrentPage,
  isHidden,
  styles,
  name = [],
  currentPage,
}) {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalRes / postsPerPage); i++) {
    pages.push(i);
  }
  console.log(currentPage);

  return (
    <div className={`${isHidden} ${styles} `}>
      <button>
        <FontAwesomeIcon
          className="w-5 h-5"
          icon={faAngleLeft}
          onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1: currentPage)}
        ></FontAwesomeIcon>
      </button>
      {pages?.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={`flex items-center justify-center px-4  h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-2 border-gray-300 rounded-lg hover:bg-amber-400 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition-all duration-200  ${
              currentPage === page ? "bg-amber-400" : "bg-white"
            }`}
          >
            {name[index]?.name || page}
          </button>
        );
      })}{" "}
      <button>
        <FontAwesomeIcon
          className="w-5 h-5"
          icon={faAngleRight}
          onClick={() => setCurrentPage(currentPage < pages.length  ?currentPage + 1: currentPage)}
        ></FontAwesomeIcon>
      </button>
    </div>
  );
}
