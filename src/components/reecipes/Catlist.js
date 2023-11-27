import { useLoaderData, Link } from "react-router-dom";

export default function Catlist() {
  const data = useLoaderData();
  console.log(data);
  return (
    <div className="bg-slate-400 p-8">
      <h1 className="pb-4">Categories</h1>

      <h2 className="pt-4">Cusine</h2>
      {data.documents.map((el) => (
        <div key={el.id} className="pt-2">
          <Link to={`/details`}>{el.name}</Link>
        </div>
      ))}

      <h2 className="pb-2 pt-8">Dite</h2>
      {data.documents.map((el) => (
        <div key={el.id} className="pb-2">
          <Link to={`/details`}>{el.name}</Link>
        </div>
      ))}
      <h2 className="pb-2 pt-4">Goals</h2>
      {data.documents.map((el) => (
        <div key={el.id} className="pb-2">
          <Link to={`/details`}>{el.name}</Link>
        </div>
      ))}
    </div>
  );
}

export const catLoader = async () => {
  const res = await fetch("http://localhost:8080/categories");

  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  return res.json();
};
