import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Navigate } from "react-router-dom";
export default function FetchColllection({
  collections,
  setRecipesData,
  recipesData,
  currentPosts,
  updateRecipesData
}) {
  const [deletedRecipeKey, setDeletedRecipeKey] = useState(0);
  const [updateCurrent, setUpdateCurrent] = useState(currentPosts);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchRecipeInfo(id) {
      try {
        const response = await axios.get(`http://localhost:8080/recipes/${id}`);
        return response.data;
      } catch (error) {
        console.error(`Error fetching recipe with ID ${id}:`, error);
        return null;
      }
    }

    async function fetchRecipesForCollections() {
      const recipesDataObj = {};

      for (const collection of collections) {
        const collectionRecipes = [];

        for (const recipeId of collection.recipes) {
          const recipeInfo = await fetchRecipeInfo(recipeId);
          collectionRecipes.push(recipeInfo);
        }

        recipesDataObj[collection.name] = collectionRecipes;
      }

      setRecipesData(recipesDataObj);
    }

    fetchRecipesForCollections();
  }, [collections, setRecipesData, deletedRecipeKey, setUpdateCurrent] );

  
  async function deleteRecipeFromCollection(collectionId, name,recipeId) {
    try {
      await axios.delete(
        `http://localhost:8080/collections/${collectionId}/recipes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: {
            recipe: recipeId,
          },
        }
      );

      const updatedRecipesData = { ...recipesData }; 
      updatedRecipesData[name] = updatedRecipesData[name].filter(
        (recipe) => recipe.document._id !== recipeId
      );
      
      
      setRecipesData(updatedRecipesData); 
      
    } catch (error) {
      console.error(
        `Error deleting recipe with ID ${recipeId} from collection with ID ${collectionId}:`,
        error
      );
    }
  }
  console.log(recipesData)
 

  return (
    <div>
      {currentPosts.map((el) => (
        <div
          key={el._id}
          className="grid grid-cols-8 grid-rows-8 gap-2 items-center px-2 py-4 bg-neutral-50 rounded-md shadow-md "
        >
          {recipesData[el.name] &&
            recipesData[el.name].map((recipe) => (
              <div key={recipe.document._id} className=" w-12/12  ">
                <Link to={`/recipe/${recipe.document._id}`}>
                  <img
                    src={recipe.document.image}
                    alt={recipe.document.name}
                    className=" rounded-md shadow-xl hover:translate-y-2 transform transition-all duration-500 border ease-in-out h-150px -200px hover:border-green-300"
                  />
                </Link>
                <div className="bg-neutral-50 mt-4 text-center rounded-lg w-12/12">
                  <button
                    onClick={() =>
                      deleteRecipeFromCollection(el._id, el.name,recipe.document._id) 
                    }
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-red-700 text-2xl shadow-lg"
                    />
                  </button>
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
