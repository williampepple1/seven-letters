// src/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold mb-6">Welcome to the Word Game</h1>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/login" className="block bg-blue-500 text-white px-4 py-2 rounded sm:inline-block">
            Login with Google
          </Link>
          <Link to="/game" className="block bg-green-500 text-white px-4 py-2 rounded sm:inline-block">
            Play as Guest
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
