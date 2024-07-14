import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to the 7 Letters Word Game</h1>
        <div className="grid grid-cols-2 gap-4">
          <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded">
            Login with Google
          </Link>
          <Link to="/guest" className="bg-blue-500 text-white px-4 py-2 rounded">
            Play as Guest
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
