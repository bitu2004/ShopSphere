'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);

  const statusColors = {
    'Delivered': 'bg-green-100 text-green-800',
    'Processing': 'bg-yellow-100 text-yellow-800',
    'Shipped': 'bg-blue-100 text-blue-800',
    'Pending': 'bg-gray-100 text-gray-800',
    'Cancelled': 'bg-red-100 text-red-800',
  };

  const statusIcons = {
    'Delivered': '✓',
    'Processing': '⏳',
    'Shipped': '🚚',
    'Pending': '📋',
    'Cancelled': '❌',
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:8000/orders/', {
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data = await response.json();
      setOrders(data || []);
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError('Unable to load orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusProgress = (status) => {
    const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered'];
    return (statuses.indexOf(status) + 1) * 25;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">📦 My Orders</h1>
          <p className="text-xl text-indigo-100">Track and manage your orders in one place</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-8">
            <p className="text-red-700 font-semibold">⚠️ {error}</p>
          </div>
        ) : loading ? (
          <div className="text-center py-16">
            <div className="inline-block">
              <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-xl text-gray-600">Loading your orders...</p>
            </div>
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors border-b-2 border-gray-100"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">📦 {order.item}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Order ID: <strong>#{order.id}</strong></span>
                        <span>Tracking: <strong>{order.tracking}</strong></span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`inline-block px-4 py-2 rounded-full font-bold text-sm mb-2 ${statusColors[order.status]}`}>
                        {statusIcons[order.status]} {order.status}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${getStatusProgress(order.status)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-gray-600">
                      <p className="text-sm">Order Date: <strong>{order.order_date}</strong></p>
                      <p className="text-sm">Est. Delivery: <strong>{order.estimated_delivery}</strong></p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-indigo-600">${order.total_price}</p>
                      <p className="text-sm text-gray-500">{expandedOrder === order.id ? '▼ Collapse' : '▶ Details'}</p>
                    </div>
                  </div>
                </div>

                {expandedOrder === order.id && (
                  <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 animate-fadeInUp">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-bold text-gray-800 mb-4">📍 Timeline</h4>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold mr-4 flex-shrink-0">✓</div>
                            <div>
                              <p className="font-semibold text-gray-800">Order Placed</p>
                              <p className="text-sm text-gray-600">{order.order_date}</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold mr-4 flex-shrink-0">⏳</div>
                            <div>
                              <p className="font-semibold text-gray-800">Processing</p>
                              <p className="text-sm text-gray-600">Your order is being prepared</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="w-10 h-10 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold mr-4 flex-shrink-0">📦</div>
                            <div>
                              <p className="font-semibold text-gray-800">Shipped</p>
                              <p className="text-sm text-gray-600">On its way to you</p>
                            </div>
                          </div>
                          <div className={`flex items-start ${order.status === 'Delivered' ? '' : 'opacity-50'}`}>
                            <div className={`w-10 h-10 rounded-full ${order.status === 'Delivered' ? 'bg-green-500' : 'bg-gray-300'} text-white flex items-center justify-center font-bold mr-4 flex-shrink-0`}>🎉</div>
                            <div>
                              <p className="font-semibold text-gray-800">Delivered</p>
                              <p className="text-sm text-gray-600">{order.estimated_delivery}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-gray-800 mb-4">📋 Summary</h4>
                        <div className="bg-white rounded-xl p-4 space-y-3">
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-600">Product</span>
                            <span className="font-semibold text-gray-800">{order.item}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-600">Order ID</span>
                            <span className="font-semibold text-gray-800">#{order.id}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-600">Tracking</span>
                            <span className="font-semibold text-gray-800">{order.tracking}</span>
                          </div>
                          <div className="flex justify-between pt-2">
                            <span className="text-gray-600 font-semibold">Total</span>
                            <span className="text-2xl font-bold text-indigo-600">${order.total_price}</span>
                          </div>
                        </div>
                        <div className="mt-4 flex space-x-3">
                          <button className="flex-1 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all">
                            📞 Support
                          </button>
                          <button className="flex-1 py-2 border-2 border-indigo-600 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-all">
                            🔄 Return
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-xl text-gray-600 mb-2">No orders yet</p>
            <p className="text-gray-500 mb-6">Start shopping to create your first order!</p>
            <a href="/" className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-all transform hover:scale-105">
              🛍️ Start Shopping
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
