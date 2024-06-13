import React, { useEffect, useState, useContext } from 'react';
import createBoard from '../util/createBoard';
import { DifficultyContext } from '../util/DifficultyContext';
import {reveal} from '../util/reveal.js'
import Cell from './Cell';

const Board = () => {
  const [grid, setGrid] = useState([]);
  const [nonMineCount, setNonMineCount] = useState(0);
  const [mineLocations, setMineLocations] = useState([])
  const { difficulty } = useContext(DifficultyContext);

  // ComponentDidMount
  useEffect(()=>{
    // Creating Board
    function freshBoard(){
        const newBoard = createBoard(difficulty.rows, difficulty.cols, difficulty.bombs)
        setNonMineCount(difficulty.rows*difficulty.cols - difficulty.bombs)
        setMineLocations(newBoard.mineLocation)
        console.log(newBoard)
        setGrid(newBoard.board)
    }
    freshBoard()
  }, [difficulty])

  // On right click
  const updateFlag = (e, x, y) => {
    // Prevent drop down menu on cell right click
    e.preventDefault()
    let newGrid = JSON.parse(JSON.stringify(grid))

    newGrid[x][y].flagged ? newGrid[x][y].flagged = false : newGrid[x][y].flagged = true

    console.log(newGrid[x][y])
    setGrid(newGrid)
  }

  // Reveal Cell
  const revealCell = (x, y) => {
    let newGrid = JSON.parse(JSON.stringify(grid))

    if(newGrid[x][y].value === 'X') {
      alert('Mine found')
      for(let i = 0; i < mineLocations.length; i++) {
        newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true
      }
      setGrid(newGrid)
    }else{
      let newRevealedBoard = reveal(newGrid, x, y, nonMineCount); // Use the updated reveal logic
      setGrid(newRevealedBoard.newRevealGrid);
      setNonMineCount(newRevealedBoard.newNonMinesCount)
    }

  }

  return (
    <div>
      <p>{nonMineCount}</p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
      {grid.map((singleRow, index1)=>{
        return (
          <div style={{display:'flex'}} key={index1}>
            {singleRow.map((singleBlock, index2) => {
                return <Cell details={singleBlock} revealCell={revealCell} updateFlag={updateFlag} key={index2}/>
            })}
        </div>
        )
      })
      };
      </div>
      
    </div>
  );
}

export default Board;
