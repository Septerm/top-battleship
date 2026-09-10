import { GameBoard } from "./src/gameBoard";
import { Ship } from "./src/ship";


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



describe('Gameboard - Ship Tracking & Attacks', () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new GameBoard();
  });

  describe('receiveAttack', () => {
    test('registers a hit on a ship at the target coordinates', () => {
      const ship = new Ship(3);
      gameboard.placeShip(ship, 0, 0, 'horizontal');

      gameboard.receiveAttack(0, 0);

      expect(ship.hits).toBe(1);
    });


    test('prevents attacking the exact same coordinate twice', () => {
      const ship = new Ship(2);
      gameboard.placeShip(ship, 0, 0, 'horizontal');

      gameboard.receiveAttack(0, 0);
      
      const secondAttackResult = gameboard.receiveAttack(0, 0);
      
      expect(secondAttackResult).toBe(undefined);
      expect(ship.hits).toBe(1);
    });
  });

  describe('numberOfShipsSunk', () => {
    test('returns 0 when no ships have been sunk', () => {
      const ship1 = new Ship(2);
      const ship2 = new Ship(3);
      gameboard.placeShip(ship1, 0, 0, 'horizontal');
      gameboard.placeShip(ship2, 2, 0, 'horizontal');

      gameboard.receiveAttack(0, 0); // Hit ship1 once (length 2)

      expect(gameboard.numberOfShipsSunk()).toBe(0);
    });

    test('accurately counts single and multiple sunk ships', () => {
      const ship1 = new Ship(1);
      const ship2 = new Ship(2);
      gameboard.placeShip(ship1, 0, 0, 'horizontal');
      gameboard.placeShip(ship2, 2, 0, 'horizontal');

      // Sink ship1
      gameboard.receiveAttack(0, 0);
      expect(gameboard.numberOfShipsSunk()).toBe(1);

      // Sink ship2
      gameboard.receiveAttack(2, 0);
      gameboard.receiveAttack(3, 0);
      expect(gameboard.numberOfShipsSunk()).toBe(2);
    });
  });

  describe('isAllShipsSunk', () => {
    test('returns false when ships are still afloat', () => {
      const ship = new Ship(2);
      gameboard.placeShip(ship, 0, 0, 'horizontal');

      gameboard.receiveAttack(0, 0); // Hit 1 of 2

      expect(gameboard.isAllShipsSunk()).toBe(false);
    });

    test('returns true when every ship placed on the board has been sunk', () => {
      const ship1 = new Ship(1);
      const ship2 = new Ship(2);
      gameboard.placeShip(ship1, 0, 0, 'horizontal');
      gameboard.placeShip(ship2, 2, 0, 'horizontal');

      // Sink both ships
      gameboard.receiveAttack(0, 0);
      gameboard.receiveAttack(2, 0);
      gameboard.receiveAttack(3, 0);

      expect(gameboard.isAllShipsSunk()).toBe(true);
    });
  });
});