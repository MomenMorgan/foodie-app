import React, { useState, useEffect } from "react";

export default function CreateRecipe() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
  const [sub, setSub] = useState(selectedCategoryId);

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
  const fetchCategory = async () => {
    try {
      const response = await fetch(`http://localhost:8080/categories?name`);
      const data = await response.json();
      if (data && data.documents && Array.isArray(data.documents)) {
        setCategories(data.documents);
      }

    } catch (error) {
      console.error("Error fetching categories and subcategories:", error);
    }
  };

  const fetchSubCategory = async () => {
    try {
      const response2 = await fetch(`http://localhost:8080/categories/${sub}/subcategories`);
      const data2 = await response2.json();
      if (data2 && data2.documents && Array.isArray(data2.documents)) {
        setSubCategories(data2.documents);
      }
    } catch (error) {
      console.error("Error fetching categories and subcategories:", error);
    }
  };

  // Update filtered categories and subcategories based on search terms
  useEffect(() => {
    setFilteredCategories(
      categories.filter((category) =>
        category.name
      )
    );
    setFilteredSubCategories(
      subCategories.filter((subCategory) =>
        subCategory.name
      )
    );
  }, [categories, subCategories]);

  const createRecipe = async () => {
     try {
      const response = await fetch("http://localhost:8080/recipes", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });
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
    setSub(selectedCategoryId);
  };
  console.log(selectedCategoryId)

  // Handling subcategory change
  const handleSubCategoryChange = (event) => {
    const selectedSubCategoryId = event.target.value;
    setSelectedSubCategoryId(selectedSubCategoryId);
    setRecipeData({ ...recipeData, subcategory: selectedSubCategoryId });
  };

  const handleIngredientsChange = (e) => {
    const ingredients = e.target.value.split(","); // Splitting input by comma to create an array
    setRecipeData({ ...recipeData, ingredients });
  };
  const inputStyle = {
    margin: '8px',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };
  
  const selectStyle = {
    margin: '8px',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    cursor: 'pointer',
  };
  
  const buttonStyle = {
    margin: '8px',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#355E3B',
    color: '#FFF',
    border: 'none',
  };
 console.log(filteredCategories);
  return (
    <div className="flex flex-col">
      <input
        style={inputStyle}
        type="text"
        placeholder="name"
        value={recipeData.name}
        onChange={(e) =>
          setRecipeData({ ...recipeData, name: e.target.value })
        }
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
        onChange={(e) =>
          setRecipeData({ ...recipeData, diet: e.target.value })
        }
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
      <select style={selectStyle} onChange={handleCategoryChange} onClick={fetchCategory}>
        <option value="">Select Category</option>
        {filteredCategories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      {/* Select subcategory */}
      <select style={selectStyle} onChange={handleSubCategoryChange} onClick={fetchSubCategory}>
        <option value="">Select Subcategory</option>
        {filteredSubCategories.map((subcategory) => (
          <option key={subcategory._id} value={subcategory._id}>
            {subcategory.name}
          </option>
        ))}
      </select>
      <button style={buttonStyle} onClick={createRecipe}>Create Recipe</button>
    </div>
  );
}
