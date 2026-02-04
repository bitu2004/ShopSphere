'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/products/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setProducts(data || []);
      setError(null);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Unable to load products. Please try again later.');
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price || 0), 0).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="animate-fadeInUp">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 font-poppins">
              Welcome to <span className="text-yellow-300">ShopSphere</span>
            </h1>
            <p className="text-2xl text-blue-100 mb-8 font-inter">
              Discover amazing products at unbeatable prices
            </p>
            <div className="flex space-x-4">
              <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Shop Now →
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center transform hover:-translate-y-1">
            <div className="text-5xl mb-4">🚚</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Free Shipping</h3>
            <p className="text-gray-600">On orders over $50</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center transform hover:-translate-y-1">
            <div className="text-5xl mb-4">💳</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Secure Payment</h3>
            <p className="text-gray-600">100% safe transactions</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center transform hover:-translate-y-1">
            <div className="text-5xl mb-4">📦</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Delivered in 2-5 days</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center transform hover:-translate-y-1">
            <div className="text-5xl mb-4">🔄</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Easy Returns</h3>
            <p className="text-gray-600">30-day return policy</p>
          </div>
        </div>
      </div>

      {/* Cart Counter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <button
          onClick={() => setShowCart(!showCart)}
          className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
            showCart
              ? 'bg-red-500 text-white shadow-lg'
              : 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
          }`}
        >
          🛒 Shopping Cart ({cart.length})
        </button>
      </div>

      {/* Cart Display */}
      {showCart && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 animate-fadeInUp">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">🛒 Shopping Cart</h2>
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📭</div>
                <p className="text-xl text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-6 max-h-80 overflow-y-auto">
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl hover:shadow-md transition-all"
                    >
                      <div>
                        <p className="font-bold text-gray-800">{item.name}</p>
                        <p className="text-blue-600 font-semibold">${(item.price || 0).toFixed(2)}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveFromCart(index)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
                      >
                        🗑️ Remove
                      </button>
                    </div>
                  ))}
                </div>
                <div className="border-t-2 border-gray-200 pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-2xl font-bold text-gray-800">Total:</span>
                    <span className="text-3xl font-bold text-blue-600">${totalPrice}</span>
                  </div>
                  <div className="flex space-x-4">
                    <button className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                      ✓ Proceed to Checkout
                    </button>
                    <button
                      onClick={() => setShowCart(false)}
                      className="flex-1 py-3 border-2 border-gray-300 text-gray-800 rounded-xl font-bold hover:bg-gray-50 transition-all duration-300"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mb-12">
          <h2 className="text-5xl font-bold mb-2 text-gray-800 font-poppins">✨ Featured Products</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-8">
            <p className="text-red-700 font-semibold">⚠️ {error}</p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-xl text-gray-600 font-inter">Loading amazing products...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products && products.length > 0 ? (
              products.map((product, index) => (
                <div key={product.id} style={{ animationDelay: `${index * 0.1}s` }} className="animate-fadeInUp">
                  <ProductCard product={product} onAddToCart={handleAddToCart} />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">📭</div>
                <p className="text-xl text-gray-600">No products available at the moment</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">💌 Subscribe to Our Newsletter</h3>
          <p className="text-lg text-blue-100 mb-8">Get exclusive deals and updates delivered to your inbox</p>
          <div className="flex max-w-md mx-auto space-x-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <button className="px-8 py-3 bg-yellow-400 text-gray-800 rounded-lg font-bold hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-5xl font-bold mb-4 text-gray-800 text-center">💬 What Our Customers Say</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <span className="text-4xl">⭐⭐⭐⭐⭐</span>
            </div>
            <p className="text-gray-600 mb-4 italic">"Amazing selection and fast delivery! ShopSphere is my go-to shopping platform."</p>
            <p className="font-bold text-gray-800">Sarah Johnson</p>
            <p className="text-sm text-gray-500">Verified Buyer</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <span className="text-4xl">⭐⭐⭐⭐⭐</span>
            </div>
            <p className="text-gray-600 mb-4 italic">"Best prices I've found anywhere. Customer service is incredibly helpful!"</p>
            <p className="font-bold text-gray-800">Mike Chen</p>
            <p className="text-sm text-gray-500">Verified Buyer</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <span className="text-4xl">⭐⭐⭐⭐⭐</span>
            </div>
            <p className="text-gray-600 mb-4 italic">"Love the ease of checkout. My order arrived 2 days early!"</p>
            <p className="font-bold text-gray-800">Emma Davis</p>
            <p className="text-sm text-gray-500">Verified Buyer</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-16 mt-12 rounded-3xl mx-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">🚀 Ready to Start Shopping?</h2>
          <p className="text-xl text-green-100 mb-8">Join thousands of happy customers enjoying amazing products at unbeatable prices</p>
          <button className="px-10 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:bg-green-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Explore Products Now →
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">SS</div>
                <h3 className="text-lg font-bold">ShopSphere</h3>
              </div>
              <p className="text-gray-400">Your ultimate shopping destination for quality products at amazing prices.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">🔗 Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">🛒 Categories</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Electronics</a></li>
                <li><a href="#" className="hover:text-white transition">Fashion</a></li>
                <li><a href="#" className="hover:text-white transition">Home & Garden</a></li>
                <li><a href="#" className="hover:text-white transition">Sports & Outdoors</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">📱 Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-2xl hover:scale-125 transition duration-300">📘</a>
                <a href="#" className="text-2xl hover:scale-125 transition duration-300">🐦</a>
                <a href="#" className="text-2xl hover:scale-125 transition duration-300">📷</a>
                <a href="#" className="text-2xl hover:scale-125 transition duration-300">▶️</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2026 ShopSphere. All rights reserved. | Designed with ❤️ for better shopping</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
