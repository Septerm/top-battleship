export class GameBoard {

    constructor () {

        this.board = Array(10).fill(null).map(() => Array(10).fill(null))

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
            }
        }

    }

}