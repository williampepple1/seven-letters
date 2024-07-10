// src/WordGame.tsx
import React, { useState, useEffect } from 'react';
import { words } from '../words';
import Modal from './Modal';

const getRandomWords = (num: number) => {
  const shuffled = words.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

const revealLetters = (word: string, num: number) => {
  const wordArray = word.split('');
  const indices = new Set<number>();

  while (indices.size < num) {
    indices.add(Math.floor(Math.random() * word.length));
  }

  return wordArray.map((letter, index) => (indices.has(index) ? letter : '_')).join('');
};

const WordGame: React.FC = () => {
  const [randomWords, setRandomWords] = useState<string[]>([]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [revealedWord, setRevealedWord] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [playerScores, setPlayerScores] = useState<number[]>([0, 0]);
  const [currentPlayer, setCurrentPlayer] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [isChoosing, setIsChoosing] = useState<boolean>(false); // Player 2 starts choosing

  useEffect(() => {
    setRandomWords(getRandomWords(7));
  }, []);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (!isModalOpen && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isModalOpen && selectedWord) {
      setSelectedWord(null);
      setRevealedWord('');
      setInput('');
      setCurrentPlayer((currentPlayer + 1) % 2);
      setRandomWords(getRandomWords(7));
      setIsChoosing(true);
      setIsModalOpen(true); // Open modal for the next player's turn
    }

    return () => clearInterval(timerId);
  }, [timeLeft, selectedWord, currentPlayer, isModalOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input === selectedWord) {
      const newScores = [...playerScores];
      newScores[(currentPlayer + 1) % 2] += 1; // Increment score for the guessing player
      setPlayerScores(newScores);
      setMessage(`Correct! Player ${((currentPlayer + 1) % 2) + 1} earned a point.`);
      setSelectedWord(null);
      setRevealedWord('');
      setTimeLeft(0);
      setInput('');
      setCurrentPlayer((currentPlayer + 1) % 2);
      setRandomWords(getRandomWords(7));
      setIsChoosing(true);
      setIsModalOpen(true); // Open modal for the next player's turn

      if (newScores[(currentPlayer + 1) % 2] === 7) {
        setGameOver(true);
        setMessage(`Player ${((currentPlayer + 1) % 2) + 1} wins!`);
      }
    } else {
      setMessage('Incorrect! Try again.');
    }
    setInput('');
  };

  const handleWordClick = (word: string) => {
    setSelectedWord(word);
    setRevealedWord(revealLetters(word, 3));
    setMessage(''); // Clear any previous messages
    setRandomWords([]); // Clear the word list
    setIsChoosing(false);
    setIsModalOpen(true); // Open modal before the next player can see the word
  };

  const handleContinue = () => {
    setIsModalOpen(false); // Close the modal when the player clicks continue
    if (!isChoosing) {
      setTimeLeft(30); // Start the timer only when guessing starts
    }
  };

  const handleRestart = () => {
    setRandomWords(getRandomWords(7));
    setSelectedWord(null);
    setRevealedWord('');
    setInput('');
    setPlayerScores([0, 0]);
    setCurrentPlayer(0);
    setMessage('');
    setTimeLeft(0);
    setGameOver(false);
    setIsChoosing(false); // Player 2 starts choosing
    setIsModalOpen(true); // Open modal for the first player's turn
  };

  const modalContent = isChoosing
    ? `Player ${currentPlayer + 1}'s turn to choose a word.`
    : `Player ${((currentPlayer + 1) % 2) + 1}'s turn to guess the word.`;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Modal
        isOpen={isModalOpen}
        title="Next Turn"
        content={`Player 1 Score: ${playerScores[0]} - Player 2 Score: ${playerScores[1]}\n${modalContent}`}
        onContinue={handleContinue}
      />
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">7 Letters</h1>
        {!gameOver && !isModalOpen && (
          <>
            <p className="mb-4">Player {currentPlayer + 1}'s turn</p>
            <div className="mb-4">
              {randomWords.length > 0 && randomWords.map((word, index) => (
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
            {revealedWord && (
              <p className="mb-4 text-2xl">
                {revealedWord.split('').map((char, index) => (
                  <span key={index} className="inline-block w-6">
                    {char}
                  </span>
                ))}
              </p>
            )}
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
                disabled={!selectedWord}
              >
                Submit
              </button>
            </form>
            <p className="mb-4">{message}</p>
            <p className="mb-4">Player 1 Score: {playerScores[0]}</p>
            <p className="mb-4">Player 2 Score: {playerScores[1]}</p>
            {selectedWord && <p className="text-2xl text-red-500">Time left: {timeLeft} seconds</p>}
          </>
        )}
        {gameOver && (
          <>
            <p className="text-4xl font-bold text-green-500">{message}</p>
            <button
              onClick={handleRestart}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Restart Game
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default WordGame;
