import React from "react";

const MiniBagDrawer = ({ product, onAddToCart }) => {
  return (
    <div>
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
      <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
      <button
        onClick={() => onAddToCart(product)}
        className="w-full bg-black text-white py-2 rounded-full mt-3"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default MiniBagDrawer;
