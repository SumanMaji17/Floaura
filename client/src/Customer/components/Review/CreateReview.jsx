import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { createReview } from "../../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";

export default function CreateReview() {
  const location = useLocation();
  const order = location.state?.order;
  const products = order.items;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [ratings, setRatings] = useState({});
  const [reviews, setReviews] = useState({});
  const [errors, setErrors] = useState({});
  const stars = [1, 2, 3, 4, 5];

  const handleCheckboxChange = (itemId) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.includes(itemId)
        ? prevSelectedProducts.filter((id) => id !== itemId)
        : [...prevSelectedProducts, itemId]
    );
  };

  const handleRatingChange = (itemId, star) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [itemId]: star,
    }));

    if (errors[itemId]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [itemId]: "",
      }));
    }
  };

  const handleReviewChange = (itemId, review) => {
    setReviews((prevReviews) => ({
      ...prevReviews,
      [itemId]: review,
    }));

    if (errors[itemId]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [itemId]: "",
      }));
    }
  };

  const handleSave = () => {
    const newErrors = {};
    selectedProducts.forEach((productId) => {
      const rating = ratings[productId];
      const review = reviews[productId];
      if (!rating || !review) {
        newErrors[productId] = "Please provide both rating and review.";
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const reviewData = selectedProducts.map((productId) => ({
        productId,
        rating: ratings[productId],
        review: reviews[productId],
      }));

      dispatch(createReview({ reviewData, orderId: order.id }));

      navigate("/my-orders");
    }
  };

  return (
    <div className="mx-10">
      <h1 className="text-3xl font-bold pb-3">Review Product</h1>
      {selectedProducts.length === 0 ? (
        <h2 className=" font-medium text-gray-500">
          Select products to give review
        </h2>
      ) : (
        <h2 className=" font-medium text-gray-500">
          {selectedProducts.length} product selected
        </h2>
      )}
      <div>
        {products?.map((product) => (
          <div
            className="flex gap-2 border-b-2 py-4 cursor-pointer w-[40%]"
            key={product.productId}
          >
            <input
              type="checkbox"
              value={product.productId}
              checked={selectedProducts.includes(product.productId)}
              onChange={() => handleCheckboxChange(product.productId)}
              // className="hidden" // Hide the checkbox
            />
            <img
              src={product.images[0]}
              className="w-[250px] h-[150px] object-fill"
              alt="Product"
            />
            <div className="flex flex-col justify-center gap-2 w-[300px] p-1">
              <h1 className="overflow-hidden whitespace-nowrap overflow-ellipsis text-xl font-medium">
                {product?.productName}
              </h1>
              <div>
                {stars.map((star) => (
                  <span
                    key={star}
                    className="star"
                    style={{
                      cursor: "pointer",
                      color:
                        ratings[product.productId] >= star ? "gold" : "gray",
                      fontSize: "25px",
                    }}
                    onClick={() => handleRatingChange(product.productId, star)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <textarea
                rows={2}
                placeholder="Write your review..."
                value={reviews[product.productId] || ""}
                onChange={(e) =>
                  handleReviewChange(product.productId, e.target.value)
                }
                className="mt-2 w-full border p-2 focus:outline-none rounded-md"
              />
              {errors[product.productId] && (
                <p className="text-red-500">{errors[product.productId]}</p>
              )}
            </div>
          </div>
        ))}
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
