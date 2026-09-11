import { GameBoard } from "./gameBoard";

export class Player {
    constructor(isComputer = false) {
        this.isComputer = isComputer;
        this.board = new GameBoard();
    }

    makeMove(opponentBoard, x, y) {
        if (this.isComputer) {
            return this.computerMove(opponentBoard);
        } else {
            return opponentBoard.receiveAttack(x, y);
        }
    }

    computerMove(opponentBoard) {
        let x, y;
        let validMove = false;
        const attackMap = opponentBoard.getAttackMap();

        while (!validMove) {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);

            if (attackMap[y][x] === null) {
                validMove = true;
            }
        }
        return opponentBoard.receiveAttack(x, y);
    }
}
