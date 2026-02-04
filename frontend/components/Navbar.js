'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
    setIsOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-heavy sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 hover-scale">
            <div className="bg-white text-blue-600 rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg">
              SS
            </div>
            <span className="text-2xl font-bold font-poppins hidden sm:inline">ShopSphere</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 mx-8">
            <div className="w-full relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-blue-600 transition">
                🔍
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-blue-200 transition duration-300 font-medium">
              Home
            </Link>
            <Link href="/products" className="hover:text-blue-200 transition duration-300 font-medium">
              Products
            </Link>
            <Link href="/orders" className="hover:text-blue-200 transition duration-300 font-medium">
              Orders
            </Link>
            {user ? (
              <div className="relative group">
                <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition duration-300 shadow-lg">
                  👤 {user.username}
                </button>
                <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-xl z-50">
                  <p className="px-4 py-2 border-b text-sm text-gray-600">{user.email}</p>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition rounded-lg"
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link href="/login" className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition duration-300 shadow-lg">
                  🔓 Login
                </Link>
                <Link href="/signup" className="bg-yellow-400 text-blue-800 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition duration-300 shadow-lg">
                  📝 Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl hover:text-blue-200 transition"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-6 space-y-3 animate-slideInRight">
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 px-3 py-2 rounded-lg text-gray-800 text-sm focus:outline-none"
              />
              <button className="text-xl">🔍</button>
            </div>
            <Link
              href="/"
              className="block py-2 px-3 hover:bg-blue-700 rounded-lg transition font-medium"
              onClick={() => setIsOpen(false)}
            >
              🏠 Home
            </Link>
            <Link
              href="/products"
              className="block py-2 px-3 hover:bg-blue-700 rounded-lg transition font-medium"
              onClick={() => setIsOpen(false)}
            >
              🛍️ Products
            </Link>
            <Link
              href="/orders"
              className="block py-2 px-3 hover:bg-blue-700 rounded-lg transition font-medium"
              onClick={() => setIsOpen(false)}
            >
              📦 Orders
            </Link>
            {user ? (
              <>
                <div className="py-2 px-3 border-b border-blue-500">
                  <p className="font-semibold">👤 {user.username}</p>
                  <p className="text-xs text-blue-100">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block py-2 px-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-100 transition" onClick={() => setIsOpen(false)}>
                  🔓 Login
                </Link>
                <Link href="/signup" className="block py-2 px-3 bg-yellow-400 text-blue-800 rounded-lg font-semibold hover:bg-yellow-300 transition" onClick={() => setIsOpen(false)}>
                  📝 Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}