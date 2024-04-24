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
      <CategoriesList width={"w-1/4 md:w-2/12 mt-32"} path={"category"} />

      <div className="container mx-auto px-8 mt-20 lg:w-full xl:w-10/12  md:w-10/12 xxl:w-7/12 xs:w-8/12 ">
        <RecipesNav />
        <PaginationParent />
      </div>
      <img src={mainfruite} alt="" className="md:mt-0 lg:w-1/5 lg:mt-10 w-1/3 md:w-1/4 h-1/2 xl:w-1/5 xs:w-1/2 sticky top-1/4 " />
    </div>
  );
}
