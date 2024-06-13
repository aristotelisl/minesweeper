import React from "react";
import '../App.css'

export default function Cell({ details, updateFlag, revealCell }) {
  const cellStyle = {
    background: details.revealed
      ? details.value === "X"
        ? "red"
        : chexPattern(details.x, details.y)
      : chexPattern(details.x, details.y),
  };

  const getImage = () => {
    if (details.revealed) {
      return imageMap[details.value] || null;
    } else if (details.flagged) {
      return imageMap["flagged"];
    } else {
      return chexPattern(details.x, details.y);
    }
  };

  return (
    <div
      onContextMenu={(e) => updateFlag(e, details.x, details.y)}
      onClick={() => revealCell(details.x, details.y)}
      style={cellStyle}
      className="cellStyle"
    >
      {<img src={getImage()} alt={details.value} />}
    </div>
  );
}
  
  const chexPattern = (x, y) => {
    if (x % 2 === 0 && y % 2 === 0) {
      return imageMap["unopened_grey"];
    } else if (x % 2 === 0 && y % 2 !== 0) {
      return imageMap["unopened_white"];
    } else if (x % 2 !== 0 && y % 2 === 0) {
      return imageMap["unopened_white"];
    } else {
      return imageMap["unopened_grey"];
    }
  };

  const imageMap = {
    "0": require("../media/cellTexture/cell_0.png"),
    "1": require("../media/cellTexture/cell_1.png"),
    "2": require("../media/cellTexture/cell_2.png"),
    "3": require("../media/cellTexture/cell_3.png"),
    "4": require("../media/cellTexture/cell_4.png"),
    "5": require("../media/cellTexture/cell_5.png"),
    "6": require("../media/cellTexture/cell_6.png"),
    "7": require("../media/cellTexture/cell_7.png"),
    "8": require("../media/cellTexture/cell_8.png"),
    "X": require("../media/cellTexture/cell_bomb1.png"), // Assuming 'X' is used for bombs
    "flagged": require("../media/cellTexture/cell_flag.png"), // If you use flags
    "unopened_grey": require("../media/cellTexture/cell_unopened_grey.png"),
    "unopened_white": require("../media/cellTexture/cell_unopened_white.png") // For unopened cells
};