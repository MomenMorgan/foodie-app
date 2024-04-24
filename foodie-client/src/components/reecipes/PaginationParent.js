import RecipesCard from "./RecipesCard";
import DrinksCard from "./DrinksCard";
import React, { createContext, useState } from "react";
import BakeryCard from "./BakeryCard";

export const RecipesContext = createContext();

export default function PaginationParent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setpostPerPage] = useState(3);
  const indexOfLastPost = currentPage * postsPerPage;

  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const [dataFromChild, setDataFromChild] = useState(null);

  return (
    <div className="">
      <RecipesContext.Provider value={{ dataFromChild, setDataFromChild }}>
        <RecipesCard
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          postsPerPage={postsPerPage}
          indexOfLastPost={indexOfLastPost}
          indexOfFirstPost={indexOfFirstPost}
        />
        <DrinksCard
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          postsPerPage={postsPerPage}
          indexOfLastPost={indexOfLastPost}
          indexOfFirstPost={indexOfFirstPost}
          len={dataFromChild?.length}
        />
        <BakeryCard
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          postsPerPage={postsPerPage}
          indexOfLastPost={indexOfLastPost}
          indexOfFirstPost={indexOfFirstPost}
          len={dataFromChild?.length}
        />
      </RecipesContext.Provider>
    </div>
  );
}
