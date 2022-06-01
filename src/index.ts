import { Cell, Board } from "./board";
import { config } from "./config";

export class Game{
    gameOver:boolean;
    points:number;
    fruit:Fruit;
    snake:Snake;
    board:Board;
    constructor(){
        this.fruit = new Fruit(this,10,8);
        this.snake = new Snake(this,8,8);
        this.board = new Board(this);
        this.gameOver = false;
        this.points = 0;
        window.setInterval(this.Update,config.speed * 100);
    }
    Reset(){
        for(let i:number = 0; i < game.snake.cells.length; i++){
            game.snake.cells[i].Delete();
        }
        game.fruit.cell.Delete();
        game.snake.cells = [
            new Cell(8,8,"snake"),
            new Cell(7,8,"snake"),
            new Cell(6,8,"snake")
        ]
        game.fruit.cell = new Cell(8,10,"fruit")
        game.gameOver = false;
        game.snake.movement = null;
        game.snake.lastmove = null;
        game.board.Reset();
        game.board.UpdateScore();
    }
    Update(){
        if(game.gameOver == true || game.snake == undefined){
            return;
        }
        switch(game.snake.CalculateNextMove()){
            case "empty":
                game.snake.Move();
                break;
            case "fruit":
                game.snake.Grow();
                game.fruit.Move();
                break;
            case "snake":
            case "wall":
                game.board.GameOver();
                game.gameOver = true;
                break;
        }
    }
    isFree(x:number,y:number){
        return true;
        /*
        käydään läpi kaikki celleistä koosutvat objektit
            jos x ja y on x ja y palautetaan false
        muuten palautetaan true
        */
    }
}
export class Snake{
    cells:Cell[];
    movement:any;
    lastmove:any;
    x:number;
    y:number;
    parent:Game;
    constructor(game:Game,x:number,y:number){
        this.x = x,
        this.y = y,
        this.cells = [
            new Cell(x,y,"snake"),
            new Cell(x-1,y,"snake"),
            new Cell(x-2,y,"snake")
        ],
        this.movement = null,
        this.lastmove = {
            x:null,
            y:null
        }
        this.parent = game;
    }
    CalculateNextMove(){
        if(this.movement == null) return;
        var hitSelf = false;
        var firstCell = this.cells[0];
        var nextTile = {
            x: firstCell.x + this.movement.x,
            y: firstCell.y - this.movement.y
        };
        if(nextTile.x == config.width + 1 || nextTile.x == 0) return "wall";
        if(nextTile.y == config.height + 1 || nextTile.y == 0) return "wall";
        if(this.parent.fruit.cell.x == nextTile.x && this.parent.fruit.cell.y == nextTile.y) return "fruit";
        this.cells.forEach(piece =>{
            if(piece.x == nextTile.x && piece.y == nextTile.y) hitSelf = true; 
        });
        if(hitSelf) return "snake";
        return "empty";
    }
    Move(){
        var firstCell = this.cells[0];
        var lastCell = this.cells[this.cells.length-1];
        var nextTile = {
            x: firstCell.x + this.movement.x,
            y: firstCell.y - this.movement.y
        };
        this.lastmove = {x:this.movement?.x,y:this.movement?.y};
        lastCell.Delete();
        this.cells.pop();
        this.cells.unshift(new Cell(nextTile.x,nextTile.y,"snake"));
    }
    ChangeDirection(input:any){
        const oldMovement={x:this.movement?.x,y:this.movement?.y};  
        if(input.key == "w" || input.key == "ArrowUp") this.movement = {x:0,y:1};
        if(input.key == "a" || input.key == "ArrowLeft") this.movement = {x:-1,y:0};
        if(input.key == "s" || input.key == "ArrowDown") this.movement = {x:0,y:-1};
        if(input.key == "d" || input.key == "ArrowRight") this.movement = {x:1,y:0};
        if(this.lastmove?.x * -1 == this.movement.x && this.lastmove?.y * -1 == this.movement.y)this.movement = oldMovement; 
    }
    Grow(){
        var firstCell = this.cells[0];
        var nextTile = {
            x: firstCell.x + this.movement.x,
            y: firstCell.y - this.movement.y
        };
        this.cells.unshift(new Cell(nextTile.x,nextTile.y,"snake"));
        this.parent.points++;
        this.parent.board.UpdateScore();
    }
}
export class Fruit{
    cell:Cell;
    parent:Game;
    constructor(game:Game,x:number,y:number){
        this.cell = new Cell(x,y,"fruit")
        this.parent = game;
    }
    Move(){
        var newX:number = 0;
        var newY:number = 0;
        do{
            newX = Math.floor(Math.random() * config.height) + 1;
            newY = Math.floor(Math.random() * config.width) + 1;
        }while(!game.isFree(newX,newY))
        this.cell.Delete()
        this.cell = new Cell(newX,newY,"fruit");            
    }
}

export var game = new Game();
game.board.Initialize();