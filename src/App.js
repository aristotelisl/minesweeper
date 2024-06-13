import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';
import SideMenu from './components/SideMenu';
import { DifficultyContext } from './util/DifficultyContext';

function App() {

  const [difficulty, setDifficulty] = useState({ rows: 5, cols: 5, bombs: 5 });
  const [minesLeft, setMinesLeft] = useState(difficulty.bombs);

  return (
    <div className="App">
      <Header/>
      <div className='main-content'>
        <DifficultyContext.Provider value={{ difficulty, setDifficulty }}>
          <div className="SideMenu">
            <SideMenu/>
          </div>
          <div className="Board">
            <Board minesLeft={minesLeft} setMinesLeft={setMinesLeft}/>
          </div>
        </DifficultyContext.Provider>
      </div>
      
    </div>
  );
}

const Header = () => {
  return (
    <header className="header">
      <h1>Minesweeper</h1>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2024 Aristotelis Loucaides. All rights reserved.</p>
    </footer>
  );
};

export default App;
