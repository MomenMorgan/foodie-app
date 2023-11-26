import { Link } from "react-router-dom";
export default function Dropdown({ show }) {
  const categories = ["All", "Food", "Drinks", "Desserts"];

  return (
    <div>
      <div onClick={show}></div>
      {show && (
        <div>
          {categories.map((category) => (
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              <li className="">
                <Link
                  to="/"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {category}
                </Link>
              </li>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
}
