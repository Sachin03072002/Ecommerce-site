import React, { useState } from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <div
      onClick={() => navigate(`/product/${product?._id}`)}
      className="productCard w-[15rem] m-3 transition-all cursor-pointer"
    >
      <div className="h-[20rem] relative">
        {imageLoading && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white">
            {/* You can replace this with your preferred loading spinner */}
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        <img
          onLoad={handleImageLoad}
          className={`h-full w-full object-cover object-left-top ${
            imageLoading ? "hidden" : ""
          }`}
          src={product.imageUrl}
          alt=""
        />
      </div>
      <div className="textPart bg-white p-3">
        <div>
          <p className="font-bold opacity-60 ">{product.brand}</p>
          <p className="">{product.title}</p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="font-semibold">₹{product.discountedPrice}</p>
          <p className="line-through opacity-50">{product.price}</p>
          <p className="text-green-600 font-semibold">
            {product.discountedPercent + "% OFF"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
