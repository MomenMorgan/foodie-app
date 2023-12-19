import CategoriesList from "./CategoriesList";
import RecipesNav from "./RecipesNav"
import mainfruite from "../../assets/images/mainfruite.png";
import PaginationParent from "./PaginationParent";
import { useContext } from "react";
import { TokenContext } from "../../pages/TokenContext";

export default function Main() {
  const { token } = useContext(TokenContext);
 
  return (
    <div className="flex w-full relative">
      <CategoriesList width={"w-1/4 md:w-1/4 "} path={"category"} />

      <div className=" w-2/3 ">
        <RecipesNav />
        <PaginationParent />
      </div>
      <img src={mainfruite} alt="" className="mt-80 md:mt-0 w-1/3 md:w-1/4 h-1/2 " />
    </div>
  );
}
