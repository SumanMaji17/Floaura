import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const ImageSlider = ({images}) => {
  // const images = [
  //   "sliderStatic/anniversary-gift-banners.png",
  //   "giftCardStatic/AnniversaryGift.jpeg",
  //   "giftCardStatic/Anniversary.jpeg",
  //   "giftCardStatic/Gift-Him.png",
  // ];

  return (
    <Swiper
      loop={true}
      speed={800}
      autoplay={{
        delay: 3000,
      }}
      modules={[Autoplay]}
    >
      {images?.map((image, i) => (
        <SwiperSlide key={i}>
          <div className="h-[350px] rounded-2xl">
            <img
              src={image}
              alt="images"
              className="w-full h-full rounded-2xl"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
