import React from "react";
import { useState } from "react";
import { useAuth } from "../pages/TokenContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function CreateCollection({ updateCollections, coll }) {
  const [collectionName, setCollectionName] = useState("");
  const [collectionId, setcolletionId] = useState();
  const [showSettings, setShowSettings] = useState(false);
  const { token } = useAuth();

  const handleCollectionNameChange = (event) => {
    setCollectionName(event.target.value);
  };
  const fetchCollection = async () => {
    try {
      const response = await fetch("http://localhost:8080/collections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: collectionName,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();

      updateCollections();
      setCollectionName("");
    } catch (error) {
      console.log(error);
    }
  };
  const handleCollectionsId = (event) => {
    setcolletionId(event.target.value);
  };

  const deleteCollection = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/collections/${collectionId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      updateCollections();
      setCollectionName("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-4">
      <div>
        <FontAwesomeIcon
          icon={faGear}
          onClick={() => setShowSettings(!showSettings)}
          className="text-green-900 text-2xl cursor-pointer hover:rotate-45 hover:text-green-300 transition-all duration-500 ease-in-out"
        />
        {showSettings && (
          <div>
            <div className="mb-4 mt-4">
              <input
                type="text"
                placeholder="Collection name"
                value={collectionName}
                onChange={handleCollectionNameChange}
                className="p-2 bg-zinc-100 rounded-xl text-gray-500 font-mono w-3/12"
              />
              <FontAwesomeIcon
                onClick={fetchCollection}
                className="p-2rounded-xl ml-4 text-green-300 text-2xl font-extralight cursor-pointer"
                icon={faPlus}

              />
                
              
            </div>
            <div>
              <select className="p-2 rounded-lg bg-zinc-100 font-mono text-gray-500 w-3/12">
                <option value="" key="">
                  Delete collection
                </option>
                {coll?.map((collection) => (
                  <option value={collection.id} onClick={handleCollectionsId}>
                    {collection.name}
                  </option>
                ))}
              </select>
              <FontAwesomeIcon
                onClick={() => deleteCollection(collectionId)}
                className="p-2rounded-xl ml-4 text-red-800 text-2xl font-extralight cursor-pointer rotate-45"
                icon={faPlus}

              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
