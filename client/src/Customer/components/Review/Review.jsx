import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
// import { Autoplay,FreeMode, Pagination}  from 'swiper/modules'
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
// import { Autoplay, Pagination, FreeMode, A11y } from 'swiper/modules';
import ReactStars from "react-rating-stars-component";
// import { apiConnector } from "../../services/apiconnector";
// import { ratingsEndpoints } from "../../services/apis";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";

const Review = () => {
  const truncateWords = 15;
  const reviews = useSelector((state) => state.user.reviews);

  return (
    <div className="">
      <div className=" ">
        <h1 className=" py-5 text-3xl font-bold">Customer Testimonial</h1>
        <Swiper
          // modules={[FreeMode, Pagination, Autoplay]}
          // slidesPerView={4}
          // spaceBetween={24}
          // loop={true}
          // freeMode={true}
          // autoplay={{
          //     delay: 1200,
          // }}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={30}
          slidesPerView={5}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          className=""
        >
          {reviews.map((review) => (
            <SwiperSlide
              key={review.id}
              className="rounded-xl border-2 flex flex-row  text-black px-5 py-5 overflow-hidden"
            >
              <div>
                <img
                  src={review.product.images[0].url}
                  alt="product"
                  className="w-full [100px] object-fill mb-2"
                />
              </div>
              <div>
                <p className="overflow-hidden whitespace-nowrap text-lg overflow-ellipsis font-medium">
                  {review.review}
                </p>

                <p className="overflow-hidden whitespace-nowrap text-sm overflow-ellipsis">
                  Review for: {review.product?.name}
                </p>
                <p className="font-medium text-md text-gray-600">
                  {review.user?.name}
                </p>
                <div className="flex items-center gap-2">
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
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Review;
