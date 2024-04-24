import {  useLoaderData } from "react-router-dom";
import CategoriesList from "./CategoriesList";
import RecipesNav from "./RecipesNav";
import mainfruite from "../../assets/images/mainfruite.png";
import { useState } from "react";
import Pagenation from "../Pagination";
import { Link } from "react-router-dom";

export default function Catdetails() {

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setpostPerPage] = useState(3);
  const indexOfLastPost = currentPage * postsPerPage;

  const indexOfFirstPost = indexOfLastPost - postsPerPage;

 

  const data = useLoaderData();

  const {
    document: {
      document: { description },
    },
    additionalData: { documents },
  } = data || {};

  console.log(data);
  const {
    document: { document },
  } = data || {}; 

  const {
    subCategories : { documents: subCategories },
  } = data || {};

  
  console.log(subCategories);

  const currentPosts = documents.slice(indexOfFirstPost, indexOfLastPost);
  return (
    <div className="flex w-full relative">
      <CategoriesList width={"w-1/4 "} />
      <div className=" w-2/3 ">
        <RecipesNav />
        <div className="">
          <h1 className="text-2xl font-serif text-green-100 pt-8   drop-shadow-lg ">
            {description}
          </h1>
          <div className="mt-8"><h1 className="text-slate-800 font-poppins text-lg">{document.name} Recipes</h1></div>
          <div className="flex justify-between">
            <div className="flex flex-wrap mt-8 shadow-lg rounded-lg">
              {currentPosts.map((el) => (
                <div key={el._id} className="flex justify-between  px-2  ">

          
                  <div className="w-200px h-200px ">
                    <Link to={`/recipe/${el._id}`}>
                      <img
                        className="w-full h-full border rounded-lg shadow-lg "
                        src={el.image}
                        alt={el.name}
                      />
                      <p className="text-2xl font-montez text-green-100 pt-2   drop-shadow-lg hover:text-green-200 ">
                        {el.name}
                      </p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-28 ">
            <h3 className="font-poppins text-lg">Check more related recipes  </h3>
          </div>
          
          <div className="mt-10 flex ">
            
          {subCategories.map((el) => (
            
            el.category === document._id && 
            <Link to="" key={el._id}>
              <div className="border-2 border-green-300 p-2 lg:p-4 rounded-3xl mx-4 shadow-xl ">
                <h1 className="font-poppins hover:text-green-300 transition-all text-sm lg:text-md">{el.name}</h1>
                </div>
            </Link>
          ))

          }
        </div>
        </div>
        
        <div className="">
          <Pagenation
            totalRes={documents.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            styles="absolute right-0 top-20 flex flex-col space-y-2"
          />
        </div>
        
      </div>
      <img src={mainfruite} alt="" className="w-1/4 h-1000px " />
    </div>
  );
}
