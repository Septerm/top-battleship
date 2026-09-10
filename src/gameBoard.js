export class GameBoard {

    constructor () {

        this.board = Array(10).fill(null).map(() => Array(10).fill(null));
        this.attackMap = Array(10).fill(null).map(() => Array(10).fill(null));
        this.ships = [];

    }

    placeShip(ship, x, y, direction) {

        if( x + ship.length > 10  && direction === 'horizontal' ||  y + ship.length > 10  && direction === 'vertical' ) return;

        if (direction === "horizontal") {

            const xFinal = x + ship.length - 1;

            let isValidPlacement = true;

            for (let i = x; i <= xFinal; i++) {
                if(this.board[y][i] !== null){
                    isValidPlacement = false;
                }
            }

            if(isValidPlacement) {
                for(let i = x; i <= xFinal; i++) {
                    this.board[y][i] = ship;
                }
                this.ships.push(ship);
            }
        } else {

            const yFinal = y + ship.length - 1;

            let isValidPlacement = true;

            for(let i = y; i<= yFinal; i++) {
                if(this.board[i][x] !== null) {
                    isValidPlacement = false;
                }
            }

            if(isValidPlacement) {
                for(let i = y; i<= yFinal; i++) {
                    this.board[i][x] = ship;
                }
                this.ships.push(ship);
            }
        }

    }

    receiveAttack(x,y) {


        if (x > 9 || x < 0 || y > 9 || y < 0 ) return; // Checks to ensure attack is not out of bounds 
        if (this.attackMap[y][x] !== null ) return ; // Checks to ensure the coordinate was not attack already 

        let cell = this.board[y][x];

        if(cell === null ) {

            this.attackMap[y][x] = 'o' // Tells us that a miss occured on the attack Map at this coordinate 
            

        } else {
            cell.hit() //Updates the ship to hit score 
            this.attackMap[y][x] = 'x'; // Tells us that a sucessful hit occured at this coordinate 
        }

    }

    numberOfShipsSunk() {

        let count = 0

        for( s of this.ships) {

            if(s.isSunk() === true) {
                count++;
            }
        }

        return count;
    }

    isAllShipsSunk() {

        return this.ships.every( s => s.isSunk());
    }

    getBoard() {

        return this.board;
    }

    getAttackMap() {
        return this.attackMap;
    }



}