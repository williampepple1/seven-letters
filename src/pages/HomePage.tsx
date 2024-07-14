// src/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold mb-6">Welcome to the 7 Letters Word Game</h1>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto sm:flex-1 text-center">
            Login with Google
          </Link>
          <Link to="/game" className="bg-green-500 text-white px-4 py-2 rounded w-full sm:w-auto sm:flex-1 text-center">
            Play as Guest
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
