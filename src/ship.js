class Ship {

    constructor(length) {
        this.length = length;
        this.hit = 0;
    }


    hit () {
        return this.hit++;
    }

    isSunk() {
        return this.length === this.hit;
    }
}