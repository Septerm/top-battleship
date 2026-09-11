# The Odin Project - Battleship Game

A web-based implementation of the classic Battleship game. Play against the computer in this interactive strategy game where you must sink all the enemy's ships before they sink yours.

## Features
- **Classic Battleship Gameplay**: Grid-based strategy with ships placed randomly on both boards.
- **Human vs. Computer**: Test your skills against an AI opponent.
- **Interactive UI**: Click to attack the computer's board and track hits and misses in real-time.
- **Score Tracking**: Keep an eye on the number of ships sunk for both you and the computer.

## How to Play
1. **Start the Game**: Click the "Start Game" button on the main screen.
2. **Attack**: Click on cells in the right-hand board (computer's board) to launch attacks.
3. **Tracking**:
    - Hits are marked with an 'x'.
    - Misses are marked with an 'o'.
4. **Victory**: The first to sink all 5 enemy ships (lengths: 5, 4, 3, 3, 2) wins the game!

## Project Structure
- `src/index.js`: Main game logic, rendering, and event handlers.
- `src/player.js`: Player and computer logic.
- `src/gameBoard.js`: Battleship board management (placing ships, recording attacks).
- `src/ship.js`: Ship class definition.
- `src/styles.css`: Styles for the boards and UI components.
- `src/template.html`: Main HTML template.

## Technologies Used
- JavaScript (ES6+)
- Webpack for bundling
- CSS for layout and styling
- Jest (suggested by `game.test.js`) for testing

## How to Run
1. Clone this repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build/Run the project (refer to `package.json` for specific scripts like `npm start` or `npm run dev`).
