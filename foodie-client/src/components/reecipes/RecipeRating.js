import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
export default function RecipeRating({ onStarClick }) {
    const [rating, setRating] = useState(0);
    console.log(rating);

    const handleStarClick = (selectedRating) => {
      setRating(selectedRating);
      onStarClick(selectedRating); // Pass the selected rating to the parent component
    };

    return (
      <div className="text-center w-9/12 text-2xl mb-8">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            onClick={() => handleStarClick(index + 1)}
            style={{
              cursor: "pointer",
              color: index < rating ? "#FFCB2E" : "gray",
            }}
          >
            <FontAwesomeIcon icon={faStar} key={"half"} style={{ opacity: 0.5 }} />
          </span>
        ))}
      </div>
    );
  };

