import type { Game, Snake, } from "./index";
import { game } from "./index";
import { config } from "./config";

export class Board{
    parent:Game;
    constructor(game:Game){
        this.parent = game;
    }
    UpdateScore(){
        const counter: HTMLElement = document.getElementById("counter") as HTMLElement;
        counter.innerHTML = this.parent.points.toString();
    }
    Reset(){
        const status: HTMLElement = document.getElementById("status") as HTMLElement;
        const text: HTMLElement = document.getElementById("statustext") as HTMLElement;
        const button: HTMLElement = document.getElementById("restartbutton") as HTMLElement;
        status.style.opacity = "0";
        text.innerHTML = "";
        button.style.opacity = "0";
        //this.parent.points = 0;
        //this.parent.Reset();
        this.UpdateScore();
    }
    GameOver(){
        const status: HTMLElement = document.getElementById("status") as HTMLElement;
        const statustext: HTMLElement = document.getElementById("statustext") as HTMLElement;
        const pointstext: HTMLElement = document.getElementById("pointstext") as HTMLElement;
        const button: HTMLElement = document.getElementById("restartbutton") as HTMLElement;
        status.style.opacity = "100";
        statustext.innerHTML = "Game Over";
        pointstext.innerHTML = `Points: ${this.parent.points}`;
        button.style.opacity = "100";
    } 
    Initialize(){

        const snake:Snake = this.parent.snake; 
        window.onkeydown = function(e){
            snake.ChangeDirection(e);
        };
        const board: HTMLElement = document.getElementById("game") as HTMLElement;
        board.style.setProperty("--width",config.width.toString());
        board.style.setProperty("--height",config.height.toString());
        //document.getElementById("restartbutton")?.addEventListener("click", this.Reset);
        document.getElementById("restartbutton")?.addEventListener("click", this.parent.Reset);
    }
}

export class Cell{
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