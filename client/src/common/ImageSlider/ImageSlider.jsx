import React, { useState } from "react";

const ImageSlider = ({ images }) => {

  const [selected, setSelected] = useState(images[0]);

  const handleImageClick = (image) => {
    setSelected(image);
  };

  return (
    <div className="flex gap-5 w-full h-full ">
      <ul className="flex flex-col gap-2">
        {images?.map((image, index) => (
          <li
            className={`p-2 rounded-sm w-max cursor-pointer ${
              selected === image ? "border-2 border-blue-500" : ""
            }`}
            key={index}
            onClick={() => handleImageClick(image)}
          >
            <div className="relative h-14 w-16 mb-2">
              <img src={image} alt={`product-${index}`} fill="true" />
            </div>
          </li>
        ))}
      </ul>

      <div className="flex items-start  max-h-fit  w-full">
        <div>
          <img
            src={selected}
            alt="product"
            fill="true"
            className="rounded-lg h-[400px] object-fill"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
