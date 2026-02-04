'use client';

import { useState } from 'react';

export default function ProductCard({ product, onAddToCart }) {
  const [isAdded, setIsAdded] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const handleAddToCart = () => {
    if (onAddToCart) onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Product images mapping
  const productImages = {
    1: ['💻', '⌨️', '🖱️'],
    2: ['📱', '📞', '☎️'],
    3: ['🖥️', '⌚', '🎮'],
  };

  const images = productImages[product.id] || ['📦', '🎁', '🛍️'];

  const discountPercentage = Math.floor(Math.random() * 30) + 5;
  const originalPrice = (product.price / (1 - discountPercentage / 100)).toFixed(2);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 group">
      {/* Image Section */}
      <div className="relative bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 h-56 flex items-center justify-center overflow-hidden">
        <div className="text-8xl transform transition-transform duration-300 group-hover:scale-110">
          {images[imageIndex]}
        </div>
        
        {/* Image Navigation */}
        <div className="absolute bottom-4 flex space-x-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setImageIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === imageIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white'
              }`}
            />
          ))}
        </div>

        {/* Discount Badge */}
        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
          -{discountPercentage}%
        </div>

        {/* New Badge */}
        <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          NEW
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4">Premium quality • Limited stock</p>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
          <span className="text-gray-600 text-sm">(128 reviews)</span>
        </div>

        {/* Price Section */}
        <div className="mb-6">
          <div className="flex items-center space-x-3">
            <span className="text-3xl font-bold text-blue-600">${product.price?.toFixed(2)}</span>
            <span className="text-lg text-gray-400 line-through">${originalPrice}</span>
          </div>
          <p className="text-green-600 text-sm font-semibold mt-2">You save ${(originalPrice - product.price).toFixed(2)}</p>
        </div>

        {/* Stock Status */}
        <div className="mb-6 flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-green-600 text-sm font-semibold">In Stock (42 items)</span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`w-full py-3 rounded-xl font-bold text-white transition-all duration-300 transform active:scale-95 ${
            isAdded
              ? 'bg-gradient-to-r from-green-500 to-green-600 shadow-lg'
              : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg hover:scale-105'
          }`}
        >
          {isAdded ? '✓ Added to Cart' : '🛒 Add to Cart'}
        </button>

        {/* Quick View */}
        <button className="w-full mt-3 py-2 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300">
          👁️ Quick View
        </button>
      </div>
    </div>
  );
}