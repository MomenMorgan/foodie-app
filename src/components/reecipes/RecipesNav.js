import { NavLink } from "react-router-dom";

export default function RecipesNav() {
  return (
    <div className="w-full mt-12 border-gray-500 border-t ">
      <div className="grid grid-cols-4 justify-items-center border-b py-4 border-gray-500">
        <NavLink to={"/"} className="text-green-300 hover:font-bold ">
          Home
        </NavLink>
        <NavLink to={"/Explore"} className="text-green-300 hover:font-bold">
          Explore
        </NavLink>
        <NavLink to={"/Help"} className="text-green-300 hover:font-bold">
          Help
        </NavLink>
        <NavLink to={"/Profile"} className="text-green-300 hover:font-bold">
          Profile
        </NavLink>
      </div>
    </div>
  );
}
