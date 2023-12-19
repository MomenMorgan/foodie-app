import { NavLink } from "react-router-dom";

export default function RecipesNav() {
  return (
    <div className="w-full mt-8 sm:mt-12 border-gray-500 border-t">
      <div className="grid grid-cols-1 md:grid-cols-4 justify-items-center border-b py-4 border-gray-500">
        <NavLink to={"/"} className="text-green-300 hover:font-bold text-xs md:text-base mb-1 sm:mb-0">
          Home
        </NavLink>
        <NavLink to={"/Explore"} className="text-green-300 hover:font-bold text-xs md:text-base mb-1 sm:mb-0">
          Explore
        </NavLink>
        <NavLink to={"/Help"} className="text-green-300 hover:font-bold text-xs md:text-base mb-1 sm:mb-0">
          Help
        </NavLink>
        <NavLink to={"/Profile"} className="text-green-300 hover:font-bold text-xs md:text-base sm:mb-0">
          Profile
        </NavLink>
      </div>
    </div>
  );
}
