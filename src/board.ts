class Cell{
    x:number;
    y:number;
    type:string;
    cell:any;
    constructor(x:number,y:number,type:string){
        this.x = x,
        this.y = y,
        this.type = type,
        this.cell = document.createElement("div");
        this.cell.className = "cell " + type;
        this.cell.style.setProperty("--x",x);
        this.cell.style.setProperty("--y",y);
        document.getElementById("game")?.appendChild(this.cell);
    }
    MoveCell(newX:number,newY:number,type:string){
        const cells = document.getElementsByClassName(type);
        for(let i = 0; i < cells.length; i++){
            if(cells[i].getAttribute("style") == `--x:${this.x}; --y:${this.y};`){
                cells[i].setAttribute("style",`--x:${newX}; --y:${newY};`);
                this.x = newX;
                this.y = newY;
                break;
            }
        }
    }
    Delete(){
        this.cell.parentElement.removeChild(this.cell);
    }
}
class Board{
    width:number;
    height:number;
    game:any;

    constructor(width:number,height:number){
        this.width = width;
        this.height = height;
        this.game = document.getElementById("game");
        this.game.style.setProperty("--width",width);
        this.game.style.setProperty("--height",height);
    }
}