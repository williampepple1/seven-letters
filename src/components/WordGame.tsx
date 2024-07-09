// src/WordGame.tsx
import React, { useState, useEffect } from 'react';

const words = [
  'example',
  'another',
  'example2',
  "monster"
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

  useEffect(() => {
    setWord(getRandomWord());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input === word) {
      setScore(score + 1);
      setMessage('Correct! You earned a point.');
    } else {
      setMessage('Incorrect, try again!');
    }
    setInput('');
    setWord(getRandomWord());
  };

  return (
    <div>
      <h1>Word Game</h1>
      <p>Guess the 7-letter word:</p>
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
      <p>Score: {score}</p>
    </div>
  );
};

export default WordGame;
