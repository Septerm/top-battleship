import { GameBoard } from "./src/gameBoard";


describe('Gameboard placeShip function', () => {
  let gameboard;
  let mockShip;

  beforeEach(() => {
    gameboard = new GameBoard();
    // Mock ship object with just the length property needed for placeShip
    mockShip = { length: 3 }; 
  });

  test('places a ship horizontally at valid coordinates', () => {
    gameboard.placeShip(mockShip, 0, 0, 'horizontal');
    
    // y is 0, x goes from 0 to 2
    expect(gameboard.board[0][0]).toBe(mockShip);
    expect(gameboard.board[0][1]).toBe(mockShip);
    expect(gameboard.board[0][2]).toBe(mockShip);
    expect(gameboard.board[0][3]).toBeNull(); // Ensure it doesn't overextend
  });

  test('places a ship vertically at valid coordinates', () => {
    gameboard.placeShip(mockShip, 2, 2, 'vertical');
    
    // x is 2, y goes from 2 to 4
    expect(gameboard.board[2][2]).toBe(mockShip);
    expect(gameboard.board[3][2]).toBe(mockShip);
    expect(gameboard.board[4][2]).toBe(mockShip);
    expect(gameboard.board[5][2]).toBeNull();
  });

  test('prevents horizontal placement outside board boundaries', () => {
    gameboard.placeShip(mockShip, 8, 0, 'horizontal'); // x=8 + length=3 > 10
    
    expect(gameboard.board[0][8]).toBeNull();
  });

  test('prevents vertical placement outside board boundaries', () => {
    gameboard.placeShip(mockShip, 0, 8, 'vertical'); // y=8 + length=3 > 10
    
    expect(gameboard.board[8][0]).toBeNull();
  });

  test('prevents overlapping ship placements', () => {
    gameboard.placeShip(mockShip, 0, 0, 'horizontal'); // Occupies (0,0), (1,0), (2,0)
    
    const anotherShip = { length: 2 };
    gameboard.placeShip(anotherShip, 1, 0, 'vertical'); // Tries to start at (1,0)
    
    // The second ship should not be placed, so the next cell down should remain null
    expect(gameboard.board[1][1]).toBeNull();
    // The original ship should remain intact at the overlap point
    expect(gameboard.board[0][1]).toBe(mockShip);
  });
});