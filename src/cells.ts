class Game{
    state:string;
    points:number;
    constructor(){
        this.state = "not started",
        this.points = 0
    }
}
class Snake{
    cells:Cell[];
    movement:any;
    lastmove:any;
    constructor(x:number,y:number){
        this.cells = [
            new Cell(x,y,"snake"),
            new Cell(x-1,y,"snake"),
            new Cell(x-2,y,"snake")
        ],
        this.movement = {
            x:0,
            y:0
        },
        this.lastmove = {
            x:null,
            y:null
        }
    }
    CalculateNextMove(fruitX:number,fruitY:number){
        var hitSelf = false;
        var firstCell = this.cells[0];
        var nextTile = {
            x: firstCell.x + this.movement.x,
            y: firstCell.y + this.movement.y
        };
        if(nextTile.x == 17 || nextTile.x == 0) return "wall";
        if(nextTile.y == 17 || nextTile.y == 0) return "wall";
        if(fruitX == nextTile.x && fruitY == nextTile.y) return "fruit";
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
            y: firstCell.y + this.movement.y
        };
        lastCell.Delete();
        this.cells.pop();
        this.cells.unshift(new Cell(nextTile.x,nextTile.y,"snake"));
    }
    ChangeDirection(input:any){
        if(input.key == "w" || input.key == "ArrowUp") this.movement = {x:0,y:-1};
        if(input.key == "a" || input.key == "ArrowLeft") this.movement = {x:-1,y:0};
        if(input.key == "s" || input.key == "ArrowDown") this.movement = {x:0,y:1};
        if(input.key == "d" || input.key == "ArrowRight") this.movement = {x:1,y:0};
    }
    Grow(){
        var firstCell = this.cells[0];
        var nextTile = {
            x: firstCell.x + this.movement.x,
            y: firstCell.y + this.movement.y
        };
        this.cells.unshift(new Cell(nextTile.x,nextTile.y,"snake"));
    }
}
class Fruit{
    cell:Cell;
    constructor(x:number,y:number){
        this.cell = new Cell(x,y,"fruit")
    }
    Move(){
        const newX = Math.floor(Math.random() * 16) + 1;
        const newY = Math.floor(Math.random() * 16) + 1;
        this.cell.Delete()
        this.cell = new Cell(newX,newY,"fruit");            
    }
}