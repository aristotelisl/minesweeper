import React, { useEffect, useState, useContext } from 'react';
import createBoard from '../util/createBoard';
import { DifficultyContext } from '../util/DifficultyContext';

const Board = () => {
  const [grid, setGrid] = useState([]);
  const { difficulty } = useContext(DifficultyContext);

  useEffect(()=>{
    function freshBoard(){
        const newBoard = createBoard(difficulty.rows, difficulty.cols, difficulty.bombs)
        console.log(newBoard)
        setGrid(newBoard)
    }
    freshBoard()
  }, [difficulty])

  if(!grid.board) {
    return <div>Loading...</div>
  }

  return grid.board.map(singleRow=>{
    return (
        <div style={{display:'flex'}}>
            {singleRow.map((singleBlock) => {
                return <div style={{width:30, height:30, border: '1px solid black'}}>{singleBlock.value}</div>
            })}
        </div>
    )
  })
};

export default Board;
