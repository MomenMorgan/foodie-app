import { useLoaderData, Link } from "react-router-dom";
import Pagination from "../Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faC } from "@fortawesome/free-solid-svg-icons";
import { faClockFour } from "@fortawesome/free-solid-svg-icons";
import StarRating from "./StarRating";
export default function BakeryCard({
  currentPage,
  setCurrentPage,
  postsPerPage,
  indexOfFirstPost,
  indexOfLastPost,
  len,
}) {
  const data = useLoaderData();

  const {
    recipesList: { documents },
  } = data || {};

  const filterRecipes = documents.filter((el) =>
    ["657a65bc4577e638b6d8f2be"].includes(el.category._id)
  );

  const currentPosts = filterRecipes.slice(indexOfFirstPost, indexOfLastPost);
  console.log(currentPosts)

  return (
    <div className="container mx-auto px-8 ">
   <h1 className="font-montez text-3xl md:text-4xl text-green-300 mb-2 mt-4">{currentPosts[0]?.category.name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8 w-40 md:w-auto">
        {currentPosts.map((el) => (
          <div
            key={el._id}
            className="bg-white rounded-lg overflow-hidden shadow-md transition duration-200 border-2 hover:border-green-200"
          >
            <Link to={`recipe/${el._id}`}>
              <img
                src={el.image}
                alt={el.name}
                className="w-full h-28 md:h-48 object-cover transition duration-300 grayscale-0 hover:grayscale "
              />
            </Link>
            <div className="p-4">
              <div className="pt-2">
                <div className="flex justify-between">
                  <Link
                    to={`recipe/${el._id}`}
                    className="text-base md:text-lg font-semibold text-green-700 hover:text-green-600 truncate"
                  >
                    {el.name}
                  </Link>

                  <p className="bg-green-200 text-xs font-semibold py-1 px-2 rounded h-1/3 w-1/3 md:w-1/4 text-center">
                    <FontAwesomeIcon icon={faC} className="mr-1" />
                    {el.calories}
                  </p>
                </div>
                <p className="text-sm font-light">
                  <FontAwesomeIcon icon={faClockFour} className="mr-1" />
                  {el.prep_time} minutes
                </p>
                <div className="flex justify-between items-center">
                <StarRating average={el.ratingsAverage} quantity={el.ratingsQuantity} />
                <p className="text-sm font-light text-gray-500">
                  {el.total_ratings} ratings
                </p>
              </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        totalRes={len}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        styles="absolute right-0 top-20 flex flex-col space-y-2"
      />
    </div>
  );
}
