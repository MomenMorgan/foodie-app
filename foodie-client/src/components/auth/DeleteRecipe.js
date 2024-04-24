import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../pages/TokenContext";

export default function DeleteRecipe() {
  const [deleteId, setDeleteId] = useState("");
  const [recipes, setRecipes] = useState([]);
  const { token } = useAuth();

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`http://localhost:8080/recipes`);
      const data = await response.json();
      if (data && data.documents && Array.isArray(data.documents)) {
        setRecipes(data.documents);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const deleteRecipe = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/recipes/${deleteId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data && data.documents && Array.isArray(data.documents)) {
        setRecipes(data.documents);
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleInputChange = (event) => {
    setDeleteId(event.target.value);
  };
  return (
    <div className="flex items-center justify-center h-600px">
      <select
        onClick={fetchRecipes}
        onChange={handleInputChange}
        className="px-4 py-2 border rounded-md mr-4 w-1/2"
      >
        {recipes.map((recipe) => (
          <option key={recipe._id} value={recipe._id}>
            {recipe.name}
          </option>
        ))}
      </select>
      <button
        onClick={deleteRecipe}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
}
