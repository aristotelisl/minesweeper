import React, { useEffect, useState, useContext } from 'react';
import createBoard from '../util/createBoard';
import { DifficultyContext } from '../util/DifficultyContext';
import { reveal } from '../util/reveal.js';
import Cell from './Cell';

const Board = ({ minesLeft, setMinesLeft }) => {
  const [grid, setGrid] = useState([]);
  const [nonMineCount, setNonMineCount] = useState(0);
  const [mineLocations, setMineLocations] = useState([]);
  const { difficulty } = useContext(DifficultyContext);
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    function freshBoard() {
      const newBoard = createBoard(difficulty.rows, difficulty.cols, difficulty.bombs);
      setNonMineCount(difficulty.rows * difficulty.cols - difficulty.bombs);
      setMineLocations(newBoard.mineLocation);
      setGrid(newBoard.board);
      setMinesLeft(difficulty.bombs);
    }
    freshBoard();
  }, [difficulty, setMinesLeft]);

  useEffect(() => {
    let timer;
    if (timerRunning) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [timerRunning]);

  const updateFlag = (e, x, y) => {
    e.preventDefault();
    let newGrid = JSON.parse(JSON.stringify(grid));

    if (newGrid[x][y].flagged) {
      newGrid[x][y].flagged = false;
      setMinesLeft(prevMinesLeft => prevMinesLeft + 1);
    } else {
      newGrid[x][y].flagged = true;
      setMinesLeft(prevMinesLeft => prevMinesLeft - 1);
    }

    setGrid(newGrid);
  };

  const revealCell = (x, y) => {
    if (!timerRunning) setTimerRunning(true);
    let newGrid = JSON.parse(JSON.stringify(grid));

    if (newGrid[x][y].value === 'X') {
      alert('Mine found');
      for (let i = 0; i < mineLocations.length; i++) {
        newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true;
      }
      setGrid(newGrid);
    } else {
      let newRevealedBoard = reveal(newGrid, x, y, nonMineCount); // Use the updated reveal logic
      setGrid(newRevealedBoard.newRevealGrid);
      setNonMineCount(newRevealedBoard.newNonMinesCount);
    }
  };

  const Timer = () => {
    return <p>Time: {time} seconds</p>;
  };

  return (
    <div>
      <p>Mines left: {minesLeft}</p>
      <Timer />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        {grid.map((singleRow, index1) => {
          return (
            <div style={{ display: 'flex' }} key={index1}>
              {singleRow.map((singleBlock, index2) => {
                return <Cell details={singleBlock} revealCell={revealCell} updateFlag={updateFlag} key={index2} />;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Board;
