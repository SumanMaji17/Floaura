import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { editReviewAction } from "../../../redux/actions/userAction";

export default function EditReview() {
  const location = useLocation();
  const review = location.state.review;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rating, setRating] = useState(review.rating);
  const [reviewText, setReviewText] = useState(review.review);

  const stars = [1, 2, 3, 4, 5];

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleReviewChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleSave = () => {
    try {
      if (rating && reviewText) {
        dispatch(
          editReviewAction({ reviewId: review.id, rating, review: reviewText })
        );
        navigate("/my-reviews");
      } else {
        toast.warn("Rating and Review must exist...");
      }
    } catch (error) {
      console.log("Error while editing review...");
    }
  };

  return (
    <div className="mx-10">
      <h1>Edit Review</h1>
      <div className=" flex gap-5 my-5">
        <img
          src={review.product.images[0].url}
          className="w-[200px] h-[200px] object-fill"
          alt="Product"
        />
        <div className="flex flex-col justify-center gap-2 w-[300px] p-1">
          <h1 className="overflow-hidden whitespace-nowrap overflow-ellipsis text-xl font-medium">
            {review?.product?.name}
          </h1>
          <div>
            {stars.map((star) => (
              <span
                key={star}
                className="star"
                style={{
                  cursor: "pointer",
                  color: rating >= star ? "gold" : "gray",
                  fontSize: "25px",
                }}
                onClick={() => handleRatingChange(star)}
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            rows={2}
            placeholder="Write your review..."
            value={reviewText}
            onChange={handleReviewChange}
            className="mt-2 w-full border p-2 focus:outline-none rounded-md"
          />
        </div>
      </div>
      <div
        className="text-center w-[200px] mt-10 bg-cyan-950 text-white rounded-lg py-2 ml-10 cursor-pointer"
        onClick={handleSave}
      >
        Save
      </div>
    </div>
  );
}
