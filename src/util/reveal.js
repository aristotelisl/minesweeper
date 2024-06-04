export const revealed = (arr, x, y, newNonMinesCount) => {
    // Base case: if the cell is out of bounds, a mine, or already revealed, stop recursion
    if (x < 0 || x >= arr.length || y < 0 || y >= arr[x].length || arr[x][y].revealed || arr[x][y].value === 'X') {
        return newNonMinesCount; // Return the count as it is
    }

    // Reveal this cell
    arr[x][y].revealed = true;
    newNonMinesCount--; // Decrement since we're revealing a non-mine cell

    // If the cell value is not zero, just return the count, no further recursive reveal needed
    if (arr[x][y].value !== 0) {
        return newNonMinesCount;
    }

    // Recursively reveal all adjacent cells
    newNonMinesCount = revealed(arr, x + 1, y, newNonMinesCount);    // South
    newNonMinesCount = revealed(arr, x - 1, y, newNonMinesCount);    // North
    newNonMinesCount = revealed(arr, x, y + 1, newNonMinesCount);    // East
    newNonMinesCount = revealed(arr, x, y - 1, newNonMinesCount);    // West
    newNonMinesCount = revealed(arr, x + 1, y + 1, newNonMinesCount); // South-East
    newNonMinesCount = revealed(arr, x - 1, y - 1, newNonMinesCount); // North-West
    newNonMinesCount = revealed(arr, x + 1, y - 1, newNonMinesCount); // South-West
    newNonMinesCount = revealed(arr, x - 1, y + 1, newNonMinesCount); // North-East

    return newNonMinesCount;
};

// Function to start the reveal process
export const reveal = (grid, x, y, newNonMinesCount) => {
    const newRevealGrid = JSON.parse(JSON.stringify(grid)); // Create a deep copy to modify
    newNonMinesCount = revealed(newRevealGrid, x, y, newNonMinesCount);
    return { newRevealGrid, newNonMinesCount }; // Return the modified grid and the updated count
};