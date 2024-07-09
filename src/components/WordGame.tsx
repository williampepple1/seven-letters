import React, { useState, useEffect } from 'react';
import { words } from '../words';

const getRandomWords = (num: number) => {
  const shuffled = words.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

const WordGame: React.FC = () => {
  const [randomWords, setRandomWords] = useState<string[]>([]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [input, setInput] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(30);

  useEffect(() => {
    setRandomWords(getRandomWords(7));
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else {
      setMessage('Time is up! New word set generated.');
      setRandomWords(getRandomWords(7));
      setSelectedWord(null);
      setTimeLeft(30);
      setInput('');
    }
  }, [timeLeft]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input === selectedWord) {
      setScore(score + 1);
      setMessage('Correct! You earned a point.');
      setRandomWords(getRandomWords(7));
      setSelectedWord(null);
      setTimeLeft(30);
    } else {
      setMessage('Incorrect, try again!');
    }
    setInput('');
  };

  const handleWordClick = (word: string) => {
    setSelectedWord(word);
    setMessage(`You selected: ${word}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Word Game</h1>
        <p className="mb-4">Guess the selected word:</p>
        <div className="mb-4">
          {randomWords.map((word, index) => (
            <button
              key={index}
              onClick={() => handleWordClick(word)}
              className={`px-4 py-2 m-2 border rounded ${
                selectedWord === word ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {word}
            </button>
          ))}
        </div>
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
