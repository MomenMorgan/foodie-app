import React, { useEffect } from "react";
import { useAuth } from "../pages/TokenContext";
import { Navigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import CategoriesList from "../components/reecipes/CategoriesList";
import mainfruite from "../assets/images/mainfruite.png";
import RecipesNav from "../components/reecipes/RecipesNav";
import userProfile from "../assets/images/userProfile.png";
import Pagenation from "../components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import FetchColllection from "./FetchColllection";
import CreateCollection from "./CreateCollection";

export default function Profile() {
  const data = useLoaderData();
  const [recipesData, setRecipesData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setpostPerPage] = useState(1);
  const indexOfLastPost = currentPage * postsPerPage;
  const [collections, setCollections] = useState(
    data.profileData.document.collections
  );
  const [name, setName] = useState(
    data.profileData.document.name
  );
  const [email, setEmail] = useState(
    data.profileData.document.email
  );

  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const { token } = useAuth();

  const updateRecipesData = (newData) => {
    setRecipesData(newData);
  };

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
          setCollections(fetchedUsersList.document.collections);
          setEmail(fetchedUsersList.document.email)
          setName(fetchedUsersList.document.name)

        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [token]);

  const updateCollections = () => {
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
          setCollections(fetchedUsersList.document.collections);
          setEmail(fetchedUsersList.document.email)
          setName(fetchedUsersList.document.name)

        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  };

  const currentPosts = collections.slice(indexOfFirstPost, indexOfLastPost);

  return (
   
    <div className="flex w-full relative">
      <CategoriesList width={"w-1/4 "} path={"category"} />
      <div className=" w-2/3 ">
        <RecipesNav />
        <div className=" mt-4  flex-col justify-center items-center ">
          <div className="w-full flex justify-center">
            <img src={userProfile} alt="" className=" w-1/4 h-1000px  " />
          </div>
          <div className=" mt-4 ">
            <h2 className=" font-mono text-2xl text-center text-green-300 drop-shadow">
              {name}{" "}
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-blue-400 text-xl"
              />
            </h2>
            <h3 className="text-center font-extralight text-gray-500">
              {email}
            </h3>
          </div>

          <div className=" mt-20 ">
            <CreateCollection updateCollections={updateCollections} coll={collections}/>
            <h1 className="font-montez text-green-100 text-3xl">Collection</h1>
            <FetchColllection
              collections={collections}
              setRecipesData={setRecipesData}
              recipesData={recipesData}
              currentPosts={currentPosts}
              updateRecipesData={updateRecipesData}
            />
          </div>
          <Pagenation
            totalRes={collections.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            styles="absolute right-0 top-20 flex flex-col space-y-2"
            name={collections}
          />
        </div>
      </div>
      <img src={mainfruite} alt="" className="w-1/4 h-1000px bg-" />
    </div>
   
  );
}
