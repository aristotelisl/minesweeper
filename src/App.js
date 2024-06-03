import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';
import SideMenu from './components/SideMenu';
import { DifficultyContext } from './util/DifficultyContext';

function App() {

  const [difficulty, setDifficulty] = useState({ rows: 5, cols: 5, bombs: 10 });

  return (
    <div className="App">
      <h1>Minesweeper</h1>
      <DifficultyContext.Provider value={{ difficulty, setDifficulty }}>
        <Board/>
        <SideMenu/>
      </DifficultyContext.Provider>
    </div>
  );
}

export default App;
