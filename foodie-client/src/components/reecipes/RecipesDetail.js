import CategoriesList from "./CategoriesList";
import RecipesNav from "./RecipesNav";
import mainfruite from "../../assets/images/mainfruite.png";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect } from "react";
import ContentLoader from "react-content-loader";
import { useContext } from "react";
import { TokenContext } from "../../pages/TokenContext";
import Reviews from "./Reviews";
import { set } from "lodash";

export default function RecipesDetail() {
  const data = useLoaderData();
  const { token, setToken } = useContext(TokenContext);
  const [hiddenCollections, setHiddenCollections] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [collections, setCollections] = useState(
    data.usersList.document.collections
  );
  const [usersList, setUsersList] = useState(null);
  const [RandomRecipes, setRandomRecipes] = useState([]);

  const {
    document: { document },
  } = data || {};

  const {
    additionalData: { documents },
  } = data || {};

  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          const fres = await fetch("http://localhost:8080/users", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!fres.ok) {
            throw new Error("Something went wrong");
          }

          const fetchedUsersList = await fres.json();
          console.log(fetchedUsersList);
          setUsersList(fetchedUsersList);
          setCollections(fetchedUsersList.document.collections);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [token, document._id]);
 

  const fetchReviewsForRecipe = async (recipeId) => {
    try {
      const response = await fetch(`http://localhost:8080/recipes/${recipeId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const data = await response.json();
      return data.document.reviews;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return []; // Return an empty array or handle the error accordingly
    }
  };

  useEffect(() => {
    const tokenFromStorage = token;

    setToken(tokenFromStorage);
  }, [token, setToken]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
    if (!token) {
      setShowPopup(false);
    }
  };

  console.log(usersList);

  useEffect(() => {
    setCollections(collections);
    setHiddenCollections([]);
  }, [document._id, collections]);

   useEffect(() => {
    const shuffledDocuments = documents.sort(() => Math.random() - 0.5);
    const randomRecipes = shuffledDocuments.slice(0, 5);

    setRandomRecipes(randomRecipes); // Update state with shuffled recipes
  }, [documents]);

  const addRecipeToCollection = async (id, recipeId, token) => {
    const url = `http://localhost:8080/collections/${id}/recipes`;

    try {
      const response = await axios.put(
        url,
        {
          recipe: recipeId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHiddenCollections((prevHiddenCollections) => [
        ...prevHiddenCollections,
        id,
      ]);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
      setCollections((prevCollections) =>
        prevCollections.filter((collection) => collection._id !== id)
      );
      return response.data;
    } catch (error) {
      // Handle any errors appropriately
      console.error("Error adding recipe to collection:", error);
      throw error;
    }
  };
  const isHidden = (id) => hiddenCollections.includes(id);

  return (
    <div className="flex md:flex-row " >
      <CategoriesList width="w-1/4" />
      <div className="w-full md:w-3/4">
        <RecipesNav />
        <div className="w-full md:flex">
          <div className="md:w-1/2 w-200px"> 
            <h1 className="text-3xl md:text-4xl font-montez text-green-100 pt-8 mb-4">
              {document.name}
            </h1>
            <img
              className="w-full h-auto border rounded-lg bg- shadow-lg mb-4 md:hidden"
              src={document.image}
              alt={document.name}
            />
            <div className="hidden md:block">
              <img
                className="w-full h-500px border rounded-lg shadow-lg mb-4"
                src={document.image}
                alt={document.name}
              />
            </div>
          </div>
          <div className="md:w-1/2 md:pl-8 mt-0 md:mt-20" >
            <h2 className="text-xl md:text-3xl font-serif text-green-100 mb-4">
              {document.description}
            </h2>
            <div className="flex justify-between" >
              <div>
                <h2 className=" text-lg md:text-xl font-semibold text-green-100 mb-4">
                  Ingredients
                </h2>
                <ul className="text-base font-light">
                  {document.ingredients.map((el) => (
                    <li key={el._id}>{el}</li>
                  ))}
                </ul>
              </div>
              <div className="flex pt-8 px-4">
                <p className="font-semibold text-green-100 px-4 text-base md:text-lg">
                  Calories{" "}
                  <span className="text-black font-normal mx-2">
                    {document.calories}
                  </span>
                </p>
                <p className="font-semibold text-green-100 px-4 text-base md:text-lg">
                  Time{" "}
                  <span className="text-black font-normal mx-2">
                    {document.prep_time}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center " >
          <div className="w-full">
            <h2 className="text-2xl font-semibold text-green-100 mb-4">
              Related recipes
            </h2>
          </div>
          <div className=" w-full md:w-1/2 flex flex-col md:flex-row justify-center md:justify-center bg-zinc-50 shadow-lg rounded-lg p-2" >
            {document &&
              RandomRecipes.map(
                (el) =>
                  el._id !== document._id && (
                    <div
                      key={el._id}
                      className="flex flex-col md:flex-row items-center mb-2 md:mb-0 md:w-150px md:mr-2"
                    >
                      <Link
                        to={`/recipe/${el._id}`}
                        className="rounded-3xl p-2 font-poppins transition-all relative overflow-hidden"
                        style={{ width: "150px", height: "150px" }}
                        class={"recipe-link "}
                      >
                        <div
                          className="border-2 rounded-md hover:border-green-100 h-full  md:w-full transition-all overflow-hidden duration-300 ease-in-out"
                          style={{
                            backgroundImage: `url(${el.image})`,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                          }}
                        ></div>
                        {!el.image && (
                          <ContentLoader
                            speed={2}
                            width={150}
                            height={150}
                            viewBox="0 0 150 150"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                            style={{ position: "absolute", top: 0, left: 0 }}
                          >
                            <rect
                              x="0"
                              y="0"
                              rx="10"
                              ry="10"
                              width="150"
                              height="150"
                            />
                          </ContentLoader>
                        )}
                      </Link>
                    </div>
                  )
              )}
          </div>

          <div className="text-center mt-4" >
            <button
              className="border-2 border-green-100 rounded-xl p-2 font-semibold hover:text-green-500 transition-all hover:border-black"
              onClick={togglePopup}
              style={{ display: token ? "block" : "none" }}
            >
              Collection
              <FontAwesomeIcon
                icon={faBarsStaggered}
                className="text-green-500 pl-2 text-lg fa-regular"
              />
            </button>
            {showPopup && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-40">
                <div className="rounded-lg p-4 w-1/2 h-1/3 bg-white relative">
                  {collections.length === 0 ? (
                    <div>
                      <p className="text-3xl text-gray-500 mb-8">
                        Recipe been Added to all Collections
                      </p>

                      <Link className="borderp-4 rounded-md">
                        Profile
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="text-green-500 pl-2  fa-regular"
                        />
                      </Link>
                    </div>
                  ) : (
                    collections
                      .filter(
                        (collection) =>
                          !collection.recipes.some(
                            (recipe) => recipe === document._id
                          )
                      )
                      .map((collection) => (
                        <div
                          key={collection._id}
                          className={`flex justify-between px-2 ${
                            isHidden(collection._id) ? "hidden" : ""
                          }`}
                        >
                          <button
                            onClick={() =>
                              addRecipeToCollection(
                                collection._id,
                                document._id,
                                token
                              )
                            }
                            className=" p-2 font-montez text-3xl text-green-300 transition-all drop-shadow-md hover:text-black hover:translate-x-4 duration-500 ease-in-out  "
                          >
                            <FontAwesomeIcon
                              icon={faMinus}
                              className="text-green-100 pr-2 text-lg fa-regular"
                            />
                            {collection.name}
                          </button>
                        </div>
                      ))
                  )}
                  {showMessage && ( // Show message when showMessage is true
                    <div className="absolute top-10 right-10 bg-green-200 p-2 rounded-md shadow-md">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-green-500 pr-2 text-lg fa-regular"
                      />
                      Recipe added to collection
                    </div>
                  )}
                  <button
                    className=" rounded-xl py-2 px-4 font-semibold hover:text-green-500 transition-all absolute top-0 right-0 "
                    onClick={togglePopup}
                  >
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      className="text-red-700
                       pr-2 text-xl fa-regular"
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-20" id="middle">
          <Reviews
            reviews={document.reviews}
            recipeId={document._id}
            userId={usersList?.document._id}
            role={usersList?.document.role}
            fetchReviews={() => fetchReviewsForRecipe(document._id)} 
          ></Reviews>
        </div>
      </div>
      <img
        src={mainfruite}
        alt=""
        className="mt-80 md:mt-0 w-1/3 md:w-1/4 h-1/2 "
      />
    </div>
  );
}
