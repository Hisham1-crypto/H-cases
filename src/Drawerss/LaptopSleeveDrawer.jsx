import React from "react";

const LaptopSleeveDrawer = ({ product, onAddToCart }) => {
  return (
    <div>
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
      <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
      <p className="text-sm text-gray-500 mt-1">Size: {product.size}</p>
      <button
        onClick={() => onAddToCart(product)}
        className="w-full bg-black text-white py-2 rounded-full mt-3"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default LaptopSleeveDrawer;
