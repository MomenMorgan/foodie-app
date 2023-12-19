import React from "react";
import { useState, useEffect } from "react";

export default function UpdateRecipe() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const [searchTerm3, setSearchTerm3] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
  const [seclectedRecipeId, setSelectedRecipeId] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState([]);
  const [filteredRecipe, setFilteredRecipe] = useState([]);
  const [recipeData, setRecipeData] = useState({
    name: "",
    description: "",
    image: null,
    ingredients: [],
    prep_time: null,
    calories: null,
    vegetarian: false,
    diet: "",
    category: "",
    subcategory: "",
  });

  const token = localStorage.getItem("token");
  // Function to fetch categories and subcategories based on search term
  const fetchCatSub = async () => {
    try {
      const response = await fetch(`http://localhost:8080/categories?name`);
      const data = await response.json();
      if (data && data.documents && Array.isArray(data.documents)) {
        setCategories(data.documents);
      }

      const response2 = await fetch(`http://localhost:8080/subcategories?name`);
      const data2 = await response2.json();
      if (data2 && data2.documents && Array.isArray(data2.documents)) {
        setSubCategories(data2.documents);
      }
      const response3 = await fetch(`http://localhost:8080/recipes?name`);
      const data3 = await response3.json();
      if (data3 && data3.documents && Array.isArray(data3.documents)) {
        setSelectedRecipe(data3.documents);
      }
    } catch (error) {
      console.error("Error fetching categories and subcategories:", error);
    }
  };

  // Update filtered categories and subcategories based on search terms
  useEffect(() => {
    setFilteredCategories(
      categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredSubCategories(
      subCategories.filter((subCategory) =>
        subCategory.name.toLowerCase().includes(searchTerm2.toLowerCase())
      )
    );
    setFilteredRecipe(selectedRecipe.filter((Recipe) =>
    Recipe.name.toLowerCase().includes(searchTerm3.toLowerCase())
  ))
  }, [searchTerm, searchTerm2, categories, subCategories, selectedRecipe,searchTerm3]);

  const updateRequest = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/recipes/${seclectedRecipeId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(recipeData),
        }
      );
      const data = await response.json();
      console.log("data", data);

      // Reset the form fields on successful creation
      if (response.ok) {
        setRecipeData({
          name: "",
          description: "",
          image: null,
          ingredients: [],
          prep_time: null,
          calories: null,
          vegetarian: false,
          diet: "",
          category: "",
          subcategory: "",
        });
        setSearchTerm("");
        setSearchTerm2("");
        setSelectedCategoryId(null);
        setSelectedSubCategoryId(null);
      }
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };
  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    setSelectedCategoryId(selectedCategoryId);
    setRecipeData({ ...recipeData, category: selectedCategoryId });
  };

  // Handling subcategory change
  const handleSubCategoryChange = (event) => {
    const selectedSubCategoryId = event.target.value;
    setSelectedSubCategoryId(selectedSubCategoryId);
    setRecipeData({ ...recipeData, subcategory: selectedSubCategoryId });
  };
  const handleRecipeChange = (event) => {
    const selectedRecipeId = event.target.value;
    setSelectedRecipeId(selectedRecipeId);
  };

  const handleIngredientsChange = (e) => {
    const ingredients = e.target.value.split(",");
    setRecipeData({ ...recipeData, ingredients });
  };
  const inputStyle = {
    margin: "8px",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

  const selectStyle = {
    margin: "8px",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    cursor: "pointer",
  };

  const buttonStyle = {
    margin: "8px",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    backgroundColor: "#355E3B",
    color: "#FFF",
    border: "none",
  };

  // Your component code...
  return (
    <div className="flex flex-col">
      <input
        style={inputStyle}
        type="text"
        placeholder="name"
        value={recipeData.name}
        onChange={(e) => setRecipeData({ ...recipeData, name: e.target.value })}
      />
      <input
        style={inputStyle}
        type="text"
        placeholder="description"
        value={recipeData.description}
        onChange={(e) =>
          setRecipeData({ ...recipeData, description: e.target.value })
        }
      />
      <input
        style={inputStyle}
        type="text"
        placeholder="ingredients"
        value={recipeData.ingredients.join(",")}
        onChange={handleIngredientsChange}
      />
      <input
        style={inputStyle}
        type="text"
        placeholder="prep_time"
        value={recipeData.prep_time}
        onChange={(e) =>
          setRecipeData({ ...recipeData, prep_time: e.target.value })
        }
      />
      <input
        style={inputStyle}
        type="text"
        placeholder="calories"
        value={recipeData.calories}
        onChange={(e) =>
          setRecipeData({ ...recipeData, calories: e.target.value })
        }
      />
      <input
        style={inputStyle}
        type="text"
        placeholder="vegetarian"
        value={recipeData.vegetarian}
        onChange={(e) =>
          setRecipeData({ ...recipeData, vegetarian: e.target.value })
        }
      />
      <input
        style={inputStyle}
        type="text"
        placeholder="diet"
        value={recipeData.diet}
        onChange={(e) => setRecipeData({ ...recipeData, diet: e.target.value })}
      />
      <input
        style={inputStyle}
        type="text"
        placeholder="Image"
        value={recipeData.image}
        onChange={(e) =>
          setRecipeData({ ...recipeData, image: e.target.value })
        }
      />
      <select
        style={selectStyle}
        onChange={handleCategoryChange}
        onClick={fetchCatSub}
      >
        <option value="">Select Category</option>
        {filteredCategories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      <select style={selectStyle} onChange={handleSubCategoryChange}>
        <option value="">Select Subcategory</option>
        {filteredSubCategories.map((subcategory) => (
          <option key={subcategory._id} value={subcategory._id}>
            {subcategory.name}
          </option>
        ))}
      </select>
      <select style={selectStyle} onChange={handleRecipeChange}>
        <option value="">Select Recipe </option>
        {filteredRecipe.map((recipe) => (
          <option key={recipe._id} value={recipe._id}>
            {recipe.name}
          </option>
        ))}
      </select>
      <button style={buttonStyle} onClick={updateRequest}>
        Update Recipe
      </button>
    </div>
  );
}
