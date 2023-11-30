import CategoriesList from "./CategoriesList";
import RecipesNav from "./RecipesNav";
import RecipesCard from "./RecipesCard";
import mainfruite from "../../assets/images/mainfruite.png";
import DrinksCard from "./DrinksCard";
import PaginationParent from "./PaginationParent";
export default function Main() {
  return (
    <div className="flex w-full relative">
      <CategoriesList width={"w-1/4 "} />

      <div className=" w-2/3 ">
        <RecipesNav />
        <PaginationParent />
      </div>
      <img src={mainfruite} alt="" className="w-1/4 h-1000px bg-" />
    </div>
  );
}
