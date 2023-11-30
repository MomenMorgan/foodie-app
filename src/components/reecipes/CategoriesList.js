import { useLoaderData, Link } from "react-router-dom";

export default function CategoriesList({ width }) {
  const data = useLoaderData();
  console.log(data);
  const {
    categoriesList: { documents },
  } = data || {};

  return (
    <div className={` p-0 pl-0lg:p-10 lg:pl-28 ${width} `}>
      <h1
        className="pb-4 font-montez text-4xl text-green-100 
        "
      >
        Filter recipes
      </h1>

      <h2 className="pt-4 text-xl text-green-200  ">Cusine</h2>
      {documents.map((el) => (
        <div
          key={el._id}
          className="text-md pl-2 font-light hover:text-green-200 hover:font-medium  w-100px"
        >
          <Link to={`details/${el._id}`.toString()}>{el.name}</Link>
        </div>
      ))}

      <h2 className="pt-4 text-xl text-green-200 ">Dite</h2>
      {documents.map((el) => (
        <div
          key={el._id}
          className="text-md pl-2 font-light hover:text-green-200  w-100px"
        >
          <Link to={`/details`}>{el.name}</Link>
        </div>
      ))}
      <h2 className="pt-4 text-xl text-green-200 ">vegetarians</h2>
      {documents
        .filter((el) =>
          ["Italian", "Asian", "Miditirean", "Egyptian"].includes(el.name)
        )
        .map((el) => (
          <div
            key={el._id}
            className="text-md pl-2 font-light hover:text-green-200  w-100px"
          >
            <Link to={`/details`}>{el.name}</Link>
          </div>
        ))}
    </div>
  );
}

