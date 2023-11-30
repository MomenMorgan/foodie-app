//categories list and all recipes

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

  return {
    document: catDetailsData,
    additionalData,
  };
};
