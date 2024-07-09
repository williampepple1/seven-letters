// src/WordGame.tsx
import React, { useState, useEffect } from 'react';

const words = [
  'example',
  'another',
  'example2',
  // Add more 7-letter words here
];

const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
};

const WordGame: React.FC = () => {
  const [word, setWord] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(30);

  useEffect(() => {
    setWord(getRandomWord());
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else {
      setMessage('Time is up! New word generated.');
      setWord(getRandomWord());
      setTimeLeft(30);
      setInput('');
    }
  }, [timeLeft]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input === word) {
      setScore(score + 1);
      setMessage('Correct! You earned a point.');
      setWord(getRandomWord());
      setTimeLeft(30); // Reset the timer
    } else {
      setMessage('Incorrect, try again!');
    }
    setInput('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">7 Letters Word Game</h1>
        <p className="mb-4">Guess the 7-letter word:</p>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={input}
            onChange={handleChange}
            className="border p-2 mr-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
        <p className="mb-4">{message}</p>
        <p className="mb-4">Score: {score}</p>
        <p className="text-2xl text-red-500">Time left: {timeLeft} seconds</p>
      </div>
    </div>
  );
};

export default WordGame;
