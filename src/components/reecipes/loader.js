//categories list and all recipes
const token = localStorage.getItem("token");

export const catLoader = async () => {
  const res = await fetch("http://localhost:8080/categories");

  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  const categoriesList = await res.json();

  const secondRes = await fetch("http://localhost:8080/recipes");
  if (!secondRes.ok) {
    throw new Error("Something went wrong");
  }
  const recipesList = await secondRes.json();

  return {
    categoriesList,
    recipesList,
  };
};

//Categories Details

export const catDetailsLoader = async ({ params }) => {
  const { id } = params;
  const res = await fetch("http://localhost:8080/categories/" + id);
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  const catDetailsData = await res.json();

  const sres = await fetch(`http://localhost:8080/categories/${id}/recipes`);
  if (!sres.ok) {
    throw new Error("Something went wrong");
  }
  const additionalData = await sres.json();

  const tres = await fetch("http://localhost:8080/categories");

  if (!tres.ok) {
    throw new Error("Something went wrong");
  }
  const categoriesList = await tres.json();

  const fres = await fetch("http://localhost:8080/subcategories");

  if (!fres.ok) {
    throw new Error("Something went wrong");
  }
  const subCategories = await fres.json();

  const feres = await fetch("http://localhost:8080/recipes");
  if (!feres.ok) {
    throw new Error("Something went wrong");
  }
  const recipesList = await feres.json();

  return {
    document: catDetailsData,
    additionalData,
    categoriesList,
    subCategories,
    recipesList,
  };
};

// Recipes Details

export const recipeDetailsLoader = async ({ params, token }) => {
  const { id } = params;
  const res = await fetch("http://localhost:8080/recipes/" + id);
  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  const catDetailsData = await res.json();
  const category = catDetailsData.document.category;

  const sres = await fetch(
    `http://localhost:8080/categories/${category._id}/recipes`
  );
  if (!sres.ok) {
    throw new Error("Something went wrong");
  }
  const additionalData = await sres.json();

  const tres = await fetch("http://localhost:8080/categories");

  if (!tres.ok) {
    throw new Error("Something went wrong");
  }
  const categoriesList = await tres.json();
  const feres = await fetch("http://localhost:8080/recipes");
  if (!feres.ok) {
    throw new Error("Something went wrong");
  }
  const recipesList = await feres.json();
  const usersList = {
    document: {
      collections: [],
    }
  };

  return {
    document: catDetailsData,
    additionalData,
    categoriesList,
    usersList,
    recipesList,
  };

};

//Profile Loader

export const profileLoader = async () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

 
  const profileData = {
    document: {
      collections: [],
      name : "",
      email: ""
    }
  };


  const sres = await fetch("http://localhost:8080/categories");

  if (!sres.ok) {
    throw new Error("Something went wrong");
  }
  const categoriesList = await sres.json();
  const feres = await fetch("http://localhost:8080/recipes");
  if (!feres.ok) {
    throw new Error("Something went wrong");
  }
  const recipesList = await feres.json();

  return {
    profileData,
    categoriesList,
    recipesList,
  };
};
