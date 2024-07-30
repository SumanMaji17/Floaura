import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { toast } from "react-toastify";
import { deleteReviewAction } from "../../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";

export default function AllReviews() {
  const { reviews, userInfo } = useSelector((state) => state.user);
  const [expandedReviews, setExpandedReviews] = useState({});
  const [filteredReviews, setFilteredReviews] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const Reviews = reviews.filter((review) => review.userId === userInfo.id);
    setFilteredReviews(Reviews);
  }, [reviews]);

  const toggleReview = (id) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };


  const handleDelete = (id) => {
    try {
      dispatch(deleteReviewAction(id));
    } catch (error) {
      toast.error("Error while deleting the review.Please try again.");
    }
  };

  return (
    <div className="mx-10">
      <h1 className="text-3xl font-bold">My Reviews</h1>
      <div className="mt-10 flex flex-col justify-center items-center gap-5">
        {filteredReviews.map((review, id) => (
          <div
            className="flex w-[60%] rounded-xl overflow-hidden border-2"
            key={review.id}
          >
            <img
              src={review.product.images[0].url}
              className="w-[230px] [230px] object-fill border-r"
              alt="Product"
            />
            <div className="flex justify-between w-full bg-gray-50 hover:bg-gray-100 transition-colors duration-200 delay-200">
              <div className="flex flex-col h-full p-5 w-[480px] justify-between overflow-hidden">
                <div className="flex flex-col">
                  <p className="text-lg font-medium break-all flex flex-row">
                    {expandedReviews[id]
                      ? review.review
                      : `${review.review.slice(0, 30)}`}

                    {review.review.length >= 30 && !expandedReviews[id] ? (
                      <p className=" text-s">...</p>
                    ) : (
                      <p>&ensp;</p>
                    )}
                    {review.review.length > 30 && (
                      <button
                        onClick={() => toggleReview(id)}
                        className="text-blue-500 text-sm"
                      >
                        {expandedReviews[id] ? "Show less" : "Show more"}
                      </button>
                    )}
                  </p>

                  <span>Order Id: {review.order.id}</span>
                  <span>Order Type: {review.order.orderType}</span>
                  <span>Product Id: {review.product.id}</span>
                  <ReactStars
                    count={5}
                    value={review.rating}
                    size={20}
                    edit={false}
                    activeColor="#ffd700"
                    emptyIcon={<FaStar />}
                    fullIcon={<FaStar />}
                  />
                </div>
                <div className="flex justify-around items-center mt-5 gap-5">
                  <span
                    className="w-full text-center border-2 cursor-pointer bg-white py-1"
                    onClick={() => handleDelete(review.id)}
                  >
                    Delete
                  </span>
                  <span
                    className="w-full text-center border-2 cursor-pointer bg-white py-1"
                    onClick={() =>
                      navigate("/edit-review", {
                        state: { review: review },
                      })
                    }
                  >
                    Edit
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
