"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Check if user is already authenticated
  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // This is a basic example - in production, use proper authentication
    if (password === 'admin123') {  // You should change this to a secure password
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    router.push('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
          <h1 className="text-2xl text-white font-bold mb-6">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl text-white font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* System Settings */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl text-white font-semibold mb-4">System Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Default Sensitivity</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  defaultValue="0.6"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Alarm Volume</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  defaultValue="0.8"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* User Management */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl text-white font-semibold mb-4">User Management</h2>
            <div className="space-y-4">
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
                Add New User
              </button>
              <div className="bg-gray-700 p-4 rounded">
                <p className="text-white">Total Users: 0</p>
                <p className="text-gray-400">Active Sessions: 0</p>
              </div>
            </div>
          </div>

          {/* Camera Management */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl text-white font-semibold mb-4">Camera Management</h2>
            <div className="space-y-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                Configure Cameras
              </button>
              <div className="bg-gray-700 p-4 rounded">
                <p className="text-white">Active Cameras: 0</p>
                <p className="text-gray-400">Disabled Cameras: 0</p>
              </div>
            </div>
          </div>

          {/* Detection History */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl text-white font-semibold mb-4">Detection History</h2>
            <div className="space-y-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                View Full History
              </button>
              <div className="bg-gray-700 p-4 rounded">
                <p className="text-white">Total Detections: 0</p>
                <p className="text-gray-400">Last 24 Hours: 0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 