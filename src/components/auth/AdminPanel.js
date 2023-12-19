import React, { useState } from "react";
import TopBar from "../TopBar";
import Mainbar from "../Mainbar";
import CreateRecipe from "./CreateRecipe";
import DeleteRecipe from "./DeleteRecipe";
import UpdateRecipe from "./UpdateRecipe";

export default function AdminPanel() {
  const [selectedAction, setSelectedAction] = useState("create");

  const handleCreate = () => {
    setSelectedAction("create");
  };

  const handleDelete = () => {
    setSelectedAction("delete");
  };

  const handleUpdate = () => {
    setSelectedAction("update");
  };

  // Your component code...
  return (
    <div>
      <div>
        <TopBar />
        <Mainbar />
      </div>
      <div className="flex justify-center">
        <div className="flex mt-20 justify-around bg-zinc-100 w-3/4 shadow-lg rounded-lg">
          <div className="flex flex-col w-1/3">
            <div className="flex justify-center">
              <button
                onClick={handleCreate}
                className={`p-2 m-2 border rounded cursor-pointer ${
                  selectedAction === "create" ? "bg-green-800 text-white" : "bg-gray-300"
                }`}
              >
                Create Recipe
              </button>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleDelete}
                className={`p-2 m-2 border rounded cursor-pointer ${
                  selectedAction === "delete" ? "bg-green-800 text-white" : "bg-gray-300"
                }`}
              >
                Delete Recipe
              </button>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleUpdate}
                className={`p-2 m-2 border rounded cursor-pointer ${
                  selectedAction === "update" ? "bg-green-800 text-white" : "bg-gray-300"
                }`}
              >
                Update Recipe
              </button>
            </div>
          </div>
          <div className="flex flex-col w-1/3">
            {selectedAction === "create" && <CreateRecipe />}
            {selectedAction === "delete" && <DeleteRecipe />}
            {selectedAction === "update" && <UpdateRecipe />}
          </div>
        </div>
      </div>
    </div>
  );
}
