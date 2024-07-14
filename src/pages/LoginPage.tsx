// src/LoginPage.tsx
import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../../firebaseConfig';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/game');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).catch((error) => alert(error.message));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button onClick={signInWithGoogle} className="bg-blue-500 text-white px-4 py-2 rounded">
        Sign in with Google
      </button>
    </div>
  );
};

export default LoginPage;