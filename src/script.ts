/// <reference path="cells.ts"/>
/// <reference path="board.ts"/>

const snake = new Snake(8,8);
const fruit = new Fruit(10,8);
const board = new Board(16,16);
const game = new Game();

window.onkeydown = function(e){
    if(game.state == "not started"){
        window.setInterval(Update,250);
        game.state = "started";
    }
    snake.ChangeDirection(e);
};

function Update(){
    switch(snake.CalculateNextMove(fruit.cell.x,fruit.cell.y)){
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