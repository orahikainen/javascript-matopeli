"use strict";
class Cell {
    constructor(x, y, type) {
        var _a;
        this.x = x,
            this.y = y,
            this.type = type,
            this.cell = document.createElement("div");
        this.cell.className = "cell " + type;
        this.cell.style.setProperty("--x", x);
        this.cell.style.setProperty("--y", y);
        (_a = document.getElementById("game")) === null || _a === void 0 ? void 0 : _a.appendChild(this.cell);
    }
    MoveCell(newX, newY, type) {
        const cells = document.getElementsByClassName(type);
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].getAttribute("style") == `--x:${this.x}; --y:${this.y};`) {
                cells[i].setAttribute("style", `--x:${newX}; --y:${newY};`);
                this.x = newX;
                this.y = newY;
                break;
            }
        }
    }
    Delete() {
        this.cell.parentElement.removeChild(this.cell);
    }
}
class Board {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.game = document.getElementById("game");
        this.game.style.setProperty("--width", width);
        this.game.style.setProperty("--height", height);
    }
}
class Game {
    constructor() {
        this.state = "not started",
            this.points = 0;
    }
}
class Snake {
    constructor(x, y) {
        this.cells = [
            new Cell(x, y, "snake"),
            new Cell(x - 1, y, "snake"),
            new Cell(x - 2, y, "snake")
        ],
            this.movement = {
                x: 0,
                y: 0
            },
            this.lastmove = {
                x: null,
                y: null
            };
    }
    CalculateNextMove(fruitX, fruitY) {
        var hitSelf = false;
        var firstCell = this.cells[0];
        var nextTile = {
            x: firstCell.x + this.movement.x,
            y: firstCell.y + this.movement.y
        };
        if (nextTile.x == 17 || nextTile.x == 0)
            return "wall";
        if (nextTile.y == 17 || nextTile.y == 0)
            return "wall";
        if (fruitX == nextTile.x && fruitY == nextTile.y)
            return "fruit";
        this.cells.forEach(piece => {
            if (piece.x == nextTile.x && piece.y == nextTile.y)
                hitSelf = true;
        });
        if (hitSelf)
            return "snake";
        return "empty";
    }
    Move() {
        var firstCell = this.cells[0];
        var lastCell = this.cells[this.cells.length - 1];
        var nextTile = {
            x: firstCell.x + this.movement.x,
            y: firstCell.y + this.movement.y
        };
        lastCell.Delete();
        this.cells.pop();
        this.cells.unshift(new Cell(nextTile.x, nextTile.y, "snake"));
    }
    ChangeDirection(input) {
        if (input.key == "w" || input.key == "ArrowUp")
            this.movement = { x: 0, y: -1 };
        if (input.key == "a" || input.key == "ArrowLeft")
            this.movement = { x: -1, y: 0 };
        if (input.key == "s" || input.key == "ArrowDown")
            this.movement = { x: 0, y: 1 };
        if (input.key == "d" || input.key == "ArrowRight")
            this.movement = { x: 1, y: 0 };
    }
    Grow() {
        var firstCell = this.cells[0];
        var nextTile = {
            x: firstCell.x + this.movement.x,
            y: firstCell.y + this.movement.y
        };
        this.cells.unshift(new Cell(nextTile.x, nextTile.y, "snake"));
    }
}
class Fruit {
    constructor(x, y) {
        this.cell = new Cell(x, y, "fruit");
    }
    Move() {
        const newX = Math.floor(Math.random() * 16) + 1;
        const newY = Math.floor(Math.random() * 16) + 1;
        this.cell.Delete();
        this.cell = new Cell(newX, newY, "fruit");
    }
}
/// <reference path="cells.ts"/>
/// <reference path="board.ts"/>
const snake = new Snake(8, 8);
const fruit = new Fruit(10, 8);
const board = new Board(16, 16);
const game = new Game();
window.onkeydown = function (e) {
    if (game.state == "not started") {
        window.setInterval(Update, 250);
        game.state = "started";
    }
    snake.ChangeDirection(e);
};
function Update() {
    switch (snake.CalculateNextMove(fruit.cell.x, fruit.cell.y)) {
        case "empty":
            snake.Move();
            break;
        case "fruit":
            snake.Grow();
            fruit.Move();
            break;
        case "snake":
            break;
        case "wall":
            break;
    }
}
