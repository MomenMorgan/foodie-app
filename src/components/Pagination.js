import React from "react";

export default function Pagenation({
  postsPerPage,
  totalRes,
  setCurrentPage,
  isHidden,
  styles,
  name = [],
}) {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalRes / postsPerPage); i++) {
    pages.push(i);

  }

  return (
    <div className={`${isHidden} ${styles} `}>
      {" "}
      {pages?.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className="flex items-center justify-center px-8 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-amber-400 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition-all duration-200 "
          >
             {name[index]?.name || page}
          </button>
        );
      })}{" "}
    </div>
  );
}
