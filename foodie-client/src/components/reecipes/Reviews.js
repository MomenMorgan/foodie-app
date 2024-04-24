import React, { useEffect } from "react";
import RecipeRating from "./RecipeRating";
import StarRating from "./StarRating";
import { useState } from "react";
import { useAuth } from "../../pages/TokenContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { set } from "lodash";

export default function Reviews({ reviews, recipeId, userId, role , fetchReviews}) {
  const { token } = useAuth();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null); // Track the ID of the review being edited
  const [rev, setRev] = useState(reviews);
  const [err, setErr] = useState(null);

  const handleRatingSelection = (selectedRating) => {
    setRating(selectedRating);
  };

  useEffect(() => {
    fetchReviews();
  }, [recipeId, fetchReviews]);
 

  fetchReviews = () => {
    // Fetch reviews from the server or an appropriate data source
    // Update the 'reviews' state using the 'setReviews' function
    fetch(`http://localhost:8080/recipes/${recipeId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Reviews:", data);
        setRev(data.document.reviews);
        setTimeout(() => {
          setErr(null);
        }
        , 8000);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        // Handle errors or show error message to the user
      });
  };
  console.log(userId);

  const handleReviewSubmit = () => {
    if (editingReviewId) {
      // If editingReviewId is not null, it means we're editing an existing review
      fetch(`http://localhost:8080/reviews/${editingReviewId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: review,
          rating: rating,
          recipe: recipeId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Review Updated:", data);
          setRating(0);
          setReview("");
          setEditingReviewId(null);
          fetchReviews();
        })
        .catch((error) => {
          console.error("Error updating review:", error);
          setErr(error);
        });
    } else {
      // If editingReviewId is null, it means we're adding a new review
      fetch("http://localhost:8080/reviews/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: review,
          rating: rating,
          recipe: recipeId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Review Created:", data);
          setRating(0);
          setReview("");
          fetchReviews();
          setErr(data);
        })
        .catch((error) => {
          console.error("Error creating review:", error);
          setErr(error);
        });
    }
  };

  const startEditingReview = (reviewId, reviewTitle, reviewRating) => {
    // Function to populate the fields for editing a review
    setReview(reviewTitle);
    setRating(reviewRating);
    setEditingReviewId(reviewId);
  };

  const cancelEditing = () => {
    // Function to cancel the editing mode
    setReview("");
    setRating(0);
    setEditingReviewId(null);
  };
  console.log(err);

  return (
    <div className="drop-shadow-xl">
      <h1 className="text-slate-950 font-mono text-xl">{editingReviewId ? "Edit Review" : "Reviews"}</h1>
      <div>
        {token && role !== "admin" && (
          <div>
            <RecipeRating onStarClick={handleRatingSelection} />
            {err?.error && (
              <p className="text-red-500">{err?.error.map((el) => el.msg)}</p>
            )}

            <div>
              <textarea
                className={`border-2 border-gray-300 rounded-md p-2 w-1/2 ${
                  rating > 0 ? "block" : "hidden"
                }`}
                placeholder="Write your review here..."
                value={review}
                onChange={(event) => setReview(event.target.value)}
              />
              <button
                className={`bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded mt-2 ${
                  rating > 0 ? "block" : "hidden"
                }`}
                onClick={handleReviewSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        )}
        <div>
          {rev.map((review) => (
            <div
              key={review.id}
              className="border-2 rounded-md p-2 my-4 bg-zinc-100 shadow-md  transition-all duration-200 z-1 w-8/12"
            >
              <div className="flex items-center relative">
                <FontAwesomeIcon
                  icon={faCircleUser}
                  className="mr-4 text-green-800 text-3xl"
                />
                <span className="font-normal text-slate-900 uppercase drop-shadow-lg">
                  {review.title}
                </span>

                <div className="absolute right-0">
                  {userId === review.user._id && (
                    <button
                      onClick={() =>
                        startEditingReview(
                          review._id,
                          review.title,
                          review.rating
                        )
                      }
                      className="ml-12 bg-transparent text-slate-500 text-2xl  hover:text-green-100 font-bold py-2 px-4 rounded"
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                  )}
                </div>
              </div>
              <div className="flex items-center mt-2">
                <StarRating average={review.rating} quantity={1} />
              </div>
            </div>
          ))}
        </div>
      </div>
      {editingReviewId && (
        <button
          onClick={cancelEditing}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Cancel Edit
        </button>
      )}
    </div>
  );
}
